import React, { Component } from 'react';

import TicketNumber from 'components_old/Common/TicketNumber';
import BloxButton from 'sub_components/Common/BloxButton';
import { CONFIRMATION } from 'utils/TicketConstants';

class GuestAccessConfirmation extends Component {
	goToTicket = ticketNumber => {
		const { history } = this.props;

		history.push(`/portal/support/ticket_history/${ticketNumber}`);
	};
	goToOverview = () => {
		const { history } = this.props;

		history.push(`/portal/support/`);
	};
	render() {
		const { ticketNumber, startNewRequest } = this.props;

		return (
			<div className='remote-hands-confirmation-wrapper'>
				<div className='title'>{CONFIRMATION.TITLE}</div>
				<div className='message'>{CONFIRMATION.MESSAGE}</div>
				<div
					className='ticket-confirmation'
					onClick={() => {
						this.goToTicket(ticketNumber);
					}}
				>
					<TicketNumber number={ticketNumber} />
				</div>
				<div className='buttons'>
					<BloxButton
						title='NEW REQUEST'
						enabled={true}
						customClass='blox-button white'
						onClick={startNewRequest}
					/>
					<BloxButton
						title='DONE'
						enabled={true}
						customClass='blox-button'
						onClick={this.goToOverview}
					/>
				</div>
			</div>
		);
	}
}

export default GuestAccessConfirmation;
