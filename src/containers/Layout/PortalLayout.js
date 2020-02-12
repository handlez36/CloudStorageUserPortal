import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { AvatarApi } from './../../services/avatar';
import SideMenu from '../../components/Common/SideMenu';
import DropDownFilter from '../../components/Common/DropDownFilter';
import { UserProfileApi } from '../../services/userProfile';
import { getCurrentMembership } from '../../services/memberships';
import { switchCompany } from '../../actions/auth';

const CDN_URL = process.env.REACT_APP_CDN_URL;

const profileModule = `${CDN_URL}profile/Profile_Module.svg`;
const supportModule = `${CDN_URL}support/Support_Module.svg`;
const billingModule = `${CDN_URL}billing/Billing_Module.svg`;
const storageModule = `${CDN_URL}storage/Storage_Module.svg`;

const profileHome = `${CDN_URL}profile/Profile_HomeButton.svg`;
const supportHome = `${CDN_URL}support/Support_HomeButton.svg`;
const billingHome = `${CDN_URL}billing/Billing_HomeButton.svg`;
const storageHome = `${CDN_URL}storage/Storage_HomeButton.svg`;

const profileSelector = `${CDN_URL}profile/Profile_Selector.svg`;
const supportSelector = `${CDN_URL}support/Support_Selector.svg`;
const billingSelector = `${CDN_URL}billing/Billing_Selector.svg`;
const storageSelector = `${CDN_URL}storage/Storage_Selector.svg`;
const crossMark = `${CDN_URL}common/NavigationSelectorCrossmark.svg`;

/**
 * Layout component to be used as a template for the billing,
 * profile, and support pages. This template includes...
 * - Header along the top
 * - Left panel which identifies the page, current user and the
 *  associated company.
 * - Side menu panel which displays the side menu
 * - Main content panel
 * - Footer (To be completed at a later time)
 * Attributes needing to be passed into the component can be found
 * in the PropType definitions
 */
class PortalLayout extends Component {
	constructor(props) {
		super(props);

		this.avatarApi = new AvatarApi();
		this.userProfileApi = new UserProfileApi();
		this.state = {
			active: '',
			company: getCurrentMembership() && getCurrentMembership().organizationName,
		};
	}

	/**
	 * page: Current page. Applicable values currently include 'profile', 'billing', 'support'
	 * sideMenu: Side menu details as objects; Key = menu item title, Value = index starting with 1
	 * callback: Function to receive a callback when a menu item is selected
	 */
	static propTypes = {
		page: PropTypes.string,
		sideMenu: PropTypes.object,
		callback: PropTypes.func,
	};

	/**
	 * Function invoked when a menu item is selected. This function just sends the
	 * selected item to the callback passed in. Use the passed in callback to
	 * do whatever processing is necessary for that menu item
	 */
	selectMenuItem = item => {
		this.setState({ active: item });

		this.props.callback(item);
	};

	/**
	 * Returns JSX for the left panel welcome message
	 * This is currently using a static 'user' string.
	 * TO DO: Update to use the user information from the login.
	 * @param  user
	 */
	constructWelcomeMessage(user = 'USER NAME', avatar) {
		const customProps = this.getCustomPageProperties(this.props.page);

		return (
			<div className='welcome-section'>
				<div className='welcome-avatar'>
					<img className='user-avatar' src={avatar} alt='avatar' />
				</div>
				<div className='welcome-text-section'>
					<div className='welcome-title' style={{ color: customProps.style }}>
						WELCOME
					</div>
					<div className='welcome-user-name'>{user}</div>
				</div>
			</div>
		);
	}

