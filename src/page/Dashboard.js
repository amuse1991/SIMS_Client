import React, {Component} from 'react';
import { Container, Row, Col, 
        CardDeck
        } from "reactstrap";
import {PageTemplate} from "../ui/PageTemplate";
//import Gmap from "../component/Gmap";
import {GTD} from "../component/satellite.detail/GTD";
import SatelliteSummary from "../component/SatelliteSummary";
import * as satApiService from "../services/api/satellite";


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
        //console.log("dashboard mounted");
    }

    // componentDidUpdate(){
    //     console.log("dashboard updated");
    // }

    // componentWillUnmount(){
    //     console.log("dashboard unmounted");
    // }

    //async-await 사용
    //https://velopert.com/2597 참조하여 작성함
    fetchDashboardInfo = async () => {
        this.setState({fetching:true}); // ajax 작업 시작
        const satelliteData = await satApiService.getSatelliteList();//satellite summary에 전달할 위성 정보 fetch
        this.setState({satelliteData:satelliteData.data});
        this.setState({fetching:false}); // ajax 작업 종료
    }

    render(){
        return(
            <PageTemplate>
                <div>
                    <h2>Dashboard</h2>
                    <hr/>
                    <Container>
                        <div>
                            {/* <Row>
                                <Col><h3>Ground Track Display</h3></Col>
                            </Row> */}
                            <Row>
                                <Col className="Map"><GTD satCode={'all'}/></Col>
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