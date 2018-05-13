import React, { Component } from 'react';
import './App.css';
import { Container, Row, Col } from "reactstrap";
import Gmap from './component/Gmap';
import SatelliteSummary from './component/SatelliteSummary';

const satelliteData = [
  {
    satName: "Test_Sat01",
    imgSrc: "./static/sat01.jpg",
    launchDate: "2018.05.13",
    daysOfOperation: "1day"
  },
  {
    satName: "Test_Sat02",
    imgSrc: "",
    launchDate: "2016.05.15",
    daysOfOperation: "00day"
  }
]

class App extends Component {
  render() {
    return (
        <Container fluid={true}>
          <Row>
            <Col className="Taskbar" lg={3}>Taskbar</Col>
            <Col className="MainArea" lg={9}>
              <Row className="Menubar"> Menubar</Row>
              <Row className="Map">
                <Col><Gmap/></Col>
              </Row>
              <Row className="Content">
                {satelliteData.map((satellite,i)=>
                  <SatelliteSummary key={i} {...satellite}/>
                )}
              </Row>
            </Col>
          </Row>
        </Container>
    );
  }
}

export default App;
