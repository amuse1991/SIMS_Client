import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Button} from 'reactstrap';
//import Taskbar from "../ui/Taskbar";
import {taskStore} from "../mobx/stores/TaskStore";
import TaskModel from '../model/TaskModel';
import * as satApi from "../services/api/satellite";
import * as rtdApi from "../services/api/rtd";
import { withRouter } from 'react-router-dom';

  
class SatelliteSummary extends Component{
    
    static propTypes = {
        SatelliteCode: PropTypes.string,
        SatelliteName: PropTypes.string,
        ImgSource: PropTypes.string,
        LaunchDate: PropTypes.string,
        daysOfOperation : PropTypes.string
    }

    static defaultProps = {
        SatelliteCode: null,
        SatelliteName: "No name",
        ImgSource: "",
        LaunchDate: "No data",
        daysOfOperation : "No data"
    }

    onViewDetailBtnClicked = async ()=>{
        //task 추가
        const {SatelliteCode, SatelliteName} = this.props;
        let tmList = await satApi.getTMmetaListBySatCode(SatelliteCode);
        let tcList = await satApi.getTCmetaListBySatCode(SatelliteCode);
        let rtdTmTypes = await rtdApi.getTMlistBySatCode(SatelliteCode);
        let rtdTcTypes = await rtdApi.getTClistBySatCode(SatelliteCode);
        let newTask = new TaskModel(SatelliteCode,SatelliteName,tmList.data,tcList.data,rtdTmTypes.data,rtdTcTypes.data,'GTD');
        taskStore.addTask(newTask);
        taskStore.activateTask(newTask);
        this.props.history.push(`/detail/${SatelliteName}`);
    }

    render(){
        const {SatelliteName, ImgSource, LaunchDate, daysOfOperation} = this.props;
        return (
                <Card className='h-100'>
                    <CardImg top width='50%' height="50%" src={window.location.origin+ImgSource} alt={SatelliteName} />
                    <CardBody className="text-center">
                        <CardTitle>{SatelliteName}</CardTitle>
                        <CardText>launch date : {LaunchDate}</CardText>
                        <CardText>days of operation : {daysOfOperation}</CardText>
                        <Button onClick={this.onViewDetailBtnClicked}>view detail</Button>
                    </CardBody>
                </Card>
        );
    }
}

export default withRouter(SatelliteSummary);