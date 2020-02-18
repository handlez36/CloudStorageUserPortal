import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { BillingUtils, BillingApi } from '../../services/billing';
import { Sorting } from '../../services/sorting';
import { Utils } from '../../services/utils';
import Button from '../../blox_components/Common/BloxButton';

const CDN_URL = process.env.REACT_APP_CDN_URL;
const dueIcon = `${CDN_URL}billing/due-icon.svg`;
const overdueIcon = `${CDN_URL}billing/icon_Invoice_pastdue.svg`;
const paidIcon = `${CDN_URL}billing/invoice-icon-paid.svg`;

// const data = [
// 	{
// 		transactions: [
// 			{
// 				invoiceId: 585321,
// 				customerId: 346361,
// 				invoiceNumber: 1800,
// 				amount: '$100.00',
// 				outstandingBalance: '$3,000.00',
// 				invoiceTotal: '$3,160.00',
// 				uri: 'https://stg-secure.fusebill.com/v1/invoices/585321',
// 				transactionId: 69042044,
// 				effectiveDate: '01.16.20',
// 				description: 'Credit Card',
// 				transactionType: 'Credit Card',
// 				reference: 'CCTransID:1hw4asfb',
// 			},
// 		],
// 		invoiceNumber: '#1800',
// 		billcycle: '01.15.20',
// 		invoiceAmount: '3,160.00',
// 		dueDate: '02.14.20',
// 		amountDue: '3,000.00',
// 		status: 'Due',
// 		invoiceId: 585321,
// 		billCycle: undefined,
// 		theme: {
// 			icon: 'https://test.mydcblox.com/cdn/library/billing/Billing_Due_Icon.svg',
// 			bannerColor: 'blue',
// 		},
// 		summaryHeaders: {
// 			invoiceNumber: 'Invoice',
// 			billcycle: 'Sent',
// 			invoiceAmount: 'Total',
// 			dueDate: 'Due',
// 			amountDue: 'Balance',
// 		},
// 		detailHeaders: { effectiveDate: 'Date', description: 'Description', amount: 'Amount' },
// 	},
// 	// {
// 	// 	transactions: [
// 	// 		{
// 	// 			invoiceId: 585321,
// 	// 			customerId: 346361,
// 	// 			invoiceNumber: 1800,
// 	// 			amount: '$100.00',
// 	// 			outstandingBalance: '$3,000.00',
// 	// 			invoiceTotal: '$3,160.00',
// 	// 			uri: 'https://stg-secure.fusebill.com/v1/invoices/585321',
// 	// 			transactionId: 69042044,
// 	// 			effectiveDate: '01.16.20',
// 	// 			description: 'Credit Card',
// 	// 			transactionType: 'Credit Card',
// 	// 			reference: 'CCTransID:1hw4asfb',
// 	// 		},
// 	// 	],
// 	// 	invoiceNumber: '#1800',
// 	// 	billcycle: '01.15.20',
// 	// 	invoiceAmount: '3,160.00',
// 	// 	dueDate: '02.14.20',
// 	// 	amountDue: '3,000.00',
// 	// 	status: 'Due',
// 	// 	invoiceId: 585321,
// 	// 	billCycle: undefined,
// 	// 	theme: {
// 	// 		icon: 'https://test.mydcblox.com/cdn/library/billing/Billing_Due_Icon.svg',
// 	// 		bannerColor: 'blue',
// 	// 	},
// 	// 	summaryHeaders: {
// 	// 		invoiceNumber: 'Invoice',
// 	// 		billcycle: 'Sent',
// 	// 		invoiceAmount: 'Total',
// 	// 		dueDate: 'Due',
// 	// 		amountDue: 'Balance',
// 	// 	},
// 	// 	detailHeaders: { effectiveDate: 'Date', description: 'Description', amount: 'Amount' },
// 	// },
// ];
class RecentInvoices extends Component {
	constructor(props) {
		super(props);

		this.myObserver = null;
		this.billingApi = new BillingApi();
		this.state = {
			invoicesToDisplay: null,
			screenSize: null,
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

	goToInvoiceHistory = () => {
		const { callback } = this.props;

		if (callback) {
			callback('INVOICE HISTORY');
		}
	};

	getRecentInvoices = async () => {
		const response = await new BillingApi().getAll();
		const { data: { invoices = [] } = {} } = response;

		if (Utils.isValidResponse(response) && invoices) {
			const lastestThreeInvoices = BillingUtils.getInvoices(invoices, 3);

			this.setState({ invoicesToDisplay: lastestThreeInvoices, invoices });
		} else {
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
				<span className='dollar body10'>$</span>
				<span className='dollars'>{newArray[0] ? newArray[0] : amount}</span>
				<span className='cents body10'>{newArray[1] ? newArray[1] : '00'}</span>
			</Fragment>
		);
		// const regex = /(\d*)\.?(\d*)/;
		// const matches = `${amount}`.match(regex);
		// const [dollars, cents] = matches;

		// return (
		// 	<Fragment>
		// 		<span className='dollar'>$</span>
		// 		<span className='dollars'>{dollars}</span>
		// 		<span className='cents'>{cents}</span>
		// 	</Fragment>
		// );
	};

	getMonths = () => {
		const threeMonths = Sorting.getPrev3Months(new Date());
		return threeMonths;
	};
	getScreenSize = () => {
		const screenWidth = document.querySelector('.portal-header').clientWidth;
		const { invoices } = this.state;
		if (screenWidth < 1344) {
			const lastestTwo = BillingUtils.getInvoices(invoices, 2);
			this.setState({ invoicesToDisplay: lastestTwo });
		} else {
			const lastestTwo = BillingUtils.getInvoices(invoices, 3);
			this.setState({ invoicesToDisplay: lastestTwo });
		}
	};

	componentDidMount() {
		this.getRecentInvoices();

		this.setState({ screenSize: screen.width });
		this.myObserver = new ResizeObserver(entries => {
			entries.forEach(() => {
				this.getScreenSize();
			});
		});
		const wrapperElement = document.querySelector('.recent-invoices-wrapper');
		this.myObserver.observe(wrapperElement);
	}

	render() {
		const { invoicesToDisplay, invoices } = this.state;
		let customClass = '';
		if (invoicesToDisplay) {
			customClass = invoicesToDisplay.length === 1 ? 'one-invoice' : '';
		}
		console.log(invoices);
		return (
			<div className={`recent-invoices-wrapper recent-invoices ${customClass}`}>
				<div className='invoices invoice-list'>
					{invoicesToDisplay &&
						invoicesToDisplay.map(invoice => (
							<div key={invoice.invoiceId} className='recent-invoice'>
								<div className='invoice-image image'>
									<img src={this.getIcon(invoice.status)} />
								</div>
								<span className={`invoice-amount${invoice.status === 'Overdue' ? ' overdue' : ''}`}>
									{this.formatAmount(invoice.invoiceAmount)}
								</span>
								<span className='invoice-number body10'>
									{`Invoice: #${invoice.invoiceNumber}`}{' '}
								</span>
								<span className='date-sent invoice-date body10'>
									{`Date Sent: ${moment(invoice.billcycle).format('MM.DD.YY')}`}{' '}
								</span>
							</div>
						))}
				</div>
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
