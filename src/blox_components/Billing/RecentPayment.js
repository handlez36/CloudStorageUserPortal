import React, { Component } from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import { BillingApi } from '../../services/billing';
import { Utils } from '../../services/utils';

const CDN_URL = process.env.REACT_APP_CDN_URL;
//const paymentImage = `${CDN_URL}billing/recent-payment-image.svg`;

class RecentPayment extends Component {
	state = {
		dollarAmount: '0',
		centAmount: '0',
		date: null,
		screenWidth: null,
		paymentImage: null,
	};

	componentDidMount() {
		this.myObserver = new ResizeObserver(entries => {
			entries.forEach(() => {
				this.getPaymentImage();
			});
		});
		const wrapperElement = document.querySelector('.recent-payment');
		this.myObserver.observe(wrapperElement);
		this.getPaymentImage();
		new BillingApi().getPayments(3).then(response => {
			let priceArray;

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

	getPaymentImage() {
		const screenWidth = document.querySelector('.portal-header').clientWidth;

		console.log('Screensize PAYMENT', screenWidth);

		let paymentImage = `${CDN_URL}billing/recent-payment-image.svg`;
		if (screenWidth < 1344) {
			paymentImage = `${CDN_URL}billing/recent-payment-image-sm.svg`;
		} else if (screenWidth > 2240) {
			paymentImage = `${CDN_URL}billing/recent-payment-image-lg.svg`;
		}
		console.log(paymentImage);

		this.setState({ paymentImage });
	}

	render() {
		const { dollarAmount, centAmount, date, paymentImage } = this.state;

		return (
			<div className='recent-payment-wrapper recent-payment '>
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
