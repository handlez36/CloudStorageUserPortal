import { Component, Fragment } from 'react';
import React from 'react';
import { CarouselCycle } from 'containers_old/Storage/CarouselCycle';
import BloxButton from 'sub_components/Common/BloxButton';
import PortalUserOverviewBlock from './PortalUserOverviewBlock';

import PortalUserOverviewSelectedBlock from './PortalUserOverviewSelectedBlock';
import { UserApi } from '../../../services/user';
import { CompanyProfileApi } from '../../../services/companyProfile';
const CDN_URL = process.env.REACT_APP_CDN_URL;
const Arrow = `${CDN_URL}common/left-arrow-active.png`;
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
			profileImage: '2',
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
			profileImage: '4',
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
			profileImage: '4',
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
			profileImage: '4',
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
			currentItem: 0,
			disabled: false,
		};
	}
	allowNextClick = () => {
		this.setState({ disabled: false });
	};

	cycleItems = (direction = 'next') => {
		this.setState({ disabled: true });
		const reverseDirection = direction === 'next' ? 'prev' : 'next';
		const { currentItem } = this.state;
		//const { data } = this.props;
		const nextItem = direction === 'next' ? parseInt(currentItem) - 1 : parseInt(currentItem) + 1;

		if (
			(currentItem === 0 && direction === 'next') ||
			(currentItem === users.length && direction === 'prev')
		) {
		} else {
			this.setState({ currentItem: nextItem }, () =>
				CarouselCycle(
					[],
					{},
					reverseDirection,
					'.portal-user-overview-block',
					'.overview-user-wrapper',
					this.allowNextClick,
				),
			);
		}
	};

	componentDidMount() {
		this.getCompanyProfile();
		this.setState({ focusedUser: this.state.users[0], topItem: 0, currentItem: 0 });
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
		const { currentItem, disabled } = this.state;
		const amountToDisplay = 4;
		return (
			<div className='carousel-container portal-user-management'>
				<Fragment>
					<div className='nav-container-right'>
						{currentItem !== users.length - amountToDisplay && users.length > amountToDisplay && (
							<div
								className='nav-arrow-right'
								onClick={disabled ? function() {} : () => this.cycleItems('prev')}
							>
								<div className='arrow-image'>
									<img src={Arrow} />
								</div>
							</div>
						)}
					</div>
				</Fragment>

				<div className='portal-user-overview'>
					<div className='overview-user-wrapper'>
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

				<Fragment>
					<div className='nav-container-left'>
						{currentItem !== 0 && users.length > amountToDisplay && (
							<div
								className='nav-arrow-left'
								onClick={disabled ? function() {} : () => this.cycleItems('next')}
							>
								<div className='arrow-image'>
									<img src={Arrow} />
								</div>
							</div>
						)}
					</div>
				</Fragment>
			</div>
		);
	}
}
