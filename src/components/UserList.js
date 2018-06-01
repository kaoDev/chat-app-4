import * as React from "react";
import styled from "react-emotion";
import { Subject } from "rxjs";
import { takeUntil, map } from "rxjs/operators";
import { isAfter, parse } from "date-fns";

const Heading = styled("h3")({
  fontSize: "14px",
  color: "white"
});
const StyledOl = styled("ol")({
  color: "white"
});
const UserListItem = styled("li")({
  fontSize: "14px",
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gridColumnGap: "10px"
});

export class UserList extends React.Component {
  unMounts = new Subject();

  state = { users: [] };

  componentDidMount() {
    const { stateManager } = this.props;

    stateManager.users
      .pipe(
        takeUntil(this.unMounts),
        map(users => {
          return (
            users
              // only the 10 recent active users
              .filter((_, index) => index < 10)
              .sort(
                ({ lastSeen: lastSeenA = 0 }, { lastSeen: lastSeenB = 0 }) => {
                  return isAfter(lastSeenA, lastSeenB) ? -1 : 1;
                }
              )
          );
        })
      )
      .subscribe(users => this.setState({ users }));
  }

  componentWillUnmount() {
    this.unMounts.next();
  }

  render() {
    const { users } = this.state;

    return (
      <React.Fragment>
        <Heading>Recently active:</Heading>
        <StyledOl>
          {users.map(user => (
            <UserListItem key={user.id}>
              <div>{user.name}</div>
              <div>{parse(user.lastSeen).toLocaleString()}</div>
            </UserListItem>
          ))}
        </StyledOl>
      </React.Fragment>
    );
  }
}
