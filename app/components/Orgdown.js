// @flow
import React, {Component} from "react";
import NOOP from "../utils/noop";
import Orgdown from "orgdown-editor";
import ToolBar from './ToolBar.js';
import Preview from "./Preview";

export default React.createClass({

    getInitialState: function () {
        return {
            keyChange: false
        }
    },

    getDefaultProps: function () {
        return {
            onChange: NOOP,
            options: {}
        }
    },

    componentWillMount: function () {
        this.id = "orgdown-markdown";
    },

    componentDidMount: function () {
        this.createEditor();
        this.addEvents();
        this.addExtraKeys();
    },

    componentWillReceiveProps: function (nextProps) {
        if (!this.state.keyChange) {
            this.editor.setValue(nextProps.value || '')
        }

        this.setState({
            keyChange: false
        });
    },

    componentWillUnmount: function () {
        this.removeEvents();
    },

    createEditor: function () {
        const initialOptions = {
            element: document.getElementById(this.id)
        };

        const allOptions = Object.assign({}, initialOptions, this.props.options);
        this.editor = new Orgdown.editor(allOptions);
        this.editor.setValue(this.props.value || '');
    },

    eventWrapper: function () {
        this.setState({
            keyChange: true
        });
		let value = this.editor.getValue();
		this.props.onChange(value);
    },

    // eventToolbar: function () {
    //     this.props.onChange(this.editor.getValue());
    // },

    removeEvents: function () {
        this.editorEl.removeEventListener('keyup', this.eventWrapper);
        // this.editorToolbarEl.removeEventListener('click', this.eventToolbar);
    },

    addEvents: function () {
        const wrapperId = `${this.id}-wrapper`;
        const wrapperEl = document.getElementById(`${wrapperId}`);

        this.editorEl = wrapperEl.getElementsByClassName('CodeMirror')[0];
        // this.editorToolbarEl = wrapperEl.getElementsByClassName('editor-toolbar')[0];

        this.editorEl.addEventListener('keyup', this.eventWrapper);
        // this.editorToolbarEl.addEventListener('click', this.eventToolbar);
    },

    addExtraKeys: function () {
        // https://codemirror.net/doc/manual.html#option_extraKeys
        if (this.props.extraKeys) {
            this.editor.codemirror.setOption(
                'extraKeys',
                this.props.extraKeys
            );
        }
    },

	renderEditor: function () {
		const textarea = React.createElement('textarea', {id: this.id});
		return React.createElement('div', {id: `${this.id}-wrapper`}, textarea);
	},

	renderToolbar: function() {
    	return (
			<ToolBar editor={this.editor}/>
		)
	},

	render: function () {
		return (
            <div className="orgdown-editor">
				{this.renderToolbar()}
				{this.renderEditor()}
				<Preview value={this.props.value}/>
            </div>
        )
    }
});