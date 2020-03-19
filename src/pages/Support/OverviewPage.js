import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DIMENSIONS } from 'services/layoutManager';
import BloxPage from 'sub_components/Layout/BloxPage';
import ComponentWrapper from 'sub_components/Layout/ComponentWrapper';
import TicketCount from 'sub_components/Common/TicketCountRow';
import IssueRequest from 'blox_components/Support/IssueRequest/IssueRequest';
import ServiceRequest from 'blox_components/Support/ServiceRequest';
import { updateModule, updatePage, addPageToBreadCrumbs } from 'actions/siteTracking';
import { MENU as SUPPORT_MENU } from 'utils/TicketConstants';
import { SITE_PAGES, SITE_MODULES } from 'utils/CommonConstants';
import { TICKET_TYPES, HIGH_LEVEL_TICKET_STATUS as TICKET_STATUS } from 'utils/TicketConstants';
import { RESOLUTIONS, BREAKPOINT_COLCOUNT_MAP } from 'services/config';

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

class OverviewPage extends Component {
	componentDidMount() {
		const { updateModule, updatePage, addPageToBreadCrumbs } = this.props;
		updatePage(SITE_PAGES.SUPPORT[SUPPORT_MENU.OVERVIEW]);
		addPageToBreadCrumbs(SITE_PAGES.SUPPORT[SUPPORT_MENU.OVERVIEW], SITE_MODULES.SUPPORT);
		updateModule(SITE_MODULES.SUPPORT);
	}
	goTo = page => {
		const { history } = this.props;
		history.push(`/portal/support/${page}`);
	};

	render() {
		const { breakpoint, location } = this.props;
		const columnCount = BREAKPOINT_COLCOUNT_MAP[breakpoint];

		return (
			<BloxPage
				name='page support-overview-page'
				layout={LAYOUT_CONFIG[breakpoint]}
				breakpoint={breakpoint}
				location={location}
			>
				<div key={`openTickets-${columnCount}`} className='openTickets'>
					<ComponentWrapper title='TICKET Status' hideBorder>
						<TicketCount status={TICKET_STATUS.OPEN} ticketType={TICKET_TYPES.SUPPORT} />
					</ComponentWrapper>
				</div>
				<div key={`closedTickets-${columnCount}`} className='closedTickets'>
					<ComponentWrapper hideTitle hideBorder>
						<TicketCount status={TICKET_STATUS.CLOSED} ticketType={TICKET_TYPES.SUPPORT} />
					</ComponentWrapper>
				</div>
				<div key={`issueRequest-${columnCount}`} className='issueRequest'>
					<ComponentWrapper title='ISSUE Request' hideBorder>
						<IssueRequest breakpoint={breakpoint} history={this.props.history} />
					</ComponentWrapper>
				</div>

				<div key={`remoteHandsRequest-${columnCount}`} className='remoteHandsRequest'>
					<ComponentWrapper title='SERVICE Request' hideBorder>
						<ServiceRequest type='REMOTE_HANDS' breakpoint={breakpoint} goTo={this.goTo} />
					</ComponentWrapper>
				</div>
				<div key={`guestAccessRequest-${columnCount}`} className='guestAccessRequest'>
					<ComponentWrapper hideTitle hideBorder>
						<ServiceRequest type='GUEST_ACCESS' breakpoint={breakpoint} goTo={this.goTo} />
					</ComponentWrapper>
				</div>
			</BloxPage>
		);
	}
}

export default connect(null, { updateModule, updatePage, addPageToBreadCrumbs })(OverviewPage);
