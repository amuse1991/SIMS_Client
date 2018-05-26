import React, { Component } from 'react';
import { Nav,NavItem,NavLink } from "reactstrap";
import { observer } from "mobx-react";

@observer
export class TaskbarItem extends Component {
  
    render(){
      const {store} = this.props;
      console.log(store)
      console.log(store.tasks);
        return(
            <div>
              {
                store.tasks.map((task,i)=>{
                  console.log(task.satlliteName)
                  return <p key={i}> {task.satelliteName} </p>
                })
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