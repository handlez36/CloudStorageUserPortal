// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import ResizeObserver from 'resize-observer-polyfill';
// import { Responsive, WidthProvider } from 'react-grid-layout';
// import { LAYOUT_GRID, LAYOUT_GRID_EXPANDED } from 'utils/ProfileConstants';
// import InteractiveIcon from 'components_old/Profile/InteractiveIcon';
// import { StorageApi } from 'services/storage';
// import { Utils } from 'services/utils';
// import { UserProfileApi } from 'services/userProfile';
// import { updatePage } from 'actions/siteTracking';
// import { AvatarApi } from 'services/avatar';
// import Card from './InfoCards/Card';
// import PortalUserOverview from './UserManagement/PortalUserOverview';
// const CDN_URL = process.env.REACT_APP_CDN_URL;
// const companyImage = `${CDN_URL}profile/company-avatar.png`;

// const ResponsiveReactGridLayout = WidthProvider(Responsive);
// const STORAGE_LOCATIONS = ['Atlanta, GA', 'Chattanooga, TN', 'Huntsville, AL', 'Birmingham, AL'];

// class Overview extends Component {
// 	constructor(props) {
// 		super(props);
// 		this.myObserver = null;
// 		this.userProfileApi = new UserProfileApi();
// 		this.avatarApi = new AvatarApi();
// 		this.state = {
// 			rowHeight: 0,
// 			margin: [],
// 			containerPadding: [],
// 			layout: [],
// 			storageDetails: null,
// 			storageErr: null,
// 			includeDebugGridLines: false,
// 			coLocationServices: [],
// 			storageServices: [],
// 			networkServices: [],
// 			topCardExpanded: false,
// 			bottomCardExpanded: false,
// 			Avatar: null,
// 			GridLayout: LAYOUT_GRID,
// 		};
// 	}

// 	UNSAFE_componentWillMount() {
// 		this.userProfileApi.getCompanyServices().then(response => {
// 			this.setActiveServices(response.data.companyServices);
// 		});
// 	}

// 	setActiveServices(companyServices) {
// 		if (companyServices !== null && companyServices !== undefined) {
// 			for (const companyService of companyServices) {
// 				if (companyService.service === 'Storage') {
// 					const services = this.state.storageServices;
// 					services.push(companyService);
// 					this.setState({ storageServices: services });
// 				} else if (companyService.service === 'Colocation') {
// 					const services = this.state.coLocationServices;
// 					services.push(companyService);
// 					this.setState({ coLocationServices: services });
// 				} else if (companyService.service === 'Network Services') {
// 					const services = this.state.networkServices;
// 					services.push(companyService);
// 					this.setState({ networkServices: services });
// 				}
// 			}

// 			this.setState({ storageServices: this.displayLocations(this.state.storageServices) });
// 			this.setState({ networkServices: this.displayLocations(this.state.networkServices) });
// 			this.setState({ coLocationServices: this.displayLocations(this.state.coLocationServices) });
// 		}
// 	}

// 	displayLocations = hoverContent => {
// 		const services = [
// 			{ serviceName: 'Atlanta', active: false, datacenterId: 3 },
// 			{ serviceName: 'Birmingham', active: false, datacenterId: 2 },
// 			{ serviceName: 'Chattanooga', active: false, datacenterId: 1 },
// 			{ serviceName: 'Huntsville', active: false, datacenterId: 4 },
// 		];

// 		for (const content of hoverContent) {
// 			for (const service of services) {
// 				if (content.datacenterId === service.datacenterId) {
// 					service.active = true;
// 				}
// 			}
// 		}
// 		return services;
// 	};

// 	onBreakpointChange = breakpoint => {
// 		let margin;
// 		let containerPadding;
// 		switch (breakpoint) {
// 			case 'xs':
// 				margin = [20, 0];
// 				containerPadding = [30, 0];
// 				break;
// 			case 'sm':
// 				margin = [20, 0];
// 				containerPadding = [30, 0];
// 				break;
// 			case 'md':
// 				margin = [22, 0];
// 				containerPadding = [30, 0];
// 				break;
// 			case 'lg':
// 				margin = [32, 0];
// 				containerPadding = [66, 0];
// 				break;
// 			default:
// 				margin = [22, 0];
// 				containerPadding = [30, 0];
// 				break;
// 		}

