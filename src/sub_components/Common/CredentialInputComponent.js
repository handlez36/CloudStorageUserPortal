import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import TextInput from './TextInput';

/**
 * Component for displaying and handling input for multi-step authenitcation
 * Input fields, indicators, and icons are conditionally and dynamically displayed
 * based on props sent into the component.
 */
export default class CredentialInputComponent extends Component {
	constructor(props) {
		super(props);

		const lastUpdatedTimeStamp = this.lastUpdatedTimestamp;

		this.state = {
			input: '',
			lastUpdatedTimeStamp,
		};
	}

	setInitialInputValue() {
		const context = this.props.status.status;
		return context === 'USERNAME_RESET' ? this.props.status.failedUserName : '';
	}

	/**
	 * onChange handler to store input value in state
	 */
	onInputChange = event => {
		const context = this.props.status.status;
		if (context !== 'USERNAME_START') {
			this.props.onChangeCallback(event.target.value);
		}
		this.setState({ input: event.target.value });
	};

	/**
	 * The TextInput Component is a child component that includes
	 * a validation popup wrapped around an input field.
	 * In the future, this may be brought directly into this component
	 */
	receiveInputFromTextInputComponent = input => {
		this.props.inputEnterCallback(input);
	};

	/**
	 * onKeyPress handler to process input if user presses Enter
	 */
	handleKeyPress = event => {
		if (event.key === 'Enter') {
			const input = this.state.input;
			const existingUser = this.props.status.failedUserName;
			let username;

			if (input === '') {
				username = existingUser ? existingUser : '';
			} else {
				username = input;
			}

			this.props.inputEnterCallback(username);
		}
	};

	/**
	 * Resets all indicators are login failures
	 */
	resetIndiciators = () => {
		const { indicators } = this.props;
		let reference = null;

		setTimeout(() => {
			indicators.forEach(indicator => {
				reference = document.querySelector(`#${indicator}`);

				if (!reference) {
					return;
				}

				if (reference.classList.contains('SUCCESS')) {
					reference.classList.remove('SUCCESS');
				}

				if (reference.classList.contains('ERROR')) {
					reference.classList.remove('ERROR');
				}
			});
		}, 1600);
	};

	checkLoginReset = newProps => {
		const { status } = newProps.status;
		const { attemptCount } = newProps.status;

		switch (status) {
			case 'LOGIN_ERROR':
				this.setState({ input: '' });
				this.resetIndiciators();
				break;
			case 'CONFIRM_PASSWORD_SUCCESS':
				this.setState({ input: '' });
				this.resetIndiciators();

				break;
			case 'MFA_ERROR':
				this.setState({ input: '' });
				if (attemptCount > 2) {
					this.resetIndiciators();
				}
				break;
			default:
				break;
		}
	};

	/**
	 * Function responsible for updating a specific indicator after an authentication action.
	 * @param newProps - props received after a component/state update
	 */
	updateAuthStatusClass(newProps) {
		const auth_details = newProps.status;
		let status = auth_details.status;
		status = status.match(/(\w+)_(\w+)/);

		if (status && status[2] !== 'REQUEST') {
			const currentContext = newProps.status.current_context;
			const classToAdd = status[2];
			const classToRemove = classToAdd === 'SUCCESS' ? 'ERROR' : 'SUCCESS';
			let element = null;
			const indicators = this.props.indicators;
			const inputs = this.props.inputs;
			const contexts = Object.values(inputs);

			contexts.forEach((context, index) => {
				if (currentContext === context) {
					element = document.querySelector(`#${indicators[index]}`);
				}
			});

			this.animateIndicator(element, classToAdd, classToRemove);

			// Check if the authentication or registration is complete
			this.props.checkCompletionCallback();

			this.checkLoginReset(newProps);
		}
	}

