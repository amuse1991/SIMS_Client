import React,{Component} from 'react';
import {Line} from 'react-chartjs-2';
import HoverTable from './HoverTable';

const dataColor = [
    'rgba(102, 0, 102,1)',
    'rgba(255,0,102,1)',
    'rgba(0,204,102,1)',
    'rgba(128, 159, 255,1)'
]
export default class RTDChart extends Component{
    //props : chartData, chartTypes
    constructor(props){
        super(props);
        this.state ={
            chartGroups:[],
            datasets:[]
        }
    }

    componentDidMount(){
        
        
    }

    shouldComponentUpdate(){
        let data = this._joinData();
    }

    _initChart = ()=>{
        let chartGroups = this._getChartGroup(); //차트 그룹 추출
    }

    //데이터를 표시할 수 있도록 타입과 데이터를 조인한다.
    _joinData = ()=>{
        let chartData = this.props.chartData;
        let chartTypes = this.props.chartTypes.data;
        
        //join 시키는 작업
        let result = chartTypes.map((chartType)=>{
            let dataName = chartType.DataName;
            return chartType.data = chartData[dataName];
        })
        return result;
    }

    _getChartGroup = ()=>{
        let chartGroups = this.props.chartTypes.data.filter(typeData=>{
            let group = typeData.ChartGroup;
            return this.state.chartGroups.find(group) == undefined
        })
        return chartGroups;
    }

    makeConfig = (type)=>{
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
            case 'time':
                config = null;
            default:
                config = null;
        }
        return config;
    }

    render(){
        return(<div>{this.props.chartData}</div>);
    }

}