import React from 'react';

import { DIMENSIONS } from 'services/layoutManager';
import UserContactSection from 'blox_components/Profile/UserContactSection/UserContactSection';
import BloxPage from 'sub_components/Layout/BloxPage';
import ComponentWrapper from 'sub_components/Layout/ComponentWrapper';
import { RESOLUTIONS } from 'services/config';

const LAYOUT_CONFIG = {
	[RESOLUTIONS.LOW]: {
		userInfo: { x: 2, y: 1, dim: DIMENSIONS.TWO_BY_TEN, customHeight: 85 },
	},
	[RESOLUTIONS.MED]: {
		userInfo: { x: 3, y: 0, dim: DIMENSIONS.TWO_BY_EIGHT, customHeight: 112 },
	},
	[RESOLUTIONS.HIGH]: {
		userInfo: { x: 4, y: 0, dim: DIMENSIONS.TWO_BY_SIX, customHeight: 160 },
	},
};

const UserInfoPage = ({ breakpoint, location }) => {
	return (
		<BloxPage
			name='page profile-user-info-page'
			layout={LAYOUT_CONFIG[breakpoint]}
			breakpoint={breakpoint}
			location={location}
		>
			<div key='userInfo' className='userInfo'>
				<ComponentWrapper collapseTitle hideBorder>
					<UserContactSection />
				</ComponentWrapper>
			</div>
		</BloxPage>
	);
};

export default UserInfoPage;
