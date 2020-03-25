import React from 'react';

import LocationIcon from 'sub_components/Storage/LocationIcon';

const LOCATIONS = ['Atlanta', 'Birmingham', 'Huntsville', 'Chattanooga'];

const StorageSecondaryLocationSelection = ({ data, onSelect }) => {
	const selected = data.secondary;
	const { primary } = data;

	const locations = LOCATIONS.filter(location => location !== primary);

	return (
		<div className='primary-location-selection'>
			{locations &&
				locations.map(loc => (
					<div onClick={() => onSelect('secondary', { data: loc }, true)}>
						<LocationIcon location={loc} selected={selected === loc} formStyle={true} />
					</div>
				))}
		</div>
	);
};

export default StorageSecondaryLocationSelection;
