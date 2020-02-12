import React from 'react';

import map from 'lodash/map';
import { AvatarApi } from '../../services/avatar';

const DisplayAvatar = props => {
	const avatarApi = new AvatarApi();
	const avatars = avatarApi.getAll();

	return map(avatars, (avatar, index) => {
		return (
			<div
				key={index}
				className='avatar-selector'
				style={{ backgroundImage: avatar }}
				onClick={props.onClick(index)}
			>
				<img src={avatar} alt='avatar' />
			</div>
		);
	});
};

export default DisplayAvatar;
