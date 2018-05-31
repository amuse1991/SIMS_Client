import React,{Component} from "react";
import HovTable from "../chart/hovTable";

export class RTD extends Component {
    render(){
        return(
            <div>
                <h3>Real Time Data</h3>
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