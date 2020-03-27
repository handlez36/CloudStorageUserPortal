import React, { Component } from 'react';
import { connect } from 'react-redux';
import each from 'lodash/each';

import { DIMENSIONS } from 'services/layoutManager';
import BloxPage from 'sub_components/Layout/BloxPage';
import ComponentWrapper from 'sub_components/Layout/ComponentWrapper';
import TicketCount from 'sub_components/Common/TicketCountRow';
import StorageDetail from 'blox_components/Storage/StorageOverviewDetail/StorageOverviewDetail';
import { TicketUtils } from 'services/ticket';
import { RESOLUTIONS, BREAKPOINT_COLCOUNT_MAP } from 'services/config';
import { updateModule, updatePage, addPageToBreadCrumbs } from 'actions/siteTracking';
import { MENU as STORAGE_MENU } from 'utils/StorageConstants';
import { SITE_PAGES, SITE_MODULES } from 'utils/CommonConstants';
import { Utils } from 'services/utils';
import { HIGH_LEVEL_TICKET_STATUS as TICKET_STATUS } from 'utils/TicketConstants';

const LAYOUT_CONFIG = {
	[RESOLUTIONS.LOW]: {
		storageDetails: { x: 1, y: 25, dim: DIMENSIONS.TWO_BY_TWELVE, customHeight: 52 },
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
	componentDidMount() {
		const { updateModule, updatePage, addPageToBreadCrumbs } = this.props;
		updatePage(SITE_PAGES.STORAGE[STORAGE_MENU.OVERVIEW]);
		addPageToBreadCrumbs(SITE_PAGES.STORAGE[STORAGE_MENU.OVERVIEW], SITE_MODULES.STORAGE);
		updateModule(SITE_MODULES.STORAGE);
		Utils.showHorizontalBar();
	}
	componentWillUnmount() {
		Utils.removeHorizontalBar();
	}

	render() {
		const { breakpoint, location, history } = this.props;
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
							status={TICKET_STATUS.OPEN}
							ticketType={TicketUtils.TICKET_TYPES.STORAGE}
						/>
					</ComponentWrapper>
				</div>
				<div key={`closedTickets-${columnCount}`} className='closedTickets'>
					<ComponentWrapper hideTitle hideBorder>
						<TicketCount
							status={TICKET_STATUS.CLOSED}
							ticketType={TicketUtils.TICKET_TYPES.STORAGE}
						/>
					</ComponentWrapper>
				</div>
				<div key={`storageDetails-${columnCount}`} className='storageDetails'>
					<ComponentWrapper collapseTitle hideBorder>
						<StorageDetail breakpoint={breakpoint} history={history} />
					</ComponentWrapper>
				</div>
			</BloxPage>
		);
	}
}

export default connect(null, { updateModule, updatePage, addPageToBreadCrumbs })(OverviewPage);
