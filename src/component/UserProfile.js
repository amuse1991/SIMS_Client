import React,{Component} from 'react'
import { Card, CardTitle, CardSubtitle, CardText, Button } from "reactstrap";
import { NavLink } from 'react-router-dom';

export class UserProfile extends Component{
    render(){
        return (
        <Card>
            <CardTitle className="text-center">User Name</CardTitle>
            <CardSubtitle className="text-center">Division/Team</CardSubtitle>
            <CardText className="text-center">User Information</CardText>
            <NavLink to="/dashboard"> <Button className="btn-block">Dashboard</Button> </NavLink>
            {/*<Button className="btn-block">Logout</Button>*/}
        </Card>
        );
    }
}