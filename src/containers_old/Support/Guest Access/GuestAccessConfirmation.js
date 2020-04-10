import React, { Component } from 'react';

import TicketNumber from '../../../components/Common/TicketNumber';
import COMPANYButton from '../../../components/Common/COMPANYButton';
import { CONFIRMATION } from '../TicketConstants';

class GuestAccessConfirmation extends Component {
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
						onClick={onComplete}
					/>
				</div>
			</div>
		);
	}
}

export default GuestAccessConfirmation;
