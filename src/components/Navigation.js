import React, {
  Component
} from "react";
import {
  Navbar,
  Nav,
  Form,
  Button,
  Media
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
import LoadingBar from 'react-redux-loading-bar'

class Navigation extends Component {
  render() {
    return (
      <div>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home"></Navbar.Brand>
          <Nav className="mr-auto">
            <LinkContainer
              to="/"
              exact
              style={{ marginLeft: "200px", marginRight: "10px" }}
            >
              <Button variant="outline-dark">Home</Button>
            </LinkContainer>
            <LinkContainer
              to="/add"
              style={{ marginLeft: "10px", marginRight: "10px" }}
            >
              <Button variant="outline-dark">New Question</Button>
            </LinkContainer>
            <LinkContainer
              to="/leaderboard"
              style={{ marginLeft: "10px", marginRight: "10px" }}
            >
              <Button variant="outline-dark">Leaderboard</Button>
            </LinkContainer>
          </Nav>
          {this.props.authedUser !== null && (
            <Form inline>
              <Media>
              <img
                  width={20}
                  height={20}
                  className="mr-3"
                  src={this.props.users[this.props.authedUser].avatarURL}
                  alt="user image"
                />
              </Media>
              <font color="white">
                {this.props.users[this.props.authedUser].name}
              </font>
              <LinkContainer to="/login" style={{ marginLeft: "10px" }}>
                <Button variant="outline-info" onClick={event => this.handleClick(event)}>
                  Logout
                </Button>
              </LinkContainer>
            </Form>
          )}
        </Navbar>
        <LoadingBar />
      </div>
    );
  }

  handleClick = event => {
    event.preventDefault();
    this.props.dispatch(setAuthedUser(null));
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    users
  };
}

export default connect(mapStateToProps)(Navigation);
