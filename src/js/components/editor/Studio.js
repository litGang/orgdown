import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import {
  initEditor
} from '../../actions/sketch';

import Editor from "./Editor";

class Studio extends Component {

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		var sketchId = this.props.params.noteId;
		// load init sketch
		this.props.dispatch(initEditor(sketchId));

		document.title = this.props.sketch.name;
	}

	componentWillUnmount () {
		document.title = 'orgdown';
	}

	render() {

		return (
			<Editor sketch={this.props.sketch} />
		);
	}
}

let select = (state) => {
	return ({
		sketch: state.sketch
	})
};

export default connect(select)(Studio);