import React from "react";
import {
  Card,
  Media
} from "react-bootstrap";

function QuestionHeader(props) {
  let author = props.author;

  return (
    <div>
      <Card.Header>
        <Media>
          <img
            width={64}
            height={64}
            className="mr-3"
            src={author.avatarURL}
            alt="Generic placeholder"
          />
          <Media.Body>
            <h5>{author.name + " asks"}</h5>
            <p>Would you rather</p>
          </Media.Body>
        </Media>
      </Card.Header>
    </div>
  );
}

export default QuestionHeader;
