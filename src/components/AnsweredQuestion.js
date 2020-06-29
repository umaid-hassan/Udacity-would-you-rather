import React from "react";
import {
  Card,
  ProgressBar
} from "react-bootstrap";
import QuestionHeader from "./QuestionHeader";

function AnsweredQuestion(props) {
  const authedUser = props.authedUser;
  const question = props.question;
  const totalVotes = props.totalVotes;
  const optionOnePercent = props.optionOnePercent;
  const optionTwoPercent = props.optionTwoPercent;

  return (
    <Card>
      <QuestionHeader {...props} />
      <Card.Body>
        <Card style={{ width: "30rem" }}>
          {authedUser.answers[question.id] === "optionOne" && (
            <Card.Header>
              <Card.Title>Your Answer</Card.Title>
            </Card.Header>
          )}
          <Card.Body>
            {question.optionOne.text}
            <ProgressBar
              now={optionOnePercent}
              label={`${optionOnePercent}%`}
            />
            {question.optionOne.votes.length} out of {totalVotes} votes
          </Card.Body>
        </Card>
        <Card style={{ marginTop: "20px" }}>
          {authedUser.answers[question.id] === "optionTwo" && (
            <Card.Header>
              <Card.Title>Your Answer</Card.Title>
            </Card.Header>
          )}
          <Card.Body>
            {question.optionTwo.text}
            <ProgressBar
              now={optionTwoPercent}
              label={`${optionTwoPercent}%`}
            />
            {question.optionTwo.votes.length} out of {totalVotes} votes
          </Card.Body>
        </Card>
      </Card.Body>
    </Card>
  );
}

export default AnsweredQuestion;
