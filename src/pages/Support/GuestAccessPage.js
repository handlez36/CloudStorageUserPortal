import React, { Component } from 'react';

import { DIMENSIONS } from 'services/layoutManager';
import BloxPage from 'sub_components/Layout/BloxPage';
import ComponentWrapper from 'sub_components/Layout/ComponentWrapper';
import { RESOLUTIONS } from 'services/config';
import GuestAccess from 'blox_components/Support/GuestAccess/GuestAccessRequest';

const LAYOUT_CONFIG = {
	[RESOLUTIONS.LOW]: {
		guestAccess: { x: 0, y: 0, dim: DIMENSIONS.TWO_BY_TEN, customHeight: 50 },
	},
	[RESOLUTIONS.MED]: {
		guestAccess: { x: 0, y: 0, dim: DIMENSIONS.TWO_BY_EIGHT, customHeight: 50 },
	},
	[RESOLUTIONS.HIGH]: {
		guestAccess: { x: 0, y: 0, dim: DIMENSIONS.TWO_BY_SIX, customHeight: 50 },
	},
};

class GuestAccessPage extends Component {
	render() {
		const { breakpoint, location, match, history } = this.props;

		return (
			<BloxPage
				name='page guest-access-page'
				layout={LAYOUT_CONFIG[breakpoint]}
				breakpoint={breakpoint}
				location={location}
			>
				<div key='guestAccess' className='guestAccess'>
					<ComponentWrapper hideTitle hideBorder>
						<GuestAccess match={match} history={history} />
					</ComponentWrapper>
				</div>
			</BloxPage>
		);
	}
}

export default GuestAccessPage;
