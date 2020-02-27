import React, { Component } from 'react';

import { DIMENSIONS } from 'services/layoutManager';
import BloxPage from 'sub_components/Layout/BloxPage';
import ComponentWrapper from 'sub_components/Layout/ComponentWrapper';
import MyServices from 'blox_components/Profile/MyServices/MyServices';
import MyProfile from 'blox_components/Profile/MyProfile';
import UserManagement from 'blox_components/Profile/PortalUserOverview/Components/PortalUserOverview';
import RosterManagement from 'blox_components/Profile/RosterUserOverview/Components/RosterUserOverview';
import { RESOLUTIONS } from 'services/config';
import { consolidateStreamedStyles } from 'styled-components';

const LAYOUT_CONFIG = {
	[RESOLUTIONS.LOW]: {
		companyProfile: { x: 1, y: 43, dim: DIMENSIONS.TWO_BY_THREE },
		rosterUserManagement: { x: 5, y: 43, dim: DIMENSIONS.TWO_BY_SIX },
		myProfile: { x: 1, y: 24, dim: DIMENSIONS.TWO_BY_THREE },
		portalUserManagement: { x: 5, y: 24, dim: DIMENSIONS.TWO_BY_SIX },
		myServices: { x: 1, y: 2, dim: DIMENSIONS.TWO_BY_SIX },
	},
	[RESOLUTIONS.MED]: {
		companyProfile: { x: 1, y: 43, dim: DIMENSIONS.TWO_BY_THREE },
		rosterUserManagement: { x: 5, y: 43, dim: DIMENSIONS.TWO_BY_SIX },
		myProfile: { x: 1, y: 24, dim: DIMENSIONS.TWO_BY_THREE },
		portalUserManagement: { x: 5, y: 24, dim: DIMENSIONS.TWO_BY_SIX },
		myServices: { x: 1, y: 2, dim: DIMENSIONS.TWO_BY_SIX },
	},
	[RESOLUTIONS.HIGH]: {
		companyProfile: { x: 1, y: 43, dim: DIMENSIONS.TWO_BY_THREE },
		rosterUserManagement: { x: 5, y: 43, dim: DIMENSIONS.TWO_BY_SIX },
		myProfile: { x: 1, y: 24, dim: DIMENSIONS.TWO_BY_THREE },
		portalUserManagement: { x: 5, y: 24, dim: DIMENSIONS.TWO_BY_SIX },
		myServices: { x: 1, y: 2, dim: DIMENSIONS.TWO_BY_SIX },
	},
};

class OverviewPage extends Component {
	render() {
		const { breakpoint, location } = this.props;
		//const customSubHeader = <div>Hello</div>;
		return (
			<BloxPage
				name='page profile-overview-page'
				layout={LAYOUT_CONFIG[breakpoint]}
				breakpoint={breakpoint}
				location={location}
			>
				<div key='myServices' className='myServices'>
					<ComponentWrapper title='MY Services' hideBorder>
						<MyServices />
					</ComponentWrapper>
				</div>
				<div key='myProfile' className='myProfile'>
					<ComponentWrapper title='MY Profile' hideBorder>
						<MyProfile />
					</ComponentWrapper>
				</div>
				<div key='portalUserManagement' className='portalUserManagement'>
					<ComponentWrapper
						title='PORTAL User Management'
						buttonTitle='MANAGE PORTAL'
						showButton
						hideBorder
						//customSubHeader={customSubHeader}
					>
						<UserManagement />
					</ComponentWrapper>
				</div>
				<div key='companyProfile' className='companyProfile'>
					<ComponentWrapper title='COMPANY Profile' hideBorder />
				</div>
				<div key='rosterUserManagement' className='rosterUserManagement'>
					<ComponentWrapper
						title='ROSTER User Management'
						buttonTitle='MANAGE ROSTER'
						showButton
						hideBorder
					>
						<RosterManagement />
					</ComponentWrapper>
				</div>
			</BloxPage>
		);
	}
}

export default OverviewPage;
