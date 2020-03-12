import React, { Component } from 'react';

import { DIMENSIONS } from 'services/layoutManager';
import BloxPage from 'sub_components/Layout/BloxPage';
import ComponentWrapper from 'sub_components/Layout/ComponentWrapper';
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

class ManageStoragePage extends Component {
	render() {
		const { breakpoint, location } = this.props;

		return (
			<BloxPage
				name='page storage-manage-storage-page'
				layout={LAYOUT_CONFIG[breakpoint]}
				breakpoint={breakpoint}
				location={location}
			>
				<div key='openTickets' className='openTickets'>
					<ComponentWrapper title='TICKET Status' hideBorder />
				</div>
				<div key='closedTickets' className='closedTickets'>
					<ComponentWrapper hideTitle hideBorder />
				</div>
				<div key='storageDetails' className='storageDetails'>
					<ComponentWrapper collapseTitle hideBorder />
				</div>
			</BloxPage>
		);
	}
}

export default ManageStoragePage;
