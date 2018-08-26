import React, { Component } from 'react';
import { Nav,NavItem } from "reactstrap";
import { observer } from "mobx-react";
import  TaskItem  from "./TaskItem"

@observer
export class TaskbarItem extends Component {
  render(){
    const {store} = this.props;
      return(
        <div>
          <Nav vertical>
            {
              store.tasks.map((task,i)=>{
                return (
                  <NavItem>
                    <TaskItem key={i} satelliteName={task.satelliteName} taskId={task.taskId}/>
                  </NavItem>
                  );
              })
            }
          </Nav>
        </div>
      );
  }
}