import React, { Component } from 'react';

import TextInput from 'sub_components/Common/BloxTextInput';
import RadioButton from 'components_old/Common/Radio';
import Button from 'sub_components/Common/BloxButton';
import { INPUT_TYPES, PHONEMASK } from 'utils/CommonConstants';

const FIELDS = {
	REQUESTORNAME: 1,
	REQUESTOREMAIL: 2,
	REQUESTORPHONE: 3,
	REQUESTORPREFERENCE: 4,
	DONE: 5,
};

const PREFERENCES = {
	EMAIL: 'Email',
	PHONE: 'Phone',
};
const OPTIONS = [
	{ name: PREFERENCES.EMAIL, value: PREFERENCES.EMAIL },
	{ name: PREFERENCES.PHONE, value: PREFERENCES.PHONE },
];
const validations = [{ message: 'Required field', pattern: /.+/ }];
const phoneValidations = [{ message: 'Phone Number must be 10 digits', pattern: /^[0-9]{10}$/ }];
const emailValidations = [
	{ message: 'Required field', pattern: /.+/ },
	{ message: 'Please enter a valid email address.', pattern: /^[^@\s]+@[^@\s]+\.[^@\s]+$/ },
];
class GuestAccessContacts extends Component {
	state = {
		fields: 4,
		requestorName: '',
		requestorEmail: '',
		requestorPhone: '',
		requestorPreference: '',
		completedFields: [],
		radioHidden: true,
		activeField: FIELDS.REQUESTORNAME,
	};

	onChange = event => {
		const value = event.target.value;
		this.setState({ [event.target.name]: value });
	};

	onPreferenceChange = requestorPreference => {
		this.onFieldComplete('requestorPreference', true);
		this.setState({ requestorPreference });
	};

	/** For new wizard... */
	formatWizardParams = (
		component,
		requestorName,
		requestorEmail,
		requestorPhone,
		requestorPreference,
	) => {
		const formattedPhone = requestorPhone
			.replace('(', '')
			.replace(')', '')
			.replace(/\s+/g, '')
			.replace('-', '')
			.replace(/_/, '');

		return {
			component,
			data: {
				requestorName,
				requestorEmail,
				requestorPhone: formattedPhone,
				requestorPreference,
			},
		};
	};

	sendParams = () => {
		const { nextStep, name: stepName } = this.props;
		const { requestorName, requestorEmail, requestorPhone, requestorPreference } = this.state;
		// const submitBtn = document.querySelector('#submit-button');
		// submitBtn.setAttribute('disabled', 'disabled');

		this.setState({ submitted: true });
		const data = this.formatWizardParams(
			stepName,
			requestorName,
			requestorEmail,
			requestorPhone,
			requestorPreference,
		);
		nextStep(data);
	};

	onFieldComplete = (field, isValid) => {
		const { activeField, completedFields: fields } = this.state;
		const { id, updateProgress } = this.props;
		let nextField = activeField;

		if (isValid) {
			if (!fields.includes(field)) {
				fields.push(field);
				nextField = FIELDS[field.toUpperCase()] === activeField ? this.getNextField() : activeField;
			}
		} else {
			if (fields.includes(field)) {
				const index = fields.indexOf(field);
				fields.splice(index, 1);
			}
		}

		updateProgress(id, fields.length);
		this.setState({ completedFields: fields, activeField: nextField });
	};

	getNextField = () => {
		const { activeField } = this.state;

		if (activeField === FIELDS.REQUESTORNAME) {
			return FIELDS.REQUESTOREMAIL;
		} else if (activeField === FIELDS.REQUESTOREMAIL) {
			return FIELDS.REQUESTORPHONE;
		} else if (activeField === FIELDS.REQUESTORPHONE) {
			this.setState({ radioHidden: false });
			return FIELDS.REQUESTORPREFERENCE;
		} else if (activeField === FIELDS.REQUESTORPREFERENCE) {
			return FIELDS.DONE;
		}

		return FIELDS.DONE;
	};

	componentDidMount() {
		const { editParams, id, updateProgress } = this.props;
		const completedFields = [
			'requestorName',
			'requestorEmail',
			'requestorPhone',
			'requestorPreference',
		];

		if (editParams) {
			this.setState({
				requestorName: editParams.requestorName,
				requestorEmail: editParams.requestorEmail,
				requestorPhone: editParams.requestorPhone,
				requestorPreference: editParams.requestorPreference,
				completedFields,
				activeField: FIELDS.DONE,
				radioHidden: false,
			});
			updateProgress(id, completedFields.length);
		}
	}

	render() {
		const { completedFields, activeField } = this.state;

		return (
			<div className='ticket-request-contacts-ga'>
				<div className='form-subtitle'>Tell us who will be visiting your center.</div>
				<div
					className={`requestor-name-ga requestor-field-ga ${
						activeField > FIELDS.REQUESTORNAME ? 'active' : ''
					}`}
				>
					<TextInput
						placeholder=''
						active={true}
						type={INPUT_TYPES.INPUT}
						label="What's your guests name?"
						name='requestorName'
						value={this.state.requestorName}
						validations={validations}
						onChange={this.onChange}
						markComplete={this.onFieldComplete}
					/>
				</div>
				<div
					className={`requestor-email-ga requestor-field-ga ${
						activeField >= FIELDS.REQUESTOREMAIL ? 'active' : ''
					}`}
				>
					<TextInput
						placeholder=''
						active={true}
						type={INPUT_TYPES.INPUT}
						label="What's their email?"
						name='requestorEmail'
						value={this.state.requestorEmail}
						validations={emailValidations}
						onChange={this.onChange}
						markComplete={this.onFieldComplete}
					/>
				</div>
				<div
					className={`requestor-phone-ga requestor-field ${
						activeField >= FIELDS.REQUESTORPHONE ? 'active' : ''
					}`}
				>
					<TextInput
						placeholder=''
						active={true}
						type={INPUT_TYPES.INPUT}
						label="What's their phone number?"
						name='requestorPhone'
						value={this.state.requestorPhone}
						onChange={this.onChange}
						markComplete={this.onFieldComplete}
						mask={PHONEMASK}
						validations={phoneValidations}
					/>
				</div>
				<div
					className={`requestor-preference-ga requestor-field ${
						activeField >= FIELDS.REQUESTORPREFERENCE ? 'active' : ''
					}`}
				>
					<div className='radio-button-label' />
					<RadioButton
						callback={this.onPreferenceChange}
						label='What’s the best way to contact your guest?'
						name='requestorPreference'
						value={this.state.requestorPreference}
						hidden={this.state.radioHidden}
						toggle={true}
						options={OPTIONS}
					/>
				</div>
				<Button
					title='NEXT'
					enabled={completedFields.length === Object.keys(FIELDS).length - 1}
					customClass='blox-button circle-large'
					onClick={this.sendParams}
				/>
			</div>
		);
	}
}

export default GuestAccessContacts;
