import React, { Component, PropTypes } from "react";

class Orgdown extends Component {
    render() {
        return (
            <div className='room'>
                {this.props.children}
            </div>
        )
    }
}

export default Orgdown;