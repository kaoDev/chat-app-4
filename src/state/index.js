import { Subject, from } from "rxjs";
import { scan, merge, map } from "rxjs/operators";
import messagesJson from "./data/messages.json";
import usersJson from "./data/users.json";

const initialMessages = from(messagesJson);
const initialUsers = from(usersJson);

export const createStateManager = () => {
  const messagesInput = new Subject();
  const usersInput = new Subject();

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
    messageCount
  };
};
