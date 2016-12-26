import React, {Component} from "react";
import styles from '../styles/Editor.css';

class Toolbar extends Component {
	constructor(props, context) {
		super(props, context);
		this.editor = props.editor;

		this.toolbarBuiltInButtons = [
			{
				name: "bold",
				action: this.noop || this.toggleBold,
				className: "fa fa-bold",
				title: "Bold",
				default: true
			},
			{
				name: "italic",
				action: this.noop || this.toggleItalic,
				className: "fa fa-italic",
				title: "Italic",
				default: true
			},
			{
				name: "strikethrough",
				action: this.noop || this.toggleStrikethrough,
				className: "fa fa-strikethrough",
				title: "Strikethrough"
			},
			{
				name: "heading",
				action: this.noop || this.toggleHeadingSmaller,
				className: "fa fa-header",
				title: "Heading",
				default: true
			},
			{
				name: "heading-smaller",
				action: this.noop || this.toggleHeadingSmaller,
				className: "fa fa-header fa-header-x fa-header-smaller",
				title: "Smaller Heading"
			},
			{
				name: "heading-bigger",
				action: this.noop || this.toggleHeadingBigger,
				className: "fa fa-header fa-header-x fa-header-bigger",
				title: "Bigger Heading"
			},
			{
				name: "heading-1",
				action: this.noop || this.toggleHeading1,
				className: "fa fa-header fa-header-x fa-header-1",
				title: "Big Heading"
			},
			{
				name: "heading-2",
				action: this.noop || this.toggleHeading2,
				className: "fa fa-header fa-header-x fa-header-2",
				title: "Medium Heading"
			},
			{
				name: "heading-3",
				action: this.noop || this.toggleHeading3,
				className: "fa fa-header fa-header-x fa-header-3",
				title: "Small Heading"
			},
			{
				className: "separator",
				name: "separator-1"
			},
			{
				name: "code",
				action: this.noop || this.toggleCodeBlock,
				className: "fa fa-code",
				title: "Code"
			},
			{
				name: "quote",
				action: this.noop || this.toggleBlockquote,
				className: "fa fa-quote-left",
				title: "Quote",
				default: true
			},
			{
				name: "unordered-list",
				action: this.noop || this.toggleUnorderedList,
				className: "fa fa-list-ul",
				title: "Generic List",
				default: true
			},
			{
				name: "ordered-list",
				action: this.noop || this.toggleOrderedList,
				className: "fa fa-list-ol",
				title: "Numbered List",
				default: true
			},
			{
				name: "clean-block",
				action: this.noop || this.cleanBlock,
				className: "fa fa-eraser fa-clean-block",
				title: "Clean block"
			},
			{
				className: "separator",
				name: "separator-2"
			},
			{
				name: "link",
				action: this.noop || this.drawLink,
				className: "fa fa-link",
				title: "Create Link",
				default: true
			},
			{
				name: "image",
				action: this.noop || this.drawImage,
				className: "fa fa-picture-o",
				title: "Insert Image",
				default: true
			},
			{
				name: "table",
				action: this.noop || this.drawTable,
				className: "fa fa-table",
				title: "Insert Table"
			},
			{
				name: "horizontal-rule",
				action: this.noop || this.drawHorizontalRule,
				className: "fa fa-minus",
				title: "Insert Horizontal Line"
			},
			{
				className: "separator",
				name: "separator-3"
			},
			{
				name: "preview",
				action: this.noop || this.togglePreview,
				className: "fa fa-eye no-disable",
				title: "Toggle Preview",
				default: true
			},
			{
				name: "side-by-side",
				action: this.noop || this.toggleSideBySide,
				className: "fa fa-columns no-disable no-mobile",
				title: "Toggle Side by Side",
				default: true
			},
			// "fullscreen": {
			// 	name: "fullscreen",
			// 	action: this.noop || this.toggleFullScreen,
			// 	className: "fa fa-arrows-alt no-disable no-mobile",
			// 	title: "Toggle Fullscreen",
			// 	default: true
			// },
			{
				className: "separator",
				name: "separator-4"
			},
			{
				name: "guide",
				action: "https://simplemde.com/markdown-guide",
				className: "fa fa-question-circle",
				title: "Markdown Guide",
				default: true
			},
			{
				name: "separator"
			},
			{
				name: "undo",
				action: this.noop || this.undo,
				className: "fa fa-undo no-disable",
				title: "Undo"
			},
			{
				name: "redo",
				action: this.noop || this.redo,
				className: "fa fa-repeat no-disable",
				title: "Redo"
			},
		];
	}

	noop() {

	}

	render() {
		return (
			<div className={styles.editorToolbar}>
				{
					this.toolbarBuiltInButtons.map((button) => {
						if (button.default)
							return <a key={button.name} className={button.className} />;
						if (button.name === "separator")
							return <i key={button.name} className={styles.separator}/>
					})
				}
			</div>
		)

	}
}

export default Toolbar;
