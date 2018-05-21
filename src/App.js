import * as React from "react";
import usersJson from "./data/users.json";
import messagesJson from "./data/messages.json";
import { injectGlobal } from "emotion";
import { ChatList } from "./components/ChatList";
import styled from "react-emotion";
import { MessageInput } from "./components/MessageInput";

injectGlobal({
  body: {
    fontFamily: `Montserrat, sans-serif`,
    backgroundColor: "#212121"
  }
});

const Wrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  maxWidth: "600px",
  height: "100vh",
  padding: "0 10px",
  margin: "auto"
});

export class App extends React.Component {
  // initial state with messages and users from json files
  state = {
    messages: messagesJson,
    users: usersJson
  };

  // callback method to add a new message
  onMessage = message => {
    if (message && message.length > 5) {
      const messageData = {
        user: 1,
        date: new Date().toUTCString(),
        message
      };
      this.setState(state => ({
        messages: state.messages.concat(messageData)
      }));
    }
  };

  render() {
    const { users, messages } = this.state;

    return (
      <Wrapper>
        <MessageInput onSend={this.onMessage} />
        <ChatList messages={messages} users={users} />
      </Wrapper>
    );
  }
}
