import React from 'react';

import { TICKET_ICONS } from '../../../../utils/TicketConstants';

const TICKET_IMGS = {
	BILLING: { img: TICKET_ICONS.BILLING, hover: TICKET_ICONS.BILLING_TICKET_HOVER },
	OUTAGE: { img: TICKET_ICONS.OUTAGE, hover: TICKET_ICONS.OUTAGE_TICKET_HOVER },
	SUPPORT: { img: TICKET_ICONS.SUPPORT, hover: TICKET_ICONS.SUPPORT_TICKET_HOVER },
};

const TicketTypeCard = ({ type }) => {
	const cardImg = TICKET_IMGS[type] ? TICKET_IMGS[type].img : '';
	const cardHoverImg = TICKET_IMGS[type] ? TICKET_IMGS[type].hover : '';

	console.log('Ticket Imgs: ', TICKET_IMGS.BILLING);
	return (
		<div className={`ticket-type-card ${type.toLowerCase()}`}>
			<div className='ticket-type'>
				<img alt={`Create ${type} ticket`} id={`create-${type}-card`} src={cardImg} />
				<div className='label'>{type}</div>
			</div>
		</div>
	);
};

export default TicketTypeCard;
