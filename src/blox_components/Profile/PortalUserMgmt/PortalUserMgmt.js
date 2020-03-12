import React, { Component } from 'react';
import { connect } from 'react-redux';

// import RosterUserList from './RosterUserList';
import { UserApi } from 'services/user';
import { USER_MANAGEMENT_MENU, MENU } from 'utils/ProfileConstants';
import { updatePage } from 'actions/siteTracking';
import MenuHeader from './Components/MenuHeader';
import PortalUserList from './Components/PortalUserList';
// import { SITE_PAGES } from '../../../components/Common/CommonConstants';

class PortalUserMgmt extends Component {
	constructor(props) {
		super(props);

		this.menuItems = {
			[USER_MANAGEMENT_MENU.PORTAL]: 1,
		};

		this.state = {
			users: null,
			error: null,
			companyId: null,
			active: USER_MANAGEMENT_MENU.PORTAL,
			showAddUserModal: false,
			showRosterModal: false,
			rosterUsers: null,
		};
	}

	resetPage = () => {
		this.props.resetPage();
	};

	onMenuSelect = active => {
		const {
			company_info: { customer: { id } = {} },
		} = this.props;

		this.setState({ active });

		if (active === USER_MANAGEMENT_MENU.PORTAL) {
			this.getUsers(id);
		} else {
			this.getRosterUsers(id);
		}
	};

	onInviteUser = () => {
		this.setState({ showAddUserModal: true });
	};
	addToRoster = () => {
		this.setState({ showRosterModal: true });
	};
	toggleRosterModal = status => {
		console.log('called');
		this.setState({ showRosterModal: status });
	};

	toggleShowAddUserModal = status => {
		this.setState({ showAddUserModal: status });
	};

	getUsers(id) {
		UserApi.getAllUsers(id)
			.then(response => {
				const validResponse = response.status === 200 && response.data;
				if (validResponse) {
					this.setState({ users: response.data.users, companyId: id });
				} else {
					this.setState({ error: 'Error pulling users' });
				}
			})
			.catch(() => this.setState({ error: 'Error pulling users' }));
	}

	getRosterUsers(id) {
		UserApi.getAllRosterUsers(id)
			.then(response => {
				const validResponse = response.status === 200 && response.data;
				if (validResponse) {
					console.log(response.data.rosterUsers);
					this.setState({ rosterUsers: response.data.rosterUsers, companyId: id });
				} else {
					this.setState({ error: 'Error pulling users' });
				}
			})
			.catch(() => this.setState({ error: 'Error pulling users' }));
	}

	checkForCompanyId = () => {
		const {
			company_info: { customer: { id } = {} },
		} = this.props;
		const { companyId: existingId, error } = this.state;

		if (id !== existingId && !error) {
			this.getUsers(id);
		}
	};

	componentDidUpdate() {
		// this.checkForCompanyId();
	}

	componentDidMount() {
		const { updatePage } = this.props;
		// updatePage(SITE_PAGES.PROFILE[MENU.USER_MANAGEMENT]);
		if (this.props.isRosterActive) {
			this.setState({ active: USER_MANAGEMENT_MENU.ROSTER });
			document.getElementById(1).classList.remove('active');
			document.getElementById(2).classList.add('active');

			const currentlySelectedMenuItem = document.getElementById(1);
			const changeGradient = document.querySelector('.menu-header');
			changeGradient.classList.add('active');
			currentlySelectedMenuItem.classList.remove('active');
		}
	}

	render() {
		const { active, showAddUserModal, showRosterModal } = this.state;

		return (
			// <div className='outer-wrapper portal-user-mgmt user-management-page'>
			<div className='outer-wrapper portal-user-mgmt'>
				<MenuHeader
					onMenuSelect={this.onMenuSelect}
					onInviteUser={this.onInviteUser}
					addToRoster={this.addToRoster}
					menuItems={this.menuItems}
					page='USER-MANAGEMENT'
				/>
				<div className='content'>
					{active === USER_MANAGEMENT_MENU.PORTAL && (
						<PortalUserList
							showModal={showAddUserModal}
							toggleShowAddUserModal={this.toggleShowAddUserModal}
						/>
					)}
					{/* {active === USER_MANAGEMENT_MENU.ROSTER && (
						<RosterUserList
							showModal={showRosterModal}
							toggleRosterModal={this.toggleRosterModal}
						/>
					)} */}
				</div>
			</div>
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
	{ updatePage },
)(PortalUserMgmt);
