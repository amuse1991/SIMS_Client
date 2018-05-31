import React,{Component} from "react";
import { Form, FormGroup, Input, Button, Card, Label, Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
//import Background from "../static/image/main.jpg";
import { NavLink } from "react-router-dom";

export class Login extends Component{
    
    constructor(props) {
        super(props);
        this.state = {
          modal: false
        }
        this.toggle = this.toggle.bind(this); //modal toggle
    }

    login = ()=>{

    }

    signup = ()=>{

    }

    toggle() { //modal toggle
        this.setState({
          modal: !this.state.modal
        });
      }

    render(){
        return(
                <div id="loginPage"  style={{height: '100vh'}}>
                    {/* <div id="loginPage"  style={{height: '100vh', background:'url(' + Background + ')'}}> */}
                    <div id="logo" className="text-center"
                    style={{
                        position:'relative', 
                        top:'25%'
                        }}
                    >
                        <h1>SIMS</h1>
                        <h5>Satrec Initiative Monitoring System</h5>
                    </div>
                    <Card className='w-25 h-25 text-center' 
                    style={{
                        position:'relative', 
                        top:'50%',
                        left:'40%'
                        }}>
                        <Form>
                            <FormGroup>
                                {/* <Label for="uid">ID</Label> */}
                                <Input type="email" name="id" id="uid" placeholder="Enter your email"/>
                            </FormGroup>
                            <FormGroup>
                                {/* <Label for="pwd">PASSWORD</Label> */}
                                <Input type="password" name="password" id="pwd" placeholder="Enter your password"/>
                            </FormGroup>
                            <NavLink to="/dashboard"><Button onClick={this.login}>로그인</Button></NavLink>
                            <Button onClick={this.toggle}>회원가입</Button>
                        </Form>
                    </Card>
                    <div>
                        <Modal isOpen={this.state.modal} toggle={this.toggle} className='signupModal'>
                            <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
                            <ModalBody>
                                <Form>
                                <FormGroup>
                                    <Label for="uid">ID</Label>
                                    <Input type="email" name="id" id="uid" placeholder="Enter your email"/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="pwd">PASSWORD</Label>
                                    <Input type="password" name="password" id="pwd" placeholder="Enter your password"/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="dept">부서</Label>
                                    <Input type="select" name="department" id="dept">
                                        <option>SAMPLE1</option>
                                        <option>SAMPLE2</option>
                                        <option>SAMPLE3</option>
                                        <option>SAMPLE4</option>
                                        <option>SAMPLE5</option>
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="dept">직책</Label>
                                    <Input type="select" name="position" id="pos">
                                        <option>SAMPLE1</option>
                                        <option>SAMPLE2</option>
                                        <option>SAMPLE3</option>
                                        <option>SAMPLE4</option>
                                        <option>SAMPLE5</option>
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="dept">연락처</Label>
                                    <Input type="text" name="phone" id="phone" placeholder="Enter your phone number"/>
                                </FormGroup>
                                </Form>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={this.toggle}>확인</Button>{' '}
                                <Button color="secondary" onClick={this.toggle}>취소</Button>
                            </ModalFooter>
                        </Modal>
                    </div>
                </div>
        );
    }
}