import React, { Component } from 'react';
import { connect } from 'react-redux';
import Client from 'braintree-web/client';
import HostedFields from 'braintree-web/hosted-fields';

import Input from '../../../components/Forms/COMPANYTextInput';
import Button from '../../../components/Common/COMPANYButton';
import ErrorModal from '../../../components/Common/ErrorModal';
import { INPUT_TYPES } from '../../../components/Common/CommonConstants';
import { AmexCardIcon, VisaCardIcon, MastercardCardIcon } from './CardTypeIcons';
import { UserProfileApi } from '../../../services/userProfile';
const CDN_URL = process.env.REACT_APP_CDN_URL;
const GenericCreditCardIcon = `${CDN_URL}billing/Billing_Generic_Card.svg`;

// Mike's sandbox
// const BRAINTREE_AUTHORIZATION_ID = 'sandbox_v3y3dbnp_h45ns8y785mh4tmv';

// Bryce's sandbox
// const BRAINTREE_AUTHORIZATION_ID = 'sandbox_5rfs22rj_h45ns8y785mh4tmv';
const BRAINTREE_AUTHORIZATION_ID = process.env.REACT_APP_BRAINTREE_KEY;
const VALID_CARD_TYPES = ['american-express', 'visa', 'master-card'];
const STEPS = ['name', 'number', 'expirationDate', 'cvv', 'postalCode'];
const nameValidations = [
	{ message: 'Must have at least two words', pattern: /[a-zA-Z]+\s[a-zA-Z]+/ },
];

class PaymentMethod extends Component {
	state = {
		name: '',
		nonce: null,
		lastFour: null,
		step: 1,
		hostedFields: null,
		completedFields: [],
		error: null,
		invalidCardType: false,
		validationErrors: [],
		submitted: false,
	};

	onChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	markComplete = (field, valid) => {
		const { id, updateProgress } = this.props;
		const { step, completedFields } = this.state;
		const completedFieldsCopy = [...completedFields];
		const index = completedFields.indexOf('name');

		if (valid) {
			if (index < 0) {
				completedFieldsCopy.push('name');
			}
			this.setState({ step: step > 1 ? step : 2, completedFields: completedFieldsCopy });
		} else if (!valid) {
			if (index >= 0) {
				completedFieldsCopy.splice(index, 1);
				this.setState({ completedFields: completedFieldsCopy });
			}
		}
		updateProgress(id, completedFieldsCopy.length);
	};

	isValid = field => {
		const { validationErrors } = this.state;

		return validationErrors.includes(field) ? 'invalid' : '';
	};

	formatWizardParams = (component, cardholderName, nonce, lastFour, cardType) => {
		const {
			companyInfo,
			companyInfo: { customer: { companyName } = {} } = {},
			authStatus,
		} = this.props;
		const userName = UserProfileApi.getFirstAndLastName(authStatus);
		const email = UserProfileApi.getEmail(authStatus);
		const phone = UserProfileApi.getPhone(authStatus);
		const addressParts = UserProfileApi.getBillingAddressParts(authStatus);

		return {
			component,
			data: {
				cardholderName,
				nonce,
				lastFour,
				userName,
				email,
				phone,
				addressParts,
				cardType,
				company: companyInfo ? companyName : 'Company Unknown',
			},
		};
	};

	sendParams = () => {
		const { nextStep, name: stepName } = this.props;
		const { hostedFields, name: cardholderName, cardType } = this.state;
		const submitBtn = document.querySelector('#submit-button');
		submitBtn.setAttribute('disabled', 'disabled');

		hostedFields.tokenize((err, payload) => {
			if (err) {
				/* Error attempting to get payment nonce */
				submitBtn.removeAttribute('disabled');
				this.setState({ error: err, submitted: false });
			} else {
				const { nonce, details: { lastFour = '' } = {} } = payload;
				this.setState({ nonce, lastFour, submitted: true });
				const data = this.formatWizardParams(stepName, cardholderName, nonce, lastFour, cardType);
				nextStep(data);
			}
		});
	};

	validateField = field => {
		const { id, updateProgress } = this.props;
		const { completedFields: completed, validationErrors: errors, step } = this.state;
		const errorIndex = errors.indexOf(field);
		const completedIndex = completed.indexOf(field);
		let nextStep = step;

		if (errorIndex !== -1) {
			errors.splice(errorIndex, 1);
		}
		if (completedIndex === -1) {
			completed.push(field);
			const latestStepReached = completed.reduce((max, field) => {
				const stepNum = STEPS.indexOf(field) + 1;
				if (stepNum > max) {
					max = stepNum;
				}
				return max;
			}, 0);
			if (STEPS.indexOf(field) + 1 === latestStepReached) {
				nextStep = latestStepReached + 1;
			}
		}

		this.setState({ completedFields: completed, validationErrors: errors, step: nextStep });
		updateProgress(id, completed.length);
	};

	invalidateField = field => {
		const { id, updateProgress } = this.props;
		const { completedFields: completed, validationErrors: errors } = this.state;
		const errorIndex = errors.indexOf(field);
		const completedIndex = completed.indexOf(field);

		if (completedIndex !== -1) {
			completed.splice(completedIndex, 1);
		}
		if (errorIndex === -1) {
			errors.push(field);
		}
		this.setState({ completedFields: completed, validationErrors: errors });
		updateProgress(id, completed.length);
	};

