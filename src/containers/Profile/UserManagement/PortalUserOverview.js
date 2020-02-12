import { Component } from 'react';
import React from 'react';
import PortalUserOverviewBlock from './PortalUserOverviewBlock';
import BloxButton from '../../../components/Common/BloxButton';
import PortalUserOverviewSelectedBlock from './PortalUserOverviewSelectedBlock';
import { UserApi } from '../../../services/user';
import { CompanyProfileApi } from '../../../services/companyProfile';

export default class PortalUserOverview extends Component {
	constructor(props) {
		super(props);
		this.companyApi = new CompanyProfileApi();

		this.state = {
			users: [],
			focusedUser: null,
			activeUserCount: 0,
		};
	}

	componentDidMount() {
		this.getCompanyProfile();
		this.setState({ focusedUser: this.state.users[0] });
	}

	getCompanyProfile = () => {
		this.companyApi
			.get()
			.then(response => {
				const validResponse = response.status === 200 && response.data;
				if (validResponse) {
					this.getUsers(response.data.customer.id);
				} else {
					this.setState({ error: 'Error pulling company details' });
				}
			})
			.catch(error => this.setState({ error }));
	};

	getUsers(id) {
		UserApi.getAllUsers(id)
			.then(response => {
				const validResponse = response.status === 200 && response.data;
				if (validResponse) {
					this.setState({ users: response.data.users, focusedUser: response.data.users[0] });
					this.countActiveUsers();
				} else {
					this.setState({ error: 'Error pulling users' });
				}
			})
			.catch(error => this.setState({ error }));
	}

	setFocused = user => {
		this.setState({ focusedUser: user });
	};
	goToPortalUsers = () => {
		this.props.goToPortalUsers('USER MANAGEMENT');
	};

	countActiveUsers = () => {
		let count = 0;
		for (const user of this.state.users) {
			if (user.enabled) {
				count += 1;
			}
		}
		this.setState({ activeUserCount: count });
	};

	render() {
		const { users } = this.state;
		return (
			<div className='portal-user-overview'>
				<div className={'header'}>
					<div className={'title-wrapper'}>
						<div className={'title'}>PORTAL</div>
						<div className={'sub-title'}>{this.state.activeUserCount} Active</div>
					</div>

					<BloxButton
						title={'MANAGE PORTAL USERS'}
						customClass={'manage-users'}
						onClick={this.goToPortalUsers}
						enabled={true}
					/>
				</div>

				<div className={'overview-user-wrapper'}>
					<div className={'users' + (users.length > 4 ? ' two-rows' : 'one-row')}>
						<div className={'active-user'}>
							{this.state.users.length > 4 && (
								<PortalUserOverviewSelectedBlock user={this.state.focusedUser} />
							)}
						</div>
						<div className={'row-wrapper-1'}>
							<div className={'row-1'}>
								{this.state.users &&
									this.state.users.map((user, index) => {
										if (index < 6) {
											return [
												<PortalUserOverviewBlock
													key={index}
													user={user}
													position={index}
													click={() => this.setFocused(user)}
												/>,
											];
										}
									})}
							</div>
						</div>
						<div className={'row-wrapper-2'}>
							<div className={'row-2'}>
								{this.state.users.length > 4 &&
									this.state.users.map((user, index) => {
										if (index > 5 && index < 12) {
											return [
												<PortalUserOverviewBlock
													key={index}
													user={user}
													position={index}
													click={() => this.setFocused(user)}
												/>,
											];
										}
									})}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
