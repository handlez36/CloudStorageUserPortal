import React, { Component } from 'react';
import { connect } from 'react-redux';
import capitalize from 'lodash/capitalize';

import Card from 'sub_components/Common/BloxCard';
import { AvatarApi } from 'services/avatar';
import { PROFILE_OVERVIEW_CARDS as CARDS } from 'utils/ProfileConstants';

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

	getDetailContent = user => {
		const attributes = {
			email: 'Email',
			phone_number: 'Work',
			mobile_number: 'Mobile',
			fullAddress: 'Address',
		};
		const {
			contactDetails,
			contactDetails: { address, city, state, zipcode, email, phone_number, mobile_number } = {},
		} = user;
		const fullAddress = (
			<div>
				<div className='address-line1'>{address}</div>
				<div className='address-line2'>{`${city}, ${state} ${zipcode}`}</div>
			</div>
		);
		const keys = Object.keys(attributes);

		return (
			<div className='detail-content'>
				{contactDetails &&
					keys.map(key => {
						return (
							<div key={`key-${attributes[key]}`} className='content-row'>
								<div className='label profile-card-label'>{attributes[key]}</div>
								<div className='value profile-card-field'>
									{key !== 'fullAddress' ? contactDetails[key] : fullAddress}
								</div>
							</div>
						);
					})}
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
		const { expanded, expandCard, auth_status: { user } = {}, history } = this.props;
		const { profileId } = this.state;
		const image = profileId ? new AvatarApi().getRectangleAvatars(profileId) : '';

		return (
			<div className='my-profile'>
				<Card
					type={CARDS.MY_PROFILE}
					image={image}
					summary={this.getSummaryContent(user)}
					detail={this.getDetailContent(user)}
					isExpanded={expanded}
					expandCardCallback={expandCard}
					history={history}
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

export default connect(mapStateToProps, null)(MyProfile);
