import React, { Component } from 'react';

import CalendarDay from './CalendarDay';
import CallToAction from './CallToAction';
import { BillingApi } from './../../services/billing';

class TotalAmountDue extends Component {
	state = {
		invoices: null,
		summary: null,
		invoiceErr: null,
		summaryErr: null,
	};

	getInvoices = async () => {
		try {
			const response = await new BillingApi().getAll();
			if (response) {
				const { invoices } = response.data;
				this.setState({ invoices });
			}
		} catch (e) {
			this.setState({ invoiceErr: e.message });
		}
	};

	getSummary = async () => {
		try {
			const response = await new BillingApi().getSummary();
			if (response) {
				const { balance, error, nextBillingDate } = response.data;
				this.setState({ summary: { balance, error, nextBillingDate } });
			}
		} catch (e) {
			this.setState({ summaryErr: e.message });
		}
	};

	componentDidMount() {
		this.getInvoices();
		this.getSummary();
	}

	render() {
		const { invoices, summary, invoiceErr, summaryErr } = this.state;

		return (
			<div class='total-amount-due'>
				<CalendarDay invoices={invoices} />
				<CallToAction invoices={invoices} summary={summary} />
			</div>
		);
	}
}

export default TotalAmountDue;
