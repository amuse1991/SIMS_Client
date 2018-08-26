import React, {Component} from 'react';
import {PageTemplate} from "../ui/PageTemplate";
import  Detail  from "../component/Detail";
//import { observer } from "mobx-react";
//import { taskStore } from "../mobx/stores/TaskStore";

//@observer
export class SatelliteDetail extends Component {
    render(){
        return(
            <PageTemplate>
                <Detail/>
            </PageTemplate>
        );
    }
}