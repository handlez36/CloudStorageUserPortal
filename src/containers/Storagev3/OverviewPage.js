import React, { Component } from 'react';
import each from 'lodash/each';

import LayoutManager, { DIMENSIONS } from './../../services/layoutManager';
import BloxGrid from './../../components/Layoutv3/BloxMicroGrid';
import ComponentWrapper from './../../components/Layoutv3/ComponentWrapper';
// import TicketCount from '../../containers/Support/TicketCountRow.js';
import TicketCount from '../../components/Commonv3/TicketCountRow.js';
import StorageDetail from './../../components/Storagev3/StorageOverviewDetail';
import { TicketUtils } from './../../services/ticket';
import { RESOLUTIONS } from './../../services/config';

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

const createGrid = breakpoint => {
	const layoutManager = new LayoutManager(breakpoint);
	const layoutConfig = LAYOUT_CONFIG[breakpoint];
	const grid = [];

	each(layoutConfig, (value, key) => {
		grid.push(
			layoutManager.getGridLocation(key, value.x, value.y, value.dim, value.customHeight || null),
		);
	});

	return grid;
};

class OverviewPage extends Component {
	render() {
		const { breakpoint } = this.props;
		const grid = createGrid(breakpoint);

		return (
			<BloxGrid
				name='sample-content-grid'
				parentEl='.main-content'
				contentGrid={grid}
				showGrid={true}
			>
				<div key='openTickets' className='openTickets'>
					<ComponentWrapper title='TICKET Status' hideBorder>
						<TicketCount
							type={TicketUtils.TICKET_STATUS.OPEN}
							ticketType={TicketUtils.TICKET_TYPES.STORAGE}
						/>
					</ComponentWrapper>
				</div>
				<div key='closedTickets' className='closedTickets'>
					{/* <ComponentWrapper title='Closed Tickets' hideBorder> */}
					<ComponentWrapper hideTitle hideBorder>
						<TicketCount
							type={TicketUtils.TICKET_STATUS.CLOSED}
							ticketType={TicketUtils.TICKET_TYPES.STORAGE}
						/>
					</ComponentWrapper>
				</div>
				<div key='storageDetails' className='storageDetails'>
					<ComponentWrapper collapseTitle hideBorder>
						<StorageDetail />
					</ComponentWrapper>
				</div>
			</BloxGrid>
		);
	}
}

export default OverviewPage;
