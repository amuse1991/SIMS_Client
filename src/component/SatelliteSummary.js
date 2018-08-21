import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Button} from 'reactstrap';
//import Taskbar from "../ui/Taskbar";
import {taskStore} from "../mobx/stores/TaskStore";
import TaskModel from '../model/TaskModel';
import { NavLink } from 'react-router-dom';

  
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

    onViewDetailBtnClicked = ()=>{
        //task 추가
        let newTask = new TaskModel('01','testSat','true'); //test code
        taskStore.addTask(newTask);
        taskStore.activateTask(newTask);
    }

    render(){
        const {SatelliteName, ImgSource, LaunchDate, daysOfOperation} = this.props;
        return (
                <Card className='h-100'>
                    <CardImg top width='50%' height="50%" src={ImgSource} alt={SatelliteName} />
                    <CardBody className="text-center">
                        <CardTitle>{SatelliteName}</CardTitle>
                        <CardText>launch date : {LaunchDate}</CardText>
                        <CardText>days of operation : {daysOfOperation}</CardText>
                        <NavLink to={'/detail/'+SatelliteName}><Button onClick={this.onViewDetailBtnClicked}>view detail</Button></NavLink>
                        <Button onClick={this.onViewDetailBtnClicked}>view detail</Button>
                    </CardBody>
                </Card>
        );
    }
}

export default SatelliteSummary;