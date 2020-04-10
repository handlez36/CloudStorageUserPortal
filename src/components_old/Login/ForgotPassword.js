import React, { Component, Fragment } from 'react';
import ForgotPasswordModal from '../../components/Common/ErrorModal';
import Button from '../../components/Common/COMPANYButton';
import TextInput from '../../components/Forms/COMPANYTextInput';
import { INPUT_TYPES } from '../../components/Common/CommonConstants';
import { UserApi } from '../../services/user';
const CDN_URL = process.env.REACT_APP_CDN_URL;
const ForgotPasswordImage = `${CDN_URL}common/set-password-modal-icon.svg`;
const mailImage = `${CDN_URL}common/change-password-modal-icon.svg`;
const CloseButton = `${CDN_URL}profile/icons-close.svg`;

const emailValidations = [
	{ message: 'Required field', pattern: /.+/ },
	{ message: 'Please enter a valid email address.', pattern: /^[^@\s]+@[^@\s]+\.[^@\s]+$/ },
];

const ForgotPasswordBody = (onChange, onFieldComplete, email, label, onClick) => (
	<Fragment>
		<div className='reset-password'>
			<img src={ForgotPasswordImage} />
			<div className='message-large'>Forgot your password?</div>
			<div className='message'>
				Enter your email to recieve instructions on how to reset your password.
			</div>
			<div className='input'>
				<TextInput
					placeholder='EMAIL'
					active={true}
					type={INPUT_TYPES.INPUT}
					label={label}
					name='forgotEmail'
					value={email}
					validations={emailValidations}
					onChange={onChange}
				/>
			</div>
			<div className='reset-button'>
				<Button
					title='RESET PASSWORD'
					enabled={true}
					onClick={onClick}
					customClass='COMPANY-button gradient'
				/>
			</div>
		</div>
	</Fragment>
);

class ForgotPassword extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			label: '',
			success: false,
			error: null,
		};
	}
	togglePasswordModal = () => {
		this.setState({ toggle: false });
		if (this.props.showModalCallback) {
			this.props.showModalCallback();
		}
	};
	getModalBody = email => {
		if (!this.state.error) {
			return (
				<Fragment>
					<div className='reset-password mail'>
						<img src={mailImage} />
						<div className='message-large'>You've got mail!</div>
						<div className='message'>
							We've sent instructions on how to reset your password to your email. Check your inbox
							and follow the link.
						</div>
						<div className='email'>{email}</div>
					</div>
				</Fragment>
			);
		} else {
			return (
				<Fragment>
					<div className='reset-password mail'>
						<img src={mailImage} />
						<div className='message-large'>Hmm...</div>
						<div className='message'>Error sending email. Please try again.</div>
						<div className='email'>{email}</div>
					</div>
				</Fragment>
			);
		}
	};

	toggleOpen = () => {
		this.props.toggleOpen();
		setTimeout(
			function() {
				this.setState({ success: false, email: '', label: '', error: null });
			}.bind(this),
			2000,
		);
	};
	onChange = event => {
		const value = event.target.value;

		this.setState({ email: value, label: 'EMAIL' });
	};
	onClick = () => {
		UserApi.resetUserPassword(this.state.email)
			.then(response => {
				const validResponse = response.status === 200 && response.data && !response.data.error;
				if (validResponse) {
					this.setState({ success: true });
				} else {
					this.setState({ error: 'Error resetting user password', success: false });
				}
				const modal = document.getElementById('modal-body');
				modal.classList.add('success');
			})
			.catch(error => this.setState({ error }));
	};

	render() {
		const { email, label, success, error } = this.state;
		return (
			<div className='forgot-password-wrapper'>
				<ForgotPasswordModal
					isOpen={this.props.isOpen}
					toggleOpen={this.toggleOpen}
					customBody={
						success || error
							? this.getModalBody(email)
							: ForgotPasswordBody(this.onChange, this.onFieldComplete, email, label, this.onClick)
					}
					customExitIcon={CloseButton}
					useHeader={false}
				/>
			</div>
		);
	}
}
export default ForgotPassword;
