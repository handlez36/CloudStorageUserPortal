import React, { Component } from 'react';

import { DIMENSIONS } from 'services/layoutManager';
import PasswordChange from 'COMPANY_components/Profile/PasswordChange';
import COMPANYPage from 'sub_components/Layout/COMPANYPage';
import ComponentWrapper from 'sub_components/Layout/ComponentWrapper';
import { RESOLUTIONS, BREAKPOINT_COLCOUNT_MAP } from 'services/config';

const LAYOUT_CONFIG = {
	[RESOLUTIONS.LOW]: {
		changePassword: { x: 2, y: 1, dim: DIMENSIONS.TWO_BY_TEN, customHeight: 50 },
	},
	[RESOLUTIONS.MED]: {
		changePassword: { x: 3, y: 1, dim: DIMENSIONS.TWO_BY_EIGHT, customHeight: 50 },
	},
	[RESOLUTIONS.HIGH]: {
		changePassword: { x: 4, y: 0, dim: DIMENSIONS.TWO_BY_SIX, customHeight: 50 },
	},
};

class PasswordChangePage extends Component {
	render() {
		const { breakpoint, location } = this.props;
		const columnCount = BREAKPOINT_COLCOUNT_MAP[breakpoint];

		return (
			<COMPANYPage
				name='page profile-password-page'
				layout={LAYOUT_CONFIG[breakpoint]}
				breakpoint={breakpoint}
				location={location}
			>
				<div key={`changePassword-${columnCount}`} className='changePassword'>
					<ComponentWrapper hideTitle hideBorder>
						<PasswordChange />
					</ComponentWrapper>
				</div>
			</COMPANYPage>
		);
	}
}

export default PasswordChangePage;
