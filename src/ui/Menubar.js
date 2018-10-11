import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';
import { Link }  from 'react-router-dom';
    
export default class Menubar extends Component {
    
    constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
    render(){
        return (
            <div>
              <Navbar color="light" light expand="md">
                <NavbarBrand>SIMS</NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                  <Nav className="ml-auto" navbar>
                    <NavItem> 
                      <Link to="/dashboard"><NavLink>Dashboard</NavLink></Link>
                    </NavItem>
                    <UncontrolledDropdown nav inNavbar>
                      <DropdownToggle nav caret>
                        Satellite
                      </DropdownToggle>
                      <DropdownMenu right>
                        <DropdownItem>
                          task1
                        </DropdownItem>
                        <DropdownItem>
                          task2
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                    <UncontrolledDropdown nav inNavbar>
                      <DropdownToggle nav caret>
                        ETC
                      </DropdownToggle>
                      <DropdownMenu right>
                        {/* <DropdownItem>
                          Edit Profile
                        </DropdownItem> */}
                        <DropdownItem>
                          Settings
                        </DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem>
                          <Link to="/">Logout</Link>
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                    <NavItem>
                      <Link to="/help"><NavLink>HELP</NavLink></Link>
                    </NavItem>
                  </Nav>
                </Collapse>
              </Navbar>
            </div>
          );
    }
}