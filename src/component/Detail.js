import React,{Component} from 'react';
import {TabContent, TabPane, Nav, NavItem, NavLink, Row, Col} from 'reactstrap';
import classnames from 'classnames';
import {GTD} from "./satellite.detail/GTD";
import {RTD} from "./satellite.detail/RTD";
import {TC} from "./satellite.detail/TC";
import {TM} from "./satellite.detail/TM";
import { withRouter } from 'react-router-dom';
import { observer } from "mobx-react";
import { taskStore } from "../mobx/stores/TaskStore";

@observer
class Detail extends Component{
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
          activeTab: 'gtd'
        };
    }

    // componentDidMount(){
    //     console.log('detail mounted');
    // }

    // componentDidUpdate(){
    //     console.log("dt updated!");
    // }

    // componentWillUnmount(){
    //     console.log("dt unmounted");
    // }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
            activeTab: tab
            });
        }
    }
    
    render(){
        let activeTask = taskStore.activeTask;
        return (
        <div>
            <h2>{activeTask.satelliteName}</h2>
            <div>
                <Nav tab>
                    <NavItem>
                        <NavLink
                        className={classnames({ active: this.state.activeTab === 'gtd' })}
                        onClick={() => { this.toggle('gtd'); }}
                        >
                        Ground Track Display
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                        className={classnames({ active: this.state.activeTab === 'tm' })}
                        onClick={() => { this.toggle('tm'); }}
                        >
                        Telemetry
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                        className={classnames({ active: this.state.activeTab === 'tc' })}
                        onClick={() => { this.toggle('tc'); }}
                        >
                        Telecommand
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                        className={classnames({ active: this.state.activeTab === 'rtd' })}
                        onClick={() => { this.toggle('rtd'); }}
                        >
                        Real Time Data
                        </NavLink>
                    </NavItem>
                </Nav>
                
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="gtd">
                        <Row>
                        <Col sm="12">
                            <GTD satCode={activeTask.satelliteCode}/>
                        </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="tm">
                    <Row>
                        <Col sm="12">
                            {/* <TM tmList={this.state.telemetryList}/> */}
                            <TM task={activeTask}/> 
                        </Col>
                    </Row>
                    </TabPane>
                    <TabPane tabId="tc">
                        <Row>
                        <Col sm="12">
                            {/* <TC tcList={this.state.telecommandList}/> */}
                            <TC task={activeTask}/>
                        </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="rtd">
                        <Row>
                        <Col sm="12">
                            {/* <RTD tmTypes={this.state.rtdTmTypes} tcTypes={this.state.rtdTcTypes}/> */}
                            <RTD task={activeTask}/>
                        </Col>
                        </Row>
                    </TabPane>
                </TabContent>
            </div>
        </div>
        );
    }
}
export default withRouter(Detail); 
