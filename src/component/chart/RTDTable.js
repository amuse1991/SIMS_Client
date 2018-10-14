import React,{Component} from "react";
import { Table } from 'reactstrap';
import {TablePagination } from "react-pagination-table";

export default class RTDTable extends Component{
    constructor(props){
        super(props)
        this.state ={
            tableLength:0
        }
    }

    componentDidMount(){
        console.log("test")
    }

    componentWillReceiveProps(nextProps){
        console.log("test")
    }

    render(){
        
    //     return (<TablePagination
    //     //title={tableConfig.title}
    //     headers={ tableConfig.headers }
    //     data={ tableConfig.data }
    //     columns={tableConfig.columns}
    //     //columns="name.age.size.phone.gender"
    //     perPageItemCount={ tableConfig.perPageItemCount }
    //     partialPageCount={ tableConfig.partialPageCount }
    //     totalCount={ tableConfig.totalCount }
    //     arrayOption={ [['size', 'all', ' ']] }
    //     nextPageText="Next"
    //     prePageText="Prev"
    //   />)
    return(<div></div>)
    }

}