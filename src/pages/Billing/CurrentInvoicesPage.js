import React from 'react';

import { DIMENSIONS } from 'services/layoutManager';
//import AvatarSelection from 'blox_components/Profile/AvatarSelection/AvatarSelection';
import CurrentInvoices from 'blox_components/Billing/CurrentInvoices/CurrentInvoices';
import BloxPage from 'sub_components/Layout/BloxPage';
import ComponentWrapper from 'sub_components/Layout/ComponentWrapper';
import { RESOLUTIONS } from 'services/config';

const LAYOUT_CONFIG = {
	[RESOLUTIONS.LOW]: {
		currentInvoices: { x: 0, y: 1, dim: DIMENSIONS.TWO_BY_TEN, customHeight: 100 },
	},
	[RESOLUTIONS.MED]: {
		currentInvoices: { x: 0, y: 0, dim: DIMENSIONS.TWO_BY_EIGHT, customHeight: 112 },
	},
	[RESOLUTIONS.HIGH]: {
		currentInvoices: { x: 0, y: 0, dim: DIMENSIONS.TWO_BY_SIX, customHeight: 160 },
	},
};

const CurrentInvoicesPage = ({ breakpoint, location }) => {
	console.log('LAYOUT: ', LAYOUT_CONFIG[breakpoint]);

	return (
		<BloxPage
			name='page profile-avatar-page'
			layout={LAYOUT_CONFIG[breakpoint]}
			breakpoint={breakpoint}
			location={location}
		>
			<div key='currentInvoices' className='currentInvoices'>
				<ComponentWrapper collapseTitle hideBorder>
					<CurrentInvoices />
				</ComponentWrapper>
			</div>
		</BloxPage>
	);
};

export default CurrentInvoicesPage;
