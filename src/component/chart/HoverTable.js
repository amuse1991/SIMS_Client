import React,{Component} from "react";
import { Table } from 'reactstrap';

export default class HoverTable extends Component{
//props: config(data,distinct)

    render(){
        if(this.props.config == null){
            return(<div>"error"</div>);
        }
        const data = this.props.config.data;
        return(
            <Table hover>
            <thead>
                {/* {config.th.map((th,i)=><th key={th+i}>{th}</th>)} */}
                {data.dataset.map((data,i)=>{
                    <th key={i}>{data.dataName}</th>
                })}
            </thead>
            <tbody>
                {data.dataset.map((tableData,i)=>
                    <tr key={i}>
                        {
                            tableData.data.map((item,j)=>
                                <td key={j}>{item}</td>
                            )
                        }
                    </tr>
                )}
                {/* {config.data.map((data,i)=>
                    <tr key={i}>
                        {
                            Object.values(data).map((item,j)=>
                                <td key={j}>{item}</td>
                            )
                        }
                    </tr>
                )} */}
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