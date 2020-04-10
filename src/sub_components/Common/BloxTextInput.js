import React, { Component } from 'react';
import { shape, string, array, number, func, any, oneOfType } from 'prop-types';
import MaskedInput from 'react-text-mask';
import { PHONEMASK } from 'utils/CommonConstants';
import { Utils } from 'services/utils';
import { INPUT_TYPES } from 'utils/CommonConstants';
import ScrollView from './COMPANYScrollViewNew';

const CDN_URL = process.env.REACT_APP_CDN_URL;
const Checkmark = `${CDN_URL}common/icons-forms-check.svg`;
const DEFAULT_DEFAULT_CHARACTER_COUNT_MESSAGE = {
	start: 'Characters left',
	mid: 'Almost there!',
	end: 'Way to go!',
};
const MAX_TEXT_AREA_HEIGHT = Utils.scalePxUsingVh(140);
let timeout = null;

class COMPANYTextInput extends Component {
	state = {
		active: this.props.active || false,
		dirty: false,
		startingHeight: -1,
		errors: null,
		value: null,
	};

	setActive = () => {
		this.setState({ active: !this.state.active, dirty: false });
	};

	setFieldAsDirty = () => {
		const { dirty } = this.state;

		if (!dirty) {
			this.setState({ dirty: true });
		}
	};

	checkTextAreaHeight = () => {
		const { startingHeight } = this.state;
		const { maxTextAreaHeight } = this.props;
		const activeField = this.refs['active_field'];
		const textarea = this.refs[this.getRef()];
		const maxHeight = maxTextAreaHeight || MAX_TEXT_AREA_HEIGHT;
		let newHeight;

		/** Temporarily set textarea height to 0 to accurately estimate scroll height */
		textarea.setAttribute('style', 'height: 0px');
		if (textarea.scrollHeight < startingHeight) {
			newHeight = startingHeight;
		} else if (textarea.scrollHeight > maxHeight) {
			newHeight = maxHeight;
		} else {
			newHeight = textarea.scrollHeight;
		}

		/** Set textarea and wrapping element to true scrollheight up to a max height */
		activeField.setAttribute('style', `height: ${newHeight}px`);
		textarea.setAttribute('style', `height: ${textarea.scrollHeight}px`);
	};

	onBlur = () => {
		const { value, validations, characterMinLength, markComplete, name } = this.props;
		const { dirty } = this.state;
		const errors = this.getValidationErrors(value, validations, dirty, characterMinLength);

		if (dirty && !errors) {
			markComplete(name, true);
		} else if (dirty && errors) {
			markComplete(name, false);
		}
	};

	onFocus = () => {
		const input = this.refs[this.getRef()];
		if (this.props.onFocus) {
			this.props.onFocus();
		}
		//This hack resets the cursor back to the beginning of the input
		//let element = document.getElementsByClassName('requestorPhone').item(0);
		if (this.props.mask === PHONEMASK) {
			const value = Utils.scrubPhoneNumber(input.inputElement.value);

			if (value === '' || value === undefined || value === null || value === 'undefined') {
				input.inputElement.value = '';
			}
		}

		if (input) {
			input.placeholder = '';
		}
	};

	onClick = event => {
		if (this.props.onClick) {
			this.props.onClick(event);
		}
	};

	onChange = event => {
		const { onChange, type, validations, characterMinLength, markComplete, name } = this.props;

		// this.setState({ value: event.target.value });

		this.setFieldAsDirty();
		if (type === INPUT_TYPES.TEXTAREA) {
			this.checkTextAreaHeight();
		}
		onChange(event);

		const errors = this.getValidationErrors(
			event.target.value,
			validations,
			true,
			characterMinLength,
		);
		errors ? markComplete(name, false) : markComplete(name, true);
	};

	getValidationErrors(content, validations, dirty, characterMinLength) {
		if ((!validations && !characterMinLength) || !dirty) {
			return null;
		}

		let validationContent = content;
		if (this.props.mask === PHONEMASK) {
			validationContent = Utils.scrubPhoneNumber(validationContent);
		}

		const errors = [];
		validations.forEach(validation => {
			if (!validationContent.match(validation.pattern)) {
				errors.push(
					<div key={`validation-${validation.message}`} className='message'>
						{validation.message}
					</div>,
				);
			}
		});

		if (characterMinLength && validationContent.length < characterMinLength) {
			errors.push(
				<div key='validation-min-count' className='message' style={{ display: 'none' }}>
					Minimum character count not met
				</div>,
			);
		}

		if (this.props.unique) {
			const sameValue = this.props.unique(content);
			if (sameValue) {
				errors.push(
					<div key='validation-unique' className='message'>{`'${content}' already used.`}</div>,
				);
			}
		}

		return errors.length > 0 ? errors : null;
	}

	getRef = () => {
		const { label } = this.props;

		return `${label.replace(' ', '')}-field`;
	};

