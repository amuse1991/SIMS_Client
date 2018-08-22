import React,{Component} from "react";
/*
import {BarChart} from "../chart/bar";
import {HorizontalBarChart} from "../chart/horizontalBar";
import {LineChart} from "../chart/line";
import {RadarChart} from "../chart/radar";
import HovTable from "../chart/hovTable";
*/
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import * as tmApi from "../../services/api/tm";


export class TM extends Component {

    //startDate = null;
    //endDate = null;

    //props:task
    constructor(props){
        super(props);
        this.state ={
            tmData:null,
            selectedTmCode:null,
            selectedtmName:null,
            tmDataLoaded:false
        };
    }

    fetchData = async (event)=>{
        let tmCode = this.state.selectedTmCode;
        let tmData = await tmApi.getData(tmCode);
        await this.setState({
            tmData:tmData,
            tmDataLoaded:true
        })
        console.log(this.state.tmData);
    }

    selectTM = async (event)=>{
        await this.setState({
            selectedTmCode:event.target.id, //button id == tmCode
            selectedtmName:event.target.name
        });
    }

    render(){
        //console.log("tm render called");
        //console.log(this.state.tmData);
        const {task} = this.props;
        return(
            <div>
                <h3>Telematry Data</h3>
                <hr/>
                <h4>Telematry Type : {this.state.selectedtmName}</h4>
                {task.tmList.map((tm)=>
                <Button id={tm.TelemetryCode} name={tm.TelemetryName} onClick={this.selectTM} active={this.state.selectedTM === tm.TelemetryCode}>
                    {tm.TelemetryName}</Button>)}
                <hr/>
                <div>
                    <Form>
                        <FormGroup>
                        {/* <Label for="telemetry type">Telemetry Type</Label>
                        <Input type="select" name="tmType" id="tmType">
                        {task.tmList.map((tm)=><option tmcode={tm.TelemetryCode}>{tm.TelemetryName}</option>)}
                        </Input> */}
                        </FormGroup>
                        <FormGroup>
                            <Label for="startDate">시작일<Input type="date" name="startDate" id="startDate" /></Label>
                            <Label for="endDate">종료일<Input type="date" name="endDate" id="endDate"/></Label>
                        </FormGroup>
                    </Form>
                    <Button onClick={this.fetchData}>검색</Button>
                </div>
                <hr/>
                <div>
                    {
                    /* 
                    //chart sample
                    <HovTable/>
                    <hr/>
                    <BarChart title={'Bar'}/>
                    <hr/>
                    <LineChart title={'Line'}/>
                    <hr/>
                    <RadarChart title={'Radar'}/>
                    <hr/>
                    <HorizontalBarChart title={'Horizontal Bar'}/> */
                    }
                </div>
            </div>
        );
    
    }
}