	/**
	 * Toggle classes for the passed indicator element argument
	 * Animation is re-initiated by destroying and recreating the element
	 * with the required class.
	 * @param element
	 * @param classToAdd
	 * @param classToRemove
	 */
	animateIndicator(element, classToAdd, classToRemove) {
		const clonedElement = element.cloneNode(true);

		setTimeout(() => {
			element.parentNode.replaceChild(clonedElement, element);
			clonedElement.classList.remove(classToRemove);
			clonedElement.classList.add(classToAdd);
		}, 600);

		const activeInput = document.querySelector('input.active');

		if (activeInput) {
			activeInput.value = '';
		}
	}

	/**
	 * Component lifecycle method
	 * Responsible for calling the 'updateAuthStatusClass' function if it gets 'new' props
	 * @param newProps
	 */
	UNSAFE_componentWillReceiveProps(newProps) {
		if (
			!newProps.status.status.includes('REQUEST') &&
			newProps.status.timestamp !== this.lastUpdatedTimestamp
		) {
			this.lastUpdatedTimestamp = newProps.status.timestamp;
			this.updateAuthStatusClass(newProps);
		}
	}

	/**
	 * Returns JSX for the left-hand side (indicator section) of the input field
	 */
	createIndicatorElements() {
		const indicators = this.props.indicators;
		const icons = this.props.icons;
		const hasIcons = icons && icons.length > 0;

		return indicators.map((indicator, index) => {
			return (
				<div key={`icon-${index}`} className='icon'>
					{hasIcons && icons[index]}
					<div id={indicator} ref={indicator} className={`indicator ${indicator}`} />
				</div>
			);
		});
	}
	focusInput = () => {
		this.nameInput.focus();
	};
	/**
	 * Returns JSX for the input field
	 */
	createInputElements() {
		const inputs = this.props.inputs;
		const currentContext = this.props.status.status.includes('SUCCESS')
			? this.props.status.context
			: this.props.status.current_context;
		let inputId = '';

		_.map(inputs, (context, id) => {
			if (context === currentContext) {
				inputId = id;
			}
		});

		if (this.props.validationRules && this.props.validationRules[currentContext]) {
			return (
				<TextInput
					id={inputId}
					classes='input active'
					defaultValue={this.setInitialInputValue()}
					type={this.props.inputType[currentContext]}
					validationRules={this.props.validationRules[currentContext]}
					callback={this.receiveInputFromTextInputComponent}
				/>
			);
		} else {
			return (
				<input
					placeholder={this.setInitialInputValue()}
					className='input active'
					id={inputId}
					type={this.props.inputType[currentContext]}
					autocomplete={
						this.props.inputType[currentContext] === 'password' ? 'new-password' : 'off'
					}
					onChange={this.onInputChange}
					ref={input => {
						this.nameInput = input;
					}}
					onKeyPress={this.handleKeyPress}
				/>
			);
		}
	}

	render() {
		return (
			<div className='credential-input-component'>
				<div className='login_icons'>{this.createIndicatorElements()}</div>
				<div className='login_input'>{this.createInputElements()}</div>
			</div>
		);
	}
}

/**
 * icons - Array of JSX elements (primarily using <FontAwesome /> elements)
 * indicators - Array of IDs and refs for indicator elements
 * inputs - Object where key is the input ID and value is the context to display that input for
 * inputEnterCallback - Callback function to be called once a user enters input and hits 'Enter'
 * checkCompletionCallback - Callback function to be called to take action if the auth or registration is complete
 * validationRules - Object that controls validation rules per phase/context; Key=context, Value=regex expressions (object)
 *    - example: { EXISTING: {'Password must be at least 7 digits': /\.{7}/} }
 * inputType - Object that controls input types per phase/context; Key=context, Value=input type (string)
 *    - example: { EXISTING: 'password' }
 * status - Redux registration_status or auth_status objects
 */
CredentialInputComponent.propTypes = {
	icons: PropTypes.array,
	indicators: PropTypes.array.isRequired,
	inputs: PropTypes.object,
	inputEnterCallback: PropTypes.func,
	checkCompletionCallback: PropTypes.func,
	validationRules: PropTypes.object,
	inputType: PropTypes.object,
	status: PropTypes.object,
};
