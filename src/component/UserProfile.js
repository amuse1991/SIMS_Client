import React,{Component} from 'react'
import { Card, CardTitle, CardSubtitle, CardText, Button } from "reactstrap";

export class UserProfile extends Component{
    render(){
        return (
        <Card>
            <CardTitle className="text-center">User Name</CardTitle>
            <CardSubtitle className="text-center">Division/Team</CardSubtitle>
            <CardText className="text-center">User Information</CardText>
            <Button>Edit Preference</Button>
            <Button>Logout</Button>
        </Card>
        );
    }
}