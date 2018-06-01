import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import { injectGlobal } from "emotion";

injectGlobal({
  body: {
    fontFamily: `Montserrat, sans-serif`,
    backgroundColor: "#212121",
    color: "white",
    margin: 0
  }
});

ReactDOM.render(<App />, document.getElementById("root"));
