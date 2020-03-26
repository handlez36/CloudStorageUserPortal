import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DIMENSIONS } from 'services/layoutManager';
import BloxPage from 'sub_components/Layout/BloxPage';
import ComponentWrapper from 'sub_components/Layout/ComponentWrapper';
import MyServices from 'blox_components/Profile/MyServices/MyServices';
import MyProfile from 'blox_components/Profile/MyProfile';
import UserManagement from 'blox_components/Profile/PortalUserOverview/PortalUserOverview';
import RosterManagement from 'blox_components/Profile/RosterUserOverview/RosterUserOverview';
import { RESOLUTIONS, BREAKPOINT_COLCOUNT_MAP } from 'services/config';
import BloxButton from 'sub_components/Common/BloxButton';
import { updateModule, updatePage, addPageToBreadCrumbs } from 'actions/siteTracking';
import { MENU as PROFILE_MENU } from 'utils/ProfileConstants';
import { SITE_PAGES, SITE_MODULES } from 'utils/CommonConstants';
import { consolidateStreamedStyles } from 'styled-components';
import CompanyProfile from 'blox_components/Profile/CompanyProfile';
import { PROFILE_OVERVIEW_CARDS as CARDS } from 'utils/ProfileConstants';
import { Utils } from 'services/utils';

const LAYOUT_CONFIG = {
	[RESOLUTIONS.LOW]: {
		companyProfile: { x: 1, y: 43, dim: DIMENSIONS.TWO_BY_THREE },
		rosterUserManagement: { x: 5, y: 43, dim: DIMENSIONS.TWO_BY_SIX },
		myProfile: { x: 1, y: 24, dim: DIMENSIONS.TWO_BY_THREE },
		portalUserManagement: { x: 5, y: 24, dim: DIMENSIONS.TWO_BY_SIX },
		myServices: { x: 1, y: 2, dim: DIMENSIONS.TWO_BY_SIX },
	},
	[RESOLUTIONS.MED]: {
		companyProfile: { x: 1, y: 58, dim: DIMENSIONS.TWO_BY_THREE },
		rosterUserManagement: { x: 5, y: 58, dim: DIMENSIONS.TWO_BY_SIX },
		myProfile: { x: 1, y: 31, dim: DIMENSIONS.TWO_BY_THREE },
		portalUserManagement: { x: 5, y: 31, dim: DIMENSIONS.TWO_BY_SIX },
		myServices: { x: 1, y: 0, dim: DIMENSIONS.TWO_BY_SIX },
	},
	[RESOLUTIONS.HIGH]: {
		companyProfile: { x: 1, y: 92, dim: DIMENSIONS.TWO_BY_THREE },
		rosterUserManagement: { x: 5, y: 92, dim: DIMENSIONS.TWO_BY_SIX },
		myProfile: { x: 1, y: 50, dim: DIMENSIONS.TWO_BY_THREE },
		portalUserManagement: { x: 5, y: 50, dim: DIMENSIONS.TWO_BY_SIX },
		myServices: { x: 1, y: 3, dim: DIMENSIONS.TWO_BY_SIX },
	},
};

const CARD_EXPAND_Y_COORDS = {
	[RESOLUTIONS.LOW]: { y: 62, initialY: 43, customHeight: null },
	[RESOLUTIONS.MED]: { y: 81, initialY: 58, customHeight: 50 }, // 86
	[RESOLUTIONS.HIGH]: { y: 117, initialY: 92, customHeight: 67 }, // 134
};

class OverviewPage extends Component {
	state = {
		expandedCard: null,
	};
	componentWillUnmount() {
		Utils.removeHorizontalBar();
	}

	componentDidMount() {
		const { updateModule, updatePage, addPageToBreadCrumbs } = this.props;
		updatePage(SITE_PAGES.PROFILE[PROFILE_MENU.OVERVIEW]);
		addPageToBreadCrumbs(SITE_PAGES.PROFILE[PROFILE_MENU.OVERVIEW], SITE_MODULES.PROFILE);
		updateModule(SITE_MODULES.PROFILE);
		Utils.showHorizontalBar();
	}

	getLayoutConfig = breakpoint => {
		const { expandedCard } = this.state;
		const config = LAYOUT_CONFIG[breakpoint];

		if (expandedCard && expandedCard === CARDS.MY_PROFILE) {
			const defaultConfig = { ...config };
			defaultConfig.myProfile = {
				...defaultConfig.myProfile,
				dim: DIMENSIONS.FOUR_BY_THREE,
				customHeight: CARD_EXPAND_Y_COORDS[breakpoint].customHeight,
			};
			defaultConfig.companyProfile = {
				x: 1,
				y: CARD_EXPAND_Y_COORDS[breakpoint].y,
				dim: DIMENSIONS.TWO_BY_THREE,
			};
			return defaultConfig;
		} else if (expandedCard && expandedCard === CARDS.COMPANY_PROFILE) {
			const defaultConfig = { ...config };
			defaultConfig.companyProfile = {
				x: 1,
				y: CARD_EXPAND_Y_COORDS[breakpoint].initialY,
				dim: DIMENSIONS.FOUR_BY_THREE,
				customHeight: CARD_EXPAND_Y_COORDS[breakpoint].customHeight,
			};
			return defaultConfig;
		} else {
			return config;
		}
	};

	expandCard = card => {
		this.setState(state => {
			state.expandedCard = state.expandedCard && state.expandedCard === card ? null : card;
			return state;
		});
	};

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
		const { expandedCard } = this.state;

		const columnCount = BREAKPOINT_COLCOUNT_MAP[breakpoint];
		return (
			<BloxPage
				name='page profile-overview-page'
				layout={this.getLayoutConfig(breakpoint)}
				breakpoint={breakpoint}
				location={location}
			>
				<div key={`myServices-${columnCount}`} className='myServices'>
					<ComponentWrapper title='MY Services' hideBorder>
						<MyServices />
					</ComponentWrapper>
				</div>
				<div key={`myProfile-${columnCount}`} className='myProfile'>
					<ComponentWrapper title='MY Profile' hideBorder>
						<MyProfile expanded={expandedCard === CARDS.MY_PROFILE} expandCard={this.expandCard} />
					</ComponentWrapper>
				</div>
				<div key={`portalUserManagement-${columnCount}`} className='portalUserManagement'>
					<ComponentWrapper title={customTitlePortalOverview} showButton hideBorder>
						<UserManagement />
					</ComponentWrapper>
				</div>
				<div key={`companyProfile-${columnCount}`} className='companyProfile'>
					<ComponentWrapper title='COMPANY Profile' hideBorder>
						<CompanyProfile
							expanded={expandedCard === CARDS.COMPANY_PROFILE}
							expandCard={this.expandCard}
						/>
					</ComponentWrapper>
				</div>
				<div key={`rosterUserManagement-${columnCount}`} className='rosterUserManagement'>
					<ComponentWrapper title={customTitleRosterOverview} showButton hideBorder>
						<RosterManagement />
					</ComponentWrapper>
				</div>
			</BloxPage>
		);
	}
}

export default connect(null, { updateModule, updatePage, addPageToBreadCrumbs })(OverviewPage);
