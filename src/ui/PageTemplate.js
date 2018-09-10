import React, {Component} from 'react';
import { Container, Row, Col } from "reactstrap";
import Menubar from "./Menubar";
import Taskbar from "./Taskbar";


export class PageTemplate extends Component {
    render(){
        const {children} = this.props;
        return(
            <Container>
                <Row>
                    <Col className = "Menubar"> <Menubar/> </Col>
                </Row>
                <Row>
                    {/* <Col-2 className = "Taskbar"> <Taskbar/> </Col-2> */}
                    <Col className = "pageArea"> {children} </Col>
                </Row>
            </Container>
        );
    }
}