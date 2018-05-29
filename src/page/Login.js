import React,{Component} from "react";
import { Form, FormGroup, Input, Button, Card } from "reactstrap";
//import Background from "../static/image/main.jpg";
import { NavLink } from "react-router-dom";

export class Login extends Component{

    login = ()=>{

    }

    signup = ()=>{

    }

    render(){
        return(
                <div id="loginPage"  style={{height: '100vh'}}>
                    {/* <div id="loginPage"  style={{height: '100vh', background:'url(' + Background + ')'}}> */}
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
                            <Button onClick={this.signup}>회원가입</Button>
                        </Form>
                    </Card>
                    </div>
        );
    }
}