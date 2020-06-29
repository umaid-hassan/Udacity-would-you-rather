import React, {
  Component
} from "react";
import {
  Card,
  Button,
  DropdownButton,
  Dropdown
} from "react-bootstrap";
import {
  LinkContainer
} from "react-router-bootstrap";
import {
  connect
} from "react-redux";
import {
  setAuthedUser
} from "../actions/authedUser";
import Navigation from "./Navigation";

class Login extends Component {
  state = {
    selectedUser: "Select User"
  };

  render() {
    return (
      <div>
        <Navigation />
        <div
          style={{
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
            marginTop: "30px"
          }}
        >
          <Card>
            <Card.Header>
              <Card.Title> <h2>Welcome to the Would You Rather App!</h2></Card.Title>
              <Card.Subtitle><h4>Please Sign in to continue</h4> </Card.Subtitle>
            </Card.Header>
            <Card.Body>
              <div>
                <img src="../images/reduxreact.png" alt="React Redux Icon" height="250" width="250" />
                <h5 style={{ color: "green", }}>Sign In</h5>
              </div>
              <DropdownButton
                id="dropdown-basic-button"
                variant="outline-info"

                title={
                  this.state.selectedUser === "Select User"
                    ? "Select User"
                    : this.props.users[this.state.selectedUser].name
                }
                onSelect={this.handleUserSelect}
                onClick={event => {
                  event.preventDefault();
                }}
              >
                {Object.keys(this.props.users).map(user => (
                  <Dropdown.Item key={user} href={user}>
                    <img width="40" height="40" src={this.props.users[user].avatarURL} alt="User Image" />
                    {this.props.users[user].name}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </Card.Body>
            <Card.Footer>
              <LinkContainer
                to={
                  this.props.location.state
                    ? this.props.location.state.referrer
                    : "/"
                }
              >
                <Button
                  variant="success"
                  block
                  onClick={event => this.handleLogin(event)}
                >
                  Login
                </Button>
              </LinkContainer>
            </Card.Footer>
          </Card>
        </div>
      </div>
    );
  }

  handleLogin() {
    this.props.dispatch(setAuthedUser(this.state.selectedUser));
  };

  handleUserSelect = e => {
    this.setState({
      selectedUser: e
    });
  };
  }

  function mapStateToProps({
    users
  }) {
    return {
      users
    };
  }

  export default connect(mapStateToProps)(Login);
