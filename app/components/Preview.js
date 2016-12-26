// @flow
import React, {Component} from "react";
import 'orgdown-markdown/styles/github.css';
import {markdownRender} from "orgdown-markdown";

class Preview extends Component {
	constructor(prop, context) {
		super(prop, context);
		this.state = {
			html: ''
		};
		this.renderEngin = new markdownRender({element: '#preview'})
	}

	componentWillReceiveProps(nextProps) {
		let html = this.renderEngin.makeHtml(nextProps.value);
		this.setState({
			html: html
		});
	}

	render() {
		return (
			<div id="preview">
				<div dangerouslySetInnerHTML={{__html: this.state.html}} />
			</div>
		)

	}
}

export default Preview;