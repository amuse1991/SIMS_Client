import React,{Component} from "react";
import Gmap from "../Gmap"

export class GTD extends Component {
    render(){
        return(
            <div>
                <h3>Ground Track Display</h3>
                <hr/>
                <Gmap/>
            </div>
        );
    }
}