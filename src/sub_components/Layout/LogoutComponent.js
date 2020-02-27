import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AvatarApi } from 'services/avatar';
import { UserProfileApi } from 'services/userProfile';
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

	render() {
		const { auth_status } = this.props;
		return (
			<div className='logout-wrapper'>
				<div className='avatar'>
					<img src={this.avatarApi.getUserAvatar(auth_status)} />
				</div>
				<div className='name body10'>{this.getUserName(auth_status)}</div>
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
