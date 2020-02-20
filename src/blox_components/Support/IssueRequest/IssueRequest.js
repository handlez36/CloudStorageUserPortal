import React from 'react';

import TicketTypeCard from './Components/TicketTypeCard';

const TICKET_TYPES = ['BILLING', 'OUTAGE', 'SUPPORT'];

const IssueRequest = props => {
	return (
		<div className='issue-request'>
			{TICKET_TYPES.map(type => (
				<TicketTypeCard type={type} />
			))}
		</div>
	);
};

export default IssueRequest;
