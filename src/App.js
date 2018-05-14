import * as React from "react";
import users from "./data/users.json";
import messages from "./data/messages.json";
import { injectGlobal } from "emotion";
import { ChatList } from "./components/ChatList";
import styled from "react-emotion";

injectGlobal({
  body: {
    fontFamily: `Montserrat, sans-serif`,
    backgroundColor: "#212121"
  }
});

const Wrapper = styled("div")({
  display: "flex",
  justifyContent: "center"
});

export class App extends React.Component {
  render() {
    return (
      <Wrapper>
        <ChatList messages={messages} users={users} />
      </Wrapper>
    );
  }
}
