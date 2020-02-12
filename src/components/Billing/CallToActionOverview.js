import React, { Component, Fragment } from 'react';
import moment from 'moment';
import { Decimal } from 'decimal.js';
import { BillingApi } from '../../services/billing';
import { Utils } from '../../services/utils';

import BloxButton from '../Common/BloxButton';

export default class CallToActionOverview extends Component {
	constructor(props) {
		super(props);

		this.state = {
			pastDueAmount: null,
			nextInvoiceAmountDue: null,
			totalAmountDue: null,
			dueAmount: null,
			amountDueToday: 0,
			dueDates: null,
			actionText: null,
			nextBillingDate: null,
			nextDueDate: null,
			balanceCopy: null,
		};

		this.billingApi = new BillingApi();
	}

	grabInvoices = () => {
		this.billingApi.getAll().then(response => {
			const invoices = response.data.invoices;
			const dueDates = [];
			let pastDue = null;
			let hasOverdue = false;
			let hasDue = false;
			let hasDueToday = false;
			const today = moment().startOf('day');

			invoices.map(invoice => {
				if (invoice.status === 'Overdue') {
					hasOverdue = true;
					pastDue = pastDue === null ? invoice.amountDue : pastDue + invoice.amountDue;
				}

				if (invoice.status === 'Due') {
					if (hasDue === false) {
						this.setState({
							nextDueDate: Utils.formatInvoiceDate(invoice.dueDate),
							nextInvoiceAmountDue: invoice.amountDue,
						});
					}
					hasDue = true;
				}

				if (invoice.amountDue !== 0 && (invoice.status === 'Due' || invoice.status === 'Overdue')) {
					dueDates.push(invoice.dueDate);
				}

				const dueDate = moment(invoice.dueDate).format('M.D.YY');

				if (today.isSame(dueDate) && invoice.amountDue !== 0) {
					hasDueToday = true;
					this.setState({ amountDueToday: this.state.amountDueToday + invoice.amountDue });
				}

				dueDates.sort(function(left, right) {
					const dateA = moment(left);
					const dateB = moment(right);

					if (dateA.isBefore(dateB)) {
						return -1;
					} else if (dateA.isAfter(dateB)) {
						return 1;
					} else {
						return 0;
					}
				});
			});

			let thisInvoiceDate;
			if (hasDueToday) {
				for (const thisInvoice of invoices) {
					thisInvoiceDate = moment(thisInvoice.dueDate, 'YYYY-MM-DD HH:mm Z').startOf('day');
					if (today.isBefore(thisInvoiceDate)) {
						this.setState({
							nextDueDate: Utils.formatInvoiceDate(thisInvoice.dueDate),
							nextInvoiceAmountDue: thisInvoice.amountDue,
						});
					}
				}
			}

			this.billingApi.getSummary().then(accountSummary => {
				const balanceDecimal = new Decimal(accountSummary.data.balance || 0.0);
				const pastDueDecimal = new Decimal(pastDue === null || pastDue === undefined ? 0 : pastDue);
				const dueAmount = balanceDecimal.minus(pastDueDecimal).toString();

				this.setState({
					totalAmountDue: Utils.formatCurrency(accountSummary.data.balance)
						.replace(',', '')
						.split('.'),
					dueDates: dueDates.length === 0 ? null : dueDates[0],
					pastDueAmount: pastDue,
					dueAmount,
					nextBillingDate: Utils.formatInvoiceDate(accountSummary.data.nextBillingDate),
				});
				if (this.props.currentInvoiceCopy === true) {
					this.setState({
						balanceCopy: this.getBalanceCopyForCurrentInvoices(hasDueToday, hasDue, hasOverdue),
					});
				} else {
					this.setState({ balanceCopy: this.getBalanceCopy(hasDueToday, hasDue, hasOverdue) });
				}
			});
		});
	};

	getBalanceCopyForCurrentInvoices = (hasDueToday, hasDue, hasOverdue) => {
		const { nextBillingDate } = this.state;
		if (hasOverdue) {
			return (
				<div>
					<div className='invoice-calendar-next-payment-due'>
						<span>Your payment is</span>
						<span className={`invoice-calendar-payment-date overdue`}>PAST DUE!</span>
					</div>
					<div className='invoice-calendar-leftover'>
						<span>Amount due includes ${this.state.pastDueAmount} past due.</span>
					</div>
				</div>
			);
		} else if (hasDueToday) {
			return (
				<div>
					<div className='invoice-calendar-next-payment-due'>
						<span className={`invoice-calendar-payment-action`}>${this.state.amountDueToday}</span>
						<span className={`invoice-calendar-payment-date overdue`}>DUE TODAY!</span>
					</div>
					<div className='invoice-calendar-leftover'>
						<span>
							${this.state.nextInvoiceAmountDue} due {this.state.nextDueDate}
						</span>
					</div>
				</div>
			);
		} else if (hasDue) {
			return (
				<div>
					<div className='invoice-calendar-next-payment-due'>
						<span className={`invoice-calendar-payment-action`}>
							Next payment due{' '}
							<span className={'next-payment-date'}> {this.state.nextDueDate}</span>
						</span>
					</div>
				</div>
			);
		} else {
			console.log('BILL DATE ' + this.state.nextBillingDate);
			nextBillingDate;
			return (
				<div>
					<div className='invoice-calendar-next-payment-due'>
						{!(
							this.state.nextBillingDate === null ||
							this.state.nextBillingDate === undefined ||
							this.state.nextBillingDate.includes('Invalid')
						) && (
							<span className={`invoice-calendar-payment-action`}>
								Next invoice is on {this.state.nextBillingDate}
							</span>
						)}
						{(this.state.nextBillingDate === null ||
							this.state.nextBillingDate === undefined ||
							this.state.nextBillingDate.includes('Invalid')) && (
							<span className={`invoice-calendar-payment-action`}>No payment due</span>
						)}
					</div>
				</div>
			);
		}
	};

