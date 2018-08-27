import React,{Component} from 'react';
import {Line} from 'react-chartjs-2';
import HoverTable from './chart/HoverTable';

const dataColor = [
    'rgba(102, 0, 102,1)',
    'rgba(255,0,102,1)',
    'rgba(0,204,102,1)',
    'rgba(128, 159, 255,1)'
]

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

    componentDidMount(){
        this.setState({
            config:this.makeConfig()
        });
    }

    makeConfig = ()=>{
        const type = this.state.type;
        const items = this.props.chartItems;
        let config;
        switch(type){
            case 'line':
            config = {
                type:this.state.types,
                labels: this.props.label,//time
                datasets: this._makeLineDatasets()
            }
            break;
            case 'table':
                let th = [];
                let td = [];
                //get th
                for(let i=0; i<items.length; i++){
                    th.push(items[i].DataName);
                    td.push(items[i].data)
                }
                //get number of rows
                let numOfRows = td[0].length;
                config = {
                    th:th,
                    data:td,
                    numOfRows:numOfRows,
                    distinct:true
                }
                break;
            default:
                config = null;
        }
        
        return config;
    }

    _makeLineDatasets = ()=>{
        const {chartItems} = this.props;
        let datasets = [];
        for(let idx=0;idx<chartItems.length;idx++){
            let item = chartItems[idx];
            let dataset = {
                label: item.DataName,
                fill: false,
                lineTension: 0.1,
                backgroundColor: dataColor[idx],
                borderColor: dataColor[idx],
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: dataColor[idx],
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: dataColor[idx],
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: item.data
            }
            datasets.push(dataset);
        }
        return datasets;
    }

    render(){
        const type = this.state.type
        if(type === 'line'){
            return(
                <div><Line data={this.state.config}/></div>
            );
        }else if(type === 'table'){
            return(
                <div><HoverTable config={this.state.config}/></div>
            );
        }
        return (
            <div></div>
        )
    }
}