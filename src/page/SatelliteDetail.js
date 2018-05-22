/*import React, { Component } from 'react';
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
}*/
import React, {Component} from 'react';
import {PageTemplate} from "../ui/PageTemplate";

export class SatelliteDetail extends Component {
    render(){
        return(
            <PageTemplate>
                <div> this is a detail </div>
            </PageTemplate>
        );
    }
}