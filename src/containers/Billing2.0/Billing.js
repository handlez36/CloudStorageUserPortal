import React, { Component } from 'react';
import { connect } from 'react-redux';

import Overview from './Overview/Overview';
import PortalLayout from '../Layout/PortalLayout';
import CurrentInvoices from './CurrentInvoices/CurrentInvoices';
import Payments from '../../containers/Billing2.0/OnlinePayments/OnlinePayment';
import BillingHistory from './InvoiceHistory/BillingHistory';
import SupportSection from '../../components/Common/SupportSection';
import { FifthColumn } from '../../components/Common/FifthColumn';
import { SITE_MODULES, SITE_PAGES } from '../../components/Common/CommonConstants';
import { MENU, INVOICE_SUMMARY_HEADERS } from './BillingConstants';
import { updateModule, updatePage } from '../../actions/siteTracking';
import { BillingApi, BillingUtils } from '../../services/billing';
import { Permissions } from '../../services/permissions';

class Billing extends Component {
	constructor(props) {
		super(props);

		this.billingApi = new BillingApi();
		this.menuItems = {
			[MENU.OVERVIEW]: 1,
			[MENU.INVOICES]: 2,
			[MENU.HISTORY]: 3,
			[MENU.PAYMENT]: 4,
		};
		this.menuItems2 = {
			'': 1,
			[MENU.INVOICES]: 2,
			[MENU.HISTORY]: 3,
		};
		this.noOPMenuItems = {
			[MENU.OVERVIEW]: 1,
			[MENU.INVOICES]: 2,
			[MENU.HISTORY]: 3,
		};
		this.state = {
			data: null,
			error: null,
			active: MENU.INVOICES,
			supportSectionComponent: null,
			eligibleForOnlinePayment: false,
			dueInvoices: null,
			showOverview: false,
			menuItems: this.menuItems2,
		};
	}

	createBillingMenu = () => {
		const {
			user: { userGroups = {} },
			memberships,
		} = this.props.auth_status;

		const { access: hasBillingAccess } = Permissions.hasService(memberships, 'Billing');
		const hasOnlinePaymentAccess = hasBillingAccess && Permissions.hasOnlinePayment(userGroups);

		this.setState({
			showOverview: true,
			active: MENU.OVERVIEW,
			menuItems: hasOnlinePaymentAccess ? this.menuItems : this.noOPMenuItems,
			eligibleForOnlinePayment: hasOnlinePaymentAccess,
		});
	};

	componentDidMount() {
		const { updateModule, updatePage } = this.props;
		updateModule(SITE_MODULES.BILLING);
		updatePage(SITE_PAGES[MENU.INVOICES]);

		this.createBillingMenu();
		this.requestInvoices();
	}

	downloadPdf = invoiceId => {
		this.billingApi
			.get(invoiceId)
			.then(response => {
				this.setState({ pdfFile: response.data.file });

				this.billingApi.downloadPdf(response.data.file, invoiceId);
			})
			.catch(error => this.setState({ error }));
	};

	selectMenuItem = item => {
		this.setState({ active: item });

		this.unloadSupportColumn();
	};

	loadSupportColumn = (supportSectionComponent, supportParams) => {
		this.setState({ supportSectionComponent, supportParams });
	};

	unloadSupportColumn = () => {
		this.setState({ supportSectionComponent: null, supportParams: null });
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
					this.setState({ data: massagedData });
				}
			})
			.catch(() => this.handleInvoiceRetrievalError('Network error'));
	};

	render() {
		const {
			data,
			error,
			active,
			supportSectionComponent,
			eligibleForOnlinePayment,
			menuItems,
		} = this.state;

		/** TODO: Create and structure directories for Overview, Current Invoices, and Invoice History */
		return (
			<PortalLayout
				page='billing'
				sideMenu={menuItems}
				callback={this.selectMenuItem}
				activePage={this.menuItems[active]}
				history={this.props.history}
			>
				<div className='main billing'>
					<div className='billing-error-modal' ref='modal' />
					<div className='portal-header'>
						<div className='menu-selection'>{this.state.active}</div>
					</div>
					{this.state.active === MENU.OVERVIEW && this.state.data !== null && (
						<Overview
							data={this.state.data}
							error={error}
							callback={this.selectMenuItem}
							eligibleForOnlinePayment={eligibleForOnlinePayment}
						/>
					)}
					{this.state.active === MENU.INVOICES && this.state.data !== null && (
						<CurrentInvoices
							data={this.state.data}
							loadSupportColumn={this.loadSupportColumn}
							downloadPdf={this.downloadPdf}
							error={error}
							callback={this.selectMenuItem}
							eligibleForOnlinePayment={eligibleForOnlinePayment}
						/>
					)}
					{this.state.active === MENU.HISTORY && this.state.data !== null && (
						<BillingHistory
							loadSupportColumnCallback={this.loadSupportColumn}
							data={data}
							downloadPdfCallback={this.downloadPdf}
						/>
					)}
					{this.state.active === MENU.PAYMENT && (
						// <Payments loadSupportColumnCallback={this.loadSupportColumn} data={dueInvoices} />
						<Payments
							refreshInvoices={this.requestInvoices}
							loadSupportColumnCallback={this.loadSupportColumn}
						/>
					)}
				</div>
				<SupportSection
					content={supportSectionComponent}
					auth_status={this.props.auth_status}
					unloadSupportColumn={this.unloadSupportColumn}
					showPdf={this.showPdf}
					pdf={this.state.CURRENT}
					supportParams={this.state.supportParams}
				/>
				<FifthColumn />
			</PortalLayout>
		);
	}
}

function mapStateToProps(state) {
	return {
		auth_status: state.auth_status,
	};
}

export default connect(
	mapStateToProps,
	{ updateModule, updatePage },
)(Billing);
