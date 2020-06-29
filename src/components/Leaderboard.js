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
import {
  Card,
  Row,
  Col,
  Image,
  Container
} from "react-bootstrap";

class Leaderboard extends Component {
  render() {
    if (this.props.authedUser === null) {
      return (
        <Redirect
          to={{
            pathname: "/login",
            state: {
              referrer: "/leaderboard"
            }
          }}
        />
      );
    }

    return (
      <div>
        <Navigation />
        <ul>
          {this.props.rankedUsers.map(user => (
            <li key={user} style={{ listStyleType: "none" }}>
              <Row>
                <Col md={{ span: 6, offset: 3 }}>
                  <Card style={{ marginTop: "20px" }}>
                    <Card.Body>
                      <Container>
                        <Row>
                          <Col>
                            <Image
                              src={this.props.users[user].avatarURL}
                              rounded
                            />
                          </Col>
                          <Col>
                            <Row>
                              <h4>{this.props.users[user].name}</h4>
                            </Row>
                            <Row>
                              <div>
                                Questions Answered:{" "}
                                {
                                  Object.keys(this.props.users[user].answers)
                                    .length
                                }
                              </div>
                            </Row>
                            <Row>
                              <div>
                                Questions Created:{" "}
                                {this.props.users[user].questions.length}
                              </div>
                            </Row>
                          </Col>
                          <Col>
                            <Card>
                              <Card.Header>
                                <Card.Title>Score</Card.Title>
                              </Card.Header>
                              <Card.Body>
                                {Object.keys(this.props.users[user].answers)
                                  .length +
                                  this.props.users[user].questions.length}
                              </Card.Body>
                            </Card>
                          </Col>
                        </Row>
                      </Container>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  let rankedUsers = Object.keys(users).sort((a, b) => {
    return (
      Object.keys(users[b].answers).length +
      users[b].questions.length -
      (Object.keys(users[a].answers).length + users[a].questions.length)
    );
  });

  return {
    authedUser,
    users,
    rankedUsers
  };
}

export default connect(mapStateToProps)(Leaderboard);
