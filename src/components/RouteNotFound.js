import React from "react";
import {
  Card,
  Button
} from "react-bootstrap";
import {
  LinkContainer
} from "react-router-bootstrap";
import Navigation from "./Navigation";

function RouteNotFound() {
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
        <Card style={{ width: "30rem" }}>
          <Card.Body>
            <Card.Title>Where are you going?</Card.Title>
            <Card.Text>This page does not exist on this plane.</Card.Text>
            <LinkContainer to="/">
              <Button variant="primary">Go Back Home</Button>
            </LinkContainer>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
export default RouteNotFound;
