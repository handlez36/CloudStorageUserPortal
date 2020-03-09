import React, { Component } from 'react';
import ToggleSwitch from 'components_old/Common/ToggleSwitch';
import { UserProfileApi } from 'services/userProfile';
import { AvatarApi } from 'services/avatar';
import { Utils } from 'services/utils';

export default class UserBlock extends Component {
	constructor(props) {
		super(props);

		this.avatarApi = new AvatarApi();
		this.userProfileApi = new UserProfileApi();
		this.timeout = null;
		this.state = {
			user: null,
			enabled: false,
		};
	}

	allowedToToggle = (userId, pending) => {
		const { currentUserId } = this.props;

		if (currentUserId) {
			return currentUserId !== userId && !pending;
		}
		return !pending;
	};

	resetToggle = enabled => {
		this.timeout = setTimeout(() => {
			this.setState(state => ({ ...state, enabled }));
		}, 1000);
	};

	onToggle = async (userId, pending) => {
		const { enabled } = this.state;
		this.setState(state => ({ ...state, enabled: !enabled }));

		if (!this.allowedToToggle(userId, pending)) {
			this.resetToggle(enabled);
			return;
		}

		try {
			const response = await this.userProfileApi.updatePortalUserActivation({
				userId,
				enabled: !enabled,
			});

			if (!Utils.isValidResponse(response)) {
				this.resetToggle(enabled);
			}
		} catch (e) {
			this.resetToggle(enabled);
		}
	};

	checkEnabledProp = () => {
		const { user } = this.props;
		const { enabled: existingEnabled } = this.state;

		if (user) {
			let enabled = null;
			try {
				enabled = JSON.parse(user.enabled);
			} catch (e) {
				enabled = user.enabled === 'true';
			}

			if (existingEnabled !== enabled) {
				this.setState({ user, enabled });
			}
		}
	};

	componentDidMount() {
		this.checkEnabledProp();
	}

	componentWillUnmount() {
		clearTimeout(this.timeout);
	}

	render() {
		const {
			user: { firstname = '', lastname = '', userProfile = {}, contactDetails = {}, pending } = {},
		} = this.props;
		const { enabled } = this.state;
		const profileImage =
			userProfile && !pending
				? this.avatarApi.get(userProfile.profileImage, 'NORMAL')
				: this.avatarApi.getGenericAvatar();

		return (
			<div className={`user-block ${!enabled ? 'disabled' : ''}`}>
				<div className='user-icon'>
					<img src={profileImage} />
				</div>
				<div className='user-details'>
					<div className='user-name'>{`${firstname} ${lastname}`}</div>
					<div className='user-email'>{contactDetails.email}</div>
				</div>
				<div className='toggle-switch'>
					{!pending && (
						<ToggleSwitch
							on={enabled || false}
							onToggle={() => this.onToggle(contactDetails.id, pending)}
						/>
					)}
				</div>
			</div>
		);
	}
}
