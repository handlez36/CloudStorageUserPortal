import React, { Component } from 'react';
import { connect } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faKey } from '@fortawesome/free-solid-svg-icons';

// import { CONFIRM_PASSWORD_SUCCESS } from '../../actions/registration';
// import IconInputComponent from '../../components/Common/IconInputComponent';
// import CredentialInputComponent from '../Common/CredentialInputComponent';
// import PortalMessage from '../../components/Common/PortalMessage';
// import {
// 	enterNewPassword,
// 	confirmNewPassword,
// 	resetRegistrationState,
// } from '../../actions/registration';
// import { PASSWORD_MESSAGES, VALIDATION_STATUS } from './PasswordRegistrationConstants';
// import PasswordResetSuccess from '../../components/Common/PasswordResetSuccess';

import IconInputComponent from './../../sub_components/Common/IconInputComponent';
import CredentialInputComponent from './../../sub_components/Common/CredentialInputComponent';
import PortalMessage from './../../sub_components/Common/PortalMessage';
import {
	CONFIRM_PASSWORD_SUCCESS,
	enterNewPassword,
	confirmNewPassword,
	resetRegistrationState,
} from '../../actions/registration';
import { PASSWORD_MESSAGES, VALIDATION_STATUS } from './../../utils/PasswordRegistrationConstants';
import PasswordResetSuccess from './../../sub_components/Login/PasswordResetSuccess';

const CDN_URL = process.env.REACT_APP_CDN_URL;
const Icon = `${CDN_URL}common/Common-password-change-icon-190-x-190.png`;

const states = {
	NEW: 'NEW',
	CONFIRM: 'CONFIRM',
};

class PasswordRegistration extends Component {
	constructor(props) {
		super(props);

		library.add([faUser, faLock, faKey]);

		this.validations = {
			'Must be at least 8 characters': /^.{8,}$/,
			'Must contain at least one number': /^.*[0-9].*$/,
			'Must contain at least one capital letter': /^.*[A-Z].*$/,
			'Must contain at least one special character:': /[^A-Za-z0-9]+/,
			'Must only contain alphanumeric and special characters': /^[\S\T]+$/,
		};
		this.indicators = ['new_password_indicator', 'confirm_pwd_indicator'];
		this.inputs = { newInput: states.NEW, confirmInput: states.CONFIRM };

		this.state = {
			input: '',
			validationError: false,
			validationComplete: false,
			status: null,
			ready: null,
			newPassword: '',
		};
	}

	renderMessage(status) {
		const { validationError } = this.state;

		if (status === VALIDATION_STATUS.LOADING) {
			return (
				<PortalMessage
					username={<div className='loading'>Validating Password Registration Credentials...</div>}
				/>
			);
		} else if (status === VALIDATION_STATUS.ERROR) {
			return (
				<PortalMessage
					username={
						<div className='error'>There was an error validating your password credentials!!</div>
					}
					start={'Error: ' + validationError}
					includeBr={false}
				/>
			);
		} else {
			return (
				<PortalMessage
					username={PASSWORD_MESSAGES.USERNAME}
					start={[
						PASSWORD_MESSAGES.START,
						<span className='content'> {PASSWORD_MESSAGES.CONTENT}</span>,
					]}
					includeBr={false}
				/>
			);
		}
	}

	validateRegistrationCode = () => {
		this.setState({ validationComplete: true });
	};

	receiveInput = input => {
		const context = this.props.registration_status.context;
		const { match: { params: { code = '' } = {} } = {} } = this.props;

		if (context === 'NEW') {
			this.setState({ newPassword: input });
			this.props.enterNewPassword(input);
		} else {
			this.props.confirmNewPassword(this.state.newPassword, input, code);
		}
	};

	checkCompletionCallback = () => {
		console.log('PasswordRegistration#checkCompletionCallback');
	};

	createIcons() {
		return [
			<FontAwesomeIcon icon='key' className='key_icon' />,
			<FontAwesomeIcon icon='lock' className='lock_icon' />,
		];
	}

	createValidations() {
		const { status } = this.state;
		const newPwd = this.state.newPassword;
		const confirmPwdMatchRegex = new RegExp(
			`^${newPwd.replace(/[\[\[\\\^\$\.\|\?\*\+\(\)\]\+]/g, '\\$&')}$`,
		);
		const validations = { ...this.validations };

		if (status === 'NEW_PASSWORD_SUCCESS' && newPwd) {
			validations['Must match new password'] = confirmPwdMatchRegex;
		}

		return validations;
	}
	/**
	 * If the user has successfully registered their new password,
	 * redirect them to the login page
	 */
	componentDidUpdate() {
		const {
			registration_status,
			registration_status: { isRegistered },
			resetRegistrationState,
			history,
		} = this.props;

		if (isRegistered && registration_status.type === CONFIRM_PASSWORD_SUCCESS) {
			setTimeout(() => history.push('/login'), 3000);
			setTimeout(() => resetRegistrationState(), 3000);
		}
	}

	componentDidMount() {
		this.validateRegistrationCode();
	}

	validationStatus() {
		const { validationComplete, validationError } = this.state;

		if (!validationComplete) {
			return VALIDATION_STATUS.LOADING;
		} else if (validationComplete && validationError) {
			return VALIDATION_STATUS.ERROR;
		} else {
			return VALIDATION_STATUS.SUCCESS;
		}
	}

	// static getDerivedStateFromProps(nextProps, prevState) {
	//     if (prevState.newPassword !== '') {
	//         if (nextProps.registration_status.status !== prevState.status) {
	//             return { status: nextProps.registration_status.status };
	//         }
	//     }
	//     else return null;
	// }

	render() {
		const status = this.validationStatus();

		return (
			<div className={`login-page registration`}>
				<div className='registration-form'>
					<div className='password-registration-body'>
						<IconInputComponent icon={Icon}>
							{this.props.registration_status.type === CONFIRM_PASSWORD_SUCCESS && (
								<PasswordResetSuccess modal={true} status={this.props.registration_status.type} />
							)}
							{status === 'CONFIRM_PASSWORD_ERROR' && (
								<PasswordResetSuccess modal={true} status={this.props.registration_status.type} />
							)}
							{this.renderMessage(status)}
							{status === VALIDATION_STATUS.SUCCESS && (
								<CredentialInputComponent
									icons={this.createIcons()}
									indicators={this.indicators}
									inputs={this.inputs}
									inputEnterCallback={this.receiveInput}
									checkCompletionCallback={this.checkCompletionCallback}
									validationRules={{
										[states.NEW]: this.validations,
										[states.CONFIRM]: this.createValidations(),
									}}
									inputType={{ [states.NEW]: 'password', [states.CONFIRM]: 'password' }}
									status={this.props.registration_status}
								/>
							)}
						</IconInputComponent>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		registration_status: state.registration_status,
	};
}

export default connect(
	mapStateToProps,
	{ enterNewPassword, confirmNewPassword, resetRegistrationState },
)(PasswordRegistration);
