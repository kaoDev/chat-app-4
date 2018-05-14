import * as React from "react";
import styled from "react-emotion";
import { Message } from "./Message";

const Wrapper = styled("div")({
  maxWidth: "600px"
});

const userMap = new Map();

const searchUser = (users, userId) => {
  if (userMap.has(userId)) {
    return userMap.get(userId);
  }

  const user = users.find(({ id }) => userId === id) || {};
  userMap.set(userId, user);

  return user;
};

export const ChatList = ({ users, messages }) => (
  <Wrapper>
    {messages.map((message, index) => {
      const user = searchUser(users, message.user);
      return <Message key={index} {...message} user={user} />;
    })}
  </Wrapper>
);
