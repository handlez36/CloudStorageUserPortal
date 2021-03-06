import { Component } from 'react';
import React from 'react';
import { AvatarApi } from '../../../services/avatar';
const CDN_URL = process.env.REACT_APP_CDN_URL;
const badge = `${CDN_URL}profile/icon-badge.svg`;

export default class PortalUserOverviewSelectedBlock extends Component {
	constructor(props) {
		super(props);
		this.avatarApi = new AvatarApi();
	}

	render() {
		let profileImage = 0;
		let firstName = '';
		if (this.props.user) {
			profileImage = this.props.user.userProfile
				? this.avatarApi.get(this.props.user.userProfile.profileImage, 'NORMAL')
				: this.avatarApi.getGenericAvatar();

			if (this.props.user.firstname !== undefined && this.props.user.firstname !== null) {
				firstName = this.props.user.firstname.substr(0, 1);
			}

			return (
				<div className={'portal-user-overview-selected-block'}>
					<div className={'name'}>
						{firstName} {this.props.user.lastname}
						<span className={'name-tip'} />
					</div>

					<div className={'image'}>
						<img src={profileImage} />
					</div>

					{this.props.user.badgeRequired ? (
						<div className={'badge'}>
							<img src={badge} />
						</div>
					) : null}
				</div>
			);
		} else {
			return <div />;
		}
	}
}
