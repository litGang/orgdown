import React, { Component } from "react";
// import render from "orgdown-markdown";
import Section from 'grommet/components/Section';
import Box from "grommet/components/Box";
import Markdown from 'grommet/components/Markdown';
import styles from '../../../style/Preview.css'

class Preview extends Component {

	render() {
		return (
			<Box pad={{ horizontal: 'small' }} style={{height: '100%'}} wrap={true}>
				<Section style={{overflow: 'scroll', height: '100%'}}>
					<Markdown content={this.props.value} />
				</Section>
			</Box>
		)
	}
}

export default Preview;
