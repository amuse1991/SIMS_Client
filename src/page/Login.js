import React,{Component} from "react";
import { Form, FormGroup, Input, Button, Card, Label, Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
//import Background from "../static/image/main.jpg";
//import { NavLink } from "react-router-dom";
import * as userApi from "../services/api/user"

export class Login extends Component{
    
    constructor(props) {
        super(props);
        this.state = {
          modal: false,
          id: '',
          pwd: '',
          formId:null,
          formPwd:null,
          formUserName:null,
          formDept:null,
          formPos:null,
          formMail:null,
          formPhone:null
        }
        //this.toggle = this.toggle.bind(this); //modal toggle
    }

    toggle = () => { //modal toggle
        this.setState({
          modal: !this.state.modal
        });
      }

    formCancel = () =>{
        this.setState({
            formId:null,
            formPwd:null,
            formUserName:null,
            formDept:null,
            formPos:null,
            formMail:null,
            formPhone:null
        });
        this.toggle();
    }


    login = async ()=>{
        let res = await userApi.login(this.state.id,this.state.pwd);
        if(res.status === 200){
            this.props.history.push('/dashboard');
        }else{
            alert(`로그인 실패\n status : ${res.status}\n ${res.data}`);
        }
    }

    signup = async ()=>{
        let {formId,formPwd,formUserName,formDept,formPos,formMail,formPhone} = this.state
        let res = await userApi.createUser(formId,formPwd,formUserName,formDept,formPos,formMail,formPhone);
        if(res.status == 200){
            alert("회원 가입 성공")
        }else{
            alert(`회원 가입 오류 발생\n status : ${res.status}\n ${res.data}`);
        }
        this.toggle()
    }

    handleIdInput = (event) => {
        this.setState({id:event.target.value});
    }

    handlePwdInput = (event) => {
        this.setState({pwd:event.target.value});
    }

    handleFormIdInput = (event) => {
        this.setState({formId:event.target.value});
    }

    handleFormPwdInput = (event) => {
        this.setState({formPwd:event.target.value});
    }

    handleFormNameInput = (event) => {
        this.setState({formUserName:event.target.value});
    }

    handleFormDeptInput = (event) => {
        this.setState({formDept:event.target.value});
    }

    handleFormPosInput = (event) => {
        this.setState({formPos:event.target.value});
    }

    handleFormMailInput = (event) => {
        this.setState({formMail:event.target.value});
    }

    handleFormPhoneInput = (event) => {
        this.setState({formPhone:event.target.value});
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
                                <Input type="text" name="id" id="uid" placeholder="Enter your id" onChange={this.handleIdInput}/>
                            </FormGroup>
                            <FormGroup>
                                {/* <Label for="pwd">PASSWORD</Label> */}
                                <Input type="password" name="password" id="pwd" placeholder="Enter your password" onChange={this.handlePwdInput}/>
                            </FormGroup>
                            <Button onClick={this.login}>로그인</Button>
                            {/* <NavLink to="/dashboard"><Button onClick={this.login}>로그인</Button></NavLink> */}
                            <Button onClick={this.toggle}>회원가입</Button>
                        </Form>
                    </Card>
                    <div>
                        <Modal isOpen={this.state.modal} toggle={this.toggle} className='signupModal'>
                            <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
                            <ModalBody>
                                <Form>
                                <FormGroup>
                                    <Label for="uid">아이디</Label>
                                    <Input type="text" name="id" id="id" onChange={this.handleFormIdInput}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="pwd">비밀번호</Label>
                                    <Input type="password" name="pwd" id="pwd" onChange={this.handleFormPwdInput}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="uid">이름</Label>
                                    <Input type="text" name="userName" id="userName" onChange={this.handleFormNameInput}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="dept">부서</Label>
                                    <Input type="text" name="dept" id="dept" onChange={this.handleFormDeptInput}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="dept">직책</Label>
                                    <Input type="text" name="pos" id="pos" onChange={this.handleFormPosInput}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="uid">이메일</Label>
                                    <Input type="email" name="mail" id="mail" onChange={this.handleFormMailInput}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="dept">연락처</Label>
                                    <Input type="text" name="phone" id="phone" onChange={this.handleFormPhoneInput}/>
                                </FormGroup>
                                </Form>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={this.signup}>확인</Button>{' '}
                                <Button color="secondary" onClick={this.formCancel}>취소</Button>
                            </ModalFooter>
                        </Modal>
                    </div>
                </div>
        );
    }
}