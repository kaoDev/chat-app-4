import * as React from "react";
import users from "./data/users.json";
import messages from "./data/messages.json";
import { User } from "./components/User";
import { Message } from "./components/Message";

export class App extends React.Component {
  render() {
    return (
      <div>
        <h2>Users:</h2>
        <div>
          {users.map(user => (
            <React.Fragment>
              <User {...user} key={user.id} />
              <hr />
            </React.Fragment>
          ))}
        </div>
        <h2>Messages:</h2>
        <div>
          {messages.map((message, index) => (
            <React.Fragment>
              <Message {...message} key={index} />
              <hr />
            </React.Fragment>
          ))}
        </div>
        <hr />
      </div>
    );
  }
}
