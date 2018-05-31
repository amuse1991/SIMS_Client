import React, {Component} from 'react';
import { Container, Row, Col, 
        CardDeck
        } from "reactstrap";
import {PageTemplate} from "../ui/PageTemplate";
import Gmap from "../component/Gmap";
import SatelliteSummary from "../component/SatelliteSummary";

//test data
const satelliteData = [
    {
      satName: "Test Satellite 01",
      imgSrc: "https://cdn.pixabay.com/photo/2012/11/28/11/25/satellite-67718_960_720.jpg",
      launchDate: "2018.05.01",
      daysOfOperation: "1day"
    },
    {
      satName: "Test Satellite 02",
      imgSrc: "https://cdn.pixabay.com/photo/2015/03/26/18/36/spacex-693229_960_720.jpg",
      launchDate: "2016.05.15",
      daysOfOperation: "15day"
    },
    {
        satName: "Test Satellite 03",
        imgSrc: "https://cdn.pixabay.com/photo/2015/03/26/18/36/satellite-693216_960_720.jpg",
        launchDate: "2016.05.30",
        daysOfOperation: "30day"
      }
  ]

export class Dashboard extends Component {
    render(){
        return(
            <PageTemplate>
                <div>
                    <h2>Dashboard</h2>
                    <hr/>
                    <Container>
                        <div>
                            <Row>
                                <Col><h3>Ground Track Display</h3></Col>
                            </Row>
                            <Row>
                                <Col className="Map"><Gmap/></Col>
                            </Row>
                        </div>
                        <hr/>
                        <Row>
                            <Col><h3>Satellites</h3></Col>
                        </Row>
                        <Row>
                            <CardDeck>
                                {satelliteData.map((satellite,i)=>
                                <Col sm="4"><SatelliteSummary key={i} {...satellite}/></Col>)}
                            </CardDeck>
                        </Row>
                    </Container>
                </div>
            </PageTemplate>
        );
    }
}