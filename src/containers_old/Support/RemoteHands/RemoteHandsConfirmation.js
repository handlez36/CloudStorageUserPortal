import React, { Component } from 'react';

import TicketNumber from '../../../components/Common/TicketNumber';
import BloxButton from '../../../components/Common/BloxButton';

import { CONFIRMATION } from '../../Support/TicketConstants';

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
						customClass='blox-button white'
						onClick={startNewRequest}
					/>
					<BloxButton
						title='DONE'
						enabled={true}
						customClass='blox-button'
						onClick={onComplete}
					/>
				</div>
			</div>
		);
	}
}

export default RemoteHandsConfirmation;
