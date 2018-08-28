import React,{Component} from 'react';
import {Line} from 'react-chartjs-2';
import HoverTable from './HoverTable';

const dataColor = [
    'rgba(102, 0, 102,1)',
    'rgba(255,0,102,1)',
    'rgba(0,204,102,1)',
    'rgba(128, 159, 255,1)'
]
export default class Chart extends Component{
    constructor(props){
        super(props)
        const {data,isTable} = this.props;
        let type; isTable?type='table':data[0].ChartType;
        this.state={
            type:type,
            config:null,
            readyToRender:false
        }
        console.log(this.props)
    }

    componentDidMount(){
        this.setState({
            config:this.makeConfig(),
            readyToRender:true
        });
    }

    makeConfig = ()=>{
        const type = this.state.type;
        const items = this.props.data;
        let config;
        switch(type){
            case 'line':
            let dataset = this._makeLineDatasets()
            config = {
                type:this.state.types,
                labels: this.props.labels,//time
                datasets: dataset
            }
            break;
            case 'table':
                config = {
                    th: Object.keys(items[0]),
                    data:items,
                    distinct:true
                }
                break;
            case 'text':
                config = {data:items}
            default:
                config = null;
        }
        return config;
    }

    _makeLineDatasets = ()=>{
        const chartItems = this.state.chartItems;
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
        switch(this.state.type){
            case 'line':
                return <Line data={this.state.config}/>
            case 'table':
                return <HoverTable config={this.state.config}/>
            case 'text':
                return <div>{this.state.config.data}</div>
            default :
                return(<div>loading...</div>)
        }
    }
}