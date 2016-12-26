import React, {Component} from "react";
import classNames from "classnames";
import styles from "../styles/NoteTree.css";
import {remote} from "electron";
const {Menu, MenuItem, dialog} = remote;

class NoteTree extends Component {
    componentWillMount() {
    }

    render() {
        return (
            <ul className={styles.tree}>
                {
                    this.props.data.map((note) => {
                        return <NoteBook key={note._id} note={note} {...this.props}/>
                    })
                }
            </ul>
        )
    }
}

class NoteBook extends Component {
    constructor(props, context) {
        super(props, context);

        this.menu = new Menu();
        this.menu.append(new MenuItem({
            label: 'Edit Notebook',
            click() {
                props.noteSetting(true, props.note);
            }
        }));
        this.menu.append(new MenuItem({type: 'separator'}));
        this.menu.append(new MenuItem({
            label: 'Delete Notebook', click() {
                dialog.showMessageBox(
                    remote.getCurrentWindow(),
                    {
                        title: 'Confirm',
                        message: 'Are you sure delete this notebook?',
                        type: 'question', buttons: ['Ok', 'Cancel']
                    },
                    function (res) {
                        !res && props.deleteNote(props.note);
                    })
            }
        }));
    }

    render() {
        const hasChildren = this.props.note.children;
        const noteClass = classNames({
            notebook: true,
            active: this.props.note._id == this.props.currentNotebook._id
        });
        return (
            <li className={noteClass} onClick={() => {
                this.props.selectNotebook(this.props.note);
            }} onContextMenu={(item) => this.showContextMenu(item)}>
                {hasChildren ? <i className="fa fa-clone"/> : <i className="fa fa-eye"/>}
                {this.props.note.text}
                {/*{hasChildren ? NoteTree.renderNote(note.children) : console.log('123123')}*/}
            </li>
        )
    }

    showContextMenu() {
        this.menu.popup(remote.getCurrentWindow());
    }
}

export default NoteTree;