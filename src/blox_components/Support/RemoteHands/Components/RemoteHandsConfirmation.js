import React, { Component } from 'react';

import TicketNumber from 'components_old/Common/TicketNumber';
import BloxButton from 'sub_components/Common/BloxButton';

import { CONFIRMATION } from 'utils/TicketConstants';

class RemoteHandsConfirmation extends Component {
	render() {
		const { ticketNumber, startNewRequest, onComplete, goToTicketHistory } = this.props;

		return (
			<div className='remote-hands-confirmation-wrapper'>
				<div className='title'>{CONFIRMATION.TITLE}</div>
				<div className='message'>{CONFIRMATION.MESSAGE}</div>
				<div
					className='ticket-confirmation'
					onClick={() => {
						goToTicketHistory(null, ticketNumber);
					}}
				>
					<TicketNumber number={ticketNumber} />
				</div>
				<div className='buttons'>
					<BloxButton
						title='NEW REQUEST'
						enabled={true}
						customClass='support-button white'
						onClick={startNewRequest}
					/>
					<BloxButton
						title='DONE'
						enabled={true}
						customClass='support-button'
						onClick={onComplete}
					/>
				</div>
			</div>
		);
	}
}

export default RemoteHandsConfirmation;
