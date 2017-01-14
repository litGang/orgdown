// @flow
import React, { Component } from "react";
import NOOP from "../utils/noop";
import Orgdown from "orgdown-editor";
import ToolBar from './ToolBar.js';
import Preview from "./Preview";
import styles from '../styles/Editor.css';
import toolbarData from '../config/toolbar.json';
import classNames from 'classnames/bind';

let orgdownStyle = classNames.bind(styles);

export default class Hello extends Component {
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
        if(action === 'toggleSideBySide') {
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
            this.editor.setValue(nextProps.value || '')
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
        this.editor = new Orgdown.editor(allOptions);
        this.editor.setValue(this.props.value || '');
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
        return React.createElement('div', { id: `${this.id}-wrapper` }, textarea);
    }

    renderToolbar() {
        return (
            <div className={styles.editorToolbar}>
                {
                    toolbarData.map((button) => {
                        if (button.default)
                            return <a onClick={() => this.toggle(button.action)} key={button.name} className={button.className} />;
                        if (button.className == "separator")
                            return <i key={button.name} className={styles.separator} />
                    })
                }
            </div>
        )
    }

    render() {
        let viewMode = orgdownStyle({
            'editorWrapper': true,
			'fullscreen': this.state.fullscreen,
			'sideBySide': this.state.sideBySide
		});
        return (
            <div className="orgdown-editor">
                <ToolBar toggle={this.toggle} />
                <div className={viewMode}>
                    {this.renderEditor()}
                    <Preview value={this.props.value} />
                </div>
            </div>
        )
    }
}
Hello.defaultProps = {
    onChange: NOOP,
    options: {}
}