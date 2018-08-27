import React,{Component} from "react";
//import Gmap from "../Gmap"
import * as gtdApi from "../../services/api/gtd"
import {GmapComponent} from "../GmapComponent"

export class GTD extends Component {
    //props : satCode (all인 경우 전체 위성 조회),isGTDActive
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
            isMarkerShown: false,
        };
    }

    fetchOrbitData= async()=>{
        let {satCode} = this.props;
        let time = this.state.time;
        let term = this.state.fetchTerm;
        let orbitDataset;
        if(satCode === 'all'){ //전체 위성 조회
            console.log('all')
            orbitDataset = await gtdApi.getAllOrbitData(time,term);
            let satApi = require('../../services/api/satellite');
            let satList = await satApi.getSatelliteList();
            orbitDataset = this._recomposeOrbitDataset(orbitDataset.data,satList.data); //recompose 함수 수행 과정에서 시간순으로 정렬되기 때문에 .reverse()하지 않아도 된다.
        }else{ //특정 위성 조회
            console.log('satCode')
            orbitDataset = await gtdApi.getOrbitDataBySatCode(satCode,time,term)
            orbitDataset = orbitDataset.data.reverse();
        }
        await this.setState({
            orbitDataset:orbitDataset
        })
    }
    //TODO:이 함수 백엔드로 옮길것!!
    _recomposeOrbitDataset = (orbitDataset,satList)=>{
        //시간을 기준으로 데이터를 묶어 데이터셋을 만든다.
        orbitDataset.sort((a,b)=>{
            let timeA = Date.parse(a.UTCTime);
            let timeB = Date.parse(b.UTCTime);
            if(timeA<timeB){
                return 1;
            }else if(timeA>timeB){
                return -1;
            }else{
                return 0;
            }
        })

        //현재 두개의 위성(csat,ds2)만 가정해서 코드 작성함
        //TODO:향후 백엔드에서 아예 정렬해서 나오도록 하는 api작성할 것(해당 함수 자체를 제거)
        let dataset = [];
        for(let i=0; i<orbitDataset.length-1;){
            let itemA = orbitDataset[i];
            let itemB = orbitDataset[++i];
            if(itemA.SatelliteCode === itemB.SatelliteCode){
                // 두개의 데이터를 조회하더라도 특정 시간대에는 하나의 데이터만 있을 경우가 있기 때문에 이를 처리
                dataset.push([itemA]);
                dataset.push([itemB]);
            }else{
                dataset.push([itemA,itemB]);
            }
        }

        for(let j=0; j<dataset.length; j++){
            dataset[j].sort((a,b)=>{
                let aCode = a.SatelliteCode.toUpperCase();
                let bCode = b.SatelliteCode.toUpperCase();
                if(aCode<bCode){
                    return -1;
                }
                if(aCode>bCode){
                    return 1;
                }
                return 0;
            })
        }
        //console.log(dataset);
        return dataset;
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

    componentWillUpdate(){
        console.log("update")
        if(this.props.isGTDActive === false){ //현재 페이지가 GTD가 아닌 경우 인터벌을 종료한다.
            this._running = false;
        }else{
            this._running = true; //다시 GTD 페이지로 돌아온 경우 인터벌을 시작한다.
        }
    }

    delayedShowMarker = () => {
        setTimeout(() => {
          this.setState({ isMarkerShown: true })
        }, 3000)
    }

    updateData = () =>{
        let intervalId = setInterval(()=>{
            if(this._running === false){
                clearInterval(intervalId);
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
        const {satCode} = this.props;
        let isMoreThenOne;
        satCode==='all'?isMoreThenOne=true:isMoreThenOne=false;
        if(this.state.dataLoad === true && isMoreThenOne === true){
            return(
                <div>
                <h3>Ground Track Display</h3>
                <h5> UTC Time:{this.state.orbitData[0].UTCTime}</h5>
                <hr/>
                <GmapComponent
                    isMarkerShown={this.state.isMarkerShown}
                    onMarkerClick={this.handleMarkerClick}
                    orbitData={this.state.orbitData}
                    isMoreThenOne={isMoreThenOne}
                />
            </div>
            );
        }else if(this.state.dataLoad === true && isMoreThenOne === false){
            return(
                <div>
                <h3>Ground Track Display</h3>
                <h5> UTC Time:{this.state.orbitData.UTCTime}</h5>
                <hr/>
                <GmapComponent
                    isMarkerShown={this.state.isMarkerShown}
                    onMarkerClick={this.handleMarkerClick}
                    orbitData={this.state.orbitData}
                    isMoreThenOne={isMoreThenOne}
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