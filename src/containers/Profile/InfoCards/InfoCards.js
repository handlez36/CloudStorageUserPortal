import React, { Component } from 'react';
import { connect } from 'react-redux';

import Card from './Card';
import { updatePage } from '../../../actions/siteTracking';
import { AvatarApi } from './../../../services/avatar';
const CDN_URL = process.env.REACT_APP_CDN_URL;
const companyImage = `${CDN_URL}profile/company-avatar.png`;

class InfoCards extends Component {
	constructor(props) {
		super(props);
		this.avatarApi = new AvatarApi();
		this.state = {
			topCardExpanded: false,
			bottomCardExpanded: false,
			Avatar: null,
		};
	}
	componentDidMount() {
		const id = this.props.auth_status.user.userProfile.profileImage;
		this.getAvatarImage(id);
	}
	getAvatarImage = id => {
		const Avatar = this.avatarApi.getRectangleAvatars(id);
		this.setState({ Avatar });
	};

	expand = (position, action) => {
		if (position === 'top' && action === 'open') {
			this.setState({ topCardExpanded: !this.state.topCardExpanded, bottomCardExpanded: false });
		} else if (position === 'bottom' && action === 'open') {
			this.setState({ topCardExpanded: false, bottomCardExpanded: !this.state.bottomCardExpanded });
		} else {
			this.setState({ topCardExpanded: false, bottomCardExpanded: false });
		}
	};

	render() {
		const { topCardExpanded, bottomCardExpanded, Avatar } = this.state;

		return (
			<div className='cards-holder'>
				<div className={topCardExpanded ? 'top-card expanded' : 'top-card'}>
					<Card
						id='top'
						expanded={topCardExpanded}
						expandCallBack={this.expand}
						image={Avatar}
						profile={this.props.company_info}
						type='userProfile'
						user={this.props.auth_status.user}
						goToContactInfo={this.props.goToContactInfo}
						changeAvatar={this.getAvatarImage}
					/>
				</div>

				<div className={bottomCardExpanded ? 'bottom-card expanded' : 'bottom-card'}>
					<Card
						changeAvatar={this.getAvatarImage}
						image={companyImage}
						id='bottom'
						expandCallBack={this.expand}
						expanded={bottomCardExpanded}
						profile={this.props.company_info}
						user={this.props.auth_status.user}
						type='CompanyInfo'
					/>
				</div>
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
	{ updatePage },
)(InfoCards);
