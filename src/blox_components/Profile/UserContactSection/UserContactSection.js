import React, { Component } from 'react';
import { connect } from 'react-redux';

import PortalMessage from 'sub_components/Common/PortalMessage';
import { UserProfileApi } from 'services/userProfile';
import { updateUser, resetUserUpdateStatus } from 'actions/user';
import { updateModule, updatePage, addPageToBreadCrumbs } from 'actions/siteTracking';
import { MENU as PROFILE_MENU } from 'utils/ProfileConstants';
import { SITE_PAGES, SITE_MODULES } from 'utils/CommonConstants';
import { PROFILE_USER_MESSAGE_TEXT, MENU } from 'utils/ProfileConstants';
import UserInfo from './Components/UserInfo';

class UserContactInfoNew extends Component {
	constructor(props) {
		super(props);

		this.userProfileApi = new UserProfileApi();
	}
	renderBanner(bannerText) {
		return <div className={`banner`}>{bannerText}</div>;
	}

	getUserName() {
		const { user } = this.props.auth_status;

		if (user && user.firstname) {
			return `Hey ${user.firstname}`;
		}

		return 'Hello';
	}
	componentDidMount() {
		const { updateModule, updatePage, addPageToBreadCrumbs } = this.props;
		updatePage(SITE_PAGES.PROFILE[PROFILE_MENU.USER_PROFILE]);
		addPageToBreadCrumbs(SITE_PAGES.PROFILE[PROFILE_MENU.USER_PROFILE], SITE_MODULES.PROFILE);
		updateModule(SITE_MODULES.PROFILE);
	}

	renderMessage() {
		return (
			<div className='message-text'>
				<div className='user-name'>{this.userProfileApi.getFirstName(this.props.auth_status)}</div>
				<br />
				<span className='start'>Here's your chance to be you. </span>
				<span className='content'>
					Fill in your contact information so we'll know how to get in touch with you when you need
					us.
				</span>
			</div>
		);
	}

	formatParams(params) {
		let formattedParams = {};
		if (params['job_title'] || params['job_title'] === '') {
			formattedParams = {
				userDetails: params,
			};
		} else {
			formattedParams = {
				contactDetails: params,
			};
		}

		return formattedParams;
	}

	updateUser = params => {
		const formattedParams = this.formatParams(params);
		let response = '';
		if (Object.keys(formattedParams).length > 0) {
			response = this.props.updateUser(formattedParams);
			return response;
		}
	};

	resetPage = () => {
		this.props.resetPage();
	};

	resetUserUpdateStatus = () => {
		this.props.resetUserUpdateStatus();
	};

	render() {
		return (
			<div className='user-page user-contact-section outer-wrapper'>
				<PortalMessage
					start={PROFILE_USER_MESSAGE_TEXT.START}
					content={PROFILE_USER_MESSAGE_TEXT.CONTENT}
				/>
				{this.renderBanner('USER INFORMATION')}
				<UserInfo
					updateUser={this.updateUser}
					profile={this.props.auth_status.user}
					updateStatus={this.props.auth_status.type}
					resetStatus={this.resetUserUpdateStatus}
				/>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		auth_status: state.auth_status,
	};
}

export default connect(mapStateToProps, {
	updateUser,
	resetUserUpdateStatus,
	updatePage,
	updateModule,
	addPageToBreadCrumbs,
})(UserContactInfoNew);
