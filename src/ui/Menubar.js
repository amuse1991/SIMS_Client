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
import {taskStore} from "../mobx/stores/TaskStore";
import TaskModel from '../model/TaskModel';
import * as satApi from "../services/api/satellite";
import * as rtdApi from "../services/api/rtd";
import { withRouter } from 'react-router-dom';
    
class Menubar extends Component {
    
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

  onViewDetailBtnClicked = async (SatelliteName,SatelliteCode)=>{
    //task 추가
    let tmList = await satApi.getTMmetaListBySatCode(SatelliteCode);
    let tcList = await satApi.getTCmetaListBySatCode(SatelliteCode);
    let rtdTmTypes = await rtdApi.getTMlistBySatCode(SatelliteCode);
    let rtdTcTypes = await rtdApi.getTClistBySatCode(SatelliteCode);
    let newTask = new TaskModel(SatelliteCode,SatelliteName,tmList.data,tcList.data,rtdTmTypes.data,rtdTcTypes.data,'GTD');
    taskStore.addTask(newTask);
    taskStore.activateTask(newTask);
    this.props.history.push(`/detail/${SatelliteName}`);
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
                  {/* <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      Satellite
                    </DropdownToggle>
                    <DropdownMenu right>
                      {this.state.satelliteData.map((satellite,i)=>
                        <DropdownItem key={i}>
                          <p onClick={()=>this.onViewDetailBtnClicked(satellite.SatelliteName,satellite.SatelliteCode)}>{satellite.SatelliteName}</p>
                        </DropdownItem>
                      )}
                    </DropdownMenu>
                  </UncontrolledDropdown> */}
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

export default withRouter(Menubar);