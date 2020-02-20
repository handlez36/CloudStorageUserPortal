import React from 'react';

import LargeCard from '../../sub_components/Common/LargeCard';
import Button from '../../sub_components/Common/BloxButton';
import RemoteHandsImg from '../../assets/remote_hands_image.svg';
import GuestAccessImg from '../../assets/guest_access_image.svg';

// const CDN_URL = process.env.REACT_APP_CDN_URL;
// const remoteHands = `${CDN_URL}common/remote-hands-icon-test.svg`;
// const guestAccess = `${CDN_URL}common/guest-access-icon.svg`;
const REQUEST_DETAILS = {
	REMOTE_HANDS: {
		title: 'REMOTE Hands',
		description: 'Need us to do something for you in the Data Center?',
		image: RemoteHandsImg,
		className: 'remote-hands',
	},
	GUEST_ACCESS: {
		title: 'GUEST Access',
		description: 'Let us know who’s coming to work on your equipment.',
		image: GuestAccessImg,
		className: 'guest-access',
	},
};

const ServiceRequest = ({ type, breakpoint }) => {
	const { title, description, image, className } = REQUEST_DETAILS[type];
	const SubmitButton = (
		<Button title='REQUEST SERVICE' customClass='support-button' onClick={() => {}} enabled />
	);

	return (
		<div className='advanced-request'>
			<LargeCard
				title={title}
				button={SubmitButton}
				description={description}
				image={image}
				customClass={className}
				onClick={() => {}}
			/>
		</div>
	);
};

export default ServiceRequest;
