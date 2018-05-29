import React,{Component} from 'react';
import {BarChart} from "./chart/bar";
//import {BubbleChart} from "./chart/bubble";
import {HorizontalBarChart} from "./chart/horizontalBar";
import {LineChart} from "./chart/line";
// import Mix from "./chart/mix";
// import Pie from "./chart/mix";
// import Polar from "./chart/polar";
import {RadarChart} from "./chart/radar";
// import Scatter from "./chart/scatter";
import HovTable from "./chart/hovTable";
import {Button} from 'reactstrap';

export class Detail extends Component{
    render(){
    return (
    <div>
        <hr/>
        <h2>Test Satellite 01</h2>
        <Button>X</Button>
        <HovTable/>
        <hr/>
        <BarChart title={'Bar'}/>
        <hr/>
        <LineChart title={'Line'}/>
        <hr/>
        <RadarChart title={'Radar'}/>
        <hr/>
        <HorizontalBarChart title={'Horizontal Bar'}/>
        {
        //<hr/>
        //<BubbleChart title={'Bubble'}/>
        }
    </div>
    );
    }
}