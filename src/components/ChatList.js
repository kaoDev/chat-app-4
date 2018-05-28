import * as React from "react";
import styled from "react-emotion";
import { Message } from "./Message";

const Wrapper = styled("div")({
  display: "flex",
  flex: 1,
  overflow: "auto",
  flexDirection: "column",
  paddingTop: "10px"
});

const searchUser = (users, userId) => {
  const user = users.find(({ id }) => userId === id) || {};

  return user;
};

export const ChatList = ({ users, messages }) => (
  <Wrapper>
    {messages.reverse().map((message, index) => {
      const user = searchUser(users, message.user);
      return <Message key={index} {...message} user={user} />;
    })}
  </Wrapper>
);
