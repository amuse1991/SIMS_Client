import React,{Component} from 'react';
import Chart from "./Chart";

export default class RTDChart extends Component{
    //props : chartData, chartTypes
    constructor(props){
        super(props);
        this.state ={
            chartItems:null, //[{group:string, type:stirng, data:[{dataName:string, data:{}}]}]
            isLoaded:false
        }
    }

    
    _checkGroupExisit = ()=>{
        return this.state.chartItems!==null?true:false;
    }

    _makeGroup = async (data)=>{
        await this.setState({
            chartItems:data,
            isLoaded:true
        });
    }

    _addDataToGroup = async (data)=>{
        const chartItems = this.state.chartItems;
        let isNewData = true;
        chartItems.map(group=>{
            let selectedData = data.find(item=>{
                return item.group === group.group;
            })
            //데이터 중복 검사
            if(group.dataset.find(i=>i.data===selectedData.dataset[0].data)!==undefined){
                isNewData = false;
            }
            if(isNewData){
                group.dataset = group.dataset.concat(selectedData.dataset);
            }
        })
        if(isNewData){
            await this.setState({
                chartItems:chartItems,
                isLoaded:true
            })
        }
        console.log(this.state);
    }

    componentDidMount(){
        console.log(this.props);
        const data = this.props.data
        let isGroupExisit = this._checkGroupExisit(data);
        if(isGroupExisit === false){
            this._makeGroup(data);
        }else{
            this._addDataToGroup(data);
        }
    }

    componentWillReceiveProps(nextProps){
        const data = nextProps.data
        let isGroupExisit = this._checkGroupExisit(data);
        if(isGroupExisit === false){
            this._makeGroup(data);
        }else{
            this._addDataToGroup(data);
       }
    }


    render(){
        if(this.state.isLoaded === false){
            return(<div></div>)
        }
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