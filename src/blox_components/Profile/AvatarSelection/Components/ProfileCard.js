import React from 'react';

const ProfileCard = ({ img, user }) => {
	return (
		<div className='profile-card'>
			<div className='wrapper'>
				<div className='image'>
					<img src={img} alt='profile card' />
				</div>
				<div className='name'>{user}</div>
			</div>
		</div>
	);
};

export default ProfileCard;
