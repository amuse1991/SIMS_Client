import React,{Component} from "react";
import {Button} from 'reactstrap';
import io from 'socket.io-client';
import {serverConfig} from '../../configure/app.config'
import ChartIndex from "../chart/ChartIndex";

export class RTD_TC extends Component {
    constructor(props){
        super(props);
        this.TCsocket = null;
        this.state = {
            data:'none',
            selectedTcName:null,
            chartDataReady:false
        }
    }

    componentWillUnmount(){
        if(this.TCsocket !== null){
            this.TCsocket.close();
        }
    }
    
    selectTC = (event)=>{
        this.setState({
            selectedTcName:event.target.name
        });
    }

    wsTcConnect = (tcName)=>{
        //console.log('wsConnect called');
        this.TCsocket = io(`http://${serverConfig.host}:${serverConfig.RTDBroadcastPort}/TCnameSpace`);
        this.TCsocket.emit('requestTelecommand',{type:tcName});
        this.TCsocket.on(`${tcName}resp`,(msg)=>{
            console.log(msg);
            this.changeState(msg);
        });
   }

    wsTcDisconnect = ()=>{
        console.log('wsDisconnect called');
        this.TCsocket.disconnect();
    }

    changeState = (tcData)=>{
        if(this.state.chartDataReady){
            this.setState({data:tcData})
        }else{
            this.setState({data:tcData,chartDataReady:true});
        }
    }

    render(){
        const {task} = this.props;
        if(this.state.chartDataReady===true){
            <div>
                <h3>Real Time Telecommand</h3>
                <hr/>
                <div>
                <h4>Telecommand Type:{this.state.selectedTcName}</h4>
                {task.tcList.map((tm)=>
                <Button id={tm.TelecommandCode} name={tm.TelecommandName} onClick={this.selectTC} active={this.state.selectedTC === tm.TelecommandCode}>
                    {tm.TelecommandName}</Button>)}
                </div>
                <div>
                <hr/>
                    <Button onClick={()=>this.wsTcConnect(this.state.selectedTcName)} disabled={true}>Connect</Button>
                    <Button onClick={()=>this.wsTcDisconnect()}>Disconnect</Button>
                </div>
                <hr/>
            </div>
        }
        return(
            <div>
                <h3>Real Time Telecommand</h3>
                <hr/>
                <div>
                <h4>Telecommand Type:{this.state.selectedTcName}</h4>
                {task.tcList.map((tm)=>
                <Button id={tm.TelecommandCode} name={tm.TelecommandName} onClick={this.selectTC} active={this.state.selectedTC === tm.TelecommandCode}>
                    {tm.TelecommandName}</Button>)}
                </div>
                <div>
                <hr/>
                    <Button onClick={()=>this.wsTcConnect(this.state.selectedTcName)}>Connect</Button>
                    <Button onClick={()=>this.wsTcDisconnect()}>Disconnect</Button>
                </div>
                <hr/>
            </div>
        );
    }
}