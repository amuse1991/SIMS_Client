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
    //props : data:Object, labels:[]
    constructor(props){
        super(props)
        this.state={
            type:null,
            config:null,
            readyToRender:false
        }
    }

    componentDidMount(){
        const {data} = this.props;
        let config = this._makeConfig(data.type);
        this.setState({
            type:data.type,
            config:config,
            readyToRender:true
        });
    }

    componentWillReceiveProps(nextProps){
        const {data} = this.props;
        let config = this._makeConfig(data.type);
        this.setState({
            type:data.type,
            config:config,
            readyToRender:true
        });
    }

    _makeConfig = (type)=>{
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

    
    // _addConfigData = (data,labels)=>{
    //     let type = data.type;
    //     let currentConfig = this.state.config;
    //     switch(type){
    //         case 'line':
    //             currentConfig.labels = labels;
    //             currentConfig.datasets.map(data=>{

    //             })
    //             break;
    //         default : 
    //             break;
    //     }
    // }

    _makeLineDatasets = ()=>{
        const chartItems = this.props.data;
        const dataset = chartItems.dataset;
        let data = [];
        let resConfig = [];
        for(let idx=0;idx<dataset.length;idx++){
            let item = dataset[idx];
            let config = {
                label: item.dataName,
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
                data: data.concat(item.data)
            }
            resConfig.push(config);
        }
        return resConfig;
    }


    render(){
        switch(this.state.type){
            case 'line':
                //return(<div></div>)
                return <Line data={this.state.config}/>
            case 'table':
                //return(<div></div>)
                return <HoverTable config={this.state.config}/>
            case 'text':
                return <div>text</div>
            case 'time':
                return <div></div>
            default :
                return(<div>chart disable</div>)
        }
    }
}