import React, { Component } from 'react';

import paymentImage from '../../assets/billing/payment-art.png';
import { BillingApi } from '../../services/billing';
import { Utils } from '../../services/utils';

class RecentPayment extends Component {
	state = {
		dollarAmount: '0',
		centAmount: '0',
		date: null,
	};

	componentDidMount() {
		new BillingApi().getPayments(3).then(response => {
			let priceArray;
			if (response.data.transactions.length !== 0) {
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
			<div className='recent-payment-wrapper recent-payment'>
				<div className='payment-image'>
					<img src={paymentImage} />
				</div>
				<div className='payment-amount'>
					<span className='dollar'>$</span>
					<span className='amount'>{dollarAmount}</span>
					<span className='cents'>{centAmount}</span>
				</div>
				<div className='invoice-number'>Invoice: #34567</div>
				<span className='date-recieved'>Date Received: {date}</span>
			</div>
		);
	}
}

export default RecentPayment;
