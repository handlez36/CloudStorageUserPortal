import React, { Component } from 'react';
import { connect } from 'react-redux';
import Filter from 'components_old/Common/DropDownFilter';
import {
	billingHistorySorting,
	DETAIL_HEADERS,
	MENU,
	INVOICE_SUMMARY_HEADERS,
} from 'utils/BillingConstants';
import { BillingApi, BillingUtils, FILTERS } from 'services/billing';
import AccordianList from 'components_old/Common/AccordianList';
import { SITE_PAGES, SITE_MODULES } from 'utils/CommonConstants';
import { updatePage, updateModule, addPageToBreadCrumbs } from 'actions/siteTracking';
import SupportSection from 'components_old/Common/SupportSection';
const CDN_URL = process.env.REACT_APP_CDN_URL;

const HERO = `${CDN_URL}billing/InvoiceHistoryHERO.png`;
const SortingIconActive = `${CDN_URL}billing/Billing-Sorting-Icon-Active.png`;
const SortingIconDefault = `${CDN_URL}billing/Billing-Sorting-Icon-Default.png`;
const CalendarIconActive = `${CDN_URL}billing/Billing-Calendar-Icon-Active.png`;
const CalendarIconDefault = `${CDN_URL}billing/Billing-Calendar-Icon-Default.png`;

class InvoiceHistory extends Component {
	constructor(props) {
		super(props);
		this.billingApi = new BillingApi();
		this.state = {
			filteredData: '',
			currentMonth: '',
			prev3Months: '',
			currentSortSelected: 'Invoice Date (Des)',
			currentfilterSelected: FILTERS.ALL,
			data: null,
			supportSectionComponent: null,
		};
	}

	componentDidMount() {
		const { updatePage, updateModule, addPageToBreadCrumbs } = this.props;
		updatePage(SITE_PAGES.BILLING[MENU.HISTORY]);
		addPageToBreadCrumbs(SITE_PAGES.BILLING[MENU.HISTORY]);
		updateModule(SITE_MODULES.BILLING);
		this.requestInvoices();
	}
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

	setInitialData() {
		this.filterInvoices(this.state.currentfilterSelected);
	}

	sortInvoices = selected => {
		this.setState({ currentSortSelected: selected });
	};

	filterInvoices = selected => {
		this.setState({ currentfilterSelected: selected });
	};

	changeIcon = id => {
		if (id === 'filter-one') {
			document.getElementById('filter-two').src = SortingIconActive;
			document.getElementById('filter-one').src = CalendarIconDefault;
		} else {
			document.getElementById('filter-one').src = CalendarIconActive;
			document.getElementById('filter-two').src = SortingIconDefault;
		}
	};
	loadSupportColumn = (supportSectionComponent, supportParams) => {
		this.setState({ supportSectionComponent, supportParams });
	};

	unloadSupportColumn = () => {
		this.setState({ supportSectionComponent: null, supportParams: null });
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

	render() {
		const billingHistoryFiltering = [
			{ value: FILTERS.ALL },
			{ value: FILTERS.CURRENT },
			{ value: FILTERS.LAST3 },
			{ value: FILTERS.PAID },
			{ value: FILTERS.UNPAID },
		];

		const {
			currentfilterSelected,
			currentSortSelected,
			data,
			supportSectionComponent,
		} = this.state;

		const filteredData = BillingUtils.filterList2(data, currentfilterSelected);
		const filteredAndSortedData = BillingUtils.billingSort2(filteredData, currentSortSelected);

		return (
			<div className='invoice-history-wrapper'>
				<div className='invoice-history'>
					<div className='billing-history-title'>
						<span className='billing-history-span'>VIEW</span> past payments , adjustments and
						credits.
					</div>
					<div className='billing-history-img'>
						<img id='billing-history-img' src={HERO} />
					</div>
					<div className='sort-filter'>
						<Filter
							changeIcon={this.changeIcon}
							id='filter-one'
							className='billing-history-filter'
							title={currentfilterSelected}
							customWrapper='billing-filter-wrapper'
							icon={CalendarIconActive}
							altIcon={CalendarIconDefault}
							iconStyle='billing-icon'
							callback={this.filterInvoices}
							options={billingHistoryFiltering}
						/>
						<Filter
							changeIcon={this.changeIcon}
							id='filter-two'
							iconStyle='billing-icon'
							className='billing-history-filter'
							customWrapper='billing-filter-wrapper-2'
							icon={SortingIconActive}
							title={currentSortSelected}
							altIcon={SortingIconDefault}
							callback={this.sortInvoices}
							options={billingHistorySorting}
						/>
					</div>
					<div className='billing-history-title'>
						<span className='billing-history-span'>SEARCH</span> Results
					</div>
					{filteredData && (
						<AccordianList
							data={filteredAndSortedData}
							detailHeaders={DETAIL_HEADERS}
							enableNav
							downloadPdf={this.downloadPdf}
							loadSupportColumn={this.loadSupportColumn}
						/>
					)}
				</div>
				<div className='support-section-wrapper'>
					<SupportSection
						content={supportSectionComponent}
						auth_status={this.props.auth_status}
						unloadSupportColumn={this.unloadSupportColumn}
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

export default connect(mapStateToProps, { updatePage, updateModule, addPageToBreadCrumbs })(
	InvoiceHistory,
);
