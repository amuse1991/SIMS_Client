import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as satApi from '../services/api/satellite'

export default class OverlaySatellite extends Component {
    
    static propTypes = {
        sateliiteCode: PropTypes.string,
        lat: PropTypes.number,
        lng : PropTypes.number,
        alt : PropTypes.number
    }

    static defaultProps = {
        sateliiteCode: "No name",
        lat: 0,
        lng : 0,
        alt : 0
    }

    constructor(props){
        super(props);
        this.state = {
            imgSrc:null,
            imgLoading:false
        }
    }

    componentDidMount(){
        this.getImgSrc();
    }

    getImgSrc = async() =>{
        let imgSrc = await satApi.getInfo(this.props.satelliteCode);
        this.setState({
            imgSrc:imgSrc.data.ImgSource,
            imgLoading:true
        })
    }

    render(){
        const {satelliteCode, lat, lng, alt} = this.props;
        if(this.state.imgLoading === false){
            return(<div></div>)
        }
        return(
            <div /*style={{ background: `black`, border: `1px solid #ccc`, padding: 15 }}*/>
            <img src={window.location.origin+this.state.imgSrc} alt="satImg" style={{width:'30px',height:'30px'}}/  >
            <p> name : {satelliteCode} <br/>
                lat : {lat} <br/>
                lng : {lng} <br/>
                alt : {alt} <br/>
            </p>
            </div>
        );
    }
}