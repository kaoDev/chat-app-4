import * as React from "react";
import styled from "react-emotion";
import { createStateManager } from "./state";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { Login } from "./components/Login";
import { Chat } from "./components/Chat";

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

export class App extends React.Component {
  // initial state with messages and users from json files
  state = {
    joined: false
  };

  unMounts = new Subject();

  stateManager = createStateManager();

  componentDidMount() {
    this.stateManager.loginState
      .pipe(takeUntil(this.unMounts))
      .subscribe(({ joined }) => {
        this.setState({ joined });
      });
  }

  componentWillUnmount() {
    this.unMounts.next();
  }

  render() {
    const { joined } = this.state;

    return (
      <Wrapper>
        {!joined && <Login stateManager={this.stateManager} />}
        {joined && <Chat stateManager={this.stateManager} />}
      </Wrapper>
    );
  }
}