// 		const horizontalRule = document.querySelector('.gray-horizontal-bar');
// 		horizontalRule.setAttribute('style', `margin-left: ${-containerPadding[0]}px`);

// 		this.setState({ margin, containerPadding });
// 	};

// 	getStorageDetails = async () => {
// 		try {
// 			const response = await StorageApi.getAll();
// 			if (Utils.isValidResponse(response)) {
// 				this.setState({ storageDetails: response.data.storages, storageErr: null });
// 			} else {
// 				this.setState({ storageErr: 'Error retrieving storage details' });
// 			}
// 		} catch (e) {
// 			this.setState({ storageErr: 'Network error retrieving storage details' });
// 		}
// 	};

// 	getStorageLocations = storageObj => {
// 		const storageLocations = [];
// 		if (storageObj) {
// 			storageObj.forEach(storage => {
// 				if (storage.primary_location) {
// 					storageLocations.push(storage.primary_location);
// 				}
// 				if (storage.secondary_location) {
// 					storageLocations.push(storage.secondary_location);
// 				}
// 			});
// 		}

// 		const uniqueLocations = [...new Set(storageLocations)];
// 		const locationBody = STORAGE_LOCATIONS.map((location, index) => {
// 			const active = uniqueLocations.indexOf(location) !== -1 ? true : false;
// 			return (
// 				<div
// 					key={`location-content-${location}`}
// 					className={`location-${index} ${!active ? 'inactive' : ''}`}
// 				>
// 					{location}
// 				</div>
// 			);
// 		});

// 		return [locationBody];
// 	};

// 	componentDidMount() {
// 		this.getStorageDetails();
// 		this.onBreakpointChange();
// 		this.getGridLayout();
// 		this.myObserver = new ResizeObserver(entries => {
// 			entries.forEach(() => {
// 				this.onChange();
// 			});
// 		});

// 		const wrapperElement = document.querySelector('.layout');
// 		this.myObserver.observe(wrapperElement);
// 		const id = this.props.auth_status.user.userProfile.profileImage;
// 		this.getAvatarImage(id);
// 	}

// 	componentWillUnmount() {
// 		this.myObserver.disconnect();
// 	}

// 	onChange = () => {
// 		let height = window.innerHeight / 56;

// 		if (window.innerHeight >= 1010 && window.innerHeight <= 1030) {
// 			height = 18;
// 		} else if (window.innerHeight >= 1400 && window.innerHeight <= 1500) {
// 			height = 27;
// 		}

// 		if (window.innerHeight <= 660) {
// 			height = 11;
// 		}

// 		this.setState({
// 			rowHeight: height,
// 		});
// 	};
// 	getAvatarImage = id => {
// 		const Avatar = this.avatarApi.getRectangleAvatars(id);
// 		this.setState({ Avatar });
// 	};
// 	expand = (position, action) => {
// 		if (position === 'top' && action === 'open') {
// 			this.setState({ topCardExpanded: !this.state.topCardExpanded, bottomCardExpanded: false });
// 		} else if (position === 'bottom' && action === 'open') {
// 			this.setState({ topCardExpanded: false, bottomCardExpanded: !this.state.bottomCardExpanded });
// 		} else {
// 			this.setState({ topCardExpanded: false, bottomCardExpanded: false });
// 		}
// 	};
// 	getGridLayout = () => {
// 		const { topCardExpanded } = this.state;
// 		if (topCardExpanded) {
// 			this.setState({ GridLayout: LAYOUT_GRID_EXPANDED });
// 		} else {
// 			this.setState({ GridLayout: LAYOUT_GRID });
// 		}
// 	};
// 	componentDidUpdate(prevProps, prevState) {
// 		const { topCardExpanded } = this.state;

// 		if (topCardExpanded !== prevState.topCardExpanded) {
// 			this.getGridLayout();
// 		}
// 	}

// 	render() {
// 		const {
// 			containerPadding,
// 			margin,
// 			rowHeight,
// 			coLocationServices,
// 			storageServices,
// 			networkServices,
// 			topCardExpanded,
// 			bottomCardExpanded,
// 			Avatar,
// 			GridLayout,
// 		} = this.state;

