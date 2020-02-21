import React, { Component } from 'react';
import { connect } from 'react-redux';
import CalendarDay from 'blox_components/Billing/TotalAmountDue/Components/CalendarDay';
import CallToAction from 'blox_components/Billing/TotalAmountDue/Components/CallToAction';
import { BillingApi } from 'services/billing';
import { Permissions } from 'services/permissions';

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
	getModulePages = async () => {
		const response = await Permissions.getModulePermissions(4);

		if (response && !response.data.error) {
			this.setState({
				pages: response.data.pages,
			});
		}
	};

	componentDidMount() {
		this.getInvoices();
		this.getSummary();
		this.getModulePages();
	}

	render() {
		const { invoices, summary, invoiceErr, summaryErr, pages } = this.state;

		const hasOnlinePaymentAccess = Permissions.checkComponentAccess(
			pages,
			'Overview',
			'bill-paynow-component',
		);
		return (
			<div class='total-amount-due'>
				<CalendarDay invoices={invoices} />
				<CallToAction
					invoices={invoices}
					summary={summary}
					hasOnlinePaymentAccess={hasOnlinePaymentAccess}
				/>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		auth_status: state.auth_status,
		company_info: state.company_info,
	};
}

export default connect(mapStateToProps)(TotalAmountDue);
