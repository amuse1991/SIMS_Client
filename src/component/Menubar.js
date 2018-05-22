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
                <NavbarBrand href="/">SIMS</NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                  <Nav className="ml-auto" navbar>
                    <NavItem>
                      <NavLink href="/components/">HOME</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="">CAST</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="">HELP</NavLink>
                    </NavItem>
                    <UncontrolledDropdown nav inNavbar>
                      <DropdownToggle nav caret>
                        ETC
                      </DropdownToggle>
                      <DropdownMenu right>
                        <DropdownItem>
                          Option 1
                        </DropdownItem>
                        <DropdownItem>
                          Option 2
                        </DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem>
                          Reset
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </Nav>
                </Collapse>
              </Navbar>
            </div>
          );
    }
}