import React, { Component } from 'react';

import ShareDetailView from 'blox_components/Storage/ShareDetailView';
import BloxPage from 'sub_components/Layout/BloxPage';
import ComponentWrapper from 'sub_components/Layout/ComponentWrapper';
import { DIMENSIONS } from 'services/layoutManager';
import { RESOLUTIONS, BREAKPOINT_COLCOUNT_MAP } from 'services/config';

const LAYOUT_CONFIG = {
	[RESOLUTIONS.LOW]: {
		shareDetailView: { x: 1, y: 24, dim: DIMENSIONS.TWO_BY_TWELVE, customHeight: 52 },
	},
	[RESOLUTIONS.MED]: {
		shareDetailView: { x: 1, y: 31, dim: DIMENSIONS.TWO_BY_TWELVE, customHeight: 74 },
	},
	[RESOLUTIONS.HIGH]: {
		shareDetailView: { x: 1, y: 50, dim: DIMENSIONS.TWO_BY_TWELVE, customHeight: 104 },
	},
};

class ManageStoragePage extends Component {
	render() {
		const { breakpoint, location } = this.props;
		const columnCount = BREAKPOINT_COLCOUNT_MAP[breakpoint];

		return (
			<BloxPage
				name='page storage-manage-storage-page'
				layout={LAYOUT_CONFIG[breakpoint]}
				breakpoint={breakpoint}
				location={location}
			>
				<div key={`shareDetailView-${columnCount}`} className='shareDetailView'>
					<ComponentWrapper collapseTitle hideBorder>
						<ShareDetailView />
					</ComponentWrapper>
				</div>
				{/* <div key='closedTickets' className='closedTickets'>
					<ComponentWrapper hideTitle hideBorder />
				</div> */}
			</BloxPage>
		);
	}
}

export default ManageStoragePage;
