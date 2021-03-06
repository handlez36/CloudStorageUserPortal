import React, { Component } from 'react';
import { func, string } from 'prop-types';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';

import { TicketApi } from 'services/ticket';
import {
	TICKET_TYPES,
	HIGH_LEVEL_TICKET_STATUS,
	STATUS as DETAILED_TICKET_STATUS,
} from 'utils/TicketConstants';

class TicketCountRow extends Component {
	state = {
		tickets: [],
		error: null,
	};

	getTickets = async COMPANYModule => {
		const { tickets, error } = await TicketApi.getAll();

		this.setState({ tickets, error });
	};

	getCountAndPercentage = (type, status, showTitle) => {
		const { tickets } = this.state;
		let filteredTicketsByType = null;

		if (!tickets || tickets.length < 1) {
			return { count: 0, percentage: 0 };
		}
		if (type === 'Support') {
			filteredTicketsByType = tickets;
		} else {
			filteredTicketsByType = tickets.filter(
				ticket => ticket.type.toLowerCase() === type.toLowerCase(),
			);
		}
		if (filteredTicketsByType === 0) {
			showTitle(false);
		}

		const fullyFilteredTickets = filteredTicketsByType.filter(ticket => {
			return status === HIGH_LEVEL_TICKET_STATUS.OPEN
				? ticket.status !== DETAILED_TICKET_STATUS.SOLVED &&
						ticket.status !== DETAILED_TICKET_STATUS.RESOLVED
				: ticket.status === DETAILED_TICKET_STATUS.SOLVED ||
						ticket.status === DETAILED_TICKET_STATUS.RESOLVED;
		});

		return {
			count: fullyFilteredTickets.length,
			percentage: (fullyFilteredTickets.length / filteredTicketsByType.length) * 100,
		};
	};

	componentDidMount() {
		this.getTickets();
	}

	render() {
		const { goToTicketHistory, ticketType, text, showTitle, status } = this.props;
		const { count, percentage } = this.getCountAndPercentage(ticketType, status, showTitle);

		return (
			<div className={`ticket-count-section ${count === 0 ? 'hide' : ''}`}>
				{true && (
					<div
						className='progress-circle v3'
						onClick={() => goToTicketHistory(status.toLowerCase())}
					>
						<CircularProgressbarWithChildren
							value={percentage}
							background={true}
							styles={buildStyles({ strokeLinecap: 'butt', pathTransitionDuration: 0.5 })}
						>
							<div className='count numbers30' style={{}}>
								{count}
							</div>
							<div className='status-label buttons10' style={{ marginTop: -5 }}>
								{text ? text : status}
							</div>
						</CircularProgressbarWithChildren>
					</div>
				)}
			</div>
		);
	}
}

TicketCountRow.propType = {
	goToTicketHistory: func,
	ticketType: string,
	status: string,
	customImage: string,
	strokeColor: string,
	text: string,
};

TicketCountRow.defaultProps = {
	goToTicketHistory: () => {},
	ticketType: TICKET_TYPES.SUPPORT,
	status: HIGH_LEVEL_TICKET_STATUS.OPEN,
};

export default TicketCountRow;
