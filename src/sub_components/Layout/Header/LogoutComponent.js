import React, { Component } from 'react';
import { connect } from 'react-redux';

import { AvatarApi } from 'services/avatar';
import { UserProfileApi } from 'services/userProfile';
import { UserApi } from 'services/user';
import BloxButton from 'sub_components/Common/BloxButton';
import { logoutUser } from 'actions/auth';

class LogoutComponent extends Component {
	constructor(props) {
		super(props);

		this.avatarApi = new AvatarApi();
		this.userProfileApi = new UserProfileApi();
		this.state = {
			currentModule: null,
		};
	}

	getUserName = user => {
		const username = this.userProfileApi.getFirstAndLastName(user);

		if (username.length >= 16) {
			return username.slice(0, 16) + '...';
		} else {
			return username;
		}
	};
	setExpandedClass = () => {
		const header = document.querySelector('.name');
		header.classList.add('blue-animation');
	};

	removeExpandedClass = () => {
		const header = document.querySelector('.name');
		header.classList.remove('blue-animation');
	};

	logoutUser = () => {
		const { logoutUser } = this.props;
		const logoutButton = document.querySelector('.blox-button.logout');

		if (logoutButton) {
			logoutButton.classList.add(this.props.module);
			logoutButton.classList.add('trigger-animation-swipe');
		}

		logoutUser();
	};

	render() {
		const { auth_status } = this.props;
		return (
			<div
				className='logout-component'
				onMouseOver={this.setExpandedClass}
				onMouseOut={this.removeExpandedClass}
			>
				<div className='avatar'>
					<img src={this.avatarApi.getUserAvatar(auth_status)} />
				</div>
				<div className='name header10'>{this.getUserName(auth_status)}</div>
				<div className='hover-wrapper'>
					<div className='avatar'>
						<img src={this.avatarApi.getUserAvatar(auth_status)} />
					</div>
					<div className='name header11'>{this.getUserName(auth_status)}</div>
					<div className='logout-button '>
						<BloxButton
							title='LOGOUT'
							customClass='blox-button logout'
							enabled={true}
							onClick={this.logoutUser}
						/>
					</div>
				</div>
			</div>
		);
	}
}
function mapStateToProps(state) {
	return {
		auth_status: state.auth_status,
	};
}

export default connect(
	mapStateToProps,
	{ logoutUser },
)(LogoutComponent);
