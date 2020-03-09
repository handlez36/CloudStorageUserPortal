import React from 'react';
import moment from 'moment';

function getTicketRequestor(details) {
	const { supportRequest: { requester } = {} } = details;

	if (!requester) {
		return 'Unknown';
	}

	return requester;
}

function getTicketTimestamp(details) {
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
}

function getTicketStatus(details) {
	if (!details || !details.status) {
		return 'OPEN';
	}

	return details.status;
}

const TicketHistoryDetailLogistics = ({ ticketDetails }) => {
	return (
		<div className='logistics-row'>
			<div className='opened-section'>
				<span className='open-by-text'>Opened by:</span>
				<span className='requestor-name'>{getTicketRequestor(ticketDetails)}</span>
				<span className='open-time'>{getTicketTimestamp(ticketDetails)}</span>
			</div>
			<div className='status-text'>
				Status: <span className='status'>{getTicketStatus(ticketDetails)}</span>
			</div>
		</div>
	);
};

export default TicketHistoryDetailLogistics;
