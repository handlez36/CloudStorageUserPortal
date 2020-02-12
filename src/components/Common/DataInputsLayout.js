import React, { Component } from 'react';
import MaskedInput from 'react-text-mask';

export default class DataInputsLayout extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isChangedHandler: props.isChangedHandler,
			onBlurHandler: props.onBlurHandler,
			onFocusHandler: props.onFocusHandler,
		};
	}

	createInputField(field) {
		const defaultChangeHandler = () => {};
		const defaultFocusHandler = () => {};

		const className1 = field.error ? ' blue-border' : ' ';
		const className = field.active ? 'blue-animation' : '';

		if (field.readonly) {
			return (
				<input
					key={`input-${field.propName}`}
					name={field.name}
					ref={field.propName}
					value={field.value}
					className={this.props.className}
					onBlur={this.state.onBlurHandler || defaultChangeHandler}
					onChange={this.state.isChangedHandler || defaultChangeHandler}
					data-fieldname={field.propName}
					disabled
				/>
			);
		} else if (
			this.props.mask !== '' &&
			this.props.mask !== null &&
			this.props.mask !== undefined
		) {
			if (
				field.name === 'STATE' ||
				field.name === 'CITY' ||
				field.name === 'FLOOR/SUITE' ||
				field.name === 'STREET'
			) {
				return (
					<input
						name={field.name}
						ref={field.propName}
						value={field.value}
						className={`${this.props.className} ${className} ${className1} `}
						data-fieldname={field.propName}
						onBlur={this.state.onBlurHandler || defaultChangeHandler}
						onChange={this.state.isChangedHandler || defaultChangeHandler}
					/>
				);
			} else {
				return (
					<MaskedInput
						key={`input-${field.propName}`}
						name={field.name}
						mask={this.props.mask}
						ref={field.propName}
						onChange={this.state.isChangedHandler || defaultChangeHandler}
						onFocus={this.state.onFocusHandler || defaultFocusHandler}
						onBlur={this.state.onBlurHandler || defaultChangeHandler}
						data-fieldname={field.propName}
						className={`${this.props.className} ${className} ${className1} `}
						value={field.value}
						showMask
					/>
				);
			}
		} else {
			return (
				<input
					name={field.name}
					ref={field.propName}
					value={field.value}
					className={`${this.props.className} ${className} ${className1} `}
					data-fieldname={field.propName}
					onBlur={this.state.onBlurHandler || defaultChangeHandler}
					onChange={this.state.isChangedHandler || defaultChangeHandler}
					maxlength={this.props.maxLength && field.name === 'ZIP CODE' ? this.props.maxLength : ''}
				/>
			);
		}
	}

	createCheckboxField(field) {
		const className1 = field.error ? ' blue-border' : ' ';
		const className = field.active ? 'blue-animation' : 'checkbox-element';
		return (
			<input
				key={`chexkbox-${field.propName}`}
				name={field.name}
				data-fieldname={field.propName}
				type='checkbox'
				className={`${this.props.className} ${className} ${className1} `}
				onBlur={this.state.onBlurHandler}
				ref={field.propName}
				checked={field.value}
				onChange={this.state.isChangedHandler}
			/>
		);
	}

	createDropdownField(field) {
		const { className: contentClass = '' } = this.props;
		const options = field['options'];
		const className = field.error ? 'blue-border' : ' ';

		return (
			<select
				name={field['name']}
				onChange={this.state.isChangedHandler}
				className={`${this.props.className} ${className}  `}
				onBlur={this.state.onBlurHandler}
				value={field.value}
				data-fieldname={field.propName}
			>
				<option key={`dd-${'none'}`}> - </option>
				{options.map(option => (
					<option key={`dd-${option.value}`} value={option.value} className={contentClass}>
						{option.displayValue || option.value}
					</option>
				))}
			</select>
		);
	}

	createRadioButton(field) {
		const options = field['options'];
		const name = field['name'];

		const className1 = field.error ? ' blue-border' : ' ';
		const className = field.active ? 'blue-animation' : '';

		return options.map(option => {
			return (
				<div
					key={`radio-${option.value}`}
					onChange={this.state.isChangedHandler}
					className={`${this.props.className} ${className} ${className1} radio-button-element`}
					onBlur={this.state.onBlurHandler}
				>
					<input type='radio' name={name} data-fieldname={field.propName} value={option.value} />
					<span>{option.value}</span>
				</div>
			);
		});
	}

	createSingleField(field) {
		const { labelClass = '' } = this.props;
		if (field.hidden) return;

		const fieldType = field['type'] || 'input';
		let inputField = null;

		if (field['type'] && field['type'] === 'dropdown') {
			inputField = this.createDropdownField(field);
		} else if (field['type'] && field['type'] === 'radio') {
			inputField = this.createRadioButton(field);
		} else if (field['type'] && field['type'] === 'checkbox') {
			inputField = this.createCheckboxField(field);
		} else {
			inputField = this.createInputField(field, fieldType);
		}

		return (
			<div key={`single-${field.name}`} className={`field ${fieldType}`}>
				<label className={labelClass} htmlFor={field.propName}>
					{field.name}
				</label>
				{inputField}
			</div>
		);
	}

	createDoubleField(fields) {
		const { labelClass = '' } = this.props;
		const [field1, field2] = fields;
		const fieldType1 = field1['type'] || 'input';
		const fieldType2 = field2['type'] || 'input';

		const inputField1 = this.createInputField(field1, fieldType1);
		const inputField2 = this.createInputField(field2, fieldType2);

		return (
			<div key={`${field1.name}-${field2.name}`} className='double-field'>
				<div className='field1'>
					<label className={labelClass} htmlFor={field1.propName}>
						{field1.name}
					</label>
					{inputField1}
				</div>
				<div className='field2'>
					<label className={labelClass} htmlFor={field2.propName}>
						{field2.name}
					</label>
					{inputField2}
				</div>
			</div>
		);
	}

	createDataTable(data) {
		return data.map(row => {
			if (row['double']) {
				return this.createDoubleField(row['fields']);
			} else {
				return this.createSingleField(row);
			}
		});
	}

	render() {
		return this.createDataTable(this.props.data);
	}
}
