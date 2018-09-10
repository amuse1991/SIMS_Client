import React,{Component} from 'react';
import Chart from './Chart';
import RTDChart from "./RTDChart";


export default class ChartIndex extends Component{
    //props:chartData, chartTypes, isRTD
    constructor(props)
    {   
        super(props);
        this.state = {
            chartItems:null,
            labels:null,
            readyToRender:false,
            chartGroup:null,
            RTDItem:null
        }
    }

    componentDidMount(){
        const {chartData, chartTypes, isRTD} = this.props;
        /*componentDidmount때 RTD는 데이터가 undifined이다(아직 connect 안했으므로)
        따라서 RTD가 아닐때만 componentDidmount에서 데이터 처리 작업을 한다.
        */
        if(isRTD === false){ 
            let chartItems = this._makeChartData(chartData,chartTypes);
            let labels = this._getLabelData(chartItems);
            this.setState({
                chartItems:chartItems,
                labels:labels,
                readyToRender:true
            });
        }
    }

    
    componentWillReceiveProps(nextProps){
        //RTD 데이터 처리를 위함
        if(nextProps.isRTD === true && this.props.chartData !== undefined){
            let RTDItem = this._makeChartData(nextProps.chartData,this.props.chartTypes);
            let label = this._getLabelData(RTDItem);
            this.setState({
                RTDItem:RTDItem,
                labels:label,
                readyToRender:true
            })
        }
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
                let dataName = groupDataTypes[j]['DataName'];
                //데이터 객체를 생성
                let dataObj = {dataName:dataName}
                let data = []
                if(this.props.isRTD === true){ //RTD(single data)인 경우
                    data.push(dataset[dataName]);
                }else{ //archived data(batch data)인 경우
                    data = dataset.map((item)=>{
                        return item[dataName]
                    });
                }
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
        chartTypes.map(type=>{
            //매칭되는 그룹이 있는지 찾는다. 만약 매칭되는 그룹이 있는 경우 중복된 그룹이다.
            let matchGroup=chartGroup.find(group=>{return type.ChartGroup === group}) 
            //중복되는 그룹이 없는 경우에만 새로운 그룹을 생성한다.
            if(matchGroup===undefined){
                chartGroup.push(type.ChartGroup);
            }
        })
        return chartGroup;
        // let currentGroup;
        // for(let i=0; i<chartTypes.length; i++){
        //     let item = chartTypes[i];
        //     if(item.ChartGroup === currentGroup){
        //         continue;
        //     }
        //     else{
        //         chartGroup.push(item.ChartGroup);
        //         currentGroup = item.ChartGroup;
        //     }
        // }
        // return chartGroup;
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
        if(this.state.readyToRender === false){
            if(this.props.isRTD === true) return(<div></div>);
            else return(<div>loading..</div>);
        }
        //RTD(single data)가 수신된 경우
        if(this.state.readyToRender === true && this.props.isRTD === true){
            return <RTDChart data={this.state.RTDItem} label={this.state.labels}/>
        }
        //archived data(batch data)가 수신된 경우
        let chartItems = this.state.chartItems;
        return(
            chartItems.map((chartItem,idx)=>{
                switch(chartItem.type){
                    case 'table' :
                        return(
                            <div>
                                <h4>{chartItem.group}</h4>
                                <Chart key={idx} data={chartItem} labels={this.state.labels}/>
                            </div>
                        )
                    case 'line' :
                        return(
                            <div>
                                <h4>{chartItem.group}</h4>
                                <Chart key={idx} data={chartItem} labels={this.state.labels}/>
                            </div>
                        )
                    default : 
                        return <div></div>
                }
            })
        )
    }
}