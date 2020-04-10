import React from 'react';

import { DIMENSIONS } from 'services/layoutManager';
//import AvatarSelection from 'COMPANY_components/Profile/AvatarSelection/AvatarSelection';
import CurrentInvoices from 'COMPANY_components/Billing/CurrentInvoices/CurrentInvoices';
import COMPANYPage from 'sub_components/Layout/COMPANYPage';
import ComponentWrapper from 'sub_components/Layout/ComponentWrapper';
import { RESOLUTIONS, BREAKPOINT_COLCOUNT_MAP } from 'services/config';

const LAYOUT_CONFIG = {
	[RESOLUTIONS.LOW]: {
		currentInvoices: { x: 0, y: 0, dim: DIMENSIONS.TWO_BY_TEN },
	},
	[RESOLUTIONS.MED]: {
		currentInvoices: { x: 2.5, y: 0, dim: DIMENSIONS.TWO_BY_EIGHT },
	},
	[RESOLUTIONS.HIGH]: {
		currentInvoices: { x: 4, y: 0, dim: DIMENSIONS.TWO_BY_SIX },
	},
};

const CurrentInvoicesPage = ({ breakpoint, location }) => {
	const columnCount = BREAKPOINT_COLCOUNT_MAP[breakpoint];

	return (
		<COMPANYPage
			name='page profile-avatar-page'
			layout={LAYOUT_CONFIG[breakpoint]}
			breakpoint={breakpoint}
			location={location}
		>
			<div key={`currentInvoices-${columnCount}`} className='currentInvoices'>
				<ComponentWrapper collapseTitle hideBorder>
					<CurrentInvoices />
				</ComponentWrapper>
			</div>
		</COMPANYPage>
	);
};

export default CurrentInvoicesPage;
