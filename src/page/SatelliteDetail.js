import React, {Component} from 'react';
import {PageTemplate} from "../ui/PageTemplate";
import { Detail } from "../component/Detail";

export class SatelliteDetail extends Component {
    render(){

        return(
            <PageTemplate>
                <Detail/>
            </PageTemplate>
        );
    }
}