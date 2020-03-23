import React, { Component } from 'react';
import { connect } from 'react-redux';

import TextInput from 'sub_components/Common/BloxTextInput';
import RadioButton from 'components_old/Common/Radio';
import Button from 'sub_components/Common/BloxButton';
import { UserProfileApi } from 'services/userProfile';
import { INPUT_TYPES, PHONEMASK } from 'utils/CommonConstants';
import { Utils } from 'services/utils';

const FIELDS = {
	NAME: 1,
	EMAIL: 2,
	PHONE: 3,
	PREFERENCE: 4,
	DONE: 5,
};

const PREFERENCES = {
	EMAIL: 'EMAIL',
	PHONE: 'PHONE',
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
const userProfile = new UserProfileApi();
class RemoteHandsContacts extends Component {
	state = {
		fields: 4,
		requestorName: '',
		requestorEmail: '',
		requestorPhone: '',
		requestorPreference: PREFERENCES.EMAIL,
		completedFields: [],
		activeField: FIELDS.NAME,
	};

	autoFormatPhoneNumber = number => {
		const onlyDigitsRegex = /(\d+)/g;
		const matches = number.match(onlyDigitsRegex);

		if (matches && matches.join('').length === 10) {
			const numbersOnly = matches.join('');
			const areacode = numbersOnly.slice(0, 3);
			const firstThree = numbersOnly.slice(3, 6);
			const separator = lastFour !== '' ? '-' : '';
			const lastFour = numbersOnly.slice(6, 10);
			const formattedPhoneNumber = `(${areacode}) ${firstThree} ${separator} ${lastFour}`;

			return formattedPhoneNumber.trim();
		} else {
			return number;
		}
	};

	onChange = event => {
		let value = event.target.value;
		if (event.target.name === 'requestorPhone') {
			value = this.autoFormatPhoneNumber(value);
		}

		this.setState({ [event.target.name]: value });
	};

	onPreferenceChange = requestorPreference => {
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

	getNextField = () => {
		const { activeField } = this.state;

		if (activeField === FIELDS.NAME) {
			return FIELDS.EMAIL;
		} else if (activeField === FIELDS.EMAIL) {
			return FIELDS.PHONE;
		} else if (activeField === FIELDS.PHONE) {
			return FIELDS.PREFERENCE;
		} else if (activeField === FIELDS.PREFERENCE) {
			return FIELDS.DONE;
		}

		return FIELDS.DONE;
	};

	onFieldComplete = (field, isValid) => {
		const { completedFields: fields } = this.state;
		const { id, updateProgress } = this.props;

		if (isValid) {
			if (!fields.includes(field)) {
				fields.push(field);
			}
		} else {
			if (fields.includes(field)) {
				const index = fields.indexOf(field);
				fields.splice(index, 1);
			}
		}
		const nextField = this.getNextField();

		updateProgress(id, fields.length);
		this.setState({ completedFields: fields, activeField: nextField });
	};

	setInitialFieldValues = () => {
		const { id, auth_status, updateProgress } = this.props;

		const requestorName = userProfile.getFirstAndLastName(auth_status);
		const requestorEmail = UserProfileApi.getEmail(auth_status);
		const requestorPhone = this.autoFormatPhoneNumber(UserProfileApi.getPhone(auth_status));
		const completedFields = ['requestorName', 'requestorEmail', 'requestorPreference'];
		if (Utils.scrubPhoneNumber(requestorPhone) === '') {
			updateProgress(id, 3);
			this.setState({ requestorName, requestorEmail, completedFields });
		} else {
			completedFields.push('requestorPhone');
			updateProgress(id, 4);
			this.setState({ requestorName, requestorEmail, requestorPhone, completedFields });
		}
	};

	componentDidMount() {
		const { id, editParams, updateProgress } = this.props;
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
				requestorPhone: this.autoFormatPhoneNumber(editParams.requestorPhone),
				requestorPreference: editParams.requestorPreference,
				completedFields,
				activeField: FIELDS.DONE,
			});
			updateProgress(id, completedFields.length);
		} else {
			this.setInitialFieldValues();
		}
	}

	render() {
		const {
			requestorName,
			requestorEmail,
			requestorPhone,
			requestorPreference,
			completedFields,
		} = this.state;

		return (
			<div className='remote-hands-request-contacts'>
				<div className='form-subtitle'>Who should we contact for this service?</div>
				<div className='requestor-name request-field'>
					<TextInput
						placeholder=''
						active={true}
						type={INPUT_TYPES.INPUT}
						label='Name'
						name='requestorName'
						value={requestorName}
						validations={validations}
						onChange={this.onChange}
						markComplete={this.onFieldComplete}
					/>
				</div>
				<div className={`requestor-email request-field`}>
					<TextInput
						placeholder=''
						active={true}
						type={INPUT_TYPES.INPUT}
						label='Email'
						name='requestorEmail'
						value={requestorEmail}
						validations={emailValidations}
						onChange={this.onChange}
						markComplete={this.onFieldComplete}
					/>
				</div>
				<div className={`requestor-phone request-field`}>
					<TextInput
						placeholder=''
						active={true}
						type={INPUT_TYPES.INPUT}
						label="What's their phone number?"
						name='requestorPhone'
						value={requestorPhone}
						validations={phoneValidations}
						onChange={this.onChange}
						markComplete={this.onFieldComplete}
						mask={PHONEMASK}
					/>
				</div>
				<div className={`requestor-preference request-field`}>
					<div className='radio-button-label' />
					<RadioButton
						callback={this.onPreferenceChange}
						label='What’s your preferred method of communication for this service?'
						name='requestorPreference'
						value={requestorPreference}
						hidden={false}
						toggle={true}
						options={OPTIONS}
					/>
				</div>
				<Button
					title='REVIEW'
					enabled={completedFields.length === Object.keys(FIELDS).length - 1}
					customClass='blox-button circle-large'
					onClick={this.sendParams}
				/>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		auth_status: state.auth_status,
	};
}

export default connect(mapStateToProps, null)(RemoteHandsContacts);
