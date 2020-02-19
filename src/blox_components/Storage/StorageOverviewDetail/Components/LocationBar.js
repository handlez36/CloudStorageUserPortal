import React from 'react';

import LocationIcon from '../../../../sub_components/Storage/LocationIcon';
import { RESOLUTIONS } from '../../../../services/config';

const locations = ['ATL', 'BHM', 'CHA', 'HSV'];

const LocationBar = ({ data, breakpoint }) => {
	console.log('Data: ', data);
	return (
		<div className='location-bar'>
			{data &&
				data.map(loc => (
					<LocationIcon
						data={data}
						location={loc.location}
						disabled={!locations.includes(loc.location)}
						breakpoint={breakpoint}
						showTopLabel={breakpoint === RESOLUTIONS.LOW}
						showBottomLabel={breakpoint !== RESOLUTIONS.LOW}
					/>
				))}
		</div>
	);
};

export default LocationBar;
