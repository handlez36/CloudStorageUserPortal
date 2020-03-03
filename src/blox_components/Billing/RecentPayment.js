import React, { Component, Fragment } from 'react';
import { BillingApi } from 'services/billing';
import { Utils } from 'services/utils';
import { RESOLUTIONS } from 'services/config';
const CDN_URL = process.env.REACT_APP_CDN_URL;

class RecentPayment extends Component {
	state = {
		dollarAmount: '0',
		centAmount: '0',
		date: null,
		recentTransaction: false,
	};

	componentDidMount() {
		this.getPayments();
	}

	getPayments = () => {
		new BillingApi().getPayments(3).then(response => {
			let priceArray;

			if (response.data.transactions && response.data.transactions.length !== 0) {
				priceArray = Utils.formatCurrency(response.data.transactions[0].arDebit).split('.');

				this.setState({
					payments: response.data.transactions,
					dollarAmount: priceArray[0],
					centAmount: priceArray[1],
					date: Utils.formatInvoiceDate(response.data.transactions[0].effectiveTimestamp),
					recentTransaction: true,
				});
			} else {
				this.props.showTitle(false);
				this.setState({ recentTransaction: false });
			}
		});
	};

	getPaymentImage() {
		const { breakpoint } = this.props;

		let paymentImage = `${CDN_URL}billing/recent-payment-image.svg`;
		if (breakpoint === RESOLUTIONS.LOW) {
			paymentImage = `${CDN_URL}billing/recent-payment-image-sm.svg`;
		} else if (breakpoint === RESOLUTIONS.HIGH) {
			paymentImage = `${CDN_URL}billing/recent-payment-image-lg.svg`;
		}

		return paymentImage;
	}

	render() {
		const { dollarAmount, centAmount, date, recentTransaction } = this.state;

		return (
			<Fragment>
				{recentTransaction && (
					<div className='recent-payment-wrapper recent-payment '>
						<div className='payment-image'>
							<img src={this.getPaymentImage()} />
						</div>
						<div className='payment-amount'>
							<span className='dollar numbers5'>$</span>
							<span className='amount numbers20'>{dollarAmount}</span>
							<span className='cents numbers5'>{centAmount}</span>
						</div>
						<div className='invoice-number body10'>Invoice: #34567</div>
						<span className='date-recieved body10'>Date Received: {date}</span>
					</div>
				)}
			</Fragment>
		);
	}
}

export default RecentPayment;
