import React, { Component } from 'react';
//import './App.css';
import { Container, Row, Col } from "reactstrap";

class App extends Component {
  render() {
    return (
        <Container fluid={true}>
          <Row>
            <Col className="Sidebar" lg={3}>
              <Row className="Profile">profile</Row>
              <Row className="SatelliteList">SatelliteList</Row>
            </Col>
            <Col className="MainArea" lg={9}>
              <Row className="Taskbar"> taskbar</Row>
              <Row className="Map">Map</Row>
              <Row className="Summary">Summary</Row>
            </Col>
          </Row>
        </Container>
    );
  }
}

export default App;
