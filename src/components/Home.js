import React, {
  Component
} from "react";
import Navigation from "./Navigation";
import {
  connect
} from "react-redux";
import {
  Tabs,
  Tab
} from "react-bootstrap";
import Question from "./Question";
import {
  Redirect
} from "react-router-dom";

class Home extends Component {
  render() {
    if (this.props.authedUser === null) {
      return (
        <Redirect
          to={{
            pathname: "/login",
            state: {
              referrer: "/"
            }
          }}
        />
      );
    }

    return (
      <div>
        <Navigation />
        {this.props.loadingBar["default"] === 0 && (
          <Tabs
            defaultActiveKey="unanswered"
            id="uncontrolled-tab-example"
            style={{
              justifyContent: "center",
              display: "flex",
              alignItems: "center",
              marginTop: "50px"
            }}
          >
            <Tab eventKey="unanswered" title="Unanswered Questions">
              <ul>
                {this.props.unansweredQuestions.map(id => (
                  <li key={id} style={{ listStyleType: "none" }}>
                    <Question
                      questionId={id}
                      question={this.props.questions[id]}
                      author={this.props.users[this.props.questions[id].author]}
                    />
                  </li>
                ))}
              </ul>
            </Tab>
            <Tab eventKey="answered" title="Answered Questions">
              <ul>
                {this.props.answeredQuestions.map(id => (
                  <li key={id} style={{ listStyleType: "none" }}>
                    <Question
                      questionId={id}
                      question={this.props.questions[id]}
                      author={this.props.users[this.props.questions[id].author]}
                    />
                  </li>
                ))}
              </ul>
            </Tab>
          </Tabs>
        )}
      </div>
    );
  }
}

function mapStateToProps({ questions, users, authedUser, loadingBar }) {
  let sortedQuestions = Object.keys(questions).sort((a, b) => {
    return questions[b].timestamp - questions[a].timestamp;
  });

  return {
    answeredQuestions: sortedQuestions.filter(
      a =>
        questions[a].optionOne.votes.includes(authedUser) ||
        questions[a].optionTwo.votes.includes(authedUser)
    ),
    unansweredQuestions: sortedQuestions.filter(
      a =>
        !questions[a].optionOne.votes.includes(authedUser) &&
        !questions[a].optionTwo.votes.includes(authedUser)
    ),
    questions,
    users,
    authedUser,
    loadingBar
  };
}

export default connect(mapStateToProps)(Home);
