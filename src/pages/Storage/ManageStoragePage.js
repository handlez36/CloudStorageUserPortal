import React, { Component } from 'react';
import { connect } from 'react-redux';
import ShareDetailView from 'blox_components/Storage/ShareDetailView/ShareDetailView';
import ShareSelectionScroller from 'blox_components/Storage/ShareSelectionScroller/ShareSelectionScroller';
import BloxPage from 'sub_components/Layout/BloxPage';
import ComponentWrapper from 'sub_components/Layout/ComponentWrapper';
import { DIMENSIONS } from 'services/layoutManager';
import { RESOLUTIONS, BREAKPOINT_COLCOUNT_MAP } from 'services/config';
import { updateModule, updatePage, addPageToBreadCrumbs } from 'actions/siteTracking';
import { MENU as STORAGE_MENU } from 'utils/StorageConstants';
import { SITE_PAGES, SITE_MODULES } from 'utils/CommonConstants';

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
	componentDidMount() {
		const { updateModule, updatePage, addPageToBreadCrumbs } = this.props;

		updatePage(SITE_PAGES.STORAGE[STORAGE_MENU.MANAGE]);
		addPageToBreadCrumbs(SITE_PAGES.STORAGE[STORAGE_MENU.MANAGE], SITE_MODULES.STORAGE);
		updateModule(SITE_MODULES.STORAGE);
	}

	onStorageSelect = selected => {
		if (selected) {
			this.setState({ selected });
		}
	};

	render() {
		const { breakpoint, location, history } = this.props;
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
							history={history}
						/>
					</ComponentWrapper>
				</div>
			</BloxPage>
		);
	}
}

export default connect(null, { updateModule, updatePage, addPageToBreadCrumbs })(ManageStoragePage);
