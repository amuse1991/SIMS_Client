import React, { Component } from 'react';
//import { Nav, NavItem, NavLink } from 'reactstrap';

export default class Taskbar extends Component {
  addTask = (taskInfo) =>{
    this.setState((prevState,props)=>{
      return prevState.push(taskInfo)
    });
  }

  removeTask = (satName)=>{

  }

  render() {
    return (
      <div>{/*
        <p>List Based</p>
        <Nav vertical>
          <NavItem>
            <NavLink href="#">Link</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#">Link</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#">Another Link</NavLink>
          </NavItem>
          <NavItem>
            <NavLink disabled href="#">Disabled Link</NavLink>
          </NavItem>
        </Nav>
        <hr />
        <p>Link based</p>
        <Nav vertical>
          <NavLink href="#">Link</NavLink> <NavLink href="#">Link</NavLink> <NavLink href="#">Another Link</NavLink> <NavLink disabled href="#">Disabled Link</NavLink>
        </Nav>
      */}
      </div>
    );
  }
}