import React,{Component} from 'react';
import {Line} from 'react-chartjs-2';
//import HoverTable from './HoverTable';
import {TablePagination } from "react-pagination-table";

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
                let headers = Object.keys(items['dataset'][0])
                var columns="";
                for(let i=0; i<headers.length; i++){
                    let columnName = headers[i]
                    if(i!==headers.length){
                        columnName = columnName + "."
                    }
                    columns += columnName
                }
                config = {
                    title:items['group'],
                    headers:headers,
                    data:items['dataset'],
                    columns:columns,
                    perPageItemCount:5,
                    partialPageCount:10,
                    totalCount:items['dataset'].length,
                    nextPageText:"Next",
                    prePageText:"Prev"
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

    _makeLineDatasets = ()=>{
        const chartItems = this.props.data;
        const dataset = chartItems.dataset;
        let data = [];
        let resConfig = [];
        for(let idx=0;idx<dataset.length;idx++){
            let item = dataset[idx];
            let config = {
                type:'line',
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
                return <Line data={this.state.config}/>
            case 'table':
                let tableConfig = this.state.config
                return <TablePagination
                //title={tableConfig.title}
                headers={ tableConfig.headers }
                data={ tableConfig.data }
                columns={tableConfig.columns}
                //columns="name.age.size.phone.gender"
                perPageItemCount={ tableConfig.perPageItemCount }
                partialPageCount={ tableConfig.partialPageCount }
                totalCount={ tableConfig.totalCount }
                //arrayOption={ [['size', 'all', ' ']] }
                nextPageText="Next"
                prePageText="Prev"
              />
            case 'text':
                return <div>text</div>
            case 'time':
                return <div></div>
            default :
                return(<div>chart disable</div>)
        }
    }
}