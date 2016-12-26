// @flow
import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import { TreeSelect, Icon, Input } from 'antd';
const Search = Input.Search;
import styles from "../styles/DocList.css";
import {selectDoc, addDoc1, deleteDoc, sendAsEmail, exportToPdf} from "../actions/docs";
import Doc from "../components/Doc";

class DocList extends Component {

    selectDoc(doc) {
        this.props.selectDoc(doc);
    }

    render() {
        return (
            <div style={{width: this.props.width}} className={styles.doclist}>
                <div className="orgdown-docs" style={{width: this.props.width}}>
                    <div className="note-list">
                        <div className="note-list-header">
                            <div className="title">
                                {this.props.currentNotebook._id == 'allNote' ? 'All Notes' : this.props.currentNotebook.text}
                            </div>
                            {
                                this.props.currentNotebook._id == 'allNote' ?
                                    '' : <div className={styles.addDoc} onClick={this.props.addDoc}><Icon type="addfile" /></div>
                            }
                        </div>
                        <div className="note-list-search">
                            <Search className={styles.searchBox} placeholder="input search text" autosize={true} onSearch={value => console.log(value)} />
                        </div>
                        <div className="note-list-items">
                            <ul>
                                {
                                    this.props.docs.map((doc) => {
                                        return <Doc key={doc._id} data={doc} {...this.props} />
                                    })
                                }
                            </ul>
                        </div>
                        <div className="layout-resizer layout-resizer-note-list"></div>
                    </div>
                </div>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        docs: state.docs || [],
        currentDoc: state.currentDoc,
        currentNotebook: state.currentNotebook
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        selectDoc: selectDoc,
        addDoc: addDoc1,
        deleteDoc: deleteDoc,
		sendAsEmail: sendAsEmail,
		exportToPdf: exportToPdf
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DocList);