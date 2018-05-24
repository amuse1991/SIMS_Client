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

export class Dashboard extends Component {
    render(){
        return(
            <PageTemplate>
                <Container>
                    <Row>
                        <Col className="Map"><Gmap/></Col>
                    </Row>
                    <Row>
                        <CardDeck>
                            {satelliteData.map((satellite,i)=>
                            <Col sm="4"><SatelliteSummary key={i} {...satellite}/></Col>)}
                        </CardDeck>
                    </Row>
                </Container>
            </PageTemplate>
        );
    }
}