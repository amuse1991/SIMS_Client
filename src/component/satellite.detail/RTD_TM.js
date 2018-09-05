import React,{Component} from "react";
import {Button} from 'reactstrap';
import io from 'socket.io-client';
import {serverConfig} from '../../configure/app.config'
import * as tmApi from "../../services/api/tm";
//import RTDChart from "../chart/RTDChart";
import ChartIndex from "../chart/ChartIndex";

export class RTD_TM extends Component {
    constructor(props){
        super(props);
        this.TMsocket = null;
        this.state = {
            data:'none',
            tmChartTypes:null,
            selectedTmName:null,
            selectedTmCode:null,
            chartDataReady:false
        }
    }

    componentWillUnmount(){
        if(this.TMsocket !== null){
            this.TMsocket.close();
        }
    }

    selectTM = (event)=>{
        this.setState({
            selectedTmCode:event.target.id, //button id == tmCode
            selectedTmName:event.target.name
        });
    }

    wsTmConnect = async (tmName)=>{
        //console.log('wsConnect called');
        this.TMsocket = io(`http://${serverConfig.host}:${serverConfig.RTDBroadcastPort}/TMnameSpace`);
        this.TMsocket.emit('requestTelemetry',{type:tmName});
        let chartTypes = await tmApi.getChartType(this.state.selectedTmCode);
        this.TMsocket.on(`${tmName}resp`,(msg)=>{
            this.setChartData(msg,chartTypes);
        });
    }

    wsTmDisconnect = ()=>{
        console.log('wsDisconnect called');
        this.TMsocket.disconnect();
    }

    setChartData = async (tmData,chartTypes)=>{
        await this.setState({data:tmData,tmChartTypes:chartTypes,chartDataReady:true});
        console.log(tmData);
    }

    render(){
        const {task} = this.props;
        if(this.state.chartDataReady===true){
            return(
                <div>
                    <h3>Real Time Telemetry</h3>
                    <hr/>
                    <h4>Telemetry Type:{this.state.selectedTmName}</h4>
                    {task.tmList.map((tm)=>
                    <Button id={tm.TelemetryCode} name={tm.TelemetryName} onClick={this.selectTM} active={this.state.selectedTM === tm.TelemetryCode}>
                        {tm.TelemetryName}</Button>)}
                    <div>
                    <hr/>
                        <Button onClick={()=>this.wsTmConnect(this.state.selectedTmName)} disabled={true}>Connect</Button>
                        <Button onClick={()=>this.wsTmDisconnect()}>Disconnect</Button>
                    </div>
                    <hr/>
                    <div>
                        <ChartIndex chartData={this.state.data} chartTypes={this.state.tmChartTypes.data} isRTD={true}/>
                        {/* <RTDChart chartData={this.state.data} chartTypes={this.state.tmChartTypes}/> */}
                    </div>
                </div>
            );
        }
        return(
            <div>
                <h3>Real Time Telemetry</h3>
                <hr/>
                <h4>Telemetry Type:{this.state.selectedTmName}</h4>
                {task.tmList.map((tm)=>
                <Button id={tm.TelemetryCode} name={tm.TelemetryName} onClick={this.selectTM} active={this.state.selectedTM === tm.TelemetryCode}>
                    {tm.TelemetryName}</Button>)}
                <div>
                <hr/>
                    <Button onClick={()=>this.wsTmConnect(this.state.selectedTmName)}>Connect</Button>
                    <Button onClick={()=>this.wsTmDisconnect()}>Disconnect</Button>
                </div>
                <hr/>
            </div>
        );
    }
}