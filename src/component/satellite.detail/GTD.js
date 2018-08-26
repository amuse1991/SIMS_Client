import React,{Component} from "react";
//import Gmap from "../Gmap"
import * as gtdApi from "../../services/api/gtd"
import {GmapComponent} from "../GmapComponent"

export class GTD extends Component {
    //props : satCode (all인 경우 전체 위성 조회)
    //현재 시간은 2018-05-08 14:30:01로 가정(기업측 테스트 데이터셋 시간대가 2018-05-08 14:30:01에서 시작하기 때문)
    _running = false;

    constructor(props){
        super(props);
        let nowTime = '2018-05-08 14:30:01.0000000';
        this.state = {
            time: nowTime,//실제로는 현재시간으로 초기화
            orbitDataset:null,
            orbitData:null,
            dataLoad:false,
            fetchTerm:30, //30분 단위
            isMarkerShown: false
        };
    }

    fetchOrbitData= async()=>{
        let {satCode} = this.props;
        let time = this.state.time;
        let term = this.state.fetchTerm;
        let orbitDataset;
        if(satCode === 'all'){ //전체 위성 조회
            orbitDataset = await gtdApi.getAllOrbitData(time,term);
        }else{ //특정 위성 조회
            orbitDataset = await gtdApi.getOrbitDataBySatCode(satCode,time,term);
        }
        await this.setState({
            orbitDataset:orbitDataset.data.reverse()
        })
    }

    componentDidMount(){
        this.fetchOrbitData();
        this.delayedShowMarker();
        this._running = true;
        this.updateData();
    }

    componentWillUnmount(){
        //console.log("unmount");
        this._running = false;
    }

    delayedShowMarker = () => {
        setTimeout(() => {
          this.setState({ isMarkerShown: true })
        }, 3000)
    }

    updateData = () =>{
        let interval = setInterval(()=>{
            if(this._running === false){
                //console.log("clear interval");
                clearInterval(interval);
            }else{
               let orbitData = this.state.orbitDataset.pop();
               if(this.state.dataLoad === false){
                    this.setState({
                        orbitData:orbitData,
                        dataLoad:true
                    })
               }else{
                    this.setState({
                        orbitData:orbitData
                    })
               }
                
               console.log(this.state.orbitDataset.pop());
            }
        },1000)
    }

    handleMarkerClick = () => {
        this.setState({ isMarkerShown: false })
        this.delayedShowMarker()
    }

    render(){
        if(this.state.dataLoad === true){
            return(
                <div>
                <h3>Ground Track Display</h3>
                <h5> UTC Time:{this.state.orbitData.UTCTime}</h5>
                <hr/>
                <GmapComponent
                    isMarkerShown={this.state.isMarkerShown}
                    onMarkerClick={this.handleMarkerClick}
                    orbitData={this.state.orbitData}
                />
            </div>
            );
        }
        return(
            <div>
                <h3>Ground Track Display</h3>
                <hr/>
                loading...
            </div>
        );
    }
}