import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Button } from 'reactstrap';
  



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
    /*
    constructor(props){
        super(props);
    }
    */
    render(){
        const {satName, imgSrc, launchDate, daysOfOperation} = this.props;
        return (
            <div>
                <Card>
                    <CardImg width='50%' height='200px' src={imgSrc} alt={satName} />
                    <CardBody>
                    <CardTitle>{satName}</CardTitle>
                    <CardText>launch date : {launchDate}</CardText>
                    <CardText>days of operation : {daysOfOperation}</CardText>
                    <Button>view detail</Button>
                    </CardBody>
                </Card>
            </div>
        );
        
    }
}

export default SatelliteSummary;