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
            readyToRender:false,
            chartGroup:null
        }
    }

    componentDidMount(){
        const {chartData, chartTypes} = this.props;
        let chartItems = this._makeChartData(chartData,chartTypes);
        let labels = this._getLabelData(chartItems);
        
        this.setState({
            chartItems:chartItems,
            labels:labels,
            readyToRender:true
        });
    }
    
    // [{group:string, type:stirng, data:[{dataName:string, data:{}}]}] 형태로 만듬
    _makeChartData = (dataset,chartTypes) => {
        let chartGroups = this._getChartGroup(chartTypes);
        let result = [];
        for(let i=0; i<chartGroups.length; i++){
            let group = chartGroups[i];
            //chartTypes객체에서 그룹에 해당하는 것들을 추려냄
            let groupDataTypes = chartTypes.filter((typeInfo)=>{
                return typeInfo.ChartGroup === group;
            })
            //type정보의 DataName 필드를 이용해 해당하는 정보를 찾아냄
            let resultDataset=[];
            for(let j=0; j<groupDataTypes.length; j++){
                // let selectedData = dataset.filter((data)=>{
                //     return Object.keys(data) === data
                // });
                let dataName = groupDataTypes[j]['DataName'];
                let dataObj = {dataName:dataName, data:null}
                //let selectedData = []
                let data = dataset.map((item)=>{
                    return item[dataName]
                });
                dataObj.data = data;
                resultDataset.push(dataObj);
            }
            //그룹의 type을 검색
            let type = this._getGroupChartType(group,chartTypes);
            result.push({group:group,type:type,dataset:resultDataset});
        }
        return result;
    }

    _getChartGroup = (chartTypes)=>{
        //차트그룹 생성
        let chartGroup = [];
        let currentGroup;
        for(let i=0; i<chartTypes.length; i++){
            let item = chartTypes[i];
            if(item.ChartGroup === currentGroup){
                continue;
            }
            else{
                chartGroup.push(item.ChartGroup);
                currentGroup = item.ChartGroup;
            }
        }
        return chartGroup;
    }

    _getGroupChartType = (group,chartTypes)=>{
        let type =chartTypes.find((typeInfo)=>{
            return typeInfo.ChartGroup === group;
        });

        return type.ChartType;
    }

    _getLabelData = (dataset)=>{
        let labelData = dataset.find((data)=>{
            return data.group === 'label'
        })
        if(labelData == undefined){
            return null;
        }
        return labelData.dataset[0].data;
    }

    render(){
        //데이터 아직 받아오지 않은 경우
        if(this.state.readyToRender === false) return(<div>loading..</div>);
        //데이터 수신 완료된 경우
        let chartItems = this.state.chartItems;
        //let data=[];
        return(
            chartItems.map((chartItem,idx)=>{
                //data[idx] = chartItems.chartData.filter(data=>data.ChartGroup === group)
                switch(chartItem.type){
                    case 'table' :
                        return(
                            <div>
                                <h4>{chartItem.group}</h4>
                                {/* <Chart data={this.props.chartData} labes={this.state.labels} isTable={true}/> */}
                                <Chart data={chartItem} labels={this.state.labels}/>
                            </div>
                        )
                    case 'line' :
                        return(
                            <div>
                                <h4>{chartItem.group}</h4>
                                <Chart data={chartItem} labels={this.state.labels}/>
                            </div>
                        )
                    default : 
                        return <div></div>
                }
                // if(chartItem.type==="table"){
                //     return(
                //         <div>
                //             <h4>{chartItem.group}</h4>
                //             {/* <Chart data={this.props.chartData} labes={this.state.labels} isTable={true}/> */}
                //             <chart data={chartItem}/>
                //         </div>
                //     )
                // }else{
                //     return(
                //         <div>
                //             <h4>{group}</h4>
                //             <Chart data={data[idx]} labels={this.state.labels} isTable={false}/>
                //         </div>
                //     )
                // }
            })
        )
    }
}