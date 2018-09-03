import React,{Component} from 'react';
import {TabContent, TabPane, Nav, NavItem, NavLink, Row, Col} from 'reactstrap';
import classnames from 'classnames';
import {GTD} from "./satellite.detail/GTD";
import {RTD_TM} from "./satellite.detail/RTD_TM";
import {RTD_TC} from "./satellite.detail/RTD_TC";
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
            activeTab: 'GTD',
            isGTDActive: true, //현재 페이지가 GTD인지 여부를 저장. GTD에 props로 전달되어 clearInterval에 사용됨
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

    toggle = async(tab) => {
        taskStore.setActiveTaskPage(tab); //task 전환 시 사용하기 위해 현재 페이지를 기억
        //탭 전환
        if (this.state.activeTab !== tab) {
            if(tab === 'GTD'){ //GTD 탭인 경우
                await this.setState({
                    activeTab: tab,
                    isGTDActive:true
                });
                console.log('gtd tap')    
            }else{ //다른 탭인 경우
                await this.setState({
                    activeTab: tab,
                    isGTDActive:false
                });
            }
        }
    }
    
    render(){
        //console.log('render');
        let activeTask = taskStore.activeTask;
        return (
        <div>
            <h2>{activeTask.satelliteName}</h2>
            <div>
                <Nav tab>
                    <NavItem>
                        <NavLink
                        className={classnames({ active: this.state.activeTab === 'GTD' })}
                        onClick={() => { this.toggle('GTD'); }}
                        >
                        Ground Track Display
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                        className={classnames({ active: this.state.activeTab === 'TM' })}
                        onClick={() => { this.toggle('TM'); }}
                        >
                        Telemetry
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                        className={classnames({ active: this.state.activeTab === 'TC' })}
                        onClick={() => { this.toggle('TC'); }}
                        >
                        Telecommand
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                        className={classnames({ active: this.state.activeTab === 'RTD_TM' })}
                        onClick={() => { this.toggle('RTD_TM'); }}
                        >
                        Real Time Telemetry
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                        className={classnames({ active: this.state.activeTab === 'RTD_TC' })}
                        onClick={() => { this.toggle('RTD_TC'); }}
                        >
                        Real Time Telecommand
                        </NavLink>
                    </NavItem>
                </Nav>
                
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="GTD">
                        <Row>
                        <Col sm="12">
                            <GTD satCode={activeTask.satelliteCode} isGTDActive={this.state.isGTDActive}/>
                        </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="TM">
                    <Row>
                        <Col sm="12">
                            {/* <TM tmList={this.state.telemetryList}/> */}
                            <TM task={activeTask}/> 
                        </Col>
                    </Row>
                    </TabPane>
                    <TabPane tabId="TC">
                        <Row>
                        <Col sm="12">
                            {/* <TC tcList={this.state.telecommandList}/> */}
                            <TC task={activeTask}/>
                        </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="RTD_TM">
                        <Row>
                        <Col sm="12">
                            {/* <RTD tmTypes={this.state.rtdTmTypes} tcTypes={this.state.rtdTcTypes}/> */}
                            <RTD_TM task={activeTask}/>
                        </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="RTD_TC">
                        <Row>
                        <Col sm="12">
                            {/* <RTD tmTypes={this.state.rtdTmTypes} tcTypes={this.state.rtdTcTypes}/> */}
                            <RTD_TC task={activeTask}/>
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

// import React,{Component} from 'react';
// import {TabContent, TabPane, Nav, NavItem, NavLink, Row, Col} from 'reactstrap';
// import classnames from 'classnames';
// import {GTD} from "./satellite.detail/GTD";
// import {RTD} from "./satellite.detail/RTD";
// import {TC} from "./satellite.detail/TC";
// import {TM} from "./satellite.detail/TM";
// import { withRouter } from 'react-router-dom';
// import { observer } from "mobx-react";
// import { taskStore } from "../mobx/stores/TaskStore";

// @observer
// class Detail extends Component{
//     constructor(props) {
//         super(props);
//         this.toggle = this.toggle.bind(this);
//         this.state = {
//           activeTab: 'gtd'
//         };
//     }

//     // componentDidMount(){
//     //     console.log('detail mounted');
//     // }

//     // componentDidUpdate(){
//     //     console.log("dt updated!");
//     // }

//     // componentWillUnmount(){
//     //     console.log("dt unmounted");
//     // }

//     toggle(tab) {
//         if (this.state.activeTab !== tab) {
//             this.setState({
//             activeTab: tab
//             });
//         }
//     }
    
//     render(){
//         let activeTask = taskStore.activeTask;
//         return (
//         <div>
//             <h2>{activeTask.satelliteName}</h2>
//             <div>
//                 <Nav tab>
//                     <NavItem>
//                         <NavLink
//                         className={classnames({ active: this.state.activeTab === 'gtd' })}
//                         onClick={() => { this.toggle('gtd'); }}
//                         >
//                         Ground Track Display
//                         </NavLink>
//                     </NavItem>
//                     <NavItem>
//                         <NavLink
//                         className={classnames({ active: this.state.activeTab === 'tm' })}
//                         onClick={() => { this.toggle('tm'); }}
//                         >
//                         Telemetry
//                         </NavLink>
//                     </NavItem>
//                     <NavItem>
//                         <NavLink
//                         className={classnames({ active: this.state.activeTab === 'tc' })}
//                         onClick={() => { this.toggle('tc'); }}
//                         >
//                         Telecommand
//                         </NavLink>
//                     </NavItem>
//                     <NavItem>
//                         <NavLink
//                         className={classnames({ active: this.state.activeTab === 'rtd' })}
//                         onClick={() => { this.toggle('rtd'); }}
//                         >
//                         Real Time Data
//                         </NavLink>
//                     </NavItem>
//                 </Nav>
                
//                 <TabContent activeTab={this.state.activeTab}>
//                     <TabPane tabId="gtd">
//                         <Row>
//                         <Col sm="12">
//                             <GTD satCode={activeTask.satelliteCode}/>
//                         </Col>
//                         </Row>
//                     </TabPane>
//                     <TabPane tabId="tm">
//                     <Row>
//                         <Col sm="12">
//                             {/* <TM tmList={this.state.telemetryList}/> */}
//                             <TM task={activeTask}/> 
//                         </Col>
//                     </Row>
//                     </TabPane>
//                     <TabPane tabId="tc">
//                         <Row>
//                         <Col sm="12">
//                             {/* <TC tcList={this.state.telecommandList}/> */}
//                             <TC task={activeTask}/>
//                         </Col>
//                         </Row>
//                     </TabPane>
//                     <TabPane tabId="rtd">
//                         <Row>
//                         <Col sm="12">
//                             {/* <RTD tmTypes={this.state.rtdTmTypes} tcTypes={this.state.rtdTcTypes}/> */}
//                             <RTD task={activeTask}/>
//                         </Col>
//                         </Row>
//                     </TabPane>
//                 </TabContent>
//             </div>
//         </div>
//         );
//     }
// }
// export default withRouter(Detail); 