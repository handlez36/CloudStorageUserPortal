import React, { Component, Fragment } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

import { BillingUtils, BillingApi } from '../../services/billing';
import { Sorting } from '../../services/sorting';
import { Utils } from '../../services/utils';
import Button from '../../components/Common/BloxButton';
import dueIcon from '../../assets/billing/due-icon.svg';
import overdueIcon from '../../assets/billing/icon_Invoice_pastdue.svg';
import paidIcon from '../../assets/billing/invoice-icon-paid.svg';

class RecentInvoices extends Component {
	state = {
		lastestThreeInvoices: null,
	};

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
		try {
			const response = await new BillingApi().getAll();
			const { data: { invoices = [] } = {} } = response;
			if (Utils.isValidResponse(response) && invoices) {
				const lastestThreeInvoices = BillingUtils.getLastThreeInvoices(invoices);
				this.setState({ lastestThreeInvoices });
			} else {
				this.setState({ showRecentPayment: false, error: 'Error pulling recent invoices' });
			}
		} catch (e) {
			this.setState({ error: e.message });
		}
	};

	formatAmount = amount => {
		const regex = /(\d*)\.?(\d*)/;
		const matches = `${amount}`.match(regex);
		const [, dollars, cents] = matches;

		return (
			<Fragment>
				<span className='dollar'>$</span>
				<span className='dollars'>{dollars}</span>
				<span className='cents'>{cents}</span>
			</Fragment>
		);
	};

	getMonths = () => {
		const threeMonths = Sorting.getPrev3Months(new Date());
		return threeMonths;
	};

	componentDidMount() {
		this.getRecentInvoices();
	}

	render() {
		const { lastestThreeInvoices } = this.state;

		return (
			<div className='recent-invoices-wrapper recent-invoices'>
				<div className='invoices invoice-list'>
					{lastestThreeInvoices &&
						lastestThreeInvoices.map(invoice => (
							<div key={invoice.invoiceId} className='recent-invoice'>
								<div className='invoice-image image'>
									<img src={this.getIcon(invoice.status)} />
								</div>
								<span className={`invoice-amount${invoice.status === 'Overdue' ? ' overdue' : ''}`}>
									{this.formatAmount(invoice.invoiceAmount)}
								</span>
								<span className='invoice-number'>{`Invoice: ${invoice.invoiceNumber}`} </span>
								<span className='date-sent invoice-date'>
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
