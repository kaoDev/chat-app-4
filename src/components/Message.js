import * as React from "react";
import styled, { css } from "react-emotion";
import { User } from "./User";
import { parse } from "date-fns";

const Wrapper = styled("div")({
  position: "relative",
  marginBottom: "14px"
});

const messageUser = css({
  position: "absolute",
  left: 0,
  top: "-5px"
});

const MessageWrapper = styled("div")({
  backgroundColor: "#424242",
  color: "rgba(255, 255, 255, 0.8)",
  marginLeft: "10px",
  marginTop: "10px",
  padding: "8px 8px 16px 60px",
  minHeight: "60px",
  borderTopLeftRadius: "28px",
  borderTopRightRadius: "8px",
  borderBottomLeftRadius: "50px",
  borderBottomRightRadius: "8px"
});

const Date = styled("div")({
  position: "absolute",
  bottom: "4px",
  right: "4px",
  fontSize: "12px"
});

export const Message = ({ user, date, message }) => (
  <Wrapper>
    <User
      className={messageUser}
      name={user.name}
      profilePic={user.profilePic}
    />
    <MessageWrapper>
      <Date>{parse(date).toLocaleString()}</Date>
      <div>{message}</div>
    </MessageWrapper>
  </Wrapper>
);
