// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// import { changeSettings } from '../../actions/actions';
import LayerForm from 'grommet-templates/components/LayerForm';
import Paragraph from 'grommet/components/Paragraph';
import FormField from 'grommet/components/FormField';

class RepertoryAddForm extends Component {

    constructor (props) {
	super(props);

	this._onSubmit = this._onSubmit.bind(this);
	this._onChange = this._onChange.bind(this);

	this.state = {
	    settings: {...props.settings},
	    errors: {}
	};
    }

    _onSubmit () {
	let errors = {};
	let noErrors = true;
	if (! this.state.settings.name) {
	    errors.name = 'required';
	    noErrors = false;
	}
	// if (! this.state.settings.network.ipV4Address) {
	//   errors.ipV4Address = 'required';
	//   noErrors = false;
	// }
	if (noErrors) {
	    // this.props.dispatch(changeSettings(this.state.settings));
	    this.props.onClose();
	} else {
	    this.setState({errors: errors});
	}
    }

    _onChange (event) {
	var settings = {...this.state.settings};
	var errors = {...this.state.errors};
	const attribute = event.target.getAttribute('name');
	const value = event.target.value || '';
	const parts = attribute.split('.');
	let context = settings;
	while (parts.length > 1) {
	    context = context[parts.shift()];
	}
	context[parts[0]] = value;
	delete errors[attribute];
	this.setState({settings: settings, errors: errors});
    }

    render () {
	const { productName } = this.props;
	const { settings, errors } = this.state;

	return (
	    <LayerForm title="Add new" submitLabel="OK"
		       onClose={this.props.onClose} onSubmit={this._onSubmit}>
		<Paragraph>
		    Your {productName + "'s"} name and identity on the network.
		</Paragraph>
		<fieldset>
		    <FormField htmlFor="name" label="Name" error={errors.name}
			       help="Typically the vCenter cluster name but can be anything.">
			<input id="name" name="name" type="text"
			       value={settings.name || ''} onChange={this._onChange} />
		    </FormField>
		</fieldset>

		<fieldset>
		    <FormField htmlFor="dataCenter" label="Data center" >
			<input id="dataCenter" name="dataCenter" type="text"
			       value={settings.dataCenter || ''} onChange={this._onChange} />
		    </FormField>
		</fieldset>
	    </LayerForm>
	);
    }
}

RepertoryAddForm.propTypes = {
    onClose: PropTypes.func,
    productName: PropTypes.string,
    settings: PropTypes.object.isRequired
};

let select = (state) => ({
    productName: 'orgdown' || state.settings.productName.short,
    settings: {name: 'haha', network: {}} || state.settings.settings
});

export default connect(select)(RepertoryAddForm);
