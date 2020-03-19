import React, { Component } from 'react';

import { DIMENSIONS } from 'services/layoutManager';
import BloxPage from 'sub_components/Layout/BloxPage';
import ComponentWrapper from 'sub_components/Layout/ComponentWrapper';
import { RESOLUTIONS } from 'services/config';
import TicketCreate from '../../blox_components/Support/TicketCreate/TicketCreate';

const LAYOUT_CONFIG = {
	[RESOLUTIONS.LOW]: {
		supportTicket: { x: 0, y: 0, dim: DIMENSIONS.TWO_BY_TEN, customHeight: 50 },
	},
	[RESOLUTIONS.MED]: {
		supportTicket: { x: 0, y: 0, dim: DIMENSIONS.TWO_BY_EIGHT, customHeight: 50 },
	},
	[RESOLUTIONS.HIGH]: {
		supportTicket: { x: 0, y: 0, dim: DIMENSIONS.TWO_BY_SIX, customHeight: 50 },
	},
};

class SupportTicketPage extends Component {
	render() {
		const { breakpoint, location, match, history } = this.props;

		return (
			<BloxPage
				name='page support-ticket-page'
				layout={LAYOUT_CONFIG[breakpoint]}
				breakpoint={breakpoint}
				location={location}
			>
				<div key='supportTicket' className='supportTicket'>
					<ComponentWrapper hideTitle hideBorder>
						<TicketCreate match={match} history={history} type={'BILLING'} />
					</ComponentWrapper>
				</div>
			</BloxPage>
		);
	}
}

export default SupportTicketPage;
