import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { updatePage, addPageToBreadCrumbs } from 'actions/siteTracking';
import { MENU as SUPPORT_MENU } from 'utils/TicketConstants';
import { SITE_PAGES, SITE_MODULES } from 'utils/CommonConstants';

class TicketHistoryDetailLogistics extends Component {
	getTicketRequestor = details => {
		const { supportRequest: { requester } = {} } = details;

		if (!requester) {
			return 'Unknown';
		}

		return requester;
	};

	getTicketTimestamp = details => {
		const { notes } = details;
		if (!notes) {
			return 'Date unknown';
		}

		let date = 'Date unknown';
		const noteRegex = /(.*) - System - Received Support Request/;

		notes.forEach(note => {
			const dateMatch = note.match(noteRegex);
			if (dateMatch && dateMatch[1]) {
				try {
					const momentDate = moment(dateMatch[1]);
					date = momentDate.format('MMM DD, YYYY h:mm A');
				} catch (e) {
					date = dateMatch[1];
				}
			}
		});

		return date;
	};

	getTicketStatus = details => {
		if (!details || !details.status) {
			return 'OPEN';
		}

		return details.status;
	};
	componentDidMount() {
		const { site, ticketDetails, updatePage, addPageToBreadCrumbs } = this.props;

		if (site.page !== SITE_PAGES.SUPPORT[SUPPORT_MENU.TICKET_HISTORY_DETAIL]) {
			const url = `/portal/support/ticket_history/${ticketDetails.processid}`;
			updatePage(SITE_PAGES.SUPPORT[SUPPORT_MENU.TICKET_HISTORY_DETAIL]);
			addPageToBreadCrumbs(`TICKET #${ticketDetails.processid}`, SITE_MODULES.SUPPORT, url);
		}
	}
	render() {
		const { ticketDetails } = this.props;
		return (
			<div className='logistics-row'>
				<div className='opened-section'>
					<span className='open-by-text'>Opened by:</span>
					<span className='requestor-name'>{this.getTicketRequestor(ticketDetails)}</span>
					<span className='open-time'>{this.getTicketTimestamp(ticketDetails)}</span>
				</div>
				<div className='status-text'>
					Status: <span className='status'>{this.getTicketStatus(ticketDetails)}</span>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		site: state.site_tracking,
	};
}

export default connect(mapStateToProps, { updatePage, addPageToBreadCrumbs })(
	TicketHistoryDetailLogistics,
);
