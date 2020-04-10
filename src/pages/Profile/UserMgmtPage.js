import React from 'react';

import { DIMENSIONS } from 'services/layoutManager';
// import AvatarSelection from 'COMPANY_components/Profile/AvatarSelection/AvatarSelection';
import PortalUserMgmt from 'COMPANY_components/Profile/PortalUserMgmt/PortalUserMgmt';
import COMPANYPage from 'sub_components/Layout/COMPANYPage';
import ComponentWrapper from 'sub_components/Layout/ComponentWrapper';
import { RESOLUTIONS, BREAKPOINT_COLCOUNT_MAP } from 'services/config';

const LAYOUT_CONFIG = {
	[RESOLUTIONS.LOW]: {
		userManagement: { x: 4, y: 0, dim: DIMENSIONS.TWO_BY_SIX, customHeight: 45 },
	},
	[RESOLUTIONS.MED]: {
		userManagement: { x: 4, y: 0, dim: DIMENSIONS.TWO_BY_SIX, customHeight: 60 },
	},
	[RESOLUTIONS.HIGH]: {
		userManagement: { x: 4, y: 0, dim: DIMENSIONS.TWO_BY_SIX, customHeight: 85 },
	},
};

class UserMgmtPage extends React.Component {
	componentDidUpdate() {
		// console.log('UserMgmtPage (holding Wrapper) updated with ', this.props);
	}
	componentDidMount() {
		console.log('UserMgmtPage Did Mount');
	}
	render() {
		const { breakpoint, location } = this.props;
		const columnCount = BREAKPOINT_COLCOUNT_MAP[breakpoint];

		return (
			<COMPANYPage
				name='page profile-user-management-page'
				layout={LAYOUT_CONFIG[breakpoint]}
				breakpoint={breakpoint}
				location={location}
			>
				<div key={`userManagement-${columnCount}`} className='userManagement'>
					<ComponentWrapper key='portal-user-mgmt-wrapper' collapseTitle hideBorder>
						<PortalUserMgmt key='portal-user-mgmt' />
					</ComponentWrapper>
				</div>
			</COMPANYPage>
		);
	}
}
// const UserMgmtPage = ({ breakpoint, location }) => {
// 	const columnCount = BREAKPOINT_COLCOUNT_MAP[breakpoint];

// 	return (
// 		<COMPANYPage
// 			name='page profile-user-management-page'
// 			layout={LAYOUT_CONFIG[breakpoint]}
// 			breakpoint={breakpoint}
// 			location={location}
// 		>
// 			<div key={`userManagement-${columnCount}`} className='userManagement'>
// 				<ComponentWrapper collapseTitle hideBorder>
// 					<PortalUserMgmt />
// 				</ComponentWrapper>
// 			</div>
// 		</COMPANYPage>
// 	);
// };

export default UserMgmtPage;
