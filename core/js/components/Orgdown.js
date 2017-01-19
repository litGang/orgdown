import React, { Component, PropTypes } from "react";

class Orgdown extends Component {
    render() {
        return (
            <div className='orgdown'>
                {this.props.children}
            </div>
        )
    }
}

export default Orgdown;