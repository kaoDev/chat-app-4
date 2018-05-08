import * as React from "react";

export const Message = ({ user, date, message }) => (
  <div>
    <div>user: {user}</div>
    <div>{date}</div>
    <div>{message}</div>
  </div>
);
