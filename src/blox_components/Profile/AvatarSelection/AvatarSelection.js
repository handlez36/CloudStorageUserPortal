import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { PROFILE_AVATAR_MESSAGE_TEXT } from 'utils/ProfileConstants';
import { AvatarApi } from 'services/avatar';
import { UserProfileApi } from 'services/userProfile';
import { updateUserAvatar } from 'actions/user';
import PortalMessage from 'sub_components/Common/PortalMessage';
import ProfileCard from './Components/ProfileCard';
import DisplayAvatar from './Components/DisplayAvatar';

class AvatarSelection extends Component {
	getUserName = () => {
		const { auth_status } = this.props;
		return auth_status.user ? new UserProfileApi().getFirstName(auth_status) : 'NO NAME';
	};

	handleAvatarSelect = id => event => {
		const { updateUserAvatar } = this.props;
		console.log('Id: ', id);
		updateUserAvatar(id);
	};

	render() {
		const { auth_status } = this.props;
		const currentAvatar = new AvatarApi().getUserAvatar(auth_status);

		return (
			<div className='avatar-selection'>
				<PortalMessage
					start={PROFILE_AVATAR_MESSAGE_TEXT.START}
					content={PROFILE_AVATAR_MESSAGE_TEXT.CONTENT}
				/>
				{currentAvatar && (
					<Fragment>
						<div className='current-avatar-section'>
							<ProfileCard img={currentAvatar} user={this.getUserName()} />
						</div>
						<div className='avatar-selection-section'>
							<DisplayAvatar onClick={this.handleAvatarSelect} />
						</div>
					</Fragment>
				)}
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
	{ updateUserAvatar },
)(AvatarSelection);
