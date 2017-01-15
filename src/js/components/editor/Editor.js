import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import NOOP from "../../utils/noop";
import { initEditor } from '../../actions/sketch';

import classNames from "classnames/bind";
import { editor } from "orgdown-editor";
import ToolBar from "./ToolBar";
import Box from "grommet/components/Box";
import Header from "grommet/components/Header";
import Anchor from "grommet/components/Anchor";
import Menu from "grommet/components/Menu";
import Actions from "grommet/components/icons/base/Actions";
import LinkPreviousIcon from "grommet/components/icons/base/LinkPrevious";
import TextInput from "grommet/components/TextInput";

class Editor extends Component {
	constructor(prop, context) {
		super(prop, context);
		this.state = {
			keyChange: false,
			fullscreen: false,
			sideBySide: false
		};
		this.addEvents = this.addEvents.bind(this);
		this.eventWrapper = this.eventWrapper.bind(this);
		this.toggle = this.toggle.bind(this);
	}

	toggle(action) {
		if (action === 'toggleSideBySide') {
			this.setState({
				sideBySide: !this.state.sideBySide
			})
		} else {
			this.editor.toggle(action);
		}
	}

	componentDidUpdate() {
		this.editor.codemirror.refresh();
	}

	changeViewMode(mode) {

	}

	componentWillMount() {
		this.id = "orgdown-markdown";
	}

	componentDidMount() {
		this.createEditor();
		this.addEvents();
		this.addExtraKeys();
	}

	componentWillReceiveProps(nextProps) {
		if (!this.state.keyChange) {
			this.editor.setValue(nextProps.sketch.content || '')
		}

		this.setState({
			keyChange: false
		});
	}

	componentWillUnmount() {
		this.removeEvents();
	}

	createEditor() {
		const initialOptions = {
			element: document.getElementById(this.id)
		};

		const allOptions = Object.assign({}, initialOptions, this.props.options);
		this.editor = new editor(allOptions);
		this.editor.setValue(this.props.sketch.content || '');
	}

	eventWrapper() {
		this.setState({
			keyChange: true
		});
		let value = this.editor.getValue();
		this.props.onChange(value);
	}

	removeEvents() {
		this.editorEl.removeEventListener('keyup', this.eventWrapper);
	}

	addEvents() {
		const wrapperId = `${this.id}-wrapper`;
		const wrapperEl = document.getElementById(`${wrapperId}`);
		this.editorEl = wrapperEl.getElementsByClassName('CodeMirror')[0];
		this.editorEl.addEventListener('keyup', this.eventWrapper);
	}

	addExtraKeys() {
		// https://codemirror.net/doc/manual.html#option_extraKeys
		if (this.props.extraKeys) {
			this.editor.codemirror.setOption(
				'extraKeys',
				this.props.extraKeys
			);
		}
	}

	renderEditor() {
		const textarea = React.createElement('textarea', { id: this.id });
		return React.createElement('div', { id: `${this.id}-wrapper`, style: { height: '100%' } }, textarea);
	}

	render() {
		let viewMode = classNames({
			'fullscreen': this.state.fullscreen,
			'sideBySide': this.state.sideBySide
		});
		return (
			<Box flex={true} full={true} justify='start' direction='column'>
				<Header size='small' pad='small' justify="between">
					<Anchor icon={<LinkPreviousIcon />} path="/" a11yTitle="Return" />
					<Box>
						<TextInput id="noteTitle" style={{ border: 0, width: '100%' }} value={this.props.sketch.name} />
					</Box>
					<Box flex={true} justify='end' direction='row' responsive={false}>
						<Menu icon={<Actions />}
							dropAlign={{ "right": "right" }}>
							<Anchor href='#' className='active'>First</Anchor>
							<Anchor href='#'>Second</Anchor>
							<Anchor href='#'>Third</Anchor>
						</Menu>
					</Box>
				</Header>
				<Box>
					<ToolBar toggle={this.toggle} />
				</Box>
				<Box flex={true} pad="small" fill={true} justify='stretch'>
					<div className={viewMode} style={{ height: '100%' }}>
						{this.renderEditor()}
						{/*<Preview value={this.props.value} />*/}
					</div>
				</Box>
			</Box>
		)
	}
}

Editor.defaultProps = {
	onChange: NOOP,
	options: PropTypes.object
};

let select = (state) => {
	return ({
		sketch: state.sketch
	})
};

export default connect(select)(Editor);
