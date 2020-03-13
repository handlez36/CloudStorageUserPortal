import React, { Component } from 'react';
import { connect } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faKey } from '@fortawesome/free-solid-svg-icons';

// import CredentialInputComponent from 'components/Common/CredentialInputComponent';
// import IconInputComponent from 'components/Common/IconInputComponent';
// import PortalMessage from 'components/Common/PortalMessage';
import CredentialInputComponent from 'sub_components/Common/CredentialInputComponent';
import IconInputComponent from 'sub_components/Common/IconInputComponent';
import PortalMessage from 'sub_components/Common/PortalMessage';
import PasswordResetSuccess from 'sub_components/Login/PasswordResetSuccess';
import { UserProfileApi } from 'services/userProfile';
import { updateModule, updatePage, addPageToBreadCrumbs } from 'actions/siteTracking';
import { enterNewPassword, confirmNewPassword, resetRegistrationState } from 'actions/registration';
import { MENU, PROFILE_PASSWORD_MESSAGE_TEXT } from 'utils/ProfileConstants';
import { MENU as PROFILE_MENU } from 'utils/ProfileConstants';
import { SITE_PAGES, SITE_MODULES } from 'utils/CommonConstants';

const CDN_URL = process.env.REACT_APP_CDN_URL;
const Icon = `${CDN_URL}profile/Profile_PasswordChange_Icon_190x190.png`;

const states = {
	NEW: 'NEW',
	CONFIRM: 'CONFIRM',
};

class PasswordChange extends Component {
	constructor(props) {
		super(props);

		library.add([faUser, faLock, faKey]);

		this.userProfileApi = new UserProfileApi();
		this.validations = {
			'Must be at least 8 characters': /^.{8,}$/,
			'Must contain at least one number': /^.*[0-9].*$/,
			'Must contain at least one capital letter': /^.*[A-Z].*$/,
			'Must contain at least one special character': /[^A-Za-z0-9]+/,
			'Must only contain alphanumeric and special characters': /^[\S\T]+$/,
		};
		this.indicators = ['new_password_indicator', 'confirm_pwd_indicator'];
		this.inputs = { newInput: states.NEW, confirmInput: states.CONFIRM };

		this.state = {
			profile: this.props.profile,
			newPassword: '',
			status: null,
		};
	}

	receiveInput = input => {
		const context = this.props.registration_status.context;

		if (context === 'NEW') {
			this.setState({ newPassword: input });
			this.props.enterNewPassword(input);
		} else {
			this.props.confirmNewPassword(this.state.newPassword, input);
		}
	};

	static getDerivedStateFromProps(nextProps, prevState) {
		if (prevState.newPassword !== '') {
			if (nextProps.registration_status.status !== prevState.status) {
				return { status: nextProps.registration_status.status };
			}
		} else return null;
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.registration_status.status !== prevState.status) {
			//Perform some operation here
			this.setState({ status: prevProps.registration_status.status });
		}
	}

	regexTester = () => {
		const testText = 'brandon';
		let appendedText;
		const regex = /[^A-Za-z0-9]+/;

		[].forEach(ch => {
			appendedText = `${testText}${ch}`;
			const isMatch = regex.test(appendedText);
			// let confirmPwdMatchRegex = appendedText.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
			// let confirmPwdMatchRegexNewPattern = appendedText.replace(/[^A-Za-z0-9]+/g, '\\$&');
			const atLeastOneSpecialCharPattern = /[^A-Za-z0-9]+/;
			const confirmPwdMatchRegexNewPattern = new RegExp(
				`^${appendedText.replace(/[\[\[\\\^\$\.\|\?\*\+\(\)\]\+]/g, '\\$&')}$`,
			);
			console.log(`If user enters ${appendedText}`);
			console.log(`Checking [${ch}]: Match ? ${isMatch}`);
			// console.log(
			// 	` -- Original confirmation regex: ${confirmPwdMatchRegex}. Does ${appendedText} match ${confirmPwdMatchRegex}? ${confirmPwdMatchRegex.test(
			// 		appendedText,
			// 	)}`,
			// );
			console.log(
				` -- At least one special char: ${atLeastOneSpecialCharPattern}. Does ${appendedText} match ${atLeastOneSpecialCharPattern}? ${atLeastOneSpecialCharPattern.test(
					appendedText,
				)}`,
			);
			console.log(
				` -- Matching pwd regex: ${confirmPwdMatchRegexNewPattern}. Does ${appendedText} match ${confirmPwdMatchRegexNewPattern}? ${confirmPwdMatchRegexNewPattern.test(
					appendedText,
				)}`,
			);
			console.log(' --------------------------------- \n\n');
		});
		const randomText = `br*^-a^n-d~0\\n`;
		const testTextRegex = new RegExp(
			`^${randomText.replace(/[\[\[\\\^\$\.\|\?\*\+\(\)\]\+]/g, '\\$&')}$`,
		);
		console.log(
			`Test text pattern test: ${testTextRegex}. Does ${randomText} match ${testTextRegex}? ${testTextRegex.test(
				randomText,
			)}`,
		);
	};

	componentDidMount() {
		const { updateModule, updatePage, addPageToBreadCrumbs } = this.props;
		updatePage(SITE_PAGES.PROFILE[PROFILE_MENU.PASSWORD_CHANGE]);
		addPageToBreadCrumbs(SITE_PAGES.PROFILE[PROFILE_MENU.PASSWORD_CHANGE], SITE_MODULES.PROFILE);
		updateModule(SITE_MODULES.PROFILE);
	}

	checkRegistrationCompletion = () => {
		console.log('Checking for registration completion');
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

	resetRegistration() {
		setTimeout(() => this.props.resetRegistrationState(), 3000);
		setTimeout(() => this.props.resetPage(), 3000);
	}

	render() {
		const { status } = this.state;
		console.log(this.state.status);
		return (
			// <div className='password-page outer-wrapper'>
			<div className='password-change'>
				{status === 'CONFIRM_PASSWORD_SUCCESS' && (
					<PasswordResetSuccess modal={true} status={status} />
				)}
				{status === 'CONFIRM_PASSWORD_ERROR' && (
					<PasswordResetSuccess modal={true} status={status} />
				)}
				<PortalMessage
					start={PROFILE_PASSWORD_MESSAGE_TEXT.START}
					content={PROFILE_PASSWORD_MESSAGE_TEXT.CONTENT}
				/>
				{this.state.status === 'CONFIRM_PASSWORD_SUCCESS' && this.resetRegistration()}
				<div className='wrapper'>
					<IconInputComponent icon={Icon}>
						<PasswordResetSuccess />
						<CredentialInputComponent
							icons={this.createIcons()}
							indicators={this.indicators}
							inputs={this.inputs}
							resetFields={this.resetRegistration}
							inputEnterCallback={this.receiveInput}
							checkCompletionCallback={this.checkRegistrationCompletion}
							validationRules={{
								[states.NEW]: this.validations,
								[states.CONFIRM]: this.createValidations(),
							}}
							inputType={{ [states.NEW]: 'password', [states.CONFIRM]: 'password' }}
							status={this.props.registration_status}
						/>
					</IconInputComponent>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		registration_status: state.registration_status,
		auth_status: state.auth_status,
	};
}

export default connect(mapStateToProps, {
	enterNewPassword,
	confirmNewPassword,
	resetRegistrationState,
	updatePage,
	updateModule,
	addPageToBreadCrumbs,
})(PasswordChange);
