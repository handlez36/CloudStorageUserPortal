import React, { Component } from 'react';

import { DIMENSIONS } from 'services/layoutManager';
import COMPANYPage from 'sub_components/Layout/COMPANYPage';
import ComponentWrapper from 'sub_components/Layout/ComponentWrapper';
import { RESOLUTIONS, BREAKPOINT_COLCOUNT_MAP } from 'services/config';
import TicketCreate from '../../COMPANY_components/Support/TicketCreate/TicketCreate';

const LAYOUT_CONFIG = {
	[RESOLUTIONS.LOW]: {
		supportTicket: { x: 3, y: 0, dim: DIMENSIONS.TWO_BY_TEN, customHeight: 50 },
	},
	[RESOLUTIONS.MED]: {
		supportTicket: { x: 4, y: 0, dim: DIMENSIONS.TWO_BY_EIGHT, customHeight: 50 },
	},
	[RESOLUTIONS.HIGH]: {
		supportTicket: { x: 5, y: 0, dim: DIMENSIONS.TWO_BY_SIX, customHeight: 50 },
	},
};

class SupportTicketPage extends Component {
	render() {
		const { breakpoint, location, match, history } = this.props;
		const columnCount = BREAKPOINT_COLCOUNT_MAP[breakpoint];
		return (
			<COMPANYPage
				name='page support-ticket-page'
				layout={LAYOUT_CONFIG[breakpoint]}
				breakpoint={breakpoint}
				location={location}
			>
				<div key={`supportTicket-${columnCount}`} className='supportTicket'>
					<ComponentWrapper hideTitle hideBorder>
						<TicketCreate match={match} history={history} />
					</ComponentWrapper>
				</div>
			</COMPANYPage>
		);
	}
}

export default SupportTicketPage;
