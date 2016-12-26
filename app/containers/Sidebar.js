// @flow
import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Modal, Button, Input, Cascader} from "antd";
import classNames from "classnames";
import styles from "../styles/Sidebar.css";
import NoteTree from "../components/NoteTree";
import {addNotebook, selectNote, deleteNote, selectNotebook} from "../actions/note";


class Sidebar extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			notebook: {
				text: ''
			},
			visible: false,
		};
	}

	showModal() {
		this.setState({
			visible: true,
		});
	}

	handleOk() {
		this.props.addNotebook(this.state.notebook);
	}

	handleCancel() {
		this.setState({
			visible: false,
		});
	}

	noteBookSetting(flag, notebook) {
		if (!notebook) notebook = {text: ''};
		this.setState({visible: flag, notebook: notebook});
	}

	render() {
		const allNoteClass = classNames({
			notebook: true,
			'notebook-all': true,
			active: 'allNote' == this.props.currentNotebook._id
		});
		return (
			<div style={{width: this.props.width}} className={styles.sidebar}>
				<div className="orgdown-sidebar">
					<div className="file-tree sidebar">
						<header className="nav-header">
							<h1 className="nav-title">orgdown</h1>
						</header>
						<ul className="notebooks">
							<li className={allNoteClass} onClick={() => this.props.selectNotebook({_id: 'allNote'})}>
								<i className="fa fa-file-text"/>Notes
							</li>
							<li className="notebook notebook-tree">
								<div className="pull-right">
									<Button onClick={() => this.noteBookSetting(true, null)}
											className="add-note">Add</Button>
								</div>
								<i className="fa fa-book"/>Notebooks
							</li>
							<NoteTree data={this.props.notebooks}
								noteSetting={this.noteBookSetting.bind(this)} {...this.props}/>
							<li className="notebook">
								<i className="fa fa-trash-o"/>Trans
							</li>
						</ul>
						<div className="layout-resizer layout-resizer-sidebar"></div>
					</div>
					<Modal title="Add Notebook"
						   visible={this.state.visible}
						   onOk={this.handleOk.bind(this)}
						   confirmLoading={this.state.confirmLoading}
						   onCancel={this.handleCancel.bind(this)}>
						<Input onChange={(e) => {
							let changedNote = Object.assign(this.state.notebook, this.state.notebook, {
								text: e.target.value
							});
							this.setState(changedNote)}
						} value={this.state.notebook.text} size="large" placeholder="Notebook name"/>
					</Modal>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		notebooks: state.notebooks,
		currentNotebook: state.currentNotebook
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		addNotebook: addNotebook,
		selectNote: selectNote,
		deleteNote: deleteNote,
		selectNotebook: selectNotebook
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);