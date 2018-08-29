import React,{Component} from 'react';
import Chart from './Chart';


export default class ChartIndex extends Component{
    //props:chartData, chartTypes
    constructor(props)
    {   
        super(props);
        this.state = {
            chartItems:null,
            labels:null,
            readyToRender:false
        }
    }

    componentDidMount(){
        const {chartData, chartTypes} = this.props;
        let chartItems = this._makeChartData(chartData,chartTypes);
        // let chartGroup=[];
        // for(let i=0; i<chartItems.chartGroup.length; i++){
        //     let group = chartItems.chartGroup[i];
        //     chartGroup.push(this._extractDataByChartGroup(chartItems,group));
        // }
        let labels = this._getLabelData(chartItems,'Time');
        
        this.setState({
            chartItems:chartItems,
            labels:labels,
            readyToRender:true
        });
    }
    
    _makeChartData = (data,chartTypes) => {
        let res = {chartGroup:[], chartData:[]};
        chartTypes.sort((a,b)=>{
            let groupA = a.ChartGroup.toUpperCase();
            let groupB = b.ChartGroup.toUpperCase();
            if (groupA < groupB) {
                return 1;
            }
            if (groupA > groupB) {
                return -1;
            }
            //같을 경우
            return 0;
        })

        //차트그룹 생성
        let currentGroup;
        for(let i=0; i<chartTypes.length; i++){
            let item = chartTypes[i];
            if(item.ChartGroup === currentGroup){
                continue;
            }
            else{
                res.chartGroup.push(item.ChartGroup);
                currentGroup = item.ChartGroup;
            }
        }
        //차트 데이터 생성
        for(let i=0; i<chartTypes.length; i++){
            let item = chartTypes[i];
            let chartData = [];
            let name = item.DataName;
            for(let j=0; j<data.length;j++){
                chartData.push(data[j][name]);
            }
            item.data = chartData;
            res.chartData.push(item);
        }
        return res;
    }

    // _extractDataByChartGroup = (data,group)=>{
    //     let result = []
    //     for(let i=0; i<data.chartData.length; i++){
    //         let item = data.chartData[i];
    //         if(item.ChartGroup === group){
    //             result.push(item);
    //         }
    //     }
    //     return result;
    // }

    _getLabelData = (data,label)=>{
        let result;
        for(let i=0; i<data.chartData.length; i++){
            let item = data.chartData[i];
            if(item.DataName === label){
                result = item.data;
            }
        }
        return result;
    }

    render(){
        //데이터 아직 받아오지 않은 경우
        if(this.state.readyToRender === false) return(<div>loading..</div>);
        //데이터 수신 완료된 경우
        let chartItems = this.state.chartItems;
        let data=[];
        return(
            chartItems.chartGroup.map((group,idx)=>{
                data[idx] = chartItems.chartData.filter(data=>data.ChartGroup === group)
                if(data[idx][0].ChartType==="table"){
                    return(
                        <div>
                            <h4>{group}</h4>
                            <Chart data={this.props.chartData} labes={this.state.labels} isTable={true}/>
                        </div>
                    )
                }else{
                    return(
                        <div>
                            <h4>{group}</h4>
                            <Chart data={data[idx]} labels={this.state.labels} isTable={false}/>
                        </div>
                    )
                }
            })
        )
    }
}