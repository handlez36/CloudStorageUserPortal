import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { AvatarApi } from 'services/avatar';
import { UserProfileApi } from 'services/userProfile';
import { UserApi } from 'services/user';
import BloxButton from 'sub_components/Common/BloxButton';
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
		//const username = 'ASDASDSDASDASDASDSADSADASDASDASDAS';
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
		const logoutButton = document.querySelector('.blox-button.logout');
		if (logoutButton) {
			logoutButton.classList.add(this.props.module);
			logoutButton.classList.add('trigger-animation-swipe');
		}
		UserApi.logoutUser()
			.then(response => {
				const validResponse = response.status === 200 && response.data && !response.data.error;
				if (validResponse) {
					this.props.history.push('/login');
				}
			})
			.catch(error => this.setState({ error }));

		setTimeout(() => {
			this.props.history.push('/login');
		}, 3000);
	};

	render() {
		const { auth_status } = this.props;
		return (
			<div
				className='logout-wrapper'
				onMouseOver={this.setExpandedClass}
				onMouseOut={this.removeExpandedClass}
			>
				<div className='avatar'>
					<img src={this.avatarApi.getUserAvatar(auth_status)} />
				</div>
				<div className='name header10'>{this.getUserName(auth_status)}</div>
				<div className='logout-dropdown'></div>
				<div className='logout-button fade-in'>
					<BloxButton
						title='LOGOUT'
						customClass='blox-button logout'
						enabled={true}
						onClick={this.logoutUser}
					/>
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

export default connect(mapStateToProps, null)(LogoutComponent);