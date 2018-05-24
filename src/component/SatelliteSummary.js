import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Button } from 'reactstrap';
import Taskbar from "../ui/Taskbar";
  
class SatelliteSummary extends Component{
    
    static propTypes = {
        satName: PropTypes.string,
        imgSrc: PropTypes.string,
        launchDate: PropTypes.string,
        daysOfOperation : PropTypes.string
    }

    static defaultProps = {
        satName: "No name",
        imgSrc: "",
        launchDate: "No data",
        daysOfOperation : "No data"
    }

    onViewDetailBtnClicked = ()=>{
        const {satName} = this.props;
        
    }

    render(){
        const {satName, imgSrc, launchDate, daysOfOperation} = this.props;
        return (
                <Card>
                    <CardImg top width='100%' height="100%" src={imgSrc} alt={satName} />
                    <CardBody className="text-center">
                        <CardTitle>{satName}</CardTitle>
                        <CardText>launch date : {launchDate}</CardText>
                        <CardText>days of operation : {daysOfOperation}</CardText>
                        <Button onClick={this.onViewDetailBtnClicked}>view detail</Button>
                    </CardBody>
                </Card>
        );
    }
}

export default SatelliteSummary;