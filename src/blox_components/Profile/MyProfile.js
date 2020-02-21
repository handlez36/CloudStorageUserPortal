import React, { Component } from 'react';
import { connect } from 'react-redux';
import capitalize from 'lodash/capitalize';

import Card from 'sub_components/Common/BloxCard';
import { AvatarApi } from 'services/avatar';

class MyProfile extends Component {
	state = {
		profileId: null,
	};

	getSummaryContent = user => {
		const { firstname = '', lastname = '' } = user;

		return (
			<div className='summary-content'>
				<div className='name heading70'>{`${firstname.toUpperCase()} ${capitalize(lastname)}`}</div>
			</div>
		);
	};

	componentDidMount() {
		const {
			user: {
				userProfile: { profileImage },
			},
		} = this.props.auth_status;
		this.setState({ profileId: profileImage });
	}

	render() {
		const { auth_status: { user } = {} } = this.props;
		const { profileId } = this.state;
		const image = profileId ? new AvatarApi().getRectangleAvatars(profileId) : '';
		const SummaryContent = <SummaryContent user={user} />;

		return (
			<div className='my-profile'>
				<Card image={image} summary={this.getSummaryContent(user)} />
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
	null,
)(MyProfile);
