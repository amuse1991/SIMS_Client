import React,{Component} from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import * as tcApi from "../../services/api/tc";
import Chart from "../Chart"

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
        let tcData = await tcApi.getDataForCharting(selectedTcCode,startDate,endDate);
        await this.setState({
            tcData:tcData.data,
            tcDataLoaded:true
        })
    }

    selectTC = async (event)=>{
        await this.setState({
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

    render(){
        const {task} = this.props;
        const tcData = this.state.tcData;
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
                    tcData.chartGroup.map((group,i)=>{
                        let items = this._extractDataByChartGroup(tcData,group);
                        let label = this._getLabelData(tcData,'Time');
                        return (
                            <div id={group}>
                                <h5>{group}</h5>
                                <Chart key={i} chartItems={items} chartGroup={group} label={label}/>
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