import React, { Component } from 'react';

import { DIMENSIONS } from 'services/layoutManager';
import BloxPage from 'sub_components/Layout/BloxPage';
import ComponentWrapper from 'sub_components/Layout/ComponentWrapper';
import MyServices from 'blox_components/Profile/MyServices/MyServices';
import MyProfile from 'blox_components/Profile/MyProfile';
import CompanyProfile from 'blox_components/Profile/CompanyProfile';
import { RESOLUTIONS } from 'services/config';
import { PROFILE_OVERVIEW_CARDS as CARDS } from 'utils/ProfileConstants';

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
		const { expandedCard } = this.state;

		const layout = this.getLayoutConfig(breakpoint);
		console.log('Layout: ', layout);
		return (
			<BloxPage
				name='page profile-overview-page'
				layout={this.getLayoutConfig(breakpoint)}
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
						<MyProfile expanded={expandedCard === CARDS.MY_PROFILE} expandCard={this.expandCard} />
					</ComponentWrapper>
				</div>
				<div key='portalUserManagement' className='portalUserManagement'>
					<ComponentWrapper title='PORTAL User Management' hideBorder />
				</div>
				<div key='companyProfile' className='companyProfile'>
					<ComponentWrapper title='COMPANY Profile' hideBorder>
						<CompanyProfile
							expanded={expandedCard === CARDS.COMPANY_PROFILE}
							expandCard={this.expandCard}
						/>
					</ComponentWrapper>
				</div>
				<div key='rosterUserManagement' className='rosterUserManagement'>
					<ComponentWrapper title='ROSTER User Management' hideBorder />
				</div>
			</BloxPage>
		);
	}
}

export default OverviewPage;
