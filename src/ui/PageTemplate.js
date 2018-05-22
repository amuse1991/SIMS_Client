import React, {Component} from 'react';
import { Container, Row, Col } from "reactstrap";
import Menubar from "./Menubar";
import Taskbar from "./Taskbar";


export class PageTemplate extends Component {
    render(){
        const {children} = this.props;
        return(
            <Container fluid={true}>
                <Row>
                    <Col className = "Menubar"> <Menubar/> </Col>
                </Row>
                <Row>
                    <Col className = "Taskbar"> <Taskbar/> </Col>
                    <Col className = "pageArea"> {children} </Col>
                </Row>
            </Container>
        );
    }
}
/*
export const PageTemplate = ({children}) => {
    <Container fluid={true}>
    <Row>
        <Col className = "Menubar"> <Menubar/> </Col>
    </Row>
    <Row>
        <Col className = "Taskbar"> <Taskbar/> </Col>
        <Col className = "pageArea"> {children} </Col>
    </Row>
    </Container>
}
*/