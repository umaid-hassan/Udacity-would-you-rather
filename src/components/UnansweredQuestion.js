import React, {
  Component
} from "react";
import {
  Card,
  Form,
  Button
} from "react-bootstrap";
import {
  connect
} from "react-redux";
import {
  handleSaveAnswer
} from "../actions/questions";
import {
  addUserAnswer
} from "../actions/users";
import QuestionHeader from "./QuestionHeader";

class UnansweredQuestion extends Component {
  state = {
    selectedOption: "none"
  };

  render() {
    return (
      <Card style={{ width: "30rem" }}>
        <QuestionHeader {...this.props} />
        <Form onSubmit={event => this.handleSubmit(event)}>
          <Card.Body>
            <Form.Group>
              <Form.Check
                type="radio"
                label={this.props.question.optionOne.text}
                name="questionRadios"
                id="optionOne"
                onChange={event => this.onChange(event)}
              />
              <Form.Check
                type="radio"
                label={this.props.question.optionTwo.text}
                name="questionRadios"
                id="optionTwo"
                onChange={event => this.onChange(event)}
              />
            </Form.Group>
          </Card.Body>
          <Card.Footer>
            <Button
              variant="primary"
              type="submit"
              disabled={this.state.selectedOption === "none"}
            >
              Submit
            </Button>
          </Card.Footer>
        </Form>
      </Card>
    );
  }

  onChange = e => {
    this.setState({
      selectedOption: e.target.id
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { dispatch, authedUser } = this.props;
    const questionId = this.props.questionId;

    dispatch(
      addUserAnswer({
        authedUser: authedUser,
        qid: questionId,
        answer: this.state.selectedOption
      })
    );

    dispatch(
      handleSaveAnswer({
        authedUser: authedUser,
        qid: questionId,
        answer: this.state.selectedOption
      })
    );
  };
}

function mapStateToProps({ questions, authedUser, users }) {
  return {
    questions,
    authedUser,
    users
  };
}

export default connect(mapStateToProps)(UnansweredQuestion);
