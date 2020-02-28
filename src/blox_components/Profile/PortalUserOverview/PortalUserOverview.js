import { Component, Fragment } from 'react';
import React from 'react';
import { CarouselCycle } from 'containers_old/Storage/CarouselCycle';
import { UserApi } from 'services/user';
import { CompanyProfileApi } from 'services/companyProfile';
import PortalUserOverviewBlock from './Components/PortalUserOverviewBlock';

const CDN_URL = process.env.REACT_APP_CDN_URL;
const Arrow = `${CDN_URL}common/left-arrow-active.png`;

const AMOUNT_OF_CARDS_TO_DISPLAY = 4;

class PortalUserOverview extends Component {
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
		const { currentItem, users } = this.state;
		const { data } = this.props;
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
		const { currentItem, disabled, users } = this.state;

		return (
			<div className='carousel-container portal-user-overview'>
				<Fragment>
					<div className='nav-container-right'>
						{currentItem !== users.length - AMOUNT_OF_CARDS_TO_DISPLAY &&
							users.length > AMOUNT_OF_CARDS_TO_DISPLAY && (
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

				<div className='portal-user-wrapper'>
					<div className={'sub-title-wrapper'}>
						<div className={'sub-title heading70'}>
							{`( ${this.state.activeUserCount} Active )`}
						</div>
					</div>
					<div className='overview-user-wrapper'>
						{users &&
							users.map((user, index) => {
								if (index < 6) {
									return [
										<PortalUserOverviewBlock
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
						{currentItem !== 0 && users.length > AMOUNT_OF_CARDS_TO_DISPLAY && (
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

export default PortalUserOverview;
