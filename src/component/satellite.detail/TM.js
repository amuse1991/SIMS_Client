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
import Chart from "../Chart"
//import { getAllOrbitData } from "../../services/api/gtd";

export class TM extends Component {
    //props:task
    constructor(props){
        super(props);
        this.state ={
            tmData:null,
            selectedTmCode:null,
            selectedtmName:null,
            startDate:null,
            endDate:null,
            tmDataLoaded:false
        };
    }

    fetchData = async (event)=>{
        let {selectedTmCode,startDate,endDate} = this.state;
        let tmData = await tmApi.getDataForCharting(selectedTmCode,startDate,endDate);
        await this.setState({
            tmData:tmData.data,
            tmDataLoaded:true
        })
    }

    selectTM = async (event)=>{
        await this.setState({
            selectedTmCode:event.target.id, //button id == tmCode
            selectedtmName:event.target.name
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

    // makeChart = ()=>{
    //     let hello= <p>hello</p>
    //     return hello
    // }
    _extractDataByChartGroup = (data,group)=>{
        let result = []
        for(let i=0; i<data.chartData.length; i++){
            let item = data.chartData[i];
            if(item.ChartGroup === group){
                result.push(item);
            }
        }
        return result;
    }

    render(){
        const {task} = this.props;
        const tmData = this.state.tmData;
        if(this.state.tmDataLoaded === false){
            return (
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
                    tmData.chartGroup.map((group,i)=>{
                        let items = this._extractDataByChartGroup(tmData,group);
                        return (
                            <div id={group}>
                                <h5>{group}</h5>
                                <Chart key={i} chartItems={items} chartGroup={group}/>
                            </div>
                        );
                    })
                   }
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