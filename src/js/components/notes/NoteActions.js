// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
// import { powerOnVm } from '../../actions/actions';
import Header from "grommet/components/Header";
import Heading from "grommet/components/Heading";
import Box from "grommet/components/Box";
import Sidebar from "grommet/components/Sidebar";
import Menu from "grommet/components/Menu";
import Button from "grommet/components/Button";
import SkipLinkAnchor from "grommet/components/SkipLinkAnchor";
import CloseIcon from "grommet/components/icons/base/Close";
import PowerIcon from "grommet/components/icons/base/Power";
import EditIcon from "grommet/components/icons/base/Edit";
import TrashIcon from "grommet/components/icons/base/Trash";
import StreetViewIcon from "grommet/components/icons/base/StreetView";
import ViewIcon from "grommet/components/icons/base/View";
import NoteActionRemove from "./NoteActionRemove";

const LAYERS = {
	busy: NoteActionRemove
};

class NoteActions extends Component {

	constructor(props) {
		super(props);
		this._onLayerOpen = this._onLayerOpen.bind(this);
		this._onLayerClose = this._onLayerClose.bind(this);

		this.state = {
			layerName: undefined
		};
	}

	//
	_onLayerOpen(layerName) {
		this.setState({ layerName: (this.props.busy ? 'busy' : layerName) });
	}

	_onLayerClose() {
		this.setState({ layerName: undefined });
		if (this.props.onClose) {
			this.props.onClose();
		}
	}

	render() {
		const {note, onClose} = this.props;

		let name;
		let closeControl;
		if (onClose) {
			name = <Heading tag="h3" margin='none'>{note.title}</Heading>;
			closeControl = (
				<Button icon={<CloseIcon />} onClick={onClose} a11yTitle={`Close ${note.title}`} />
			);
		}

		let stateControls;
		if (true) {
			stateControls = [
				<Button key="edit" align="start" plain={true}
					icon={<EditIcon />} label="Edit" path={`/editor/${note._id}`} />,
				<Button key="console" href="https://tbd" align="start" plain={true}
					icon={<ViewIcon />} label="Viste"
					target="vmConsole" />,
				<Button key="restart" align="start" plain={true}
					icon={<StreetViewIcon />} label="Publish"
					onClick={this._onLayerOpen.bind(this, 'busy')} />,
				<Button key="powerOff" align="start" plain={true}
					icon={<TrashIcon />} label="Remove"
					onClick={this._onLayerOpen.bind(this, 'busy')} />
			];
		} else {
			stateControls = (
				<Button align="start" plain={true}
					icon={<PowerIcon />} label="Power On"/>
			);
		}

		let layer;
		if (this.state.layerName) {
			let Component = LAYERS[this.state.layerName];
			layer = (
				<Component note={note}
					onClose={this._onLayerClose} />
			);
		}

		return (
			<Sidebar size="medium" colorIndex="light-2">
				<SkipLinkAnchor label="Right Panel" />
				<Header pad={{ horizontal: 'medium', vertical: 'medium' }}
					justify="between" size="large">
					{name}
					{closeControl}
				</Header>
				<Box pad="medium">
					<Menu>
						{stateControls}
					</Menu>
				</Box>
				{layer}
			</Sidebar>
		);
	}
}

NoteActions.propTypes = {
	category: PropTypes.string.isRequired,
	onClose: PropTypes.func,
	note: PropTypes.object.isRequired
};

NoteActions.contextTypes = {
	router: PropTypes.object
};

export default connect()(NoteActions);