	hostedFieldsDidCreate = (err, hostedFields) => {
		if (err) {
			this.setState({ error: err });
			return;
		}

		const submitBtn = document.querySelector('#submit-button');
		submitBtn.removeAttribute('disabled');

		hostedFields.on('validityChange', event => {
			const { fields, emittedBy } = event;
			const validity = fields[emittedBy].isValid;
			validity ? this.validateField(emittedBy) : this.invalidateField(emittedBy);
		});

		hostedFields.on('cardTypeChange', event => {
			if (event.cards.length === 1 && VALID_CARD_TYPES.includes(event.cards[0].type)) {
				this.setState({ cardType: event.cards[0].type, invalidCardType: false });
			} else if (event.cards.length === 1 && !VALID_CARD_TYPES.includes(event.cards[0].type)) {
				this.setState({ invalidCardType: true });
			} else {
				this.setState({ cardType: null });
			}

			const { emittedBy } = event;
			if (!event.fields[emittedBy].isValid) {
				this.invalidateField('number');
			}
		});

		this.setState({ hostedFields });
	};

	getCardIcon = () => {
		const { cardType } = this.state;

		switch (cardType) {
			case 'american-express':
				return <AmexCardIcon />;
			case 'visa':
				return <VisaCardIcon />;
			case 'master-card':
				return <MastercardCardIcon />;
			default:
				return <img src={GenericCreditCardIcon} alt='card' />;
		}
	};

	getSoftErrorBody = () => {
		return (
			<div className='soft-error'>
				<div className='top-message'>
					Something went wrong while connecting to our payment processor. We cannot accept payments
					at this time.
				</div>
				<div className='bottom-message'>
					If the problem persists please call
					<br />
					877-590-1684.
				</div>
				<Button
					title='OK'
					enabled={true}
					customClass='COMPANY-button gradient'
					onClick={this.props.resetWizard}
				/>
			</div>
		);
	};

	componentDidMount() {
		const { id, editParams, updateProgress } = this.props;

		if (editParams) {
			updateProgress(id, 0);
		}

		Client.create(
			{
				authorization: BRAINTREE_AUTHORIZATION_ID,
			},
			(err, client) => {
				if (!err) {
					console.log('Err: ', err);
				}
				HostedFields.create(
					{
						client,
						styles: {
							input: {
								'font-size': '14px',
								'font-family': 'helvetica, tahoma, calibri, sans-serif',
								color: '#3a3a3a',
							},
							':focus': {
								color: 'black',
							},
						},
						fields: {
							number: {
								selector: '#cc-num',
								placeholder: 'XXXX XXXX XXXX XXXX',
								rejectUnsupportedCards: true,
							},
							expirationDate: {
								selector: '#expiration-date',
								placeholder: 'MM/YY',
							},
							cvv: {
								selector: '#cvv',
								placeholder: 'XXX',
							},
							postalCode: {
								selector: '#postal-code',
								placeholder: 'XXXXX',
								maxlength: 9,
							},
						},
					},
					this.hostedFieldsDidCreate,
				);
			},
		);
	}

	toggleErrorModal = () => {
		this.setState({ error: null });
	};

	render() {
		const { error, name, step, completedFields, invalidCardType, submitted } = this.state;

		return (
			<div className='payment-method'>
				<ErrorModal
					isOpen={error}
					toggleOpen={this.toggleErrorModal}
					customTitle='Payment Method Error'
					customBody={this.getSoftErrorBody()}
				/>
				<div className='step-instructions'>
					SELECT <span>payment method</span>
				</div>
				<div className='payment-form'>
					<Input
						id='name'
						type={INPUT_TYPES.INPUT}
						label='Name'
						labelSubText='(As it appears on the card)'
						name='name'
						placeholder='John Doe'
						value={name}
						validations={nameValidations}
						onChange={this.onChange}
						markComplete={this.markComplete}
						active
						hideCheckmark
					/>
					<div
						className={`field-wrapper cc-num-wrapper ${this.isValid('number')} ${
							step > 1 ? 'visible' : ''
						}`}
					>
						<div className='card-image'>{this.getCardIcon()}</div>
						<label>Card Number</label>
						<div id='cc-num' className='hosted-field' />
						<div className='validation-message'>This card number is not valid.</div>
						{invalidCardType && (
							<div className='validation-message'>
								Currently we only accept Visa, American Express and Mastercard
							</div>
						)}
					</div>
					<div
						className={`field-wrapper expiration-date-wrapper ${this.isValid('expirationDate')} ${
							step > 2 ? 'visible' : ''
						}`}
					>
						<label>Expiration Date</label>
						<div id='expiration-date' className='hosted-field' />
						<div className='validation-message'>Invalid expiration date.</div>
					</div>
					<div
						className={`field-wrapper cvv-wrapper ${this.isValid('cvv')} ${
							step > 3 ? 'visible' : ''
						}`}
					>
						<label>CVV</label>
						<div id='cvv' className='hosted-field' />
						<div className='validation-message'>Invalid CVV.</div>
					</div>
					<div
						className={`field-wrapper postal-code-wrapper ${this.isValid('postalCode')} ${
							step > 4 ? 'visible' : ''
						}`}
					>
						<label>Postal Code</label>
						<div id='postal-code' className='hosted-field' />
						<div className='validation-message'>Invalid postal code</div>
					</div>
				</div>
				<Button
					id='submit-button'
					title='NEXT'
					enabled={completedFields.length > 4 && !submitted}
					customClass='COMPANY-button circle-large'
					onClick={this.sendParams}
				/>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		authStatus: state.auth_status,
		companyInfo: state.company_info,
	};
}

export default connect(
	mapStateToProps,
	null,
)(PaymentMethod);
