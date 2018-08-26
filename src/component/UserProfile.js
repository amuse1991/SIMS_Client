import React,{Component} from 'react'
import { Card, CardTitle, CardSubtitle, CardText, Button } from "reactstrap";
import { withRouter } from 'react-router-dom';

class UserProfile extends Component{

    goDashboard = ()=>{
        this.props.history.push('/dashboard');
    }

    render(){
        return (
        <Card>
            <CardTitle className="text-center">User Name</CardTitle>
            <CardSubtitle className="text-center">Division/Team</CardSubtitle>
            <CardText className="text-center">User Information</CardText>
            <Button className="btn-block" onClick={this.goDashboard}>Dashboard</Button>
            {/*<Button className="btn-block">Logout</Button>*/}
        </Card>
        );
    }
}

export default withRouter(UserProfile);