	displayField = type => {
		const {
			id,
			placeholder,
			value,
			name,
			mask,
			customClass = '',
			disabled = false,
			onClick,
		} = this.props;

		if (mask !== '' && mask !== null && mask !== undefined) {
			return (
				<MaskedInput
					name={name}
					mask={mask}
					ref={this.getRef()}
					onChange={this.onChange}
					className={`${name} ${customClass}`}
					value={value}
					guide={false}
					disabled={disabled}
					showMask
					placeholder={placeholder}
					onFocus={this.onFocus}
					onBlur={this.onBlur}
					onClick={this.onClick}
					onKeyUp={this.props.onKeyUp}
					onKeyDown={this.props.onKeyDown}
				/>
			);
		} else if (type === INPUT_TYPES.INPUT) {
			const valueToDisplay =
				this.state.dirty && value === '' && this.props.setPlaceholderAsValue ? placeholder : value;
			return (
				<input
					id={id || `id-${name}`}
					name={name}
					ref={this.getRef()}
					onChange={this.onChange}
					className={`${name} ${customClass}`}
					value={valueToDisplay}
					placeholder={placeholder}
					onClick={onClick}
					onFocus={this.onFocus}
					onBlur={this.onBlur}
					onKeyUp={this.props.onKeyUp}
					onKeyDown={this.props.onKeyDown}
					maxLength={this.props.maxlength ? this.props.maxlength : ''}
				/>
			);
		} else {
			return (
				<ScrollView purple>
					<textarea
						name={name}
						className={`text-area-${name}`}
						ref={this.getRef()}
						onChange={this.onChange}
						value={value}
						placeholder={placeholder}
						onFocus={this.onFocus}
						onBlur={this.onBlur}
					/>
				</ScrollView>
			);
		}
	};

	displayCharacterCountMessage = count => {
		const { value, characterMinMessages } = this.props;
		const percentComplete = value.length / count;
		let msg;

		if (percentComplete >= 1) {
			msg = characterMinMessages.end;
		} else if (percentComplete <= 0.5) {
			msg = characterMinMessages.start;
		} else {
			msg = characterMinMessages.mid;
		}

		return msg;
	};

	displayCharacterCount = count => {
		const { value } = this.props;
		let validationValue = value;
		if (this.props.mask === PHONEMASK) {
			validationValue = Utils.scrubPhoneNumber(validationValue);
		}

		const charactersLeft = count - validationValue.length;

		return Math.max(charactersLeft, 0);
	};

	showCheckmark = errors => {
		const { hideCheckmark, setPlaceholderAsValue, dirty, value } = this.props;

		return !hideCheckmark && (setPlaceholderAsValue || dirty || value !== '') && !errors;
	};

	componentDidUpdate() {
		const { type, active: incomingActive } = this.props;
		const { active: currentActive, startingHeight } = this.state;

		if (type === INPUT_TYPES.TEXTAREA && currentActive && startingHeight === -1) {
			timeout = setTimeout(() => {
				const textarea = this.refs[this.getRef()];
				const startingHeight = textarea.clientHeight;
				this.setState({ startingHeight });
			}, 200);
		}

		if (incomingActive && !currentActive) {
			this.setState({ active: true });
		}
	}

	componentWillUnmount() {
		clearTimeout(timeout);
	}

	render() {
		const {
			label,
			value,
			type,
			validations,
			characterMinLength,
			showCharacterCount,
			labelSubText,
		} = this.props;
		const { active, dirty } = this.state;
		const errors = this.getValidationErrors(
			value,
			validations,
			dirty,
			characterMinLength,
			showCharacterCount,
		);
		const isTextArea = type === 'TEXTAREA';
		return (
			<div
				className={`COMPANY-text-input ${isTextArea ? 'text-area-field' : ''} ${
					active ? 'active' : ''
				} ${errors ? 'error' : ''}`}
			>
				<div className='label-row'>
					<label htmlFor={`${label}-field`} onClick={this.setActive}>
						{label}
						{labelSubText && <span className='subtext'>{` ${labelSubText}`}</span>}
					</label>
					<img
						className={`checkmark ${this.showCheckmark(errors) ? 'success' : ''}`}
						src={Checkmark}
						alt=''
					/>
				</div>
				<div className='active-field' ref='active_field'>
					{this.displayField(type)}
				</div>
				<div className='validation-row'>
					<div className='validation-messages'>{errors && errors}</div>
					{characterMinLength && (
						<div className={`character-count ${errors ? 'error' : ''}`}>
							<div className='message'>{this.displayCharacterCountMessage(characterMinLength)}</div>
							<div className='counter'>{this.displayCharacterCount(characterMinLength)}</div>
						</div>
					)}
				</div>
			</div>
		);
	}
}

COMPANYTextInput.propTypes = {
	type: string,
	label: string.isRequired,
	name: string.isRequired, // For textarea, please ensure name is unique for each expandable section component
	value: any,
	placeholder: oneOfType([string, number]),
	validations: array,
	onChange: func,
	markComplete: func,
	characterMinLength: number,
	characterMinMessages: shape({
		start: string,
		mid: string,
		end: string,
	}),
};

COMPANYTextInput.defaultProps = {
	type: INPUT_TYPES.INPUT,
	characterMinMessages: DEFAULT_DEFAULT_CHARACTER_COUNT_MESSAGE,
	validations: [],
	markComplete: () => {},
};

export default COMPANYTextInput;
