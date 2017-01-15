// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {hashHistory} from "react-router";
import { viewNode } from '../../actions/actions';
import Split from 'grommet/components/Split';
import Article from 'grommet/components/Article';
import Markdown from 'grommet/components/Markdown';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Section from 'grommet/components/Section';
import Box from 'grommet/components/Box';
import Anchor from 'grommet/components/Anchor';
import Button from 'grommet/components/Button';
import Notification from 'grommet/components/Notification';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import LinkPreviousIcon from 'grommet/components/icons/base/LinkPrevious';
import MoreIcon from 'grommet/components/icons/base/More';

import NoteActions from './NoteActions';

class NoteShow extends Component {

	constructor(props) {
		super(props);
		this._onResponsive = this._onResponsive.bind(this);
		this._onToggleSidebar = this._onToggleSidebar.bind(this);

		this.state = {
			layerName: undefined,
			showSidebarWhenSingle: false
		};
	}

	componentDidMount() {
		var nodeId = this.props.params.nodeId;
		// load init sketch
		this.props.dispatch(viewNode(nodeId));

		document.title = this.props.note.name;
		// this.props.dispatch(loadItem(this.props.uri));
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.note) {
			document.title = nextProps.note.name;
		}
	}

	componentWillUnmount() {
		document.title = 'orgdown';
		// have to unload snapshots first!
		// this.props.dispatch(unloadVmSnapshots());
		// this.props.dispatch(unloadItem());
	}

	_onResponsive(responsive) {
		// this.props.dispatch(vmResponsive(responsive));
	}

	_onToggleSidebar() {
		this.setState({
			showSidebarWhenSingle: !this.state.showSidebarWhenSingle
		});
	}

	render() {
		const { note } = this.props;

		let sidebar;
		let onSidebarClose = this._onToggleSidebar;

		sidebar = (
			<NoteActions note={note} onClose={onSidebarClose} />
		);

		return (
			<Split flex="left" separator={true}
				priority={this.state.showSidebarWhenSingle ? 'right' : 'left'}
				onResponsive={this._onResponsive}>
				<div>
					<Header pad={{ horizontal: "small", vertical: "medium" }}
						justify="start" size="large" colorIndex="light-2">
						<Box direction="row" align="center" pad={{ between: 'small' }}
							responsive={false}>
							<Anchor icon={<LinkPreviousIcon />} onClick={hashHistory.goBack}
								a11yTitle="Return" />
							<Heading tag="h1" margin="none">
								<strong>{note.name}</strong>
							</Heading>
						</Box>
					</Header>
					<Article pad="medium" align="start" primary={true}>
						<Markdown content={note.content} />
					</Article>
				</div>
				{sidebar}
			</Split>
		);
	}
}

NoteShow.propTypes = {
	category: PropTypes.string.isRequired, /// remove?
	nav: PropTypes.object.isRequired,
	notifications: PropTypes.object,
	responsive: PropTypes.oneOf(['single', 'multiple']),
	role: PropTypes.string,
	uri: PropTypes.string.isRequired,
	virtualMachine: PropTypes.object
};

let select = (state, props) => {
	return {
		note: state.note,
	};
};

export default connect(select)(NoteShow);
