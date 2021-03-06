import React, { Component } from 'react';

import TicketNumber from 'components_old/Common/TicketNumber';
import COMPANYButton from 'sub_components/Common/COMPANYButton';

import { CONFIRMATION } from 'utils/TicketConstants';

class RemoteHandsConfirmation extends Component {
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
						this.goTo(ticketNumber);
					}}
				>
					<TicketNumber number={ticketNumber} />
				</div>
				<div className='buttons'>
					<COMPANYButton
						title='NEW REQUEST'
						enabled={true}
						customClass='COMPANY-button white'
						onClick={startNewRequest}
					/>
					<COMPANYButton
						title='DONE'
						enabled={true}
						customClass='COMPANY-button'
						onClick={this.goToOverview}
					/>
				</div>
			</div>
		);
	}
}

export default RemoteHandsConfirmation;
