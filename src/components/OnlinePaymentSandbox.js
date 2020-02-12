import React, { Component } from 'react';
import Client from 'braintree-web/client';
import HostedFields from 'braintree-web/hosted-fields';

import InvoicePaymentItem from './Billing/InvoicePaymentItem';
import InputField from './Forms/BloxTextInput';
import Wizard from './Forms/BloxWizard';
import PaymentMethod from './../containers/Billing2.0/OnlinePayments/PaymentMethod';
import PaymentSummary from '../containers/Billing2.0/OnlinePayments/PaymentSummary';
import Input from './Forms/BloxTextInput';
import Button from './Common/BloxButton';
import { ICON_TYPES, ICONS } from '../containers/Billing2.0/BillingConstants';
import { INPUT_TYPES, currencyMask } from './Common/CommonConstants';

class OnlinePaymentSandbox extends Component {
	constructor(props) {
		super(props);

		this.state = {
			amountDue: {
				'123456': 75.23,
				'654321': 25.0,
			},
			amountsPaid: {
				'123456': 75.23,
				'654321': 25.0,
			},
			selected: {
				'123456': true,
				'654321': false,
			},
			hostFields: null,
		};
	}

	onChange = event => {
		const fieldname = event.target.name;
		const value = event.target.value;
		this.setState(state => (state.amountsPaid[fieldname] = value));
	};

	onClick = event => {
		event.stopPropagation();
	};

	markComplete = event => {
		console.log('Mark Completed');
	};

	onSelect = id => {
		const { selected, amountsPaid, amountDue } = this.state;
		const current = selected[id];
		const amtDue = amountDue[id];
		const newSelected = { ...selected, [id]: !current };
		const newAmounts = { ...amountsPaid, [id]: !selected[id] ? '' : amtDue };

		this.setState(state => ({ ...state, selected: newSelected, amountsPaid: newAmounts }));

		const input = document.querySelector(`input[name="${id}"]`);
		if (!selected[id]) {
			setTimeout(() => {
				input.focus();
			}, 0);
		}
	};

	massageData = num => {
		return num === '123456'
			? [
					{ header: 'Invoice #', value: '#123456' },
					{ header: 'Date Due', value: '01.16.19', alert: true },
					{ header: 'Amount Due', value: '$175.00', alertIcon: true, alert: true },
					{
						header: 'Amount to Pay',
						value: '$0.00',
						custom: true,
						component: this.getAmountPaidField('123456'),
					},
			  ]
			: [
					{ header: 'Invoice #', value: '#654321' },
					{ header: 'Date Due', value: '01.16.19', alert: true },
					{ header: 'Amount Due', value: '$175.00', alertIcon: true, alert: true },
					{
						header: 'Amount to Pay',
						value: '$0.00',
						custom: true,
						component: this.getAmountPaidField('654321'),
					},
			  ];
	};

	getAmountPaidField = num => {
		return num === '123456' ? (
			<InputField
				type={INPUT_TYPES.INPUT}
				label=''
				name='123456'
				mask={currencyMask}
				value={this.state.amountsPaid['123456']}
				validations={[]}
				disabled={!this.state.selected['123456']}
				onChange={this.onChange}
				onClick={this.onClick}
				markComplete={this.markComplete}
				active={true}
				hideCheckmark
			/>
		) : (
			<InputField
				type={INPUT_TYPES.INPUT}
				label=''
				name='654321'
				mask={currencyMask}
				value={this.state.amountsPaid['654321']}
				validations={[]}
				disabled={!this.state.selected['654321']}
				onChange={this.onChange}
				onClick={this.onClick}
				markComplete={this.markComplete}
				active={true}
				hideCheckmark
			/>
		);
	};

	// handleSubmit = hostedFields => {
	// 	console.log('Submitting');
	// 	const { hostFields } = this.state;
	// 	const submitBtn = document.querySelector('#submit-button');

	// 	submitBtn.setAttribute('disabled', 'disabled');
	// 	hostedFields.tokenize(function(err, payload) {
	// 		if (err) {
	// 			submitBtn.removeAttribute('disabled');
	// 			console.error(err);
	// 		} else {
	// 			form['payment_method_nonce'].value = payload.nonce;
	// 			form.submit();
	// 		}
	// 	});
	// };

	// hostedFieldsDidCreate = (err, hostedFields) => {
	// 	const submitBtn = documdent.querySelector('#submit-button');
	// 	submitBtn.removeAttribute('disabled');

	// 	console.log('Hosted fields did create');
	// 	this.setState({ hostedFields });
	// };

	// componentDidMount() {
	// 	Client.create(
	// 		{
	// 			authorization: 'sandbox_v3y3dbnp_h45ns8y785mh4tmv',
	// 		},
	// 		(err, client) => {
	// 			HostedFields.create(
	// 				{
	// 					client,
	// 					styles: {},
	// 					fields: {
	// 						number: {
	// 							selector: '#cc-num',
	// 						},
	// 					},
	// 				},
	// 				this.hostedFieldsDidCreate,
	// 			);
	// 		},
	// 	);
	// }

	render() {
		return (
			<div id='op_sandbox'>
				{/* <h3>Online Payment Components</h3>
				<br />
				Invoice Payment Item Component:
				<br />
				<InvoicePaymentItem
					data={this.massageData('123456')}
					icon={ICONS[ICON_TYPES.PAID]}
					onSelect={() => this.onSelect('123456')}
					selected={this.state.selected['123456']}
				/>
				<br />
				<InvoicePaymentItem
					data={this.massageData('654321')}
					icon={ICONS[ICON_TYPES.PAID]}
					onSelect={() => this.onSelect('654321')}
					selected={this.state.selected['654321']}
				/>
				<br />
				<br /> */}
				{/* <PaymentMethod /> */}
				<div className='sample-third-column'>
					<PaymentSummary />
				</div>
			</div>
		);
	}
}

export default OnlinePaymentSandbox;
