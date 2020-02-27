import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DIMENSIONS } from 'services/layoutManager';
import BloxPage from 'sub_components/Layout/BloxPage';
import ComponentWrapper from 'sub_components/Layout/ComponentWrapper';
import TicketCount from 'sub_components/Common/TicketCountRow';
import RecentPayment from 'blox_components/Billing/RecentPayment';
import RecentInvoices from 'blox_components/Billing/RecentInvoices';
import TotalAmountDue from 'blox_components/Billing/TotalAmountDue/TotalAmountDue';
import { TicketUtils } from 'services/ticket';
import { RESOLUTIONS } from 'services/config';
import { Permissions } from 'services/permissions';
import { HIGH_LEVEL_TICKET_STATUS as TICKET_STATUS } from 'utils/TicketConstants';

const LAYOUT_CONFIG = {
	[RESOLUTIONS.LOW]: {
		recentInvoices: { x: 1, y: 31, dim: DIMENSIONS.TWO_BY_SIX, customHeight: 112 },
		totalAmountDue: { x: 1, y: 0, dim: DIMENSIONS.TWO_BY_SIX },
		recentPayment: { x: 8, y: 31, dim: DIMENSIONS.TWO_BY_THREE },
		openTickets: { x: 8, y: 0, dim: DIMENSIONS.TWO_BY_TWO },
		closedTickets: { x: 10, y: 0, dim: DIMENSIONS.TWO_BY_TWO },
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
		totalAmountDue: { x: 1, y: 0, dim: DIMENSIONS.TWO_BY_SIX },
		recentPayment: { x: 8, y: 51, dim: DIMENSIONS.TWO_BY_THREE },
		openTickets: { x: 8, y: 0, dim: DIMENSIONS.TWO_BY_TWO },
		closedTickets: { x: 10, y: 0, dim: DIMENSIONS.TWO_BY_TWO },
	},
};

class OverviewPage extends Component {
	state = {
		amountDuePermission: false,
		ticketCountPermission: false,
		showTitleTicketCount: false,
		showTitleRecentInvoices: false,
		showTitleRecentPayment: false,
	};
	componentDidMount() {
		this.checkOverviewPagePermissions();
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
		const {
			amountDuePermission,
			ticketCountPermission,
			showTitleTicketCount,
			showTitleRecentInvoices,
			showTitleRecentPayment,
		} = this.state;

		return (
			<BloxPage
				name='page billing-overview-page'
				layout={LAYOUT_CONFIG[breakpoint]}
				breakpoint={breakpoint}
				location={location}
			>
				<div key='openTickets' className='openTickets'>
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

				<div key='closedTickets' className='closedTickets'>
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

				<div key='recentInvoices' className='recentInvoices'>
					<ComponentWrapper title={showTitleRecentInvoices ? 'RECENT Invoices' : ''} hideBorder>
						<RecentInvoices breakpoint={breakpoint} showTitle={this.showTitleRecentInvoices} />
					</ComponentWrapper>
				</div>
				<div key='recentPayment' className='recentPayment'>
					<ComponentWrapper title={showTitleRecentPayment ? 'RECENT Payment' : ''} hideBorder>
						<RecentPayment breakpoint={breakpoint} showTitle={this.showTitleRecentPayment} />
					</ComponentWrapper>
				</div>

				<div key='totalAmountDue' className='totalAmountDue'>
					{amountDuePermission && (
						<ComponentWrapper title='TOTAL Amount Due' hideBorder>
							<TotalAmountDue />
						</ComponentWrapper>
					)}
				</div>
			</BloxPage>
		);
	}
}

function mapStateToProps(state) {
	return {
		auth_status: state.auth_status,
		company_info: state.company_info,
	};
}

export default connect(mapStateToProps)(OverviewPage);
