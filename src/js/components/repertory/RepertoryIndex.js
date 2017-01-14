import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import {
    selectNote, loadNotes, addNode
} from '../../actions/note';
import Box from "grommet/components/Box";
import Header from "grommet/components/Header";
import Title from "grommet/components/Title";
import Section from "grommet/components/Section";
import Label from "grommet/components/Label";
import Search from "grommet/components/Search";
import Anchor from "grommet/components/Anchor";
import AddIcon from "grommet/components/icons/base/Add";
import Tiles from "grommet/components/Tiles";
import Tile from "grommet/components/Tile";
import FilterControl from "grommet-addons/components/FilterControl";
import Query from "grommet-addons/utils/Query";
import NavControl from "../NavControl";
// import VirtualMachineTile from "./VirtualMachineTile";
import FolderIcon from 'grommet/components/icons/base/Folder';

import RepertoryAddForm from "./RepertoryAddForm";

const LAYERS = {
    busy: RepertoryAddForm
};

class RepertoryIndex extends Component {

    constructor() {
	super();
	this._onSearch = this._onSearch.bind(this);
	this._onMore = this._onMore.bind(this);
	this._onLayerOpen = this._onLayerOpen.bind(this);
	this._onLayerClose = this._onLayerClose.bind(this);
	this.state = {searchText: '', layerName: undefined};
    }

    componentDidMount() {
		this.props.dispatch(loadNotes('updatedAt:desc'));
    }

    componentWillUnmount() {
		// this.props.dispatch(unloadIndex());
    }

    _onSearch(event) {
		const {index} = this.props;
		const searchText = event.target.value;
		this.setState({searchText});
		const query = new Query(searchText);
		// this.props.dispatch(queryIndex(index, query));
    }

    _onMore() {
		const {index} = this.props;
		// this.props.dispatch(moreIndex(index));
    }

    _onLayerOpen(layerName) {
		this.setState({ layerName: (this.props.busy ? 'busy' : layerName) });
    }

    _onLayerClose() {
		this.setState({ layerName: undefined });
		if (this.props.onClose) {
		    this.props.onClose();
		}
    }

    _select(_id) {
		return () => {
		    this.props.dispatch(selectNote('/note', _id));
		};
    }

    _renderSection(label, items = [], onMore) {
		const tiles = items.map((item, index) => (
		    <Tile draggable={true} align="center" pad="small" direction="column" size="small"
			  href={`/virtual-machines${item.uri}`}
			  onClick={this.props.onClick} selected={this.props.selected}
			  a11yTitle={`View ${item.name} Virtual Machine`}>
			<FolderIcon size="large"/>
			<strong style={{fontSize: 12}}>{item.name}</strong>
			{/*// <div>*/}
			    {/*<StatusIcon value={item.state} size="small" />*/}
			    {/*<span className="secondary">{item.state}</span>*/}
			    {/*</div>*/}
		    </Tile>
		));

		return (
		    <Section key={label || 'section'} pad='none'>
			<Tiles flush={false} fill={false} selectable={true} onMore={onMore}>
			    {tiles}
			</Tiles>
		    </Section>
		);
    }

    render() {
		const {index, role} = this.props;
		const {filterActive, searchText} = this.state;
		const result = index.result || {};

		let addControl;
		addControl = (
		    <Anchor icon={<AddIcon />} onClick={this._onLayerOpen.bind(this, 'busy')} a11yTitle={`Add virtual machine`}/>
		);

		let sections;

		let onMore;
		if (result.count > 0 && result.count < result.total) {
		    onMore = this._onMore;
		}
		sections = this._renderSection(undefined, result.items, onMore);

		let layer;
		if (this.state.layerName) {
		    let Component = LAYERS[this.state.layerName];
		    layer = (
			<Component onClose={this._onLayerClose} />
		    );
		}

		return (
		    <Box>
				<Header size='large' pad={{horizontal: 'medium'}}>
				    <Title responsive={false}>
					<NavControl />
					<span>知识库</span>
				    </Title>
				    <Search inline={true} fill={true} size='medium' placeHolder='Search' value={searchText} onDOMChange={this._onSearch}/>
				    {addControl}
				</Header>
				{sections}
				{layer}
		    </Box>
		);
    }
}

RepertoryIndex.propTypes = {
    index: PropTypes.object
};

let select = (state) => {
    return ({
	index: state.index,
	role: 'admin' || state.session.role
    })
};

export default connect(select)(RepertoryIndex);
