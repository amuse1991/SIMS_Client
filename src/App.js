import React, { Component } from 'react';
import './App.css';
import { Container, Row, Col } from "reactstrap";
import Gmap from './component/Gmap';
import SatelliteSummary from './component/SatelliteSummary';
import Menubar from "./component/Menubar";
import Taskbar from "./component/Taskbar";

const satelliteData = [
  {
    satName: "Test_Sat01",
    imgSrc: "http://pds.joins.com/news/component/htmlphoto_mmdata/201203/13/htm_2012031322264150105011.jpg",
    launchDate: "2018.05.13",
    daysOfOperation: "1day"
  },
  {
    satName: "Test_Sat02",
    imgSrc: "http://pds.joins.com/news/component/newsis/201406/16/NISI20140616_0009799793_web.jpg",
    launchDate: "2016.05.15",
    daysOfOperation: "00day"
  }
]

class App extends Component {
  render() {
    let isMain = true;
    let content = null;
    if(isMain){
      content = satelliteData.map((satellite,i)=>
      <SatelliteSummary key={i} {...satellite}/>)
    }else{
      content = <div>it is not main</div>
    }
    return (
        <Container fluid={true}>
          <Row>
            <Col className="Taskbar" lg={2}><Taskbar/></Col>
            <Col className="MainArea" lg={10}>
              <Row className="Menubar"> <Menubar/> </Row>
              <Row className="Map">
                <Col><Gmap/></Col>
              </Row>
              <Row className="Content">
                {content}
              </Row>
            </Col>
          </Row>
        </Container>
    );
  }
}

export default App;
