import React from 'react';

import LocationIcon from './../../containers/Storage/Components/LocationIcon';

const locations = ['ATL', 'BHM', 'CHA', 'HSV'];

const LocationBar = ({ data }) => {
	console.log('Data: ', data);
	return (
		<div className='location-bar'>
			{data &&
				data.map(loc => (
					<LocationIcon
						location={loc.location}
						disabled={!locations.includes(loc.location)}
						showTopLabel={false}
						showBottomLabel
					/>
				))}
		</div>
	);
};

export default LocationBar;
