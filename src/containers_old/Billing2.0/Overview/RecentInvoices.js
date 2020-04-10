import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { BillingUtils } from '../../../services/billing';
import { Sorting } from '../../../services/sorting';
import Button from '../../../components/Common/COMPANYButton';

const CDN_URL = process.env.REACT_APP_CDN_URL;
const dueIcon = `${CDN_URL}billing/due-icon.svg`;
const overdueIcon = `${CDN_URL}billing/icon_Invoice_pastdue.svg`;
const paidIcon = `${CDN_URL}billing/invoice-icon-paid.svg`;

class RecentInvoices extends Component {
	constructor(props) {
		super(props);
	}

	getIcon = status => {
		let icon;
		if (status === 'Paid') {
			icon = paidIcon;
		} else if (status === 'Overdue') {
			icon = overdueIcon;
		} else {
			icon = dueIcon;
		}

		return icon;
	};

	goToInvoiceHistory = () => {
		this.props.callback('INVOICE HISTORY');
	};

	getRecentInvoices = () => {};

	formatAmount = amount => {
		amount = amount.replace('$', '');
		const newArray = amount.split('.');
		return (
			<Fragment>
				<span className='dollar'>$</span>
				<span className='dollars'>{newArray[0]}</span>
				<span className='cents'>{newArray[1]}</span>
			</Fragment>
		);
	};

	getMonths = () => {
		const threeMonths = Sorting.getPrev3Months(new Date());
		return threeMonths;
	};

	render() {
		const latestInvoices = BillingUtils.getLastThreeInvoices(this.props.data);

		return (
			<div className='recent-invoices-wrapper'>
				{/* <span className='months'>{this.getMonths()}</span> */}

				<div className='invoices'>
					{latestInvoices &&
						latestInvoices.map(invoice => (
							<div key={invoice.invoiceId} className='recent-invoice'>
								<div className='image'>
									<img src={this.getIcon(invoice.status)} />
								</div>
								<span
									className={
										invoice.status === 'Overdue' ? 'invoice-amount overdue' : 'invoice-amount'
									}
								>
									{this.formatAmount(invoice.invoiceAmount)}{' '}
								</span>
								<span className='date-sent'>{`Date Sent: ${invoice.billcycle}`} </span>
								<span className='invoice-number'>{`Invoice: ${invoice.invoiceNumber}`} </span>
							</div>
						))}
				</div>
				<span className='invoice-history-button'>
					<Button
						title='VIEW HISTORY'
						enabled={true}
						customClass='COMPANY-button gradient'
						onClick={this.goToInvoiceHistory}
					/>
				</span>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		auth_status: state.auth_status,
	};
}

export default connect(mapStateToProps)(RecentInvoices);
