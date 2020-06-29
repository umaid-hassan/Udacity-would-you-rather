import React, {
  Component
} from "react";
import Navigation from "./Navigation";
import {
  connect
} from "react-redux";
import {
  Redirect
} from "react-router-dom";
import UnansweredQuestion from "./UnansweredQuestion";
import AnsweredQuestion from "./AnsweredQuestion";

class ViewQuestion extends Component {
  render() {
    if (this.props.authedUser === null) {
      return (
        <Redirect
          to={{
            pathname: "/login",
            state: {
              referrer:
                "questions/" + this.props.match.params.question_id.toString()
            }
          }}
        />
      );
    }

    let question = this.props.questions[
      this.props.match.params.question_id.toString()
    ];

    if (question === undefined) {
      return (
        <Redirect
          to={{
            pathname: "/notfound"
          }}
        />
      );
    }

    let author = this.props.users[question.author];

    let answered = Object.keys(
      this.props.users[this.props.authedUser].answers
    ).includes(question.id);

    let totalVotes =
      question.optionOne.votes.length + question.optionTwo.votes.length;

    let optionOnePercent = (question.optionOne.votes.length / totalVotes) * 100;
    let optionTwoPercent = (question.optionTwo.votes.length / totalVotes) * 100;

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
          {answered ? (
            <AnsweredQuestion
              author={author}
              authedUser={this.props.users[this.props.authedUser]}
              question={question}
              totalVotes={totalVotes}
              optionOnePercent={optionOnePercent}
              optionTwoPercent={optionTwoPercent}
            />
          ) : (
            <UnansweredQuestion
              author={author}
              question={question}
              questionId={this.props.match.params.question_id.toString()}
            />
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ questions, authedUser, users }) {
  return {
    questions,
    authedUser,
    users
  };
}

export default connect(mapStateToProps)(ViewQuestion);