	/**
	 * Returns an object providing the left panel image (based on page),
	 * and the menu item selector (based on page)
	 * @param page: Current page being rendered
	 */
	gotohomepage = () => {
		this.props.history.push('/portal');
	};
	getCustomPageProperties(page) {
		let customProps = {};

		switch (page) {
			case 'profile':
				customProps = {
					moduleImage: profileModule,
					menuSelector: profileSelector,
					menuCrossMark: crossMark,
					homeImage: profileHome,
					style: '#416ba9',
				};
				break;
			case 'billing':
				customProps = {
					moduleImage: billingModule,
					menuSelector: billingSelector,
					menuCrossMark: crossMark,
					homeImage: billingHome,
					style: '#949300',
				};
				break;
			case 'support':
				customProps = {
					moduleImage: supportModule,
					menuSelector: supportSelector,
					menuCrossMark: crossMark,
					homeImage: supportHome,
					style: '#8060a9',
				};
				break;
			case 'storage':
				customProps = {
					moduleImage: storageModule,
					menuSelector: storageSelector,
					menuCrossMark: crossMark,
					homeImage: storageHome,
					style: '#008388',
				};
				break;
			default:
				customProps = {
					moduleImage: profileModule,
					menuSelector: profileSelector,
					menuCrossMark: crossMark,
					homeImage: profileHome,
				};
				break;
		}

		return customProps;
	}
	getAlert() {
		alert('hello');
	}

	getCompanyName = () => {
		// Based on company_info details...
		const { company_info } = this.props;
		let companyName = '';

		if (company_info && company_info.customer && company_info.customer.companyName) {
			companyName = company_info.customer.companyName;
		}

		// Based on currentMemberships
		const currentMembership = getCurrentMembership();
		console.log('Current Membership: ', currentMembership);
		if (currentMembership) {
			companyName = currentMembership.organizationName;
		}

		return companyName;
	};

	switchCompany = companyId => {
		const { auth_status: { memberships = {} } = {} } = this.props;
		const matchingCompanies = memberships.filter(
			membership => membership.organizationId === companyId,
		);

		if (matchingCompanies && matchingCompanies.length > 0) {
			this.setState({ company: matchingCompanies[0].organizationName });
			this.props.switchCompany(companyId);
		}
	};

	renderCompanyOptions = () => {
		const { auth_status: { memberships = {} } = {} } = this.props;
		const { company } = this.state;
		const options = memberships.map(membership => ({
			displayValue: membership.organizationName,
			value: membership.organizationId,
		}));

		return memberships.length > 1 ? (
			<DropDownFilter
				id='company-switcher'
				title={company}
				label=''
				options={options}
				callback={this.switchCompany}
			/>
		) : (
			this.getCompanyName()
		);
	};

	render() {
		const sideMenuOptions = this.props.sideMenu;
		const customProps = this.getCustomPageProperties(this.props.page);
		const avatar = this.avatarApi.getUserAvatar(this.props.auth_status);
		const { auth_status, children, activePage, topComponent, topComponentOptions } = this.props;

		return (
			<div className='client-portal row'>
				<section className='portal-body'>
					<div className='portal-left'>
						<div className='portal-header'>
							{/* <div className='company-name'>{this.getCompanyName()}</div> */}
							<div className='company-name'>{this.renderCompanyOptions()}</div>
						</div>
						<div className='column-one-and-two'>
							{/* Module section */}
							<div className='portal-module-section'>
								<div className='image'>
									{this.constructWelcomeMessage(
										this.userProfileApi.getFirstName(auth_status),
										avatar,
									)}
									<div className='module_image'>
										<img src={customProps.moduleImage} alt='module' />
									</div>

									<img
										src={customProps.homeImage}
										alt='module'
										className='homeImage clickable'
										onClick={this.gotohomepage}
									/>
								</div>
							</div>
							{/* Menu section */}
							<div className={`portal-side-menu ${this.props.page}`}>
								<SideMenu
									menuItems={sideMenuOptions}
									active={activePage}
									menuSelector={customProps.menuSelector}
									menuCrossMark={customProps.menuCrossMark}
									callback={this.selectMenuItem}
									topComponent={topComponent}
									topComponentOptions={topComponentOptions}
								/>
							</div>
						</div>
					</div>
					<div className='portal-main'>{children}</div>
				</section>
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
	{ switchCompany },
)(PortalLayout);
