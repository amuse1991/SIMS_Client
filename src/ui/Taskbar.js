import React, {Component} from 'react';
import { TaskbarItem } from "../component/TaskbarItem"
import { taskStore } from "../mobx/stores/TaskStore"
import UserProfile from '../component/UserProfile'

//lass TSComponent extends React.Component<Props, State>
export default class Taskbar extends Component {
  render(){
    return (
      <div>
        <UserProfile/>
        <TaskbarItem store={taskStore}/>
      </div>
    );
  }
}