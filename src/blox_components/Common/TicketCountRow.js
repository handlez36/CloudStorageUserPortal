import React, { Component } from 'react';
import { number } from 'prop-types';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import { TicketApi } from '../../services/ticket';
import { STATUS } from '../../utils/TicketConstants';
class TicketCountRow extends Component {
	constructor(props) {
		super(props);
		this.state = { openCount: 0, closeCount: 0 };
	}
	getTickets = () => {
		TicketApi.getAll()
			.then(response => {
				const validResponse = response.status === 200 && response.data && response.data.tickets;

				if (validResponse) {
					const { openCount, closedCount } = this.filterTickets(response);

					this.setState({
						openCount: openCount.length,
						closeCount: closedCount.length,
						totalCount: open.length + closed.length,
					});
				} else {
					this.setState({ error: 'Error pulling billing ticket details' });
				}
			})
			.catch(error => this.setState({ error }));
	};
	filterTickets(response) {
		const { ticketType } = this.props;
		const {
			data: { tickets },
		} = response;

		const openCount = tickets.filter(
			ticket =>
				(ticket.status !== STATUS.SOLVED && ticket.type === ticketType) ||
				(ticket.status !== STATUS.RESOLVED && ticket.type === ticketType),
		);

		const closedCount = tickets.filter(
			ticket =>
				(ticket.status === STATUS.SOLVED && ticket.type === ticketType) ||
				(ticket.status === STATUS.RESOLVED && ticket.type === ticketType),
		);

		return { openCount, closedCount };
	}

	componentDidMount = () => {
		this.getTickets();
	};

	render() {
		const {
			goToTicketHistory,
			type,
			customImage,
			strokeColor,
			text,
			backgroundColor,
			trailColor,
		} = this.props;
		const { openCount, closeCount } = this.state;

		const total = openCount + closeCount;
		const openPercent = ((openCount / total) * 100) / 1;
		const closePercent = ((closeCount / total) * 100) / 1;

		return (
			<div className='ticket-count-section'>
				{type === 'open' && (
					<div
						className='progress-circle '
						onClick={goToTicketHistory ? () => goToTicketHistory('open') : function() {}}
					>
						<CircularProgressbarWithChildren
							value={openPercent}
							background={true}
							styles={buildStyles({
								strokeLinecap: 'butt',
								backgroundColor,
								pathColor: strokeColor,
								trailColor,
							})}
						>
							<div className='count' style={{}}>
								{openCount}
							</div>
							<div className='new-title' style={{ marginTop: -5 }}>
								{text ? text : 'OPEN'}
							</div>
						</CircularProgressbarWithChildren>
					</div>
				)}
				{type === 'closed' && (
					<div
						className='progress-circle '
						onClick={goToTicketHistory ? () => goToTicketHistory('closed') : function() {}}
					>
						<CircularProgressbarWithChildren
							value={closePercent}
							background={true}
							styles={buildStyles({
								strokeLinecap: 'butt',
								backgroundColor,
								pathColor: strokeColor,
								trailColor,
							})}
						>
							{/* Put any JSX content in here that you'd like. It'll be vertically and horizonally centered. */}
							<div className='count' style={{}}>
								{closeCount}
							</div>
							<div className='new-title' style={{ marginTop: -5 }}>
								{text ? text : 'CLOSED'}
							</div>
						</CircularProgressbarWithChildren>
					</div>
				)}
			</div>
		);
	}
}

TicketCountRow.propType = {
	openCount: number,
	closeCount: number,
	totalCount: number,
};

TicketCountRow.defaultProps = {
	openCount: 0,
	closeCount: 0,
	totalCount: 0,
};

export default TicketCountRow;
