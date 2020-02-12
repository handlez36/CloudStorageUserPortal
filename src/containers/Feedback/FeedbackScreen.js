import React, { Component } from 'react';

export default class TextInput extends Component {
	constructor(props) {
		super(props);

		this.state = {
			input: '',
		};
	}

	render() {
		return <div />;
	}
}

/**
 * id - Id of the input field
 * name - Name of the input field
 * type - Type of the input field
 * Placeholder - Placeholder text for the input field
 * DefaultValue - Default value for input field
 * Classes - Classes to apply to the input field
 * Label - Label for the input field
 * validationRules - Object that controls validation rules; Key=Validation Description, Value=regex expressions
 *    - example: {'Password must be at least 7 digits': /\.{7}/}
 * callback - Callback function to be called once a user enters input and hits 'Enter' 
//  */
// TextInput.propTypes = {
//     id:                 PropTypes.string,
//     name:               PropTypes.string,
//     type:               PropTypes.string,
//     placeholder:        PropTypes.string,
//     defaultValue:       PropTypes.string,
//     classes:            PropTypes.string,
//     label:              PropTypes.string,
//     validationRules:    PropTypes.object,
//     callback:           PropTypes.func
// }
