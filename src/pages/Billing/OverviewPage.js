import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { DIMENSIONS } from 'services/layoutManager';
import COMPANYPage from 'sub_components/Layout/COMPANYPage';
import ComponentWrapper from 'sub_components/Layout/ComponentWrapper';
import TicketCount from 'sub_components/Common/TicketCountRow';
import RecentPayment from 'COMPANY_components/Billing/RecentPayment';
import RecentInvoices from 'COMPANY_components/Billing/RecentInvoices';
import TotalAmountDue from 'COMPANY_components/Billing/TotalAmountDue/TotalAmountDue';
import { updateModule, updatePage, addPageToBreadCrumbs } from 'actions/siteTracking';
import { SITE_PAGES, SITE_MODULES } from 'utils/CommonConstants';
import { MENU as BILLING_MENU } from 'utils/BillingConstants';
import { TicketUtils } from 'services/ticket';
import { RESOLUTIONS, BREAKPOINT_COLCOUNT_MAP } from 'services/config';
import { Permissions } from 'services/permissions';
import { HIGH_LEVEL_TICKET_STATUS as TICKET_STATUS } from 'utils/TicketConstants';
import { Utils } from 'services/utils';

const LAYOUT_CONFIG = {
	[RESOLUTIONS.LOW]: {
		recentInvoices: { x: 1, y: 25, dim: DIMENSIONS.TWO_BY_SIX },
		totalAmountDue: { x: 1, y: 2, dim: DIMENSIONS.TWO_BY_SIX },
		recentPayment: { x: 8, y: 25, dim: DIMENSIONS.TWO_BY_THREE },
		openTickets: { x: 8, y: 2, dim: DIMENSIONS.TWO_BY_TWO },
		closedTickets: { x: 10, y: 2, dim: DIMENSIONS.TWO_BY_TWO },
	},
	[RESOLUTIONS.MED]: {
		recentInvoices: { x: 1, y: 31, dim: DIMENSIONS.TWO_BY_SIX },
		totalAmountDue: { x: 1, y: 0, dim: DIMENSIONS.TWO_BY_SIX },
		recentPayment: { x: 8, y: 31, dim: DIMENSIONS.TWO_BY_THREE },
		openTickets: { x: 8, y: 0, dim: DIMENSIONS.TWO_BY_TWO },
		closedTickets: { x: 10, y: 0, dim: DIMENSIONS.TWO_BY_TWO },
	},
	[RESOLUTIONS.HIGH]: {
		recentInvoices: { x: 1, y: 51, dim: DIMENSIONS.TWO_BY_SIX },
		totalAmountDue: { x: 1, y: 3, dim: DIMENSIONS.TWO_BY_SIX },
		recentPayment: { x: 8, y: 51, dim: DIMENSIONS.TWO_BY_THREE },
		openTickets: { x: 8, y: 3, dim: DIMENSIONS.TWO_BY_TWO },
		closedTickets: { x: 10, y: 3, dim: DIMENSIONS.TWO_BY_TWO },
	},
};

class OverviewPage extends Component {
	state = {
		amountDuePermission: false,
		ticketCountPermission: false,
		showTitleTicketCount: true,
		showTitleRecentInvoices: true,
		showTitleRecentPayment: true,
	};

	componentWillUnmount() {
		Utils.removeHorizontalBar();
	}

	componentDidMount() {
		const { updateModule, updatePage, addPageToBreadCrumbs } = this.props;
		updatePage(SITE_PAGES.BILLING[BILLING_MENU.OVERVIEW]);
		addPageToBreadCrumbs(SITE_PAGES.BILLING[BILLING_MENU.OVERVIEW], SITE_MODULES.BILLING);
		updateModule(SITE_MODULES.BILLING);

		this.checkOverviewPagePermissions();
		Utils.showHorizontalBar();
	}

	checkOverviewPagePermissions = () => {
		const { auth_status, company_info } = this.props;

		//Can see amount due if owner or member of Billing
		const { access: amountDuePermission } = Permissions.hasService(
			auth_status.memberships,
			'Billing',
		);
		//Can see Ticket Count if owner or member of Support
		const { access: ticketCountPermission } = Permissions.hasService(
			auth_status.memberships,
			'Support',
		);

		this.setState({ amountDuePermission, ticketCountPermission });
	};
	showTitleTicketCount = show => {
		const { showTitleTicketCount } = this.state;
		if (showTitleTicketCount !== show) {
			this.setState({ showTitleTicketCount: show });
		}
	};
	showTitleRecentInvoices = show => {
		console.log('show recent invoice calles');
		const { showTitleRecentInvoices } = this.state;
		if (showTitleRecentInvoices !== show) {
			this.setState({ showTitleRecentInvoices: show });
		}
	};
	showTitleRecentPayment = show => {
		console.log('show recent payment calles');
		const { showTitleRecentPayment } = this.state;
		if (showTitleRecentPayment !== show) {
			this.setState({ showTitleRecentPayment: show });
		}
	};

	render() {
		const { breakpoint, location } = this.props;
		const columnCount = BREAKPOINT_COLCOUNT_MAP[breakpoint];
		const {
			amountDuePermission,
			ticketCountPermission,
			showTitleTicketCount,
			showTitleRecentInvoices,
			showTitleRecentPayment,
		} = this.state;

		return (
			<COMPANYPage
				name='page billing-overview-page'
				layout={LAYOUT_CONFIG[breakpoint]}
				breakpoint={breakpoint}
				location={location}
			>
				<div key={`openTickets-${columnCount}`} className='openTickets'>
					{ticketCountPermission && (
						<ComponentWrapper title={showTitleTicketCount ? 'TICKET Status' : ''} hideBorder>
							<TicketCount
								status={TICKET_STATUS.OPEN}
								ticketType={TicketUtils.TICKET_TYPES.BILLING}
								showTitle={this.showTitleTicketCount}
							/>
						</ComponentWrapper>
					)}
				</div>

				<div key={`closedTickets-${columnCount}`} className='closedTickets'>
					{ticketCountPermission && (
						<ComponentWrapper hideTitle hideBorder>
							<TicketCount
								status={TICKET_STATUS.CLOSED}
								ticketType={TicketUtils.TICKET_TYPES.BILLING}
								showTitle={this.showTitleTicketCount}
							/>
						</ComponentWrapper>
					)}
				</div>

				<div key={`recentInvoices-${columnCount}`} className='recentInvoices'>
					<ComponentWrapper title={showTitleRecentInvoices ? 'RECENT Invoices' : ''} hideBorder>
						<RecentInvoices breakpoint={breakpoint} showTitle={this.showTitleRecentInvoices} />
					</ComponentWrapper>
				</div>
				<div key={`recentPayment-${columnCount}`} className='recentPayment'>
					<ComponentWrapper title={showTitleRecentPayment ? 'RECENT Payment' : ''} hideBorder>
						<RecentPayment breakpoint={breakpoint} showTitle={this.showTitleRecentPayment} />
					</ComponentWrapper>
				</div>

				<div key={`totalAmountDue-${columnCount}`} className='totalAmountDue'>
					{amountDuePermission && (
						<ComponentWrapper title='TOTAL Amount Due' hideBorder>
							<TotalAmountDue />
						</ComponentWrapper>
					)}
				</div>
			</COMPANYPage>
		);
	}
}

function mapStateToProps(state) {
	return {
		auth_status: state.auth_status,
		company_info: state.company_info,
		site: state.site_tracking,
	};
}

export default connect(
	mapStateToProps,
	{ updateModule, updatePage, addPageToBreadCrumbs },
)(OverviewPage);
