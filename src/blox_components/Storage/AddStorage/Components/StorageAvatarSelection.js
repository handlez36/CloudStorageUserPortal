import React from 'react';

import AvatarGrid from '../Components/AvatarGrid';

const StorageAvatarSelection = ({ data, onSelect }) => {
	const selected = data.avatar;

	return (
		<div className='avatar-selection-stage'>
			<AvatarGrid onSelect={onSelect} selected={selected} />
		</div>
	);
};

export default StorageAvatarSelection;
