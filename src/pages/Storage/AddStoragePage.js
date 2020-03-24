import React, { Component } from 'react';

import AddStorageWizard from 'blox_components/Storage/AddStorage/StorageAddWizard';
import BloxPage from 'sub_components/Layout/BloxPage';
import ComponentWrapper from 'sub_components/Layout/ComponentWrapper';
import { DIMENSIONS } from 'services/layoutManager';
import { RESOLUTIONS, BREAKPOINT_COLCOUNT_MAP } from 'services/config';

const LAYOUT_CONFIG = {
	[RESOLUTIONS.LOW]: {
		addStorage: { x: 1, y: 0, dim: DIMENSIONS.TWO_BY_TWELVE, customHeight: 86 },
	},
	[RESOLUTIONS.MED]: {
		addStorage: { x: 1, y: 0, dim: DIMENSIONS.TWO_BY_TWELVE, customHeight: 112 },
	},
	[RESOLUTIONS.HIGH]: {
		addStorage: { x: 1, y: 0, dim: DIMENSIONS.TWO_BY_TWELVE, customHeight: 160 },
	},
};

class DeleteStoragePage extends Component {
	render() {
		const { breakpoint, location, history } = this.props;
		const columnCount = BREAKPOINT_COLCOUNT_MAP[breakpoint];

		return (
			<BloxPage
				name='page storage-add-page'
				layout={LAYOUT_CONFIG[breakpoint]}
				breakpoint={breakpoint}
				location={location}
			>
				<div key={`addStorage-${columnCount}`} className='addStorage'>
					<ComponentWrapper collapseTitle hideBorder>
						<AddStorageWizard breakpoint={breakpoint} history={this.props.history} />
					</ComponentWrapper>
				</div>
			</BloxPage>
		);
	}
}

export default DeleteStoragePage;
