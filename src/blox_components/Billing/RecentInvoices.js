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

const EmptyInvoice = {
	transactions: [
		{
			invoiceId: null,
			customerId: null,
			invoiceNumber: null,
			amount: '',
			outstandingBalance: '',
			invoiceTotal: '',
			uri: '',
			transactionId: null,
			effectiveDate: '',
			description: '',
			transactionType: '',
			reference: '',
		},
	],
	invoiceNumber: '',
	billcycle: '',
	invoiceAmount: '',
	dueDate: '',
	amountDue: '',
	status: null,
	invoiceId: null,
	billCycle: undefined,
	theme: {
		icon: '',
		bannerColor: '',
	},
	summaryHeaders: {
		invoiceNumber: 'Invoice',
		billcycle: 'Sent',
		invoiceAmount: 'Total',
		dueDate: 'Due',
		amountDue: 'Balance',
	},
	detailHeaders: { effectiveDate: 'Date', description: 'Description', amount: 'Amount' },
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
			this.setState({ invoices }, () => {
				this.getInvoicesToDisplay();
			});
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
	getInvoicesToDisplay = () => {
		try {
			const { breakpoint } = this.props;
			const { invoices } = this.state;
			if (breakpoint === RESOLUTIONS.LOW) {
				const lastestTwo = BillingUtils.getInvoices(invoices, 2);
				this.setState({ invoicesToDisplay: lastestTwo });
			} else {
				const lastestThree = BillingUtils.getInvoices(invoices, 3);
				this.setState({ invoicesToDisplay: lastestThree });
			}
		} catch (e) {}
	};

	componentDidMount() {
		this.getRecentInvoices();
	}
	componentDidUpdate(prevProps) {
		const { breakpoint } = this.props;
		if (prevProps.breakpoint !== breakpoint) {
			this.getInvoicesToDisplay();
		}
	}

	render() {
		const { invoicesToDisplay } = this.state;
		const { breakpoint } = this.props;
		if (invoicesToDisplay) {
			invoicesToDisplay.length === 1 ? invoicesToDisplay.push(EmptyInvoice) : '';
			invoicesToDisplay.length === 2 && breakpoint !== RESOLUTIONS.LOW
				? invoicesToDisplay.push(EmptyInvoice)
				: '';
		}

		return (
			<Fragment>
				{invoicesToDisplay && (
					<div className={'recent-invoices-wrapper recent-invoices'}>
						<div className='invoices invoice-list'>
							{invoicesToDisplay.map(invoice => (
								<div key={invoice.invoiceId} className='recent-invoice'>
									<div className='invoice-image image'>
										{invoice.status && <img src={this.getIcon(invoice.status)} />}
									</div>
									<span
										className={`invoice-amount${invoice.status === 'Overdue' ? ' overdue' : ''}`}
									>
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
							))}
						</div>
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
