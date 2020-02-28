import React, { Component } from 'react';

import { DIMENSIONS } from 'services/layoutManager';
import BloxPage from 'sub_components/Layout/BloxPage';
import ComponentWrapper from 'sub_components/Layout/ComponentWrapper';
import MyServices from 'blox_components/Profile/MyServices/MyServices';
import MyProfile from 'blox_components/Profile/MyProfile';
import UserManagement from 'blox_components/Profile/PortalUserOverview/PortalUserOverview';
import RosterManagement from 'blox_components/Profile/RosterUserOverview/RosterUserOverview';
import { RESOLUTIONS } from 'services/config';
import BloxButton from 'sub_components/Common/BloxButton';
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
		const customTitlePortalOverview = (
			<div className='component-wrapper--no-border heading60'>
				<div className='component-wrapper_title'>PORTAL User Management</div>
				<div className='component-wrapper_button'>
					<BloxButton
						title='MANAGE PORTAL'
						customClass={'blox-button blue-gradient'}
						onClick={() => {}}
						enabled={true}
					/>
				</div>
			</div>
		);
		const customTitleRosterOverview = (
			<div className='component-wrapper--no-border heading60'>
				<div className='component-wrapper_title'>ROSTER User Management</div>
				<div className='component-wrapper_button'>
					<BloxButton
						title='MANAGE ROSTER'
						customClass={'blox-button blue-gradient'}
						onClick={() => {}}
						enabled={true}
					/>
				</div>
			</div>
		);
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
					<ComponentWrapper title={customTitlePortalOverview} showButton hideBorder>
						<UserManagement />
					</ComponentWrapper>
				</div>
				<div key='companyProfile' className='companyProfile'>
					<ComponentWrapper title='COMPANY Profile' hideBorder />
				</div>
				<div key='rosterUserManagement' className='rosterUserManagement'>
					<ComponentWrapper title={customTitleRosterOverview} showButton hideBorder>
						<RosterManagement />
					</ComponentWrapper>
				</div>
			</BloxPage>
		);
	}
}

export default OverviewPage;
