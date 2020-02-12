import React, { Component } from 'react';
import { number } from 'prop-types';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';

class TicketCountRow extends Component {
	render() {
		const {
			openCount,
			closeCount,
			goToTicketHistory,
			type,
			customImage,
			strokeColor,
			text,
		} = this.props;
		const total = openCount + closeCount;
		const openPercent = ((openCount / total) * 100) / 1;
		const closePercent = ((closeCount / total) * 100) / 1;
		return (
			<div className='ticket-count-section'>
				{type === 'open' && (
					<div
						className='progress-circle'
						onClick={goToTicketHistory ? () => goToTicketHistory('open') : function() {}}
					>
						<CircularProgressbarWithChildren
							value={openPercent}
							background={true}
							styles={buildStyles({
								strokeLinecap: 'butt',
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
						className='progress-circle'
						onClick={goToTicketHistory ? () => goToTicketHistory('closed') : function() {}}
					>
						<CircularProgressbarWithChildren
							value={closePercent}
							background={true}
							styles={buildStyles({
								strokeLinecap: 'butt',
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
