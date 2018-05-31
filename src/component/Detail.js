import React,{Component} from 'react';
import {TabContent, TabPane, Nav, NavItem, NavLink, Row, Col} from 'reactstrap';
import classnames from 'classnames';
import {GTD} from "../component/satellite.detail/GTD";
import {RTD} from "../component/satellite.detail/RTD";
import {TC} from "../component/satellite.detail/TC";
import {TM} from "../component/satellite.detail/TM";


export class Detail extends Component{
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          activeTab: '1'
        };
      }
    
      toggle(tab) {
        if (this.state.activeTab !== tab) {
          this.setState({
            activeTab: tab
          });
        }
      }
    
    render(){
    return (
    <div>
        <h2>Test Satellite 01</h2>
        <div>
            <Nav tab>
                <NavItem>
                    <NavLink
                    className={classnames({ active: this.state.activeTab === '1' })}
                    onClick={() => { this.toggle('1'); }}
                    >
                    Ground Track Display
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                    className={classnames({ active: this.state.activeTab === '2' })}
                    onClick={() => { this.toggle('2'); }}
                    >
                    Telemetry
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                    className={classnames({ active: this.state.activeTab === '3' })}
                    onClick={() => { this.toggle('3'); }}
                    >
                    Telecommand
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                    className={classnames({ active: this.state.activeTab === '4' })}
                    onClick={() => { this.toggle('4'); }}
                    >
                    Real Time Data
                    </NavLink>
                </NavItem>
            </Nav>

            <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId="1">
                    <Row>
                    <Col sm="12">
                        <GTD/>
                    </Col>
                    </Row>
                </TabPane>
                <TabPane tabId="2">
                <Row>
                    <Col sm="12">
                        <TM/>
                    </Col>
                </Row>
                </TabPane>
                <TabPane tabId="3">
                    <Row>
                    <Col sm="12">
                        <TC/>
                    </Col>
                    </Row>
                </TabPane>
                <TabPane tabId="4">
                    <Row>
                    <Col sm="12">
                        <RTD/>
                    </Col>
                    </Row>
                </TabPane>
             </TabContent>
        </div>
    </div>
    );
    }
}