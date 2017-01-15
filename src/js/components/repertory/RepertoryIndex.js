import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import {
	viewNode, loadNotes, addNode, chageDirectory
} from '../../actions/note';
import { hashHistory } from "react-router";
import Box from "grommet/components/Box";
import Header from "grommet/components/Header";
import Title from "grommet/components/Title";
import Section from "grommet/components/Section";
import Label from "grommet/components/Label";
import Search from "grommet/components/Search";
import Anchor from "grommet/components/Anchor";
import AddIcon from "grommet/components/icons/base/Add";
import Tiles from "grommet/components/Tiles";

import FilterControl from "grommet-addons/components/FilterControl";
import Query from "grommet-addons/utils/Query";
import NavControl from "../NavControl";
import NodeItem from './NodeItem';


import RepertoryAddForm from "./RepertoryAddForm";

const LAYERS = {
	addForm: RepertoryAddForm
};

class RepertoryIndex extends Component {

	constructor(props, context) {
		super(props, context);
		this._onSearch = this._onSearch.bind(this);
		this._onMore = this._onMore.bind(this);
		this._onLayerOpen = this._onLayerOpen.bind(this);
		this._onLayerClose = this._onLayerClose.bind(this);
		this.state = { searchText: '', layerName: undefined };

		const { router } = context;
		console.log(router)
	}

	componentDidMount() {
		var nodeId = this.props.params.nodeId;
		console.log(nodeId)
		this.props.dispatch(chageDirectory(nodeId));
	}

	componentWillUnmount() {
		console.log('componentWillUnmount')
		// this.props.dispatch(unloadIndex());
	}

	_onSearch(event) {
		const {index} = this.props;
		const searchText = event.target.value;
		this.setState({ searchText });
		const query = new Query(searchText);
		// this.props.dispatch(queryIndex(index, query));
	}

	_onMore() {
		const {index} = this.props;
		// this.props.dispatch(moreIndex(index));
	}

	_onLayerOpen(layerName) {
		this.setState({ layerName: (layerName) });
	}

	_onLayerClose() {
		this.setState({ layerName: undefined });
		if (this.props.onClose) {
			this.props.onClose();
		}
	}

	_select(node) {
		return () => {
			let nodeType = node.type;
			if ('folder' === nodeType) {
				hashHistory.push({
					pathname: `/repertory/${node._id}`,
				});
			} else if ('file' === nodeType) {
				hashHistory.push({
					pathname: `/note/${node._id}`,
				});
			}
		};
	}

	_renderSection(nodes = []) {
		const items = nodes.map((node, index) => (
			<NodeItem onClick={this._select(node)} node={node} />
		));

		return (
			<Tiles flush={false} fill={false} selectable={true}>
				{items}
			</Tiles>
		);
	}

	render() {
		const {node, role} = this.props;
		const {filterActive, searchText} = this.state;

		let addControl;
		addControl = (
			<Anchor icon={<AddIcon />} onClick={this._onLayerOpen.bind(this, 'addForm')} a11yTitle={`Add virtual machine`} />
		);

		let sections = this._renderSection(node.data);

		let layer;
		if (this.state.layerName) {
			let Layer = LAYERS[this.state.layerName];
			layer = (
				<Layer onClose={this._onLayerClose} />
			);
		}

		return (
			<Box flex={true} full="vertical" direction='column'>
				<Header size='large' pad={{ horizontal: 'medium' }}>
					<Title responsive={false}>
						<NavControl />
						<span>知识库</span>
					</Title>
					<Search inline={true} fill={true} size='medium' placeHolder='Search' value={searchText} onDOMChange={this._onSearch} />
					{addControl}
				</Header>
				<Section key={'section'} pad='none'>
					{sections}
				</Section>
				{layer}
			</Box>
		);
	}
}

RepertoryIndex.propTypes = {
	node: PropTypes.object
};

RepertoryIndex.contextTypes = {
    router: Object
}

let select = (state) => {
	return ({
		node: state.node,
	})
};

export default connect(select)(RepertoryIndex);
