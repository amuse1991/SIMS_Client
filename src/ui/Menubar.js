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
import * as satApiService from "../services/api/satellite";
import { SatelliteDetail } from '../page/SatelliteDetail';
    
export default class Menubar extends Component {
    
    constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      satelliteData:null,
      fetching:false
    };
  }

  componentDidMount(){
    this.fetchSatelliteInfo()
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  fetchSatelliteInfo = async ()=>{
    const satelliteData = await satApiService.getSatelliteList();
    this.setState({
      satelliteData:satelliteData.data,
      fetching:true
    })
  }
    render(){
      if(this.state.fetching === false){
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
      }else{
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
                      {this.state.satelliteData.map((satellite,i)=>
                        <DropdownItem key={i}>
                          <Link to={`/detail/${satellite.SatelliteName}`}>{satellite.SatelliteName}</Link>
                        </DropdownItem>
                      )}
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
}