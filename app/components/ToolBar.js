// @flow
import React, { Component } from "react";
import styles from '../styles/Editor.css';
// import iconStyle from '../styles/ToolBar.css';
import toolbarData from '../config/toolbar.json';
import classNames from 'classnames/bind';

let testStyel = classNames.bind(styles);

class Icon extends Component {
    constructor(prop, context) {
        super(prop, context);
        this.state = {
            clicked: false
        }
        this.button = prop.button;
        this.click = this.click.bind(this);
    }

    click() {
        this.setState({
            clicked: !this.state.clicked
        })
        this.props.toggle(this.button.action);
    }

    render() {
        let iconState = testStyel(this.button.className, {
			'active': this.state.clicked
		});

        return <a onClick={this.click} key={this.button.name} className={iconState} />
    }
}

class Separator extends Component {

    render () {
       return <i className={styles.separator} />
    }
}

class ToolBar extends Component {

    render() {
        return (
            <div className={styles.editorToolbar}>
                {
                    toolbarData.map((button) => {
                        if (button.default)
                            return <Icon className="orgdown-icon" button={button} {...this.props} />;
                        if (button.className == "separator")
                            return <Separator />
                    })
                }
            </div>
        )
    }
}

ToolBar.defaultProps = {
    
}

export default ToolBar;