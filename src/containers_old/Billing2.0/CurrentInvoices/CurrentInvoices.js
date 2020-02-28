import React, { Component } from 'react';
import { connect } from 'react-redux';

import AccordianList from '../../../components/Common/AccordianList';
import { MENU } from '../BillingConstants';
import { BillingUtils } from '../../../services/billing';
import { SITE_PAGES } from '../../../components/Common/CommonConstants';
import { updatePage } from '../../../actions/siteTracking';
import InvoiceAmountDueOverview from '../../../components/Billing/InvoiceAmountDueOverview';
import BloxButton from '../../../components/Common/BloxButton';

class CurrentInvoices extends Component {
	constructor(props) {
		super(props);
		this.state = {
			screenSize: window.innerWidth,
		};
	}

	goToPayments = () => {
		const { callback } = this.props;
		callback(MENU.PAYMENT);
	};

	componentDidMount() {
		const { updatePage } = this.props;
		updatePage(SITE_PAGES.BILLING[MENU.INVOICES]);
		this.resizeComponent();
	}
	goToPayments = () => {
		const { callback } = this.props;
		if (callback) {
			callback('MAKE A PAYMENT');
		}
	};

	resizeComponent = () => {
		window.addEventListener('resize', () => {
			this.setState({ screenSize: window.innerWidth });
		});
	};

	render() {
		const { data, loadSupportColumn, downloadPdf, callback, eligibleForOnlinePayment } = this.props;
		const { screenSize } = this.state;

		const latestInvoices = BillingUtils.getLastThreeInvoices(data);

		return (
			<div className='current-invoices-page'>
				<div className='amount-due-section'>
					<div className='page-title'>TOTAL Amount Due</div>
					<InvoiceAmountDueOverview
						customClass={'pay-now-button'}
						showAddress={true}
						callback={callback}
						eligibleForOnlinePayment={eligibleForOnlinePayment}
						currentInvoiceCopy={true}
					/>
					<div className='invoice-calendar-leftovers'>
						{screenSize < 2559 && (
							<div className='invoice-calendar-footnote'>
								<span className='footnote-remember'>REMEMBER</span>{' '}
								<span className='footnote-remaining'>
									note to which invoice(s) your payment should be applied.
								</span>
							</div>
						)}
						{eligibleForOnlinePayment && screenSize < 2559 && (
							<div className='pay-now-button'>
								<BloxButton
									title='PAY NOW'
									enabled={true}
									customClass='blox-button gradient'
									onClick={this.goToPayments}
								/>
							</div>
						)}
					</div>
				</div>

				<div className='current-invoices-section'>
					<div className='page-title'>RECENT Invoices</div>
					<AccordianList
						data={latestInvoices}
						loadSupportColumn={loadSupportColumn}
						downloadPdf={downloadPdf}
						lowerFilterAnchor='current-invoices-page'
						enableNav
					/>
				</div>
			</div>
		);
	}
}

export default connect(
	null,
	{ updatePage },
)(CurrentInvoices);
