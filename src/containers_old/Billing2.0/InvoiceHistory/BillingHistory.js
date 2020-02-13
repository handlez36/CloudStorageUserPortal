import React, { Component } from 'react';
import { connect } from 'react-redux';
import Filter from '../../../components/Common/DropDownFilter';
import { billingHistorySorting, DETAIL_HEADERS, MENU } from '../BillingConstants';
import { BillingUtils, FILTERS } from '../../../services/billing';
import AccordianList from '../../../components/Common/AccordianList';
import { SITE_PAGES } from '../../../components/Common/CommonConstants';
import { updatePage } from '../../../actions/siteTracking';
const CDN_URL = process.env.REACT_APP_CDN_URL;

const HERO = `${CDN_URL}billing/InvoiceHistoryHERO.png`;
const SortingIconActive = `${CDN_URL}billing/Billing-Sorting-Icon-Active.png`;
const SortingIconDefault = `${CDN_URL}billing/Billing-Sorting-Icon-Default.png`;
const CalendarIconActive = `${CDN_URL}billing/Billing-Calendar-Icon-Active.png`;
const CalendarIconDefault = `${CDN_URL}billing/Billing-Calendar-Icon-Default.png`;

class BillingHistory extends Component {
	constructor(props) {
		super(props);

		this.state = {
			filteredData: '',
			currentMonth: '',
			prev3Months: '',
			currentSortSelected: 'Invoice Date (Des)',
			currentfilterSelected: FILTERS.ALL,
		};
	}

	componentDidMount() {
		const { updatePage } = this.props;
		updatePage(SITE_PAGES.BILLING[MENU.HISTORY]);

		const { data } = this.props;
		this.setState({ data });
	}

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

	render() {
		const billingHistoryFiltering = [
			{ value: FILTERS.ALL },
			{ value: FILTERS.CURRENT },
			{ value: FILTERS.LAST3 },
			{ value: FILTERS.PAID },
			{ value: FILTERS.UNPAID },
		];

		const { getHeaders, showPdf, downloadPdfCallback, loadSupportColumnCallback } = this.props;
		const { currentfilterSelected, currentSortSelected, data } = this.state;

		const filteredData = BillingUtils.filterList2(data, currentfilterSelected);
		const filteredAndSortedData = BillingUtils.billingSort2(filteredData, currentSortSelected);

		return (
			<div className='billing-history'>
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
						getFormattedHeaders={getHeaders}
						data={filteredAndSortedData}
						detailHeaders={DETAIL_HEADERS}
						enableNav
						showPdf={showPdf}
						downloadPdf={downloadPdfCallback}
						loadSupportColumn={loadSupportColumnCallback}
					/>
				)}
			</div>
		);
	}
}

export default connect(
	null,
	{ updatePage },
)(BillingHistory);
