import { Subject, from, BehaviorSubject } from "rxjs";
import { scan, merge, map, combineLatest } from "rxjs/operators";
import messagesJson from "./data/messages.json";
import usersJson from "./data/users.json";

const initialMessages = from(messagesJson);
const initialUsers = from(usersJson);

export const createStateManager = () => {
  const messagesInput = new Subject();
  const usersInput = new Subject();

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

  // observable providing an array of all messages
  const messages = messagesInput.pipe(
    merge(initialMessages),
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

  const messageCount = messages.pipe(map(messages => messages.length));

  // observable providing an array of all messages
  const users = usersInput.pipe(
    merge(initialUsers),
    // scan acts like reduce, but over time.
    // it always provides the last calculated value
    scan(
      (state, user) => {
        return state.concat(user);
      },
      // empty array as initial value
      []
    )
  );

  return {
    messagesInput,
    usersInput,
    messages,
    users,
    messageCount,
    loginState,
    userName,
    profilePic,
    joined
  };
};
