import React, { Component } from 'react';

import { BillingApi } from '../../../services/billing';
import { Utils } from '../../../services/utils';
const CDN_URL = process.env.REACT_APP_CDN_URL;
const paymentImage = `${CDN_URL}billing/payment-art.png`;

class RecentPayment extends Component {
	constructor(props) {
		super(props);
		this.billingApi = new BillingApi();
		this.state = {
			currentAvatar: '',
			dollarAmount: '0',
			centAmount: '0',
			date: '0',
		};
	}

	componentDidMount() {
		this.billingApi.getPayments(3).then(response => {
			let priceArray;
			const { transactions = [] } = response.data;
			console.log('Response Data: ', response.data);
			console.log('Transactions: ', transactions);
			if (transactions.length !== 0) {
				priceArray = Utils.formatCurrency(response.data.transactions[0].arDebit).split('.');
				this.setState({
					payments: response.data.transactions,
					dollarAmount: priceArray[0],
					centAmount: priceArray[1],
					date: Utils.formatInvoiceDate(response.data.transactions[0].effectiveTimestamp),
				});
			}
		});
	}

	render() {
		const { dollarAmount, centAmount, date } = this.state;
		return (
			<div className='recent-payment-wrapper'>
				<div className='payment-image'>
					{' '}
					<img src={paymentImage} />
				</div>
				<span className='payment-amount'>
					<span className='dollar'>$</span>
					<span className='amount'>{dollarAmount}</span>
					<span className='cents'>{centAmount}</span>
				</span>
				<span className='date-recieved'>Date Received: {date}</span>
			</div>
		);
	}
}

export default RecentPayment;
