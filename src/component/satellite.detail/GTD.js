import React,{Component} from "react";
import Gmap from "../Gmap"
import * as gtdApi from "../../services/api/gtd"

export class GTD extends Component {
    //props : satCode (all인 경우 전체 위성 조회)
    //현재 시간은 2018-05-08 14:30:01로 가정(기업측 테스트 데이터셋 시간대가 2018-05-08 14:30:01에서 시작하기 때문)
    constructor(props){
        super(props);
        let nowTime = '2018-05-08 14:30:01.0000000';
        this.state = {
            time: nowTime,//실제로는 현재시간으로 초기화
            orbitData:null,
            dataLoad:false,
            fetchTerm:2 //초 단위
        };
    }

    fetchOrbitData= async()=>{
        let {satCode} = this.props;
        let time = this.state.time;
        let term = this.state.fetchTerm;
        let orbitData;
        if(satCode === 'all'){ //전체 위성 조회
            orbitData = await gtdApi.getAllOrbitData(time,term);
        }else{ //특정 위성 조회
            orbitData = await gtdApi.getOrbitDataBySatCode(satCode,time,term);
        }
        await this.setState({
            orbitData:orbitData,
            dataLoad:true
        })
    }

    componentDidMount(){
        this.fetchOrbitData();
    }

    render(){
        if(this.state.dataLoad === true){
            return(
                <div>
                <h3>Ground Track Display</h3>
                {/* <p> time:{this.state.time}</p> */}
                <hr/>
                <Gmap orbitData={this.state.orbitData}/>
            </div>
            );
        }
        return(
            <div>
                <h3>Ground Track Display</h3>
                {/* <p> time:{this.state.time}</p> */}
                <hr/>
                loading...
            </div>
        );
    }
}