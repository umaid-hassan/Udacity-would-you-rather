import React, {
  Component
} from "react";
import Navigation from "./Navigation";
import {
  Card,
  Form,
  Button
} from "react-bootstrap";
import {
  handleSaveQuestion
} from "../actions/questions";
import {
  connect
} from "react-redux";
import {
  Redirect
} from "react-router";
import {
  handleInitialData
} from "../actions/shared";

class NewQuestion extends Component {
  state = {
    optionOne: "",
    optionTwo: "",
    submittedForm: false
  };

  render() {
    if (this.props.authedUser === null) {
      return (
        <Redirect
          to={{
            pathname: "/login",
            state: {
              referrer: "/add"
            }
          }}
        />
      );
    }

    if (this.state.submittedForm) {
      return (
        <div>
          <Redirect to="/" />
        </div>
      );
    }

    return (
      <div>
        <Navigation />
        <div
          style={{
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
            marginTop: "50px"
          }}
        >
          <Card style={{ width: "30rem"}}>
            <Card.Header>
              <Card.Title>Create New Question</Card.Title>
            </Card.Header>
            <Form onSubmit={event => this.handleSubmit(event)}>
              <Card.Body>
                <Card.Subtitle>Complete the question</Card.Subtitle>
                <br />
                <Card.Title>Would you rather...</Card.Title>
                <Form.Group controlId="formBasicOptionOne">
                  <Form.Control
                    type="optionOne"
                    placeholder="Enter option one here"
                    onChange={event => this.onOptionOneChange(event)}
                  />
                </Form.Group>
                Or
                <Form.Group controlId="formBasicOptionTwo">
                  <Form.Control
                    type="optionTwo"
                    placeholder="Enter option two here"
                    onChange={event => this.onOptionTwoChange(event)}
                  />
                </Form.Group>
              </Card.Body>
              <Card.Footer>
                <Button
                  variant="success"
                  type="submit"
                  disabled={
                    this.state.optionOne === "" || this.state.optionTwo === ""
                  }
                >
                  Submit
                </Button>
              </Card.Footer>
            </Form>
          </Card>
        </div>
      </div>
    );
  }

  onOptionOneChange = e => {
    this.setState({
      optionOne: e.target.value
    });
  };

  onOptionTwoChange = e => {
    this.setState({
      optionTwo: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { dispatch, authedUser } = this.props;

    dispatch(
      handleSaveQuestion({
        optionOneText: this.state.optionOne,
        optionTwoText: this.state.optionTwo,
        author: authedUser
      })
    );
    dispatch(handleInitialData());

    this.setState({
      submittedForm: true
    });
  };
}

function mapStateToProps({ questions, authedUser, users }) {
  return {
    questions,
    authedUser,
    users
  };
}

export default connect(mapStateToProps)(NewQuestion);
