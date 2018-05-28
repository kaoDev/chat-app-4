import * as React from "react";
import styled from "react-emotion";
import { Subject, from } from "rxjs";
import { takeUntil, debounceTime } from "rxjs/operators";
import { getOrCreateAnonymousUser, writeUserData, database } from "../firebase";
import { Loader } from "./Loader";

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

const Header = styled("h1")({
  fontSize: "32px",
  fontWeight: "bold",
  textAlign: "center",
  color: "crimson"
});

const formElementBaseStyle = {
  width: "320px",
  height: "48px",
  padding: "8px 16px",
  fontSize: "14px",
  border: "none",
  outline: "none",
  flexGrow: 0,
  flexShrink: 0,
  marginBottom: "10px",
  borderRadius: "8px",
  boxSizing: "border-box"
};

const Input = styled("input")(formElementBaseStyle, {
  backgroundColor: "#424242",
  color: "rgba(255, 255, 255, 0.8)"
});

const JoinButton = styled("button")(formElementBaseStyle, {
  backgroundColor: "#2518c6",
  color: "white",
  cursor: "pointer",
  fontWeight: "bold",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  ":hover": {
    backgroundColor: "#4538e6"
  },
  ":active,:focus": {
    color: "#e41200",
    backgroundColor: "#4538e6"
  }
});

export class Login extends React.Component {
  // initial state with no user and loading true
  state = {
    loading: true,
    chosenUserName: "",
    chosenProfilePic: "",
    userId: ""
  };

  unMounts = new Subject();

  componentDidMount() {
    from(getOrCreateAnonymousUser())
      .pipe(debounceTime(1000), takeUntil(this.unMounts))
      .subscribe(user => {
        this.setState({
          loading: false,
          chosenProfilePic: user.profilePic,
          chosenUserName: user.name,
          userId: user.userId
        });
      });

    const { stateManager } = this.props;

    stateManager.userName
      .pipe(takeUntil(this.unMounts))
      .subscribe(chosenUserName => this.setState({ chosenUserName }));

    stateManager.profilePic
      .pipe(takeUntil(this.unMounts))
      .subscribe(chosenProfilePic => this.setState({ chosenProfilePic }));
  }

  componentWillUnmount() {
    this.unMounts.next();
  }

  join = async () => {
    const { stateManager } = this.props;
    const { chosenProfilePic, chosenUserName, userId } = this.state;

    this.setState({ loading: true });

    await writeUserData(userId, chosenUserName, chosenProfilePic);

    stateManager.joined.next(true);
  };

  render() {
    const { stateManager } = this.props;
    const { loading, chosenProfilePic, chosenUserName } = this.state;
    return (
      <Wrapper>
        <Header>Welcome to the chat</Header>
        {loading && <Loader />}
        {!loading && (
          <React.Fragment>
            <Input
              placeholder="Put your name here"
              type="text"
              value={chosenUserName}
              onChange={event =>
                stateManager.userName.next(event.currentTarget.value)
              }
            />
            <Input
              placeholder="profile picture url"
              type="text"
              value={chosenProfilePic}
              onChange={event =>
                stateManager.profilePic.next(event.currentTarget.value)
              }
            />
            <JoinButton onClick={this.join}>Join Chat</JoinButton>
          </React.Fragment>
        )}
      </Wrapper>
    );
  }
}
