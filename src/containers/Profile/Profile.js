import React, { Component } from 'react';
import { connect } from 'react-redux';

import PortalLayout from '../Layout/PortalLayout';
import Overview from './Overview';
import UserContactSection from './UserContactInfo/UserContactSection';
import UserManagementSection from './UserManagement/UserManagement';
import PasswordSection from './Password/PasswordSection';
import AvatarSection from './Avatar/AvatarSection';
import { FifthColumn } from '../../components/Common/FifthColumn';
import { MENU } from './ProfileConstants';
import { updateModule } from '../../actions/siteTracking';
import { SITE_MODULES } from '../../components/Common/CommonConstants';
import { UserApi } from '../../services/user';

class Profile extends Component {
	constructor(props) {
		super(props);

		this.menuItems = {
			[MENU.CUSTOMER_PROFILE]: 1,
			[MENU.USER_MANAGEMENT]: 2,
			[MENU.USER_PROFILE]: 3,
			[MENU.PASSWORD_CHANGE]: 4,
			[MENU.AVATAR]: 5,
		};

		this.state = {
			active: MENU.CUSTOMER_PROFILE,
			activateSecondaryPage: false,
			companyInfo: false,
			count: 0,
		};
	}

	selectMenuItem = (item, activateSecondaryPage) => {
		this.setState({ active: item, activateSecondaryPage });
	};

	resetPage = () => {
		this.setState({ active: MENU.CUSTOMER_PROFILE });
	};

	componentDidMount() {
		const { updateModule } = this.props;
		updateModule(SITE_MODULES.PROFILE);
	}

	getActiveUsers = async () => {
		const { company_info } = this.props;
		await UserApi.getRosterSummary(company_info.fuseBillId)
			.then(response => {
				this.setState({
					activeRosterCount: response.data.activeRosterCount,
				});
			})
			.catch(error => this.setState({ error }));
	};

	goToContactInfo = () => {
		this.setState({ active: MENU.USER_PROFILE });
	};

	render() {
		const { active, activateSecondaryPage } = this.state;

		return (
			<PortalLayout
				page='profile'
				sideMenu={this.menuItems}
				history={this.props.history}
				activePage={this.menuItems[active]}
				callback={this.selectMenuItem}
			>
				<div className='main profile'>
					<div className='portal-header'>
						<div className='menu-selection'>
							{this.state.active === 'OVERVIEW' ? 'PROFILE OVERVIEW' : this.state.active}
						</div>
					</div>
					{this.state.active === MENU.CUSTOMER_PROFILE && (
						<Overview
							companyInfo={this.state.companyInfo}
							goToContactInfo={this.goToContactInfo}
							selectMenuItem={this.selectMenuItem}
							activeRosterCount={this.state.activeRosterCount}
						/>
					)}
					{this.state.active === MENU.USER_PROFILE && (
						<UserContactSection resetPage={this.resetPage} />
					)}
					{this.state.active === MENU.USER_MANAGEMENT && (
						<UserManagementSection
							resetPage={this.resetPage}
							isRosterActive={activateSecondaryPage}
						/>
					)}
					{this.state.active === MENU.PASSWORD_CHANGE && (
						<PasswordSection resetPage={this.resetPage} />
					)}
					{this.state.active === MENU.AVATAR && <AvatarSection resetPage={this.resetPage} />}
				</div>
				<div className='supporting-content profile'>
					<div className='portal-header' />
					<div className='content' />
				</div>
				<FifthColumn />
			</PortalLayout>
		);
	}
}

function mapStateToProps(state) {
	return {
		auth_status: state.auth_status,
		company_info: state.company_info,
	};
}

export default connect(
	mapStateToProps,
	{ updateModule },
)(Profile);
