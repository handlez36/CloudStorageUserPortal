import React, { Component, Fragment } from 'react';
import Radio from '../Common/Radio';
import RequestMFAButton from '../Common/BloxButton';

export default class MFAOption extends Component {
	constructor(props) {
		super(props);

		this.state = {
			selected: 'EMAIL',
			error: false,
			success: false,
			showOptions: false,
			enabled: true,
			requestMFAButtonText: 'SEND MY CODE',
		};
	}

	changeMFAType = value => {
		this.props.disabledMfaTimeout();
		this.setState({ selected: value });
		if (this.state.requestMFAButtonText === 'SUBMIT CODE') {
			this.setState({ requestMFAButtonText: 'RESEND CODE', enabled: true });
		}
	};

	submitMfaOption = async () => {
		const { selected, enabled } = this.state;
		const {
			auth_status: { attemptCount, username },
		} = this.props;
		if (enabled) {
			this.setState({ requestMFAButtonText: 'SUBMIT CODE', enabled: false });
		} else {
			this.setState({ requestMFAButtonText: 'RESEND CODE', enabled: true });
		}

		this.makeMfaRequest(username, attemptCount, selected);
	};

	makeMfaRequest = async (username, attemptCount, selected) => {
		const { mfaOptionRequest } = this.props;
		this.props.disabledMfaTimeout();

		try {
			const response = await mfaOptionRequest(username, attemptCount, selected);
			if (response.status === 200 && !response.data.error) {
				this.setState({ success: true });
			} else {
				this.setState({ error: true });
			}
		} catch (e) {
			this.setState({ error: true });
		}
	};

	submitCode = () => {
		const input = '';
		this.props.inputEnterCallback(input);

		this.setState({ requestMFAButtonText: 'RESEND CODE', enabled: true });
	};

	getRadioButtonOptions = (email, phone) => {
		if (!email && !phone) {
			return [];
		}

		const options = [];
		if (email) {
			options.push({ value: 'EMAIL', name: 'Send to email', details: email });
		}

		if (phone) {
			options.push({ value: 'SMS', name: 'Send to phone', details: phone });
		}

		return options;
	};

	componentDidUpdate() {
		const { forceShow, requestType: incomingRequestType } = this.props;
		const { showOptions, enabled } = this.state;

		if (forceShow && !showOptions) {
			this.setState({ showOptions: true, requestMFAButtonText: 'RESEND CODE', enabled: true });
		}

		if (incomingRequestType === 'RESEND CODE' && !enabled) {
			this.setState(state => ({ ...state, requestMFAButtonText: 'RESEND CODE', enabled: true }));
		}
	}

	componentDidMount() {
		const {
			forceShow,
			auth_status: { attemptCount, username, user: { authTypes } = {} } = {},
		} = this.props;
		const showOptions = authTypes.length === 2 || forceShow;

		this.setState({ showOptions });
		if (!showOptions) {
			this.makeMfaRequest(username, attemptCount, 'EMAIL');
		}
	}

	render() {
		const { showOptions, enabled, requestMFAButtonText } = this.state;
		const { email, phone } = this.props;
		const options = this.getRadioButtonOptions(email, phone);

		return (
			<div className={`mfa-option ${!showOptions ? 'hide' : ''}`}>
				{showOptions && (
					<Fragment>
						<div className={'mfa-option-wrapper'}>
							<Radio
								callback={this.changeMFAType}
								name='accessibility'
								value={this.state.selected}
								hidden={false}
								toggle={true}
								options={options}
							/>
						</div>
						<RequestMFAButton
							onClick={
								requestMFAButtonText === 'SUBMIT CODE' ? this.submitCode : this.submitMfaOption
							}
							enabled={this.props.enabled ? this.props.enabled : enabled}
							title={requestMFAButtonText}
						/>
					</Fragment>
				)}
			</div>
		);
	}
}
