import React,{Component} from "react";
import HovTable from "../chart/hovTable";
import {Button} from 'reactstrap';
import io from 'socket.io-client';
import {WOD} from "../realtime_data/WOD";
import {serverConfig} from '../../configure/app.config'

export class RTD extends Component {
    constructor(props){
        super(props);
        this.socket = null;
        this.state = {
            wod : 'none',
            fcs : 'none'
        }
    }

    componentDidMount(){
        this.socket = io(`http://${serverConfig.host}:${serverConfig.RTDBroadcastPort}/waitingSpace`);
    }

    componentWillUnmount(){
        this.socket.disconnect();
    }

    wsTmConnect = (tmName)=>{
         //console.log('wsConnect called');
         this.socket.emit('requestTelemetry',{id:this.socket.id,type:tmName});
         this.socket.on('responseTelemetry',(msg)=>{
            //console.log(this)
            this.changeWOD(JSON.stringify(msg));
         });
    }

    wsTcConnect = (tcName)=>{
        //console.log('wsConnect called');
        this.socket.emit('requestTelecommand',{id:this.socket.id,type:tcName});
        this.socket.on('responseTelecommand',(msg)=>{
           //console.log(this)
           this.changeWOD(JSON.stringify(msg));
        });
   }

    wsTmDisconnect = ()=>{
        console.log('wsDisconnect called');
        this.socket.disconnect();
    }

    wsTcDisconnect = ()=>{
        console.log('wsDisconnect called');
        this.socket.disconnect();
    }

    changeWOD = (wodData)=>{
        this.setState({wod:wodData});
    }

    render(){
        const {task} = this.props;
        return(
            <div>
                <h3>Real Time Data</h3>
                <h4>Telemetry</h4>
                <div>
                {
                    task.tmList.map((tm)=>{
                        let tmName = tm.TelemetryName;
                        return(
                        <div>
                            <h5>{tmName}   </h5>
                            <Button onClick={()=>this.wsTmConnect(tmName)}>Connect</Button>
                            <Button onClick={()=>this.wsTmDisconnect(tmName)}>Disconnect</Button>
                        </div>
                        );
                    })
                }
                </div>
                <hr/>
                <div>
                <h4>Telecommand</h4>
                {
                    task.tcList.map((tc)=>{
                        let tcName = tc.TelecommandName;
                        return(
                        <div>
                            <h5>{tcName}   </h5>
                            <Button onClick={()=>this.wsTcConnect(tcName)}>Connect</Button>
                            <Button onClick={()=>this.wsTcDisconnect(tcName)}>Disconnect</Button>
                        </div>
                        );
                    })
                }
                </div>
                <hr/>
                {/* <h3>WOD0</h3>
                <WOD wod={this.state.wod}/>
                <hr/>
                <h3>FCS</h3>
                <HovTable/>
                <hr/> */}
            </div>
        );
    }
}