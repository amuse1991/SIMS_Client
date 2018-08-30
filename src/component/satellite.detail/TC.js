import React,{Component} from "react";
import { Button } from "reactstrap";
import * as tcApi from "../../services/api/tc";
import ChartIndex from "../chart/ChartIndex"

export class TC extends Component {
    constructor(props){
        super(props);
        this.state ={
            tcData:null,
            selectedTcCode:null,
            selectedtcName:null,
            startDate:null,
            endDate:null,
            tcDataLoaded:false
        };
    }

    fetchData = async (event)=>{
        let {selectedTcCode,startDate,endDate} = this.state;
        let tcData = await tcApi.getData(selectedTcCode,startDate,endDate);
        let chartTypes = await tcApi.getChartType(selectedTcCode);
        this.setState({
            tcData:tcData.data,
            tcChartTypes:chartTypes.data,
            tcDataLoaded:true
        })
    }

    selectTC = (event)=>{
        this.setState({
            selectedTcCode:event.target.id, //button id == tcCode
            selectedTcName:event.target.name
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

    // _extractDataByChartGroup = (data,group)=>{
    //     let result = []
    //     for(let i=0; i<data.chartData.length; i++){
    //         let item = data.chartData[i];
    //         if(item.ChartGroup === group){
    //             result.push(item);
    //         }
    //     }
    //     return result;
    // }

    // _getLabelData = (data,label)=>{
    //     let result;
    //     for(let i=0; i<data.chartData.length; i++){
    //         let item = data.chartData[i];
    //         if(item.DataName === label){
    //             result = item.data;
    //         }
    //     }
    //     return result;
    // }

    render(){
        const {task} = this.props;
        if(this.state.tcDataLoaded === false){
            return (
                <div>
                    <h3>Telecommand Data</h3>
                    <hr/>
                    <h4>Telecommand Type : {this.state.selectedtcName}</h4>
                    {task.tcList.map((tc)=>
                    <Button id={tc.TelecommandCode} name={tc.TelecommandName} onClick={this.selectTC} active={this.state.selectedTC === tc.TelecommandCode}>
                        {tc.TelecommandName}</Button>)}
                    <hr/>
                    <div>
                        {/* <Form>
                            <FormGroup>
                                <Label for="startDate">시작일<Input type="date" name="startDate" id="startDate" onChange={this.setStartDate} /></Label>
                                <Label for="endDate">종료일<Input type="date" name="endDate" id="endDate" onChange={this.setEndDate}/></Label>
                            </FormGroup>
                        </Form> */}
                        <Button onClick={this.fetchData}>검색</Button>
                    </div>
                </div>
            );
        }
        return(
            <div>
                <h3>Telecommand Data</h3>
                <hr/>
                <h4>Telecommand Type : {this.state.selectedtcName}</h4>
                {task.tcList.map((tc)=>
                <Button id={tc.TelecommandCode} name={tc.TelecommandName} onClick={this.selectTC} active={this.state.selectedTC === tc.TelecommandCode}>
                    {tc.TelecommandName}</Button>)}
                <hr/>
                <div>
                    <Button onClick={this.fetchData}>검색</Button>
                </div>
                <hr/>
                <div>
                   {
                        <div id={'chart'}>
                            <ChartIndex chartData={this.state.tcData} chartTypes={this.state.tcChartTypes}/>
                        </div>
                    }
                </div>
            </div>
        );
    
    }
}