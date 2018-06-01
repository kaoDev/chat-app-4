import { Subject, BehaviorSubject } from "rxjs";
import { scan, map, combineLatest, tap } from "rxjs/operators";
import { pushMessage, messagesStream, usersObservable } from "../firebase";

export const createStateManager = () => {
  const messagesInput = new Subject();

  // BehaviorSubjects holds one value
  const userName = new BehaviorSubject("");
  const profilePic = new BehaviorSubject("");
  const joined = new BehaviorSubject(false);

  const loginState = userName.pipe(
    combineLatest(profilePic, joined, (name, profilePic, joined) => ({
      name,
      profilePic,
      joined
    }))
  );

  messagesInput.subscribe(message => {
    pushMessage(message);
  });

  // observable providing an array of all messages
  const messages = messagesStream().pipe(
    tap(data => console.log(data.timestamp, data.message)),
    // scan acts like reduce, but over time.
    // it always provides the last calculated value
    scan(
      (state, message) => {
        return state.concat(message);
      },
      // empty array as initial value
      []
    )
  );

  // subscribe to users database and write result in users subject
  const users = usersObservable();

  const usersCount = users.pipe(map(users => users.length));

  return {
    messagesInput,
    messages,
    users,
    usersCount,
    loginState,
    userName,
    profilePic,
    joined
  };
};
