import React, { Component } from 'react';
import each from 'lodash/each';

import { DIMENSIONS } from 'services/layoutManager';
import BloxPage from 'sub_components/Layout/BloxPage';
import ComponentWrapper from 'sub_components/Layout/ComponentWrapper';
import TicketCount from 'sub_components/Common/TicketCountRow';
import StorageDetail from 'blox_components/Storage/StorageOverviewDetail/StorageOverviewDetail';
import { TicketUtils } from 'services/ticket';
import { RESOLUTIONS, BREAKPOINT_COLCOUNT_MAP } from 'services/config';

const LAYOUT_CONFIG = {
	[RESOLUTIONS.LOW]: {
		storageDetails: { x: 1, y: 24, dim: DIMENSIONS.TWO_BY_TWELVE, customHeight: 52 },
		openTickets: { x: 1, y: 2, dim: DIMENSIONS.TWO_BY_TWO },
		closedTickets: { x: 3, y: 2, dim: DIMENSIONS.TWO_BY_TWO },
	},
	[RESOLUTIONS.MED]: {
		storageDetails: { x: 1, y: 31, dim: DIMENSIONS.TWO_BY_TWELVE, customHeight: 74 },
		openTickets: { x: 1, y: 0, dim: DIMENSIONS.TWO_BY_TWO },
		closedTickets: { x: 3, y: 0, dim: DIMENSIONS.TWO_BY_TWO },
	},
	[RESOLUTIONS.HIGH]: {
		storageDetails: { x: 1, y: 50, dim: DIMENSIONS.TWO_BY_TWELVE, customHeight: 104 },
		closedTickets: { x: 3, y: 3, dim: DIMENSIONS.TWO_BY_TWO },
		openTickets: { x: 1, y: 3, dim: DIMENSIONS.TWO_BY_TWO },
	},
};

class OverviewPage extends Component {
	render() {
		const { breakpoint, location } = this.props;
		const columnCount = BREAKPOINT_COLCOUNT_MAP[breakpoint];
		return (
			<BloxPage
				name='sample-content-grid storage'
				layout={LAYOUT_CONFIG[breakpoint]}
				breakpoint={breakpoint}
				location={location}
			>
				<div key={`openTickets-${columnCount}`} className='openTickets'>
					<ComponentWrapper title='TICKET Status' hideBorder>
						<TicketCount
							status={TicketUtils.TICKET_STATUS.OPEN}
							ticketType={TicketUtils.TICKET_TYPES.STORAGE}
						/>
					</ComponentWrapper>
				</div>
				<div key={`closedTickets-${columnCount}`} className='closedTickets'>
					<ComponentWrapper hideTitle hideBorder>
						<TicketCount
							status={TicketUtils.TICKET_STATUS.CLOSED}
							ticketType={TicketUtils.TICKET_TYPES.STORAGE}
						/>
					</ComponentWrapper>
				</div>
				<div key={`storageDetails-${columnCount}`} className='storageDetails'>
					<ComponentWrapper collapseTitle hideBorder>
						<StorageDetail breakpoint={breakpoint} />
					</ComponentWrapper>
				</div>
			</BloxPage>
		);
	}
}

export default OverviewPage;
