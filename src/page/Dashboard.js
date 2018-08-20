import React, {Component} from 'react';
import { Container, Row, Col, 
        CardDeck
        } from "reactstrap";
import {PageTemplate} from "../ui/PageTemplate";
import Gmap from "../component/Gmap";
import SatelliteSummary from "../component/SatelliteSummary";
import * as satApiService from "../services/api/satellite";


//test data
/*
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
*/
export class Dashboard extends Component {
    
    constructor(props){
        super();
        this.state = {
            fetching:false, // fetching 작업 (ajax 요청 작업)이 진행중인지 여부를 나타내는 flag
            satelliteData:[],
            gtdData:null
        }  
    }

    componentDidMount(){
        this.fetchDashboardInfo(); //대쉬보드 정보 읽어오기 수행
    }

    //async-await 사용
    //https://velopert.com/2597 참조하여 작성함
    fetchDashboardInfo = async () => {
        this.setState({fetching:true}); // ajax 작업 시작
        const satelliteData = await satApiService.getSatelliteList();//satellite summary에 전달할 위성 정보 fetch
        this.setState({satelliteData:satelliteData.data});
        this.setState({fetching:false}); // ajax 작업 종료
        console.log(this.state.satelliteData);
    }

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
                                {this.state.satelliteData.map((satellite,i)=>
                                <Col sm="4"><SatelliteSummary key={i} {...satellite}/></Col>)}
                            </CardDeck>
                        </Row>
                    </Container>
                </div>
            </PageTemplate>
        );
    }
}