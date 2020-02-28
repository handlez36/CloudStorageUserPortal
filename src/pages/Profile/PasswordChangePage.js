import React, { Component } from 'react';

import { DIMENSIONS } from 'services/layoutManager';
import PasswordChange from 'blox_components/Profile/PasswordChange';
import BloxPage from 'sub_components/Layout/BloxPage';
import ComponentWrapper from 'sub_components/Layout/ComponentWrapper';
import { RESOLUTIONS } from 'services/config';

const LAYOUT_CONFIG = {
	[RESOLUTIONS.LOW]: {
		changePassword: { x: 1, y: 0, dim: DIMENSIONS.TWO_BY_TWELVE, customHeight: 50 },
	},
	[RESOLUTIONS.MED]: {
		changePassword: { x: 1, y: 0, dim: DIMENSIONS.TWO_BY_TWELVE, customHeight: 50 },
	},
	[RESOLUTIONS.HIGH]: {
		changePassword: { x: 1, y: 0, dim: DIMENSIONS.TWO_BY_TWELVE, customHeight: 50 },
	},
};

class PasswordChangePage extends Component {
	render() {
		const { breakpoint, location } = this.props;

		return (
			<BloxPage
				name='page profile-password-page'
				layout={LAYOUT_CONFIG[breakpoint]}
				breakpoint={breakpoint}
				location={location}
			>
				<div key='changePassword' className='changePassword'>
					<ComponentWrapper hideTitle hideBorder>
						<PasswordChange />
					</ComponentWrapper>
				</div>
			</BloxPage>
		);
	}
}

export default PasswordChangePage;
