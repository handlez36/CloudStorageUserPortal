import React from 'react';

import LocationIcon from '../Components/LocationIcon';

const StoragePrimaryLocationSelection = ({ data, onSelect }) => {
	const selected = data.primary;

	return (
		<div className='primary-location-selection'>
			<div onClick={() => onSelect('primary', { data: 'Atlanta' }, true)}>
				<LocationIcon location='Atlanta' selected={selected === 'Atlanta'} formStyle={true} />
			</div>
			<div onClick={() => onSelect('primary', { data: 'Huntsville' }, true)}>
				<LocationIcon location='Huntsville' selected={selected === 'Huntsville'} formStyle={true} />
			</div>
			<div onClick={() => onSelect('primary', { data: 'Chattanooga' }, true)}>
				<LocationIcon
					location='Chattanooga'
					selected={selected === 'Chattanooga'}
					formStyle={true}
				/>
			</div>
		</div>
	);
};

export default StoragePrimaryLocationSelection;
