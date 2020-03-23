import React, { Component } from 'react';

import ShareDetailView from 'blox_components/Storage/ShareDetailView/ShareDetailView';
import ShareSelectionScroller from 'blox_components/Storage/ShareSelectionScroller/ShareSelectionScroller';
import BloxPage from 'sub_components/Layout/BloxPage';
import ComponentWrapper from 'sub_components/Layout/ComponentWrapper';
import { DIMENSIONS } from 'services/layoutManager';
import { RESOLUTIONS, BREAKPOINT_COLCOUNT_MAP } from 'services/config';

const LAYOUT_CONFIG = {
	[RESOLUTIONS.LOW]: {
		shareDetailView: { x: 1, y: 0, dim: DIMENSIONS.TWO_BY_TWELVE, customHeight: 54 },
		shareSelection: { x: 1, y: 57, dim: DIMENSIONS.TWO_BY_TWELVE, customHeight: 27 },
	},
	[RESOLUTIONS.MED]: {
		shareDetailView: { x: 1, y: 0, dim: DIMENSIONS.TWO_BY_TWELVE, customHeight: 74 },
		shareSelection: { x: 1, y: 76, dim: DIMENSIONS.TWO_BY_TWELVE, customHeight: 34 },
	},
	[RESOLUTIONS.HIGH]: {
		shareDetailView: { x: 1, y: 0, dim: DIMENSIONS.TWO_BY_TWELVE, customHeight: 106 },
		shareSelection: { x: 1, y: 108, dim: DIMENSIONS.TWO_BY_TWELVE, customHeight: 52 },
	},
};

class ManageStoragePage extends Component {
	state = {
		selected: null,
	};

	onStorageSelect = selected => {
		if (selected) {
			this.setState({ selected });
		}
	};

	render() {
		const { breakpoint, location } = this.props;
		const { selected } = this.state;
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
						<ShareDetailView storageId={selected} breakpoint={breakpoint} />
					</ComponentWrapper>
				</div>
				<div key={`shareSelection-${columnCount}`} className='shareSelection'>
					<ComponentWrapper collapseTitle hideBorder>
						<ShareSelectionScroller
							onStorageSelect={this.onStorageSelect}
							breakpoint={breakpoint}
						/>
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
