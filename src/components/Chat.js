import * as React from "react";
import { ChatList } from "./ChatList";
import styled from "react-emotion";
import { MessageInput } from "./MessageInput";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { auth } from "firebase";
import { Button } from "./Button";

const Wrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  maxWidth: "600px",
  height: "100vh",
  padding: "0 10px",
  margin: "auto",
  width: "100%"
});

const UsersCounter = styled("div")({
  fontSize: "20px",
  fontWeight: "bold",
  textAlign: "center",
  color: "white"
});

const LeaveButton = styled(Button)({
  width: "100%"
});

export class Chat extends React.Component {
  // initial state with messages and users from json files
  state = {
    messages: [],
    users: [],
    usersCount: 0
  };

  unMounts = new Subject();

  componentDidMount() {
    this.props.stateManager.messages
      .pipe(takeUntil(this.unMounts))
      .subscribe(messages => {
        this.setState({ messages });
      });
    this.props.stateManager.users
      .pipe(takeUntil(this.unMounts))
      .subscribe(users => {
        this.setState({ users });
      });
    this.props.stateManager.usersCount
      .pipe(takeUntil(this.unMounts))
      .subscribe(usersCount => {
        this.setState({ usersCount });
      });
  }

  componentWillUnmount() {
    this.unMounts.next();
  }

  // callback method to add a new message
  onMessage = message => {
    if (message && message.length > 0) {
      const messageData = {
        user: auth().currentUser.uid,
        date: new Date().toUTCString(),
        message
      };
      this.props.stateManager.messagesInput.next(messageData);
    }
  };

  leave = () => {
    this.props.stateManager.joined.next(false);
  };

  render() {
    const { users, messages, usersCount } = this.state;

    return (
      <Wrapper>
        <UsersCounter>{usersCount} registered users</UsersCounter>
        <MessageInput onSend={this.onMessage} />
        <LeaveButton onClick={this.leave}>leave chat</LeaveButton>
        <ChatList messages={messages} users={users} />
      </Wrapper>
    );
  }
}
