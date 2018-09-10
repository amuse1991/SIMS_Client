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
import ChartIndex from "../chart/ChartIndex"
//import { getAllOrbitData } from "../../services/api/gtd";

export class TM extends Component {
    //props:task
    constructor(props){
        super(props);
        this.state ={
            tmData:null,
            selectedTmCode:null,
            selectedTmName:null,
            startDate:null,
            endDate:null,
            tmDataLoaded:false
        };
    }

    fetchData = async (event)=>{
        let {selectedTmCode,startDate,endDate} = this.state;
        let tmData = await tmApi.getData(selectedTmCode,startDate,endDate);
        let chartTypes = await tmApi.getChartType(selectedTmCode);
        await this.setState({
            tmData:tmData.data,
            tmChartTypes:chartTypes.data,
            tmDataLoaded:true
        })
    }

    selectTM = (event)=>{
        this.setState({
            selectedTmCode:event.target.id, //button id == tmCode
            selectedTmName:event.target.name
        });
    }

    setStartDate = (event)=>{
        this.setState({
            startDate:event.target.value
        })
    }

    setEndDate = (event)=>{
        this.setState({
            endDate:event.target.value
        })
    }

    render(){
        const {task} = this.props;
        //const tmData = this.state.tmData;
        if(this.state.tmDataLoaded === false){
            return (
                <div>
                    <h3>Telematry Data</h3>
                    <hr/>
                    <h4>Telematry Type : {this.state.selectedTmName}</h4>
                    {task.tmList.map((tm)=>
                    <Button id={tm.TelemetryCode} name={tm.TelemetryName} onClick={this.selectTM} active={this.state.selectedTM === tm.TelemetryCode}>
                        {tm.TelemetryName}</Button>)}
                    <hr/>
                    <div>
                        <Form>
                            <FormGroup>
                                <Label for="startDate">시작일<Input type="date" name="startDate" id="startDate" onChange={this.setStartDate} /></Label>
                                <Label for="endDate">종료일<Input type="date" name="endDate" id="endDate" onChange={this.setEndDate}/></Label>
                            </FormGroup>
                        </Form>
                        <Button onClick={this.fetchData}>검색</Button>
                    </div>
                </div>
            );
        }
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
                            <Label for="startDate">시작일<Input type="date" name="startDate" id="startDate" onChange={this.setStartDate} /></Label>
                            <Label for="endDate">종료일<Input type="date" name="endDate" id="endDate" onChange={this.setEndDate}/></Label>
                        </FormGroup>
                    </Form>
                    <Button onClick={this.fetchData}>검색</Button>
                </div>
                <hr/>
                <div>
                   {
                        <div id={'chart'}>
                            <ChartIndex chartData={this.state.tmData} chartTypes={this.state.tmChartTypes} isRTD={false}/>
                        </div>
                    }
                </div>
            </div>
        );
    
    }
}