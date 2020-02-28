import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { BillingUtils, BillingApi } from 'services/billing';
import { Sorting } from 'services/sorting';
import { Utils } from 'services/utils';
import { RESOLUTIONS } from 'services/config';
const CDN_URL = process.env.REACT_APP_CDN_URL;
const dueIcon = `${CDN_URL}billing/due-icon.svg`;
const overdueIcon = `${CDN_URL}billing/icon_Invoice_pastdue.svg`;
const paidIcon = `${CDN_URL}billing/invoice-icon-paid.svg`;
const NUM_INVOICES_TO_SHOW = {
	[RESOLUTIONS.LOW]: 2,
	[RESOLUTIONS.MED]: 3,
	[RESOLUTIONS.HIGH]: 3,
};

class RecentInvoices extends Component {
	constructor(props) {
		super(props);

		this.billingApi = new BillingApi();
		this.state = {
			invoicesToDisplay: null,
			screenWidth: null,
			invoices: null,
		};
	}

	getIcon = status => {
		switch (status) {
			case 'Paid':
				return paidIcon;
			case 'Overdue':
				return overdueIcon;
			default:
				return dueIcon;
		}
	};

	getRecentInvoices = async () => {
		const response = await new BillingApi().getAll();
		const { data: { invoices = [] } = {} } = response;

		if (Utils.isValidResponse(response) && invoices) {
			this.setState({ invoices });
		} else {
			this.props.showTitle(false);
			this.setState({ showRecentPayment: false, error: 'Error pulling recent invoices' });
		}
	};

	formatAmount = amount => {
		const number = amount.toString();
		let newArray = [];

		if (number.includes('.')) {
			newArray = number.split('.');
		}

		return (
			<Fragment>
				<span className='dollar numbers5'>$</span>
				<span className='dollars numbers20'>{newArray[0] ? newArray[0] : amount}</span>
				<span className='cents numbers5'>{newArray[1] ? newArray[1] : '00'}</span>
			</Fragment>
		);
	};

	getMonths = () => {
		const threeMonths = Sorting.getPrev3Months(new Date());
		return threeMonths;
	};
	renderRecentInvoices = invoices => {
		const invoiceList = [];
		for (let i = 0; i < NUM_INVOICES_TO_SHOW[this.props.breakpoint]; i++) {
			const invoice = invoices[i];
			invoiceList.push(
				invoice ? (
					<div key={invoice.invoiceId} className='recent-invoice'>
						<div className='invoice-image image'>
							{invoice.status && <img src={this.getIcon(invoice.status)} />}
						</div>
						<span className={`invoice-amount${invoice.status === 'Overdue' ? ' overdue' : ''}`}>
							{invoice.invoiceAmount ? this.formatAmount(invoice.invoiceAmount) : ''}
						</span>
						<span className='invoice-number body10'>
							{invoice.invoiceNumber
								? `Invoice: #${invoice.invoiceNumber ? invoice.invoiceNumber : ''}`
								: ''}
						</span>
						<span className='date-sent invoice-date body10'>
							{invoice.billcycle
								? `Date Sent: ${moment(invoice.billcycle).format('MM.DD.YY')}`
								: ''}
						</span>
					</div>
				) : (
					<div className='recent-invoice empty' />
				),
			);
		}

		return invoiceList;
	};

	componentDidMount() {
		this.getRecentInvoices();
	}

	render() {
		const { invoicesToDisplay, invoices } = this.state;
		const { breakpoint } = this.props;
		if (invoicesToDisplay) {
			invoicesToDisplay.length === 1 ? invoicesToDisplay.push(EmptyInvoice) : '';
			invoicesToDisplay.length === 2 && breakpoint !== RESOLUTIONS.LOW
				? invoicesToDisplay.push(EmptyInvoice)
				: '';
		}

		return (
			<Fragment>
				{invoices && (
					<div className={'recent-invoices-wrapper recent-invoices'}>
						<div className='invoices invoice-list'>{this.renderRecentInvoices(invoices)}</div>
					</div>
				)}
			</Fragment>
		);
	}
}

function mapStateToProps(state) {
	return {
		auth_status: state.auth_status,
	};
}

export default connect(mapStateToProps)(RecentInvoices);
