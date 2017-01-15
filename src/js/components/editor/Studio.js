import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import debounce from 'debounce';
import { initEditor } from '../../actions/sketch';
import { nodeChange } from '../../actions/note';
import Box from "grommet/components/Box";
import Header from "grommet/components/Header";
import Anchor from "grommet/components/Anchor";
import Menu from "grommet/components/Menu";
import Actions from "grommet/components/icons/base/Actions";
import TextInput from "grommet/components/TextInput";
import GoBack from '../GoBack';
import Editor from "./Editor";

class Studio extends Component {

	constructor(prop) {
		super(prop);
		this.state = {
			name: '',
			content: '',
			fileType: '',
		}
		this._onChange = this._onChange.bind(this);
	}

	componentDidMount() {
		const {params, sketch, dispatch} = this.props;
		var nodeId = params.nodeId;
		// load display node
		dispatch(initEditor(nodeId));
	}

	componentWillReceiveProps(nextProps) {
		const {sketch} = nextProps;
		document.title = sketch.name;
		let newNode = Object.assign({}, sketch);
		this.setState(newNode);
	}

	componentWillUnmount() {
		document.title = 'orgdown';
	}

	_onChange(node) {
		const {sketch, dispatch} = this.props;
		let newNode = Object.assign({}, this.state, node);
		document.title = newNode.name;
		this.setState(newNode);
		dispatch(nodeChange(newNode));
	}

	render() {
		return (
			<Box flex={true} full={true} justify='start' direction='column'>
				<Header size='small' pad='small' justify="between">
					<GoBack />
					<Box>
						<TextInput onDOMChange={(event)=>{this._onChange({name: event.target.value})}} 
							style={{ border: 0, width: '100%' }} value={this.state.name} />
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
				<Editor onChange={debounce(this._onChange, 1000)} sketch={this.props.sketch} />
			</Box>
			
		);
	}
}

let select = (state) => {
	return ({
		sketch: state.sketch
	})
};

export default connect(select)(Studio);