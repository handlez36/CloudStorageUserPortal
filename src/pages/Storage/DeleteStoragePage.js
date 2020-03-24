import React, { Component } from 'react';

import DeleteStorage from 'blox_components/Storage/DeleteStorage/DeleteStorage';
import BloxPage from 'sub_components/Layout/BloxPage';
import ComponentWrapper from 'sub_components/Layout/ComponentWrapper';
import { DIMENSIONS } from 'services/layoutManager';
import { RESOLUTIONS, BREAKPOINT_COLCOUNT_MAP } from 'services/config';

const LAYOUT_CONFIG = {
	[RESOLUTIONS.LOW]: {
		deleteStorage: { x: 1, y: 0, dim: DIMENSIONS.TWO_BY_TWELVE, customHeight: 86 },
	},
	[RESOLUTIONS.MED]: {
		deleteStorage: { x: 1, y: 0, dim: DIMENSIONS.TWO_BY_TWELVE, customHeight: 112 },
	},
	[RESOLUTIONS.HIGH]: {
		deleteStorage: { x: 1, y: 0, dim: DIMENSIONS.TWO_BY_TWELVE, customHeight: 160 },
	},
};

class DeleteStoragePage extends Component {
	render() {
		const { breakpoint, location, history } = this.props;
		const columnCount = BREAKPOINT_COLCOUNT_MAP[breakpoint];

		return (
			<BloxPage
				name='page storage-delete-storage-page'
				layout={LAYOUT_CONFIG[breakpoint]}
				breakpoint={breakpoint}
				location={location}
			>
				<div key={`deleteStorage-${columnCount}`} className='deleteStorage'>
					<ComponentWrapper collapseTitle hideBorder>
						<DeleteStorage breakpoint={breakpoint} />
					</ComponentWrapper>
				</div>
			</BloxPage>
		);
	}
}

export default DeleteStoragePage;
