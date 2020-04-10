import React from 'react';

import { DIMENSIONS } from 'services/layoutManager';
import AvatarSelection from 'COMPANY_components/Profile/AvatarSelection/AvatarSelection';
import COMPANYPage from 'sub_components/Layout/COMPANYPage';
import ComponentWrapper from 'sub_components/Layout/ComponentWrapper';
import { RESOLUTIONS, BREAKPOINT_COLCOUNT_MAP } from 'services/config';

const LAYOUT_CONFIG = {
	[RESOLUTIONS.LOW]: {
		avatarPassword: { x: 2, y: 1, dim: DIMENSIONS.TWO_BY_TEN, customHeight: 100 },
	},
	[RESOLUTIONS.MED]: {
		avatarPassword: { x: 3, y: 0, dim: DIMENSIONS.TWO_BY_EIGHT, customHeight: 112 },
	},
	[RESOLUTIONS.HIGH]: {
		avatarPassword: { x: 4, y: 0, dim: DIMENSIONS.TWO_BY_SIX, customHeight: 160 },
	},
};

const AvatarChangePage = ({ breakpoint, location }) => {
	const columnCount = BREAKPOINT_COLCOUNT_MAP[breakpoint];

	return (
		<COMPANYPage
			name='page profile-avatar-page'
			layout={LAYOUT_CONFIG[breakpoint]}
			breakpoint={breakpoint}
			location={location}
		>
			<div key={`avatarPassword-${columnCount}`} className='avatarPassword'>
				<ComponentWrapper collapseTitle hideBorder>
					<AvatarSelection />
				</ComponentWrapper>
			</div>
		</COMPANYPage>
	);
};

export default AvatarChangePage;
