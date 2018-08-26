import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class OverlaySatellite extends Component {

    static propTypes = {
        satName: PropTypes.string,
        imgSrc: PropTypes.string,
        lat: PropTypes.number,
        lng : PropTypes.number,
        alt : PropTypes.number
    }

    static defaultProps = {
        satName: "No name",
        imgSrc: "",
        lat: 0,
        lng : 0,
        alt : 0
    }

    render(){
        const {imgSrc, satelliteCode, lat, lng, alt} = this.props;
        return(
            <div /*style={{ background: `black`, border: `1px solid #ccc`, padding: 15 }}*/>
            <img src={imgSrc} alt="test" style={{width:'30px',height:'30px'}}/  >
            <p> name : {satelliteCode} <br/>
                lat : {lat} <br/>
                lng : {lng} <br/>
                alt : {alt} <br/>
            </p>
            </div>
        );
    }
}