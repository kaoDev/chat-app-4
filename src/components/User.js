import * as React from "react";
import { Avatar } from "./Avatar";
import styled, { css } from "react-emotion";

const userNameClass = css({
  display: "none",
  position: "absolute",
  bottom: 0,
  width: "50px",
  color: "white",
  backgroundColor: "rgba(0,0,0,0.3)",
  borderRadius: "8px",
  fontSize: "12px",
  textAlign: "center",
  overflow: "hidden",
  textOverflow: "ellipsis"
});

const Wrapper = styled("div")(
  {
    position: "relative",
    width: "56px",
    height: "56px",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#424242",
    ":hover": {
      [`.${userNameClass}`]: {
        display: "block"
      }
    }
  },
  ({ userNameVisible }) =>
    userNameVisible
      ? {
          [`.${userNameClass}`]: {
            display: "block"
          }
        }
      : {}
);

export const User = ({ name, profilePic, className }) => (
  <Wrapper className={className} userNameVisible={profilePic === null}>
    <Avatar url={profilePic} userName={name} />
    <div className={userNameClass}>{name}</div>
  </Wrapper>
);
