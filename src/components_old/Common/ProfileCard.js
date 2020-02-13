import React from 'react';

export const ProfileCard = props => {
	return (
		<div className='profile-card'>
			<div className='wrapper'>
				<div className='image'>
					<img src={props.img} alt='profile card' />
				</div>
				<div className='name'>{props.user}</div>
			</div>
		</div>
	);
};
