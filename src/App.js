import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import NewQuestion from "./components/NewQuestion";
import Leaderboard from "./components/Leaderboard";
import "bootstrap/dist/css/bootstrap.min.css";
import RouteNotFound from "./components/RouteNotFound";
import Login from "./components/Login";
import ViewQuestion from "./components/ViewQuestion";
import { connect } from "react-redux";
import { handleInitialData } from "./actions/shared";

class App extends React.Component {
  
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" render={() => <Home />} />
          <Route exact path="/add" render={() => <NewQuestion />} />
          <Route exact path="/leaderboard" render={() => <Leaderboard />} />
          <Route exact path="/login" render={props => <Login {...props} />} />
          <Route path="/questions/:question_id" component={ViewQuestion} />
          <Route path="*" render={() => <RouteNotFound />} />
        </Switch>
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

export default connect(mapStateToProps)(App);
