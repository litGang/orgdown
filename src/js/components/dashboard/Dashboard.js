import React, { Component } from "react";

class Dashboard extends Component {
	constructor(prop, context) {
		super(prop, context);
		this.state = {
			name: 'wangyg'
		}
	}

	render() {
		return (
			<div>
				<h1>hello {this.state.name}</h1>
			</div>
		);
	}
}

export default Dashboard;