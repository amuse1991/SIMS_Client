import React,{Component} from "react";
import HovTable from "../chart/hovTable";
import {Button} from 'reactstrap';
import io from 'socket.io-client';
import {WOD} from "../realtime_data/WOD";

var socket = io('http://localhost:3001');

export class RTD extends Component {
    constructor(props){
        super(props);
        this.state = {
            wod : 'none',
            fcs : 'none'
        }
    }

    componentDidMount(){
        socket.on('response_telemetry',(msg)=>{
            //console.log(this)
            this.changeWOD(JSON.stringify(msg));
         });
    }

    wsConnect = ()=>{
         console.log('wsConnect called');
         //socket = io(this.state.endpoint);
         socket.emit('request_telemetry','WOD');
    }

    wsDisconnect = ()=>{
        console.log('wsDisconnect called');
        socket.disconnect();
    }

    changeWOD = (wodData)=>{
        this.setState({wod:wodData});
    }

    render(){
        //const {task} = this.props;

        return(
            <div>
                <h3>Real Time Data</h3>
                <Button onClick={this.wsConnect}>Connect</Button>
                <Button onClick={this.wsDisconnect}>Disconnect</Button>
                <hr/>
                <h3>WOD0</h3>
                <WOD wod={this.state.wod}/>
                <hr/>
                <h3>FCS</h3>
                <HovTable/>
                <hr/>
            </div>
        );
    }
}