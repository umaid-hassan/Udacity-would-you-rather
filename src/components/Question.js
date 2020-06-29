import React from "react";
import {
  Card,
  Button
} from "react-bootstrap";
import {
  LinkContainer
} from "react-router-bootstrap";
import QuestionHeader from "./QuestionHeader";

function Question(props) {
  let question = props.question;

  return (
    <div
      style={{
        justifyContent: "center",
        display: "flex",
        marginTop: "50px"
      }}
    >
      <Card style={{ width: "30rem" }}>
      <QuestionHeader {...props}/>
        <Card.Body>
          {question.optionOne.text}
          <br />
          or...
        </Card.Body>
        <Card.Footer>
          <LinkContainer
            to={{
              pathname: "/questions/" + props.questionId,
              state: { questionId: props.questionId }
            }}
          >
            <Button variant="success">View Question</Button>
          </LinkContainer>
        </Card.Footer>
      </Card>
    </div>
  );
}

export default Question;
