// import React, { Component } from 'react';
// import { connect } from 'react-redux';

// import PortalMessage from '../../../components/Common/PortalMessage';
// import { PROFILE_AVATAR_MESSAGE_TEXT, MENU } from '../ProfileConstants';
// import { AvatarApi } from './../../../services/avatar';
// import { ProfileCard } from '../../../components/Common/ProfileCard';
// import { UserProfileApi } from '../../../services/userProfile';
// import DisplayAvatar from '../../../components/Common/DisplayAvatar';
// import { updateUserAvatar } from './../../../actions/user';
// import { updatePage } from '../../../actions/siteTracking';
// import { SITE_PAGES } from '../../../components/Common/CommonConstants';

// class AvatarPage extends Component {
// 	constructor(props) {
// 		super(props);

// 		this.avatarApi = new AvatarApi();
// 		this.userProfileApi = new UserProfileApi();
// 		this.state = {
// 			currentAvatar: this.avatarApi.getUserAvatar(this.props.auth_status),
// 		};
// 	}

// 	getUserName() {
// 		return this.props.auth_status.user
// 			? this.userProfileApi.getFirstName(this.props.auth_status)
// 			: 'NO NAME';
// 	}

// 	resetPage = () => {
// 		this.props.resetPage();
// 	};

// 	updateSelectedCheckmark(newSelectedAvatar) {
// 		const currentSelectedAvatar = document.querySelector('.selected');

// 		newSelectedAvatar.classList.add('selected');

// 		if (currentSelectedAvatar) {
// 			currentSelectedAvatar.classList.remove('selected');
// 		}
// 	}

// 	onClick = id => event => {
// 		const newSelectedAvatar = event.target.parentNode;
// 		this.updateSelectedCheckmark(newSelectedAvatar);

// 		if (this.props.auth_status.user.profileImage !== id) {
// 			const currentAvatar = this.avatarApi.get(id);
// 			this.setState({ currentAvatar });

// 			this.updateUserProfile(id);
// 		}
// 	};

// 	updateUserProfile = id => {
// 		this.props.updateUserAvatar(id);
// 	};

// 	componentDidMount() {
// 		const { updatePage } = this.props;
// 		updatePage(SITE_PAGES.PROFILE[MENU.AVATAR]);
// 	}

// 	render() {
// 		return (
// 			<div className='avatar-page outer-wrapper'>
// 				<PortalMessage
// 					start={PROFILE_AVATAR_MESSAGE_TEXT.START}
// 					content={PROFILE_AVATAR_MESSAGE_TEXT.CONTENT}
// 				/>
// 				<div className='current-avatar-section'>
// 					<ProfileCard img={this.state.currentAvatar} user={this.getUserName()} />
// 				</div>
// 				<div className='avatar-selection-section'>
// 					<DisplayAvatar onClick={this.onClick} />
// 				</div>
// 			</div>
// 		);
// 	}
// }

// function mapStateToProps(state) {
// 	return {
// 		auth_status: state.auth_status,
// 	};
// }

// export default connect(
// 	mapStateToProps,
// 	{ updateUserAvatar, updatePage },
// )(AvatarPage);
