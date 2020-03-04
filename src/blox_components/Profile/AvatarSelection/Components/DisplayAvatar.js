import React from 'react';

import map from 'lodash/map';
import { AvatarApi } from 'services/avatar';

const avatars = new AvatarApi().getAll();

const DisplayAvatar = ({ onClick }) => {
	return map(avatars, (avatar, index) => {
		return (
			<div
				key={avatar}
				className='avatar-selector'
				style={{ backgroundImage: avatar }}
				onClick={onClick(index)}
			>
				<img src={avatar} alt='avatar' />
			</div>
		);
	});
};

export default DisplayAvatar;
