import * as React from "react";
import { injectGlobal } from "emotion";
import { ChatList } from "./components/ChatList";
import styled from "react-emotion";
import { MessageInput } from "./components/MessageInput";
import { createStateManager } from "./state";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

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

const MessageCounter = styled("div")({
  fontSize: "20px",
  fontWeight: "bold",
  textAlign: "center",
  color: "white"
});

export class App extends React.Component {
  // initial state with messages and users from json files
  state = {
    messages: [],
    users: [],
    count: 0
  };

  unMounts = new Subject();

  stateManager = createStateManager();

  componentDidMount() {
    this.stateManager.messages
      .pipe(takeUntil(this.unMounts))
      .subscribe(messages => {
        this.setState({ messages });
      });
    this.stateManager.users.pipe(takeUntil(this.unMounts)).subscribe(users => {
      this.setState({ users });
    });
    this.stateManager.messageCount
      .pipe(takeUntil(this.unMounts))
      .subscribe(count => {
        this.setState({ count });
      });
  }

  componentWillUnmount() {
    this.unMounts.next();
  }

  // callback method to add a new message
  onMessage = message => {
    if (message && message.length > 0) {
      const messageData = {
        user: 1,
        date: new Date().toUTCString(),
        message
      };
      this.stateManager.messagesInput.next(messageData);
    }
  };

  render() {
    const { users, messages, count } = this.state;

    return (
      <Wrapper>
        <MessageCounter>{count} messages</MessageCounter>
        <MessageInput onSend={this.onMessage} />
        <ChatList messages={messages} users={users} />
      </Wrapper>
    );
  }
}
