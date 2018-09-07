import React,{Component} from "react";
import { Table } from 'reactstrap';

export default class HoverTable extends Component{
//props: config(data,distinct)
    constructor(props){
        super(props)
        this.state ={
            tableLength:0
        }
    }

    componentDidMount(){
        this.setState({
            tableLength:this._getTableLength()
        })
    }

    
    //data 배열의 길이가 가장 긴 것을 기준으로 전체 테이블의 length를 결정한다.
    _getTableLength = ()=>{
        const dataset = this.props.config.data.dataset;
        let length = this.state.tableLength;
        for(let i=0; i<dataset.length; i++){
            let dataArr = dataset[i].data;
            if(dataArr.length>length){
                length = dataArr.length;
            }
        }
        return length;
    }

    createTable = () => {
        let table = []
        const tableLength = this.state.tableLength;
        const dataset = this.props.config.data.dataset;
        // Outer loop to create parent
        for (let i = 0; i < tableLength; i++) {
          let children = []
          //Inner loop to create children
          for (let j = 0; j < dataset.length; j++) {
            children.push(<td>{dataset[j].data[i]}</td>)
          }
          //Create the parent and add the children
          table.push(<tr>{children}</tr>)
        }
        return table
    }

    render(){
        if(this.props.config == null || this.state.tableLength == 0){
            return(<div></div>);
        }
        const data = this.props.config.data;
        return(
            <Table hover>
            <thead>
                {/* {config.th.map((th,i)=><th key={th+i}>{th}</th>)} */}
                {data.dataset.map((item,i)=>{
                    return <th key={i}>{item.dataName}</th>
                })}
            </thead>
            <tbody>
                {this.createTable()}
                {/* {data.dataset.map((tableData,i)=>
                    <tr key={i}>
                        {
                            tableData.data.map((item,j)=>
                                <td key={j}>{item}</td>
                            )
                        }
                    </tr>
                )} */}
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