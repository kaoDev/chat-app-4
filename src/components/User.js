import * as React from "react";

export const User = ({ id, name, profilePic }) => (
  <div>
    <div>id: {id}</div>
    <div>{name}</div>
    <div>{profilePic}</div>
  </div>
);
