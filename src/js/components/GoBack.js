import React, { Component, PropTypes } from "react";
import {hashHistory} from "react-router";
import Anchor from 'grommet/components/Anchor';
import LinkPreviousIcon from "grommet/components/icons/base/LinkPrevious";

class GoBack extends Component {

    render() {
        return <Anchor icon={<LinkPreviousIcon />} onClick={hashHistory.goBack} a11yTitle="Return" />
    }
}

export default GoBack;