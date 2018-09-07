import React,{Component} from 'react';
import Chart from "./Chart";

export default class RTDChart extends Component{
    //props : chartData, chartTypes
    constructor(props){
        super(props);
        this.state ={
            chartItems:[], //[{group:string, type:stirng, data:[{dataName:string, data:{}}]}]
            isLoaded:false,
            labels:[]
        }
    }

    
    _checkGroupExisit = ()=>{
        return this.state.chartItems.length!==0?true:false;
    }

    _makeGroup = async (data)=>{
        await this.setState({
            chartItems:this.state.chartItems.concat(data),
            isLoaded:true,
            labels:this.state.labels.concat(this.props.label) //[...this.state.labels,this.props.label]
        });
    }

    _addDataToGroup = async (data)=>{
        const chartItems = this.state.chartItems;
        //let isNewData = true;
        chartItems.map(group=>{
            let selectedData = data.find(item=>{
                return item.group === group.group;
            })
            //데이터 중복 검사
            // if(group.dataset.find(i=>i.data===selectedData.dataset[0].data)!==undefined){
            //     isNewData = false;
            // }
            // if(isNewData){
            //     group.dataset = group.dataset.concat(selectedData.dataset);
            // }
            group.dataset[0].data = group.dataset[0].data.concat(selectedData.dataset[0].data);
        })
        // if(isNewData){
        //     await this.setState(prevState=>({
        //         chartItems:chartItems,
        //         isLoaded:true,
        //         labels:[...prevState.labels, this.props.label]//[...this.state.labels,this.props.label]
        //     }))
        // }
        await this.setState(prevState=>({
            chartItems:chartItems,
            isLoaded:true,
            labels:[...prevState.labels, this.props.label]//[...this.state.labels,this.props.label]
        }))
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