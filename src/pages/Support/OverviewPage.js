import React from 'react';

import { DIMENSIONS } from 'services/layoutManager';
import BloxPage from 'sub_components/Layout/BloxPage';
import ComponentWrapper from 'sub_components/Layout/ComponentWrapper';
import TicketCount from 'blox_components/Common/TicketCountRow';
import IssueRequest from 'blox_components/Support/IssueRequest/IssueRequest';
import ServiceRequest from 'blox_components/Support/ServiceRequest';
import { TICKET_TYPES, HIGH_LEVEL_TICKET_STATUS as TICKET_STATUS } from 'utils/TicketConstants';
import { RESOLUTIONS } from 'services/config';

const LAYOUT_CONFIG = {
	[RESOLUTIONS.LOW]: {
		issueRequest: { x: 1, y: 24, dim: DIMENSIONS.FOUR_BY_FOUR },
		remoteHandsRequest: { x: 6, y: 24, dim: DIMENSIONS.FOUR_BY_THREE },
		guestAccessRequest: { x: 9, y: 24, dim: DIMENSIONS.FOUR_BY_THREE },
		openTickets: { x: 1, y: 2, dim: DIMENSIONS.TWO_BY_TWO },
		closedTickets: { x: 3, y: 2, dim: DIMENSIONS.TWO_BY_TWO },
	},
	[RESOLUTIONS.MED]: {
		issueRequest: { x: 1, y: 31, dim: DIMENSIONS.FOUR_BY_FOUR },
		remoteHandsRequest: { x: 6, y: 31, dim: DIMENSIONS.FOUR_BY_THREE },
		guestAccessRequest: { x: 9, y: 31, dim: DIMENSIONS.FOUR_BY_THREE },
		openTickets: { x: 1, y: 0, dim: DIMENSIONS.TWO_BY_TWO },
		closedTickets: { x: 3, y: 0, dim: DIMENSIONS.TWO_BY_TWO },
	},
	[RESOLUTIONS.HIGH]: {
		issueRequest: { x: 1, y: 50, dim: DIMENSIONS.FOUR_BY_FOUR },
		remoteHandsRequest: { x: 6, y: 50, dim: DIMENSIONS.FOUR_BY_THREE },
		guestAccessRequest: { x: 9, y: 50, dim: DIMENSIONS.FOUR_BY_THREE },
		closedTickets: { x: 3, y: 3, dim: DIMENSIONS.TWO_BY_TWO },
		openTickets: { x: 1, y: 3, dim: DIMENSIONS.TWO_BY_TWO },
	},
};

const OverviewPage = ({ breakpoint, location }) => {
	return (
		<BloxPage
			name='page support-overview-page'
			layout={LAYOUT_CONFIG[breakpoint]}
			breakpoint={breakpoint}
			location={location}
		>
			<div key='openTickets' className='openTickets'>
				<ComponentWrapper title='TICKET Status' hideBorder>
					<TicketCount status={TICKET_STATUS.OPEN} ticketType={TICKET_TYPES.SUPPORT} />
				</ComponentWrapper>
			</div>
			<div key='closedTickets' className='closedTickets'>
				<ComponentWrapper hideTitle hideBorder>
					<TicketCount status={TICKET_STATUS.CLOSED} ticketType={TICKET_TYPES.SUPPORT} />
				</ComponentWrapper>
			</div>
			<div key='issueRequest' className='issueRequest'>
				<ComponentWrapper title='ISSUE Request' hideBorder>
					<IssueRequest breakpoint={breakpoint} />
				</ComponentWrapper>
			</div>
			<div key='remoteHandsRequest' className='remoteHandsRequest'>
				<ComponentWrapper title='SERVICE Request' hideBorder>
					<ServiceRequest type='REMOTE_HANDS' breakpoint={breakpoint} />
				</ComponentWrapper>
			</div>
			<div key='guestAccessRequest' className='guestAccessRequest'>
				<ComponentWrapper hideTitle hideBorder>
					<ServiceRequest type='GUEST_ACCESS' breakpoint={breakpoint} />
				</ComponentWrapper>
			</div>
		</BloxPage>
	);
};

export default OverviewPage;
