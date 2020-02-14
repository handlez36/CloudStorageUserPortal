import React, { Component } from 'react';

import { BillingApi } from '../../services/billing';
import { Utils } from '../../services/utils';

const CDN_URL = process.env.REACT_APP_CDN_URL;
const paymentImage = `${CDN_URL}billing/recent-payment-image.svg`;

class RecentPayment extends Component {
	state = {
		dollarAmount: '0',
		centAmount: '0',
		date: null,
		screenWidth: null,
	};

	componentDidMount() {
		new BillingApi().getPayments(3).then(response => {
			let priceArray;
			console.log('RESPONSE', response);

			if (response.data.transactions && response.data.transactions.length !== 0) {
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
		const { dollarAmount, centAmount, date, screenWidth } = this.state;
		console.log(screenWidth);
		return (
			<div className='recent-payment-wrapper recent-payment v3'>
				<div className='payment-image'>
					<img src={paymentImage} />
				</div>
				<div className='payment-amount'>
					<span className='dollar body10'>$</span>
					<span className='amount'>{dollarAmount}</span>
					<span className='cents body10'>{centAmount}</span>
				</div>
				<div className='invoice-number body10'>Invoice: #34567</div>
				<span className='date-recieved body10'>Date Received: {date}</span>
			</div>
		);
	}
}

export default RecentPayment;
