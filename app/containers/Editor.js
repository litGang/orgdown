import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
// import {TreeSelect, Icon} from "antd";
import TextInput from 'grommet/components/TextInput';
import Select from 'grommet/components/Select';
import PreviousIcon from 'grommet/components/icons/base/Previous';
import NextIcon from 'grommet/components/icons/base/Next';
import TrashIcon from 'grommet/components/icons/base/Trash';
import Timestamp from 'grommet/components/Timestamp';
import Orgdown from "../components/Orgdown";
import {changeDoc, deleteDoc} from "../actions/docs";
import _ from "lodash";

class Editor extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			title: '',
			value: 'undefined'
		};
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			title: nextProps.currentDoc.title,
			value: nextProps.currentDoc.content
		})
	}

	onChangeNotebook(value) {
		this.setState({value});
	}

	render() {
		let treeData = [];
		this.props.notebooks.map((notebook) => {
			let treeItem = {
				label: notebook.text,
				key: notebook._id,
				value: notebook._id
			};
			treeData.push(treeItem);
		});
		return (
			<div style={{width: this.props.width}} className="orgdown-studio">
				<div className="orgdown-menubar" style={{height: this.props.height}}>
					<div className="note-menu">
						<div className="pages btn-group">
							<PreviousIcon size="small" />
							<NextIcon size="small" />
						</div>
						<div className="notebooks">
							{/*<Select size="small" placeHolder='Search' />
							<div className="dropdown">
								<div
									style={{width: 120}}
									value={this.props.currentNotebook.text}
									dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
									treeData={treeData}
									placeholder="Please select"
									treeDefaultExpandAll
									onChange={this.onChangeNotebook.bind(this)}
								/>
							</div>*/}
						</div>
						{/*<div className="note-info">NOTE_INFO</div>*/}
						<div className="note-date">
								<Timestamp value={this.props.currentDoc.updatedAt || '2017-01-07T09:13:36.410Z'} />
							</div>
						<div className="delete">
							<a className="" onClick={() => this.props.deleteDoc(this.props.currentDoc)}>
								<TrashIcon size="small" />
							</a>
						</div>
					</div>
				</div>

				<div className="orgdown-titlebar" style={{height: this.props.height}}>
					<div className="orgdown-title">
						<TextInput type="text" className="orgdown-title-input"
							   placeholder="Untitled" onChange={this.updateTitle.bind(this)}
							   value={this.state.title}/>
					</div>
				</div>

				<Orgdown key={this.props.currentDoc._id} onChange={_.debounce(this.onChangeContent.bind(this), 500)}
					options={{value: this.props.currentDoc.content}}
						 value={this.props.currentDoc.content}/>
			</div>
		);
	}

	updateTitle(event) {
		const title = event.target.value;
		this.setState({
			title: title
		});
		this.props.changeDoc({
			_id: this.props.currentDoc._id,
			title: title,
			content: this.props.currentDoc.content
		})
	}

	onChangeContent(value) {
		this.props.changeDoc({
			_id: this.props.currentDoc._id,
			title: this.props.currentDoc.title,
			content: value
		})
	}
}

function mapStateToProps(state) {
	return {
		notebooks: state.notebooks,
		currentDoc: state.currentDoc,
		currentNotebook: state.currentNotebook
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		changeDoc: changeDoc,
		deleteDoc: deleteDoc
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor);