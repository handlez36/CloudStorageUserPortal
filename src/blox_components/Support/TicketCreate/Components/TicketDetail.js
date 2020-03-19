import React from 'react';

export const TicketDetail = props => {
	const ticketType = props.ticket.type.toUpperCase() || 'SUPPORT';
	const ticketPriority = props.ticket.priority.toUpperCase() || '';

	return (
		<div className='ticket-info'>
			<div className='ticket-type-text'>
				TYPE:<span className={ticketType}>{ticketType}</span>
			</div>
			<div className='ticket-priority-text'>
				PRIORITY:<span className={ticketPriority}>{ticketPriority}</span>
			</div>
		</div>
	);
};