	getBalanceCopy = (hasDueToday, hasDue, hasOverdue) => {
		if (hasOverdue) {
			return (
				<div>
					<div className='invoice-calendar-next-payment-due'>
						<span className={`invoice-calendar-payment-action`}>${this.state.pastDueAmount}</span>
						<span className={`invoice-calendar-payment-date overdue`}>PAST DUE!</span>
					</div>
					<div className='invoice-calendar-leftover'>
						{this.state.nextInvoiceAmountDue && this.state.nextDueDate && (
							<span>
								${this.state.nextInvoiceAmountDue} due {this.state.nextDueDate}
							</span>
						)}
					</div>
				</div>
			);
		} else if (hasDueToday) {
			return (
				<div>
					<div className='invoice-calendar-next-payment-due'>
						<span className={`invoice-calendar-payment-action`}>${this.state.amountDueToday}</span>
						<span className={`invoice-calendar-payment-date overdue`}>DUE TODAY!</span>
					</div>
					<div className='invoice-calendar-leftover'>
						<span>
							${this.state.nextInvoiceAmountDue} due {this.state.nextDueDate}
						</span>
					</div>
				</div>
			);
		} else if (hasDue) {
			return (
				<div>
					<div className='invoice-calendar-next-payment-due'>
						<span className={`invoice-calendar-payment-action`}>
							Next payment due {this.state.nextDueDate}
						</span>
					</div>
				</div>
			);
		} else {
			return (
				<div>
					<div className='invoice-calendar-next-payment-due'>
						{!(
							this.state.nextBillingDate === null ||
							this.state.nextBillingDate === undefined ||
							this.state.nextBillingDate.includes('Invalid')
						) && (
							<span className={`invoice-calendar-payment-action`}>
								Next invoice is on {this.state.nextBillingDate}
							</span>
						)}
						{(this.state.nextBillingDate === null ||
							this.state.nextBillingDate === undefined ||
							this.state.nextBillingDate.includes('Invalid')) && (
							<span className={`invoice-calendar-payment-action`}>No payment due</span>
						)}
					</div>
				</div>
			);
		}
	};

	componentDidMount() {
		this.grabInvoices();
	}

	outputAction = () => {
		const { totalAmountDue, balanceCopy } = this.state;
		const { eligibleForOnlinePayment, showAddress, screenSize, page } = this.props;

		if (totalAmountDue !== null || totalAmountDue === 0) {
			return (
				<Fragment>
					<div className={'call-to-action'}>
						{showAddress && (
							<div className={'invoice-calendar-address'}>
								<span className='address-bold'>
									Make a payment via check or money order to:
									<br />
								</span>
								DC Blox 6 W Druid Hills Dr NE Atlanta, GA 30329
							</div>
						)}
						<div className='invoice-calendar-amount-due'>
							<span className='invoice-lift-dollar'>$</span>
							<span className='invoice-amount-due'>{totalAmountDue[0]}</span>
							<span className='invoice-lift-cents'>
								{totalAmountDue[1] ? totalAmountDue[1] : '00'}
							</span>
						</div>

						{balanceCopy}
						{eligibleForOnlinePayment && screenSize >= 2560 && page !== 'overview' && (
							<div className={page === 'overview' ? 'pay-now-button overview' : 'pay-now-button'}>
								<BloxButton
									title='PAY NOW'
									enabled={true}
									customClass='support-button green-gradient'
									onClick={this.props.goToPayments}
								/>
							</div>
						)}
						{eligibleForOnlinePayment && page === 'overview' && (
							<div className={page === 'overview' ? 'pay-now-button overview' : 'pay-now-button'}>
								<BloxButton
									title='PAY NOW'
									enabled={true}
									customClass='support-button green-gradient'
									onClick={this.props.goToPayments}
								/>
							</div>
						)}
					</div>
				</Fragment>
			);
		}
	};

	render() {
		return <div className='invoice-calendar-action'>{this.outputAction()}</div>;
	}
}