// 		return (
// 			<div className='profile-overview-page'>
// 				{/* <CrossGrid showGrid /> */}
// 				<ResponsiveReactGridLayout
// 					layouts={{
// 						lg: GridLayout.lg,
// 						md: GridLayout.md,
// 						sm: GridLayout.sm,
// 						xs: GridLayout.xs,
// 					}}
// 					measureBeforeMount={false}
// 					className='layout profile'
// 					rowHeight={rowHeight}
// 					isDraggable={false}
// 					breakpoints={{ lg: 1450, md: 930, sm: 640, xs: 400 }}
// 					// breakpoints={{ lg: 1450, md: 1000, sm: 640, xs: 400 }}
// 					cols={{ lg: 12, md: 12, sm: 12, xs: 12 }}
// 					containerPadding={containerPadding}
// 					onBreakpointChange={this.onBreakpointChange}
// 					margin={margin}
// 					onLayoutChange={this.onLayoutChange}
// 					onWidthChange={this.onWidthChange}
// 				>
// 					<span key='my-services-label' className='my-services-label'>
// 						<span className='title grid-item'>MY Services</span>
// 					</span>
// 					<div key='colocation-icon' className='overview-icon colocation-icon'>
// 						<InteractiveIcon title='Colocation' hoverContent={coLocationServices} />
// 					</div>
// 					<div key='storage-icon' className='overview-icon storage-icon'>
// 						<InteractiveIcon title='Storage' hoverContent={storageServices} />
// 					</div>
// 					<div key='network-icon' className='overview-icon network-icon'>
// 						<InteractiveIcon title='Network Services' hoverContent={networkServices} />
// 					</div>
// 					<div key='horizontal-bar' className='gray-horizontal-bar' />
// 					<span key='my-account-label' className='my-account-label'>
// 						<span className='title grid-item'>MY Account</span>
// 					</span>
// 					<div key='my-account-card' className='my-account-card'>
// 						{/* <InfoCards goToContactInfo={this.props.goToContactInfo} type='user' /> */}
// 						<div className='cards-holder'>
// 							<div className={topCardExpanded ? 'top-card expanded' : 'top-card'}>
// 								<Card
// 									id='top'
// 									expanded={topCardExpanded}
// 									expandCallBack={this.expand}
// 									image={Avatar}
// 									profile={this.props.company_info}
// 									type='userProfile'
// 									user={this.props.auth_status.user}
// 									goToContactInfo={this.props.goToContactInfo}
// 									changeAvatar={this.getAvatarImage}
// 								/>
// 							</div>
// 						</div>
// 					</div>
// 					<div key='company-card' className='company-card'>
// 						{/* <InfoCards goToContactInfo={this.props.goToContactInfo} type='user' /> */}
// 						<div className='cards-holder'>
// 							<div className={bottomCardExpanded ? 'bottom-card expanded' : 'bottom-card'}>
// 								<Card
// 									changeAvatar={this.getAvatarImage}
// 									image={companyImage}
// 									id='bottom'
// 									expandCallBack={this.expand}
// 									expanded={bottomCardExpanded}
// 									profile={this.props.company_info}
// 									user={this.props.auth_status.user}
// 									type='CompanyInfo'
// 								/>
// 							</div>
// 						</div>
// 					</div>

// 					<span key='user-mgmt-label' className='user-mgmt-label'>
// 						<span className='title grid-item'>USER Management</span>
// 					</span>
// 					<div key='portal-card' className='portal-card'>
// 						<PortalUserOverview goToPortalUsers={this.props.selectMenuItem} />
// 					</div>
// 					<div key='roster-card' className='roster-card'>
// 						{/* <RosterUserOverview goToRosterUsers={this.props.selectMenuItem} /> */}
// 					</div>
// 				</ResponsiveReactGridLayout>
// 			</div>
// 		);
// 	}
// }
// function mapStateToProps(state) {
// 	return {
// 		auth_status: state.auth_status,
// 		company_info: state.company_info,
// 	};
// }

// export default connect(mapStateToProps, { updatePage })(Overview);
