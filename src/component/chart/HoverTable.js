import React,{Component} from "react";
import { Table } from 'reactstrap';

export default class HoverTable extends Component{
//props: config(th,data,distinct)


    render(){
        const {config} = this.props;
        console.log(config);
        return(
            <Table hover>
            <thead>
            <tr>
                {/* {config.th.map((head,i)=>{
                    return(<th key={i}>{head}</th>);
                })} */}
            </tr>
            </thead>
            <tbody>
            <tr>
                <th scope="row">1</th>
                <td>2018-05-01 15:00:01</td>
                <td>TD-01</td>
                <td>-2.395745</td>
            </tr>
            <tr>
                <th scope="row">2</th>
                <td>2018-05-01 15:00:02</td>
                <td>TD-01</td>
                <td>-2.895745</td>
            </tr>
            <tr>
                <th scope="row">3</th>
                <td>2018-05-01 15:00:03</td>
                <td>TD-02</td>
                <td>-3.128569</td>
            </tr>
            </tbody>
        </Table>
        );
    }

}