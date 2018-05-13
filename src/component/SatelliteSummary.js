import React, { Component } from 'react';
import PropTypes from 'prop-types';


/*
    satName : 위성 이름
    imgSrc : 위성 사진 경로
    launchDate : 발사 일자
    daysOfOperation : 운용 일수
*/

class SatelliteSummary extends Component{
    static propTypes = {
        satName: PropTypes.string,
        imgSrc: PropTypes.string,
        launchDate: PropTypes.string,
        daysOfOperation : PropTypes.string
    }

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
            <h3>{satName}</h3><br/>
            <img src={imgSrc} alt={satName} height="50px" width="50px"/><br/>
            <p> launch date : {launchDate}</p>
            <p> days of operation : {daysOfOperation}</p>
            <button>view detail</button>
        </div>)
        ;
        
    }
}

export default SatelliteSummary;