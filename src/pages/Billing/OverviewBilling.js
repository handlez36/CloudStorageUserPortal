import React, { Component } from 'react';
import each from 'lodash/each';

import { DIMENSIONS } from '../../services/layoutManager';
import BloxPage from '../../sub_components/Layout/BloxPage';
import ComponentWrapper from '../../sub_components/Layout/ComponentWrapper';
import TicketCount from '../../blox_components/Common/TicketCountRow';
import RecentPayment from '../../blox_components/Billing/RecentPayment';
import RecentInvoices from '../../blox_components/Billing/RecentInvoices';
import TotalAmountDue from '../../blox_components/Billing/TotalAmountDue/TotalAmountDue';
import { TicketUtils } from './../../services/ticket';
import { RESOLUTIONS } from './../../services/config';

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

class OverviewBilling extends Component {
	render() {
		const { breakpoint, location } = this.props;

		return (
			<BloxPage
				name='sample-content-grid'
				layout={LAYOUT_CONFIG[breakpoint]}
				breakpoint={breakpoint}
				location={location}
			>
				<div key='openTickets' className='openTickets'>
					<ComponentWrapper title='TICKET Status' hideBorder>
						<TicketCount
							type={TicketUtils.TICKET_STATUS.OPEN}
							ticketType={TicketUtils.TICKET_TYPES.BILLING}
							trailColor={'#7e8200'}
							strokeColor={'#b4d334'}
							backgroundColor={'rgba(131, 129, 5, 0.9)'}
							text='OPEN'
						/>
					</ComponentWrapper>
				</div>
				<div key='closedTickets' className='closedTickets'>
					<ComponentWrapper hideTitle hideBorder>
						<TicketCount
							type={TicketUtils.TICKET_STATUS.CLOSED}
							ticketType={TicketUtils.TICKET_TYPES.BILLING}
							trailColor={'#7e8200'}
							strokeColor={'#b4d334'}
							backgroundColor={'rgba(131, 129, 5, 0.9)'}
						/>
					</ComponentWrapper>
				</div>
				<div key='recentInvoices' className='recentInvoices'>
					<ComponentWrapper title='RECENT Invoices' hideBorder>
						<RecentInvoices breakpoint={breakpoint} />
					</ComponentWrapper>
				</div>
				<div key='recentPayment' className='recentPayment'>
					<ComponentWrapper title='RECENT Payment' hideBorder>
						<RecentPayment breakpoint={breakpoint} />
					</ComponentWrapper>
				</div>
				<div key='totalAmountDue' className='totalAmountDue'>
					<ComponentWrapper title='TOTAL Amount Due' hideBorder>
						<TotalAmountDue />
					</ComponentWrapper>
				</div>
			</BloxPage>
		);
	}
}

export default OverviewBilling;
