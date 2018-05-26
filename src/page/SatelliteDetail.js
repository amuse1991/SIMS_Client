import React, {Component} from 'react';
import {PageTemplate} from "../ui/PageTemplate";
//import { Detail } from "../component/Detail";

export class SatelliteDetail extends Component {
    render(){
        const {match} = this.props
        return(
            <PageTemplate>
                <div> {match.params.satelliteId} </div>
                {/*<Detail/>*/} 
            </PageTemplate>
        );
    }
}