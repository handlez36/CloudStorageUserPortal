import React, { Component } from 'react';

import { DIMENSIONS } from 'services/layoutManager';
import COMPANYPage from 'sub_components/Layout/COMPANYPage';
import ComponentWrapper from 'sub_components/Layout/ComponentWrapper';
import { RESOLUTIONS, BREAKPOINT_COLCOUNT_MAP } from 'services/config';
import GuestAccess from 'COMPANY_components/Support/GuestAccess/GuestAccessRequest';

const LAYOUT_CONFIG = {
	[RESOLUTIONS.LOW]: {
		guestAccess: { x: 3, y: 0, dim: DIMENSIONS.TWO_BY_TEN, customHeight: 50 },
	},
	[RESOLUTIONS.MED]: {
		guestAccess: { x: 4, y: 0, dim: DIMENSIONS.TWO_BY_EIGHT, customHeight: 50 },
	},
	[RESOLUTIONS.HIGH]: {
		guestAccess: { x: 5, y: 0, dim: DIMENSIONS.TWO_BY_SIX, customHeight: 50 },
	},
};

class GuestAccessPage extends Component {
	render() {
		const { breakpoint, location, match, history } = this.props;
		const columnCount = BREAKPOINT_COLCOUNT_MAP[breakpoint];
		return (
			<COMPANYPage
				name='page guest-access-page'
				layout={LAYOUT_CONFIG[breakpoint]}
				breakpoint={breakpoint}
				location={location}
			>
				<div key={`guestAccess-${columnCount}`} className='guestAccess'>
					<ComponentWrapper hideTitle hideBorder>
						<GuestAccess match={match} history={history} />
					</ComponentWrapper>
				</div>
			</COMPANYPage>
		);
	}
}

export default GuestAccessPage;
