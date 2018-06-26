import React,{Component} from "react";
import HovTable from "../chart/hovTable";
import {Button} from 'reactstrap';
import io from 'socket.io-client';

var socket = io('http://localhost:3001');

export class RTD extends Component {

    wsConnect = ()=>{
         console.log('wsConnect called');
         //socket = io(this.state.endpoint);
         socket.emit('request_telemetry','satelliteName');
         
    }

    wsDisconnect = ()=>{
        console.log('wsDisconnect called');
        socket.disconnect();
    }

    // componentDidMount(){
    //     let socket = io(this.state.endpoint);
    //     socket.emit('request_telemetry','satelliteName');
    // }
    
    render(){
        socket.on('response_telemetry',function(msg){
            alert(msg);
         });
        // let socket = io(this.state.endpoint);
        // socket.on('response_telemetry',(msg)=>{
        //     console.log(msg);
        //     //TODO 받은 msg를 이용해 tm 테이블 업데이트
        // })
        return(
            <div>
                <h3>Real Time Data</h3>
                <Button onClick={this.wsConnect}>Connect</Button>
                <Button onClick={this.wsDisconnect}>Disconnect</Button>
                <hr/>
                <h3>Real Time Telemetry</h3>
                <HovTable/>
                <hr/>
                <h3>Real Time Telecommand</h3>
                <HovTable/>
                <hr/>
            </div>
        );
    }
}