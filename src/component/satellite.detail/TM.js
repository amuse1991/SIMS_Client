import React,{Component} from "react";
import {BarChart} from "../chart/bar";
import {HorizontalBarChart} from "../chart/horizontalBar";
import {LineChart} from "../chart/line";
import {RadarChart} from "../chart/radar";
import HovTable from "../chart/hovTable";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

export class TM extends Component {
    render(){
        return(
            <div>
                <h3>Telematry Data</h3>
                <hr/>
                <div>
                <Form>
                    <FormGroup>
                    <Label for="exampleEmail"><h4>검색</h4></Label>
                    <Input type="text" name="search" id="search" />
                    </FormGroup>
                    <div className="text-right">
                        <Button>검색</Button>
                        <Button>상세검색</Button>
                    </div>
                </Form>
                </div>
                <hr/>
                <div>
                    <HovTable/>
                    <hr/>
                    <BarChart title={'Bar'}/>
                    <hr/>
                    <LineChart title={'Line'}/>
                    <hr/>
                    <RadarChart title={'Radar'}/>
                    <hr/>
                    <HorizontalBarChart title={'Horizontal Bar'}/>
                </div>
            </div>
        );
    }
}