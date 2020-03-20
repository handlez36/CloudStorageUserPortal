import React, { Component } from 'react';

import { DIMENSIONS } from 'services/layoutManager';
import BloxPage from 'sub_components/Layout/BloxPage';
import ComponentWrapper from 'sub_components/Layout/ComponentWrapper';
import { RESOLUTIONS, BREAKPOINT_COLCOUNT_MAP } from 'services/config';
import TicketHistory from '../../blox_components/Support/TicketHistory/TicketHistory';

const LAYOUT_CONFIG = {
	[RESOLUTIONS.LOW]: {
		ticketHistory: { x: 0, y: 0, dim: DIMENSIONS.TWO_BY_TEN, customHeight: 50 },
	},
	[RESOLUTIONS.MED]: {
		ticketHistory: { x: 2.5, y: 0, dim: DIMENSIONS.TWO_BY_EIGHT, customHeight: 50 },
	},
	[RESOLUTIONS.HIGH]: {
		ticketHistory: { x: 4, y: 0, dim: DIMENSIONS.TWO_BY_SIX, customHeight: 50 },
	},
};

class TicketHistoryPage extends Component {
	render() {
		const { breakpoint, location, match, history } = this.props;
		const columnCount = BREAKPOINT_COLCOUNT_MAP[breakpoint];

		return (
			<BloxPage
				name='page support-ticket-history-page'
				layout={LAYOUT_CONFIG[breakpoint]}
				breakpoint={breakpoint}
				location={location}
			>
				<div key={`ticketHistory-${columnCount}`} className='ticketHistory'>
					<ComponentWrapper hideTitle hideBorder>
						<TicketHistory match={match} history={history} />
					</ComponentWrapper>
				</div>
			</BloxPage>
		);
	}
}

export default TicketHistoryPage;
