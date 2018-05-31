import React,{Component} from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import HovTable from "../chart/hovTable";

export class TC extends Component {
    render(){
        return(
            <div>
                <h3>Telecommand Data</h3>
                <hr/>
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
                <hr/>
                <HovTable/>
            </div>
        );
    }
}