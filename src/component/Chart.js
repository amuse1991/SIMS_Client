import React,{Component} from 'react';
import {Line} from 'react-chartjs-2';
import { Table } from 'reactstrap';
//import HovTable from "../chart/hovTable";

export default class Chart extends Component{
    //props:chartItems, chrtGroup, label
    constructor(props)
    {   
        super(props);
        this.state = {
            type:this.props.chartItems[0].ChartType,
            config:null
        }
    }

    componentWillMount(){
        this.setState({
            config:this.makeConfig()
        });
    }

    makeConfig = ()=>{
        console.log("config called")
        console.log(this.props.chartItems);
        //let datasets = _makeDatasets()
        let config = {
            type:this.state.types,
            labels: this.props.label,//time
            datasets: [
                {
                    label: 'My First dataset',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: this.props.chartItems[0].data
                }
            ]
        }
        return config;
    }

    // _makeDatasets = ()=>{
    //     const {chartItems} = this.props;
    //     let datasets = [];
    //     for(let idx=0;idx<chartItems.length;idx++){
    //         let dataset = {

    //         }
    //     }
    // }

    render(){
        const type = this.state.type
        if(type === 'line'){
            return(
                <div><Line data={this.state.config}/></div>
            );
        }else if(type === 'table'){
            return(
                <div><Table/></div>
            );
        }
        return (
            <div></div>
        )
    }
}