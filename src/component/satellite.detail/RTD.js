import React,{Component} from "react";
import {Button} from 'reactstrap';
import io from 'socket.io-client';
import {serverConfig} from '../../configure/app.config'
import ChartIndex from "../chart/ChartIndex";

export class RTD extends Component {
    constructor(props){
        super(props);
        this.TMsocket = null;
        this.TCsocket = null;
        this.state = {
            wod : 'none',
            fcs : 'none'
        }
    }


    componentWillUnmount(){
        //this.socket.disconnect();
    }

    wsTmConnect = (tmName)=>{
        //console.log('wsConnect called');
        this.TMsocket = io(`http://${serverConfig.host}:${serverConfig.RTDBroadcastPort}/TMnameSpace`);
        this.TMsocket.emit('requestTelemetry',{type:tmName});
        this.TMsocket.on(`${tmName}resp`,(msg)=>{
        console.log(msg);
        //this.changeWOD(JSON.stringify(msg));
        });
    }

    wsTcConnect = (tcName)=>{
        //console.log('wsConnect called');
        this.TCsocket = io(`http://${serverConfig.host}:${serverConfig.RTDBroadcastPort}/TCnameSpace`);
        this.TCsocket.emit('requestTelecommand',{type:tcName});
        this.TCsocket.on(`${tcName}resp`,(msg)=>{
           console.log(msg);
           //this.changeWOD(JSON.stringify(msg));
        });
   }

    wsTmDisconnect = ()=>{
        console.log('wsDisconnect called');
        this.TMsocket.disconnect();
    }

    wsTcDisconnect = ()=>{
        console.log('wsDisconnect called');
        this.TCsocket.disconnect();
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
                            <Button onClick={()=>this.wsTmDisconnect()}>Disconnect</Button>
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
                            <Button onClick={()=>this.wsTcDisconnect()}>Disconnect</Button>
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