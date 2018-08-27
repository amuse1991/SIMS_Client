import React,{Component} from "react";
import { Table } from 'reactstrap';

export default class HoverTable extends Component{
//props: config(th,data,distinct)


    render(){
        const {config} = this.props;
        console.log(config);
        if(config == null){
            return(<div>loading...</div>)
        }
        return(
            <Table hover>
            <thead>
                {config.th.map((th,i)=><th key={i}>{th}</th>)}
            </thead>
            <tbody>
                {config.data.map((data,i)=>
                    <tr key={i}>
                        {
                            data.map((item,j)=>
                                <td key={j}>{item}</td>
                            )
                        }
                    </tr>
                )}
                {/* {tr.map((e,i)=>
                    <tr key={i}>
                        {
                            config.data.map((data,j)=>
                                <td key={j}>{data}</td>
                            )
                        }
                    </tr>
                )} */}
            {/* <tr>
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
            </tr> */}
            </tbody>
        </Table>
        );
    }

}