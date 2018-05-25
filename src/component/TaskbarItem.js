import React, { Component } from 'react';
import { Nav,NavItem,NavLink } from "reactstrap";
//import TaskStore from "../mobx/stores/TaskStore";
import { observer } from "mobx-react";

//const taskState = new TaskStore();

@observer
export class TaskbarItem extends Component {
  
    render(){
        return(
            <div>
              {
                //taskes.map((task,i)=> <p key={i}>{...task}</p>)
              }
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
            </div>
        );
    }
}