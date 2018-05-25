import React, {Component} from 'react';
import { TaskbarItem } from "../component/TaskbarItem"

//lass TSComponent extends React.Component<Props, State>
export default class Taskbar extends Component {
  render(){
    return (
      <div>
        <TaskbarItem/>
      </div>
    );
  }
}