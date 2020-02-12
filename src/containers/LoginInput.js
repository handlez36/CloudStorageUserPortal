import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faLock, faKey } from '@fortawesome/free-solid-svg-icons';
import MfaOption from '../components/Login/MfaOption';
import MessageText from '../components/Common/MessageText';
import CredentialInputComponent from '../components/Common/CredentialInputComponent';

// ActionCreator actions
import {
	sampleEnterUsername,
	loginUserPhaseOne,
	loginUserPhaseTwo,
	mfaOptionRequest,
	requestLoginUsernameReset,
	enterMfaTimeout1,
	enterMfaTimeout2,
	resetMfaTimeoutCondition,
} from '../actions';
const CDN_URL = process.env.REACT_APP_CDN_URL;

const key = `${CDN_URL}common/KEY.svg`;
const lock = `${CDN_URL}common/LOCK.svg`;
const user = `${CDN_URL}common/USER.svg`;

// Font Awesome imports

const states = {
	USERNAME: 'USERNAME',
	PASSWORD: 'PASSWORD',
	MFA: 'MFA',
};

const MFA_OPTIONS = {
	EMAIL: 'EMAIL',
	PHONE: 'PHONE',
};

class LoginInput extends Component {
	constructor(props) {
		super(props);

		library.add([faUser, faLock, faKey]);

		this.mfaResponseTimeout = null;
		this.firstResponseWait = null;
		this.secondResponseWait = null;
		this.indicators = ['user_indicator', 'password_indicator', 'mfa_indicator'];
		this.inputs = { usernameInput: 'USERNAME', pwdInput: 'PASSWORD', mfaInput: 'MFA' };
		this.state = {
			input: '',
			mfaOption: MFA_OPTIONS.EMAIL,
			message: 'HELLO, PLEASE ENTER YOUR EMAIL.',
			enabled: true,
			code: '',
			reminder: null, // reminder will either be null, question or exclamation
			forceShow: false,
			mfaRequestType: 'SUBMIT CODE',
		};
	}

	resetTimeoutParams = () => {
		clearInterval(this.mfaResponseTimeout);
		this.mfaResponseTimeout = null;
		this.firstResponseWait = null;
		this.secondResponseWait = null;
		this.setState({
			input: '',
			mfaOption: MFA_OPTIONS.EMAIL,
			message: 'HELLO, PLEASE ENTER YOUR EMAIL.',
			enabled: true,
			code: '',
			reminder: null, // reminder will either be null, question or exclamation
			forceShow: false,
			mfaRequestType: 'SUBMIT CODE',
		});
	};

	createIcons() {
		return [
			<img src={user} icon='user' className='user_icon' />,
			<img src={key} icon='key' className='key_icon' />,
			<img src={lock} icon='lock' className='lock_icon' />,
		];
	}

	resetLogin = () => {
		const { failedUserName, attemptCount, message } = this.props.auth_status;
		this.props.requestLoginUsernameReset(failedUserName, attemptCount, message);
	};

	receiveInput = input => {
		const { context } = this.props.auth_status;

		if (context === states.USERNAME) {
			this.props.sampleEnterUsername(input);
		} else if (context === states.PASSWORD) {
			const credentials = {
				username: this.props.auth_status.username.toLowerCase(),
				password: input,
			};
			this.props.loginUserPhaseOne(credentials);
		} else {
			this.resetTimeoutParams();
			if (input) {
				this.props.loginUserPhaseTwo(input);
			} else {
				this.props.loginUserPhaseTwo(this.state.code);
			}
		}
	};

	checkCompletionCallback = () => {
		this.props.checkCompletionCallback();
	};

	getMfaEmail = () => {
		const { auth_status } = this.props;
		const { user: { emailPartial } = {} } = auth_status;

		if (!emailPartial) {
			return null;
		}

		return emailPartial;
	};

