import React,{Component} from 'react';
import { Pie } from "react-chartjs-2";

export class Detail extends Component{
    render(){
        const sampleData1 = [300,50,100];
    return (
    <div>
        <h1>Telemetry Chart Example</h1>
        <Pie data={{
            datasets:sampleData1,
            lables:['A','B','C']
            }}/>
    </div>
    );
    }
}