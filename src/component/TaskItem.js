import React, { Component } from 'react';
import { ButtonGroup, Button } from "reactstrap";
import PropTypes from 'prop-types';

export class TaskItem extends Component{
    static propTypes = {
        taskName: PropTypes.string
    }

    static defaultProps = {
        taskName: "No name"
    }

    render(){
        //const {taskName} = this.props;
        return(
            <ButtonGroup  className='w-100'>
                {/* <Button>{taskName}</Button> */}
                <Button>Test Satellite 01</Button>
                <Button>X</Button>
            </ButtonGroup>
        );
    }
}