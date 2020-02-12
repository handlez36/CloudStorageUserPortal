import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'react-tippy';
import 'react-tippy/dist/tippy.css';

/**
 * Component that wraps an input field in a validation wrapper to show real-time validation
 * TODO: Currently the validation modal displays with absolute positioning.
 * Update to position this relative to the input
 */
export default class TextInput extends Component {
	constructor(props) {
		super(props);

		this.state = {
			input: '',
			show: false,
			validationRules: this.props.validationRules,
			validationString: this.formInitialRequirementsJSX(this.props.validationRules),
			inputValid: false,
			id: this.props.id,
		};
	}

	/**
	 * Initially set the list of validation rules to show when the user first focuses on the input
	 * @param rules - validation rules
	 */
	formInitialRequirementsJSX(rules) {
		if (!rules) return <div>No validation rules</div>;

		const req = [];

		for (const [k] of Object.entries(rules)) {
			req.push(<div key={k}>{k}</div>);
		}
		return req.length > 0 ? req : <div>No validation rules</div>;
	}

	/**
	 * onChange event handler that checks and updates validation rule status as the user types input
	 */
	onChange = event => {
		const highlightRules = document.getElementsByClassName('invalid');
		if (!this.state.validationRules) return;

		const rules = this.state.validationRules;
		const input = event.target.value;
		let elClass = '';
		let jsx = [];
		let matches = 0;

		for (const [ruleText, ruleRegex] of Object.entries(rules)) {
			elClass = 'rule ';
			if (input.match(ruleRegex)) {
				elClass += 'valid';
				matches++;
			} else {
				elClass += 'invalid';
			}
			jsx.push(
				<div key={ruleText} className={elClass}>
					{ruleText}
				</div>,
			);
		}
		jsx = <div className='tooltip-div'>{jsx}</div>;

		this.setState({
			validationString: jsx,
			input: event.target.value,
			inputValid: matches === Object.keys(rules).length,
		});
		if (event.target.value.length === 0) {
			if (highlightRules) {
				for (let i = 0; i <= highlightRules.length - 1; i++) {
					highlightRules[i].classList.add('show');
				}
			}
		} else {
			if (highlightRules) {
				for (let i = 0; i <= highlightRules.length - 1; i++) {
					highlightRules[i].classList.remove('show');
				}
			}
		}
	};

	/**
	 * onKeyPress event handler for processing input when the user hits Enter
	 */
	onKeyPress = event => {
		if (event.key === 'Enter' && this.state.inputValid) {
			this.sendInputToParent(this.state.input);
		}
	};

	/**
	 * Function responsible for sending input back to the parent component
	 */
	sendInputToParent(input) {
		const callback = this.props.callback;

		callback(input);
	}

	componentDidUpdate() {
		const input = document.querySelector(`#${this.props.id}`);

		input.value = this.props.defaultValue;

		if (this.props.id !== this.state.id) {
			this.setState({
				input: '',
				validationRules: this.props.validationRules,
				validationString: this.formInitialRequirementsJSX(this.props.validationRules),
				inputValid: false,
				id: this.props.id,
			});
		}
	}

	setIsOpen = tippyState => {
		const input = document.querySelector('input');
		const show = input === document.activeElement ? true : tippyState;
		this.setState({ show });
	};

	render() {
		const { show } = this.state;

		const type = this.props.type;
		const placeholder = this.props.placeholder;
		const classes = this.props.classes;
		const id = this.props.id || `component-${Math.random() * 20}`;
		const name = this.props.name;
		const label = this.props.label;
		const location = this.props.location;

		return (
			<div>
				<Tooltip
					html={this.state.validationString}
					position={location || 'right'}
					theme='dark'
					open={show}
					onRequestClose={() => this.setIsOpen(false)}
				>
					<label htmlFor={name}>{label}</label>
					<input
						ref={id}
						id={id}
						name={name}
						type={type}
						placeholder={placeholder}
						onChange={this.onChange}
						onKeyPress={this.onKeyPress}
						value={this.state.input}
						onClick={() => this.setIsOpen(true)}
						className={`text-field form-control ${classes}`}
					/>
				</Tooltip>
			</div>
		);
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
 */
TextInput.propTypes = {
	id: PropTypes.string,
	name: PropTypes.string,
	type: PropTypes.string,
	placeholder: PropTypes.string,
	defaultValue: PropTypes.string,
	classes: PropTypes.string,
	label: PropTypes.string,
	validationRules: PropTypes.object,
	callback: PropTypes.func,
};
