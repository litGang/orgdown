// @flow
import React, { Component } from "react";
import render from "orgdown-markdown";
import Section from 'grommet/components/Section';
import Markdown from 'grommet/components/Markdown';
import styles from '../styles/Preview.css'

class Preview extends Component {
	constructor(prop, context) {
		super(prop, context);
	}

	componentWillReceiveProps(nextProps) {
		console.log(nextProps)
	}

	render() {
		return (
			<div id="preview" className={styles.preview}>
				<Section>
					<Markdown content={this.props.value} />
				</Section>
			</div>
		)

	}
}

export default Preview;