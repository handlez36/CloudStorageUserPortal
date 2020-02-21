import { Component } from 'react';
import React from 'react';
import BloxButton from 'sub_components/Common/BloxButton';
import PortalUserOverviewBlock from './PortalUserOverviewBlock';

import PortalUserOverviewSelectedBlock from './PortalUserOverviewSelectedBlock';
import { UserApi } from '../../../services/user';
import { CompanyProfileApi } from '../../../services/companyProfile';

const users = [
	{
		mobilePhonePartial: null,
		emailPartial: null,
		contactDetails: {
			country: '',
			website: '',
			address: '6349 Pollards Pond Road, PO Box 608',
			city: 'Appling',
			fax_number: '',
		},
		userProfile: {
			twoFactorProvider: 'gauthify',
			dashboardCardOrder: '1',
			grantorEmailAddress: '',
			profileImage: '5',
			timeZone: '1',
		},
		userGroups: null,
		authTypes: null,
		pending: false,
		firstname: 'Melanie',
		icon: 'icons/default/icon_user.png',
		creation_date: '2018-09-19 19:12:24.870',
		userName: 'melanie.bass',
		title: '',
		created_by_user_id: '-1',
		enabled: 'true',
		lastname: 'Bass',
		last_connection: '2019-12-20 14:59:25.065',
		password: '',
		manager_id: '0',
		id: '601',
		job_title: 'Graphic Designer | UX Design',
		last_update_date: '2020-01-15 16:15:52.486',
	},
	{
		mobilePhonePartial: null,
		emailPartial: null,
		contactDetails: {
			country: '',
			website: '',
			address: '6349 Pollards Pond Road, PO Box 608',
			city: 'Appling',
			fax_number: '',
		},
		userProfile: {
			twoFactorProvider: 'gauthify',
			dashboardCardOrder: '1',
			grantorEmailAddress: '',
			profileImage: '5',
			timeZone: '1',
		},
		userGroups: null,
		authTypes: null,
		pending: false,
		firstname: 'Melanie',
		icon: 'icons/default/icon_user.png',
		creation_date: '2018-09-19 19:12:24.870',
		userName: 'melanie.bass',
		title: '',
		created_by_user_id: '-1',
		enabled: 'true',
		lastname: 'Bass',
		last_connection: '2019-12-20 14:59:25.065',
		password: '',
		manager_id: '0',
		id: '601',
		job_title: 'Graphic Designer | UX Design',
		last_update_date: '2020-01-15 16:15:52.486',
	},
	{
		mobilePhonePartial: null,
		emailPartial: null,
		contactDetails: {
			country: '',
			website: '',
			address: '6349 Pollards Pond Road, PO Box 608',
			city: 'Appling',
			fax_number: '',
		},
		userProfile: {
			twoFactorProvider: 'gauthify',
			dashboardCardOrder: '1',
			grantorEmailAddress: '',
			profileImage: '5',
			timeZone: '1',
		},
		userGroups: null,
		authTypes: null,
		pending: false,
		firstname: 'Melanie',
		icon: 'icons/default/icon_user.png',
		creation_date: '2018-09-19 19:12:24.870',
		userName: 'melanie.bass',
		title: '',
		created_by_user_id: '-1',
		enabled: 'true',
		lastname: 'Bass',
		last_connection: '2019-12-20 14:59:25.065',
		password: '',
		manager_id: '0',
		id: '601',
		job_title: 'Graphic Designer | UX Design',
		last_update_date: '2020-01-15 16:15:52.486',
	},
];
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
		//const { users } = this.state;
		console.log('users', users);
		return (
			<div className='portal-user-overview'>
				{/* <div className={'header'}>
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
				</div> */}

				<div className={'overview-user-wrapper'}>
					<div className={'users'}>
						{/* <div className={'active-user'}>
							{users.length > 4 && (
								<PortalUserOverviewSelectedBlock user={this.state.focusedUser} />
							)}
						</div> */}
						<div className={'row-wrapper-1'}>
							<div className={'row-1'}>
								{users &&
									users.map((user, index) => {
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
					</div>
				</div>
			</div>
		);
	}
}
