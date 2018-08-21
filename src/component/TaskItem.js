import React, { Component } from 'react';
import { ButtonGroup, Button } from "reactstrap";
import { taskStore } from '../mobx/stores/TaskStore';
import { withRouter } from 'react-router-dom';

class TaskItem extends Component{
    //props : satelliteName, taskId

    activate = ()=>{
        taskStore.replaceTask(this.props.taskId);
    }

    deactivate = async ()=>{
        let nextTask = await taskStore.deactivateTask(this.props.taskId);
        if(nextTask == null){
            this.props.history.push('/dashboard');
        }else{
            taskStore.activateTask(nextTask);
        }
    }

    render(){
        return(
            <ButtonGroup  className='w-100'>
                <Button onClick={this.activate}>{this.props.satelliteName}</Button>
                <Button onClick={this.deactivate}>X</Button>
            </ButtonGroup>
        );
    }
}

export default withRouter(TaskItem);