	onChange = input => {
		const { auth_status: { type } = {} } = this.props;
		if (type === 'LOGIN_SUCCESS_PHASE_ONE' || type === 'MFA_ENTER_TIMEOUT1') {
			if (input.length === 6) {
				this.setState({ enabled: true, code: input });
			} else {
				this.setState({ enabled: false });
			}
		}
	};

	getMfaPhone = () => {
		const { auth_status } = this.props;
		const { user: { mobilePhonePartial } = {} } = auth_status;

		if (!mobilePhonePartial) {
			return null;
		}

		return mobilePhonePartial;
	};

	disabledMfaTimeout = () => {
		const { resetMfaTimeoutCondition } = this.props;
		this.resetTimeoutParams();
		resetMfaTimeoutCondition();
	};

	componentDidUpdate() {
		const { auth_status: { type, startTimeout } = {} } = this.props;

		// If the MFA entry stage has started...
		if (type === 'LOGIN_SUCCESS_PHASE_ONE' && startTimeout && !this.mfaResponseTimeout) {
			this.setState({ enabled: false });
			clearInterval(this.mfaResponseTimeout);
			this.mfaResponseTimeout = setInterval(() => {
				if (!this.firstResponseWait) {
					this.firstResponseWait = Date.now();
					this.setState({ reminder: 'question' });
					this.props.enterMfaTimeout1();
				} else {
					const input = document.querySelector('input');
					if (input) {
						input.classList.add('no-blinking');
					}
					this.secondResponseWait = Date.now();
					this.props.enterMfaTimeout2();
					this.setState({
						reminder: 'exclamation',
						subMessage: 'Please send a new request.',
						forceShow: true,
						mfaRequestType: 'RESEND CODE',
					});
					clearInterval(this.mfaResponseTimeout);
				}
			}, 30000);
		} else if (this.props.auth_status.type === 'LOGIN_SUCCESS_PHASE_TWO' && this.state.reminder) {
			this.resetTimeoutParams();
		}
	}

	render() {
		const { reminder, subMessage, forceShow } = this.state;
		const { context, status, type } = this.props.auth_status;
		const showMfaOptions =
			type !== 'LOGIN_SUCCESS_PHASE_ONE_NO_MFA' &&
			(status === 'LOGIN_SUCCESS' || status === 'MFA_ERROR');

		if (status === 'LOGIN_ERROR') {
			this.resetLogin();
		}
		return (
			<div className='login-section'>
				<MessageText
					context={context}
					status={status}
					message={this.props.auth_status.message}
					subMessage={subMessage}
					reminder={reminder}
				/>
				<CredentialInputComponent
					icons={this.createIcons()}
					indicators={this.indicators}
					inputs={this.inputs}
					resetCallback={this.resetLogin}
					inputEnterCallback={this.receiveInput}
					onChangeCallback={this.onChange}
					checkCompletionCallback={this.checkCompletionCallback}
					inputType={{
						[states.USERNAME]: 'input',
						[states.PASSWORD]: 'password',
						[states.MFA]: 'password',
					}}
					status={this.props.auth_status}
				/>
				{showMfaOptions && (
					<MfaOption
						mfaOptionRequest={this.props.mfaOptionRequest}
						auth_status={this.props.auth_status}
						email={this.getMfaEmail()}
						phone={this.getMfaPhone()}
						forceShow={forceShow}
						enabled={this.state.enabled}
						inputEnterCallback={this.receiveInput}
						disabledMfaTimeout={this.disabledMfaTimeout}
						requestType={this.state.mfaRequestType}
					/>
				)}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		auth_status: state.auth_status,
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			sampleEnterUsername,
			loginUserPhaseOne,
			loginUserPhaseTwo,
			mfaOptionRequest,
			requestLoginUsernameReset,
			enterMfaTimeout1,
			enterMfaTimeout2,
			resetMfaTimeoutCondition,
		},
		dispatch,
	);
}

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps,
	)(LoginInput),
);
