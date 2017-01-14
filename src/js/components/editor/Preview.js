import React, {Component} from "react";
// import render from "orgdown-markdown";
import Section from 'grommet/components/Section';
import Markdown from 'grommet/components/Markdown';
import styles from '../../../style/Preview.css'

class Preview extends Component {
    constructor(prop, context) {
	super(prop, context);
	this.state = {
	    html: prop.value || ''
	};
	console.log(this.state.html)
	// this.renderEngin = new markdownRender({element: '#preview'})
    }

    componentWillReceiveProps(nextProps) {
	// let html = render(nextProps.value || '');
	this.setState({
	    html: nextProps.value
	});
    }

    render() {
	return (
	    <div id="preview" className={styles.preview}>
		<Section><Markdown content={this.state.html} /></Section>
	    </div>
	)

    }
}

export default Preview;
