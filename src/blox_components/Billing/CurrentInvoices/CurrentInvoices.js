import React, { Component } from 'react';
import { connect } from 'react-redux';

import AccordianList from 'components_old/Common/AccordianList';
import { BillingApi, BillingUtils } from 'services/billing';
import { SITE_PAGES, SITE_MODULES } from 'utils/CommonConstants';
import { updateModule, updatePage } from 'actions/siteTracking';
import { MENU, INVOICE_SUMMARY_HEADERS } from 'utils/BillingConstants';

import BloxButton from 'sub_components/Common/BloxButton';
import SupportSection from 'components_old/Common/SupportSection';
import InvoiceAmountDueOverview from '../TotalAmountDue/TotalAmountDue';

class CurrentInvoices extends Component {
	constructor(props) {
		super(props);
		this.billingApi = new BillingApi();
		this.state = {
			screenSize: window.innerWidth,
			supportSectionComponent: null,
			eligibleForOnlinePayment: false,
		};
	}

	goToPayments = () => {
		const { callback } = this.props;
		callback(MENU.PAYMENT);
	};
	handleInvoiceRetrievalError = error => {
		const modal = this.refs.modal;

		if (modal) {
			if (!modal.classList.contains('fail')) {
				modal.classList.add('fail');
				setTimeout(() => {
					modal.classList.remove('fail');
				}, 3000);
			}
		}

		this.setState({ error });
	};

	componentDidMount() {
		const { updatePage } = this.props;
		updateModule(SITE_MODULES.BILLING);
		updatePage(SITE_PAGES.BILLING[MENU.INVOICES]);
		this.resizeComponent();
		this.requestInvoices();
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
	downloadPdf = invoiceId => {
		this.billingApi
			.get(invoiceId)
			.then(response => {
				this.setState({ pdfFile: response.data.file });

				this.billingApi.downloadPdf(response.data.file, invoiceId);
			})
			.catch(error => this.setState({ error }));
	};
	requestInvoices = () => {
		this.billingApi
			.getAll()
			.then(response => {
				if (response.status !== 200 || response.data.error) {
					this.handleInvoiceRetrievalError(response.data.error || 'Error');
				} else {
					const massagedData = BillingUtils.massageData(
						response.data.invoices,
						INVOICE_SUMMARY_HEADERS,
					);
					console.log('massaged DATA', massagedData);
					this.setState({ data: massagedData });
				}
			})
			.catch(() => this.handleInvoiceRetrievalError('Network error'));
	};
	loadSupportColumn = (supportSectionComponent, supportParams) => {
		this.setState({ supportSectionComponent, supportParams });
	};

	unloadSupportColumn = () => {
		this.setState({ supportSectionComponent: null, supportParams: null });
	};

	render() {
		const { callback, eligibleForOnlinePayment } = this.props;
		const { screenSize, data, supportParams, supportSectionComponent } = this.state;

		const latestInvoices = BillingUtils.getInvoices(data, 3);

		return (
			<div className='current-invoices-page'>
				<div className='current-invoices-page-wrapper'>
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
							loadSupportColumn={this.loadSupportColumn}
							downloadPdf={this.downloadPdf}
							lowerFilterAnchor='current-invoices-page'
							enableNav
						/>
					</div>
				</div>
				<div className='support-section-wrapper'>
					<SupportSection
						content={supportSectionComponent}
						auth_status={this.props.auth_status}
						unloadSupportColumn={this.unloadSupportColumn}
						showPdf={this.showPdf}
						pdf={this.state.CURRENT}
						supportParams={this.state.supportParams}
					/>
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
export default connect(mapStateToProps, { updatePage, updateModule })(CurrentInvoices);
