// @flow
import React, {Component} from "react";
import classNames from "classnames";
import {remote} from "electron";
import stringUtils from "../utils/strings";
import styles from "../styles/DocList.css";
const {Menu, MenuItem, shell} = remote;

export default class Doc extends Component {

	constructor(props, context) {
		super(props, context);

		this.menu = new Menu();
		this.menu.append(new MenuItem({
			label: 'Delete Document', click() {
				props.deleteDoc(props.data);
				// props.deleteNote(props);
			}
		}));

		this.menu.append(new MenuItem({
			label: 'Send as Email', click() {
				props.sendAsEmail();
			}
		}));

		// this.menu.append(new MenuItem({
		// 	label: 'Export to PDF', click() {
		// 		props.exportToPdf();
		// 	}
		// }));
	}

	beautifyContent(content, len) {
		if (!content) return;
		content = content.replace(/\n/g, '');
		content = stringUtils.subString(content, len);
		content = content.replace(/#|>|-{1,6}/g, '');
		return content;

	}

	render() {
		let docClass = classNames({
			'note-item': true,
			active: this.props.data._id == this.props.currentDoc._id
		});
		return (
			<li onClick={() => this.props.selectDoc(this.props.data)}
				onContextMenu={() => this.showContextMenu(this.props.data)}
				className={docClass}>
				<div className={styles.noteTitle}>{this.beautifyContent(this.props.data.title, 20)}</div>
				<div className={styles.noteContent}>{this.beautifyContent(this.props.data.content, 60)}</div>
			</li>
		)
	}

	showContextMenu() {
		this.menu.popup(remote.getCurrentWindow());
	}
}