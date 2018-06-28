import React,{Component} from 'react';
//import PropTypes from 'prop-types';

export class WOD extends Component{
    
    // constructor(props){
    //     super(props);
    //     this.state = {
    //         wod : props.data
    //     }
    // }
    
    // static propTypes = {
    //     wod: PropTypes.string
    // }

    // static defaultProps = {
    //     wod: ""
    // }
    
    render(){
        return(
            <div>
                {this.props.wod}
            </div>
        );
    }
}