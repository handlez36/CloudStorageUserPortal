import React from 'react';
import { object } from 'prop-types';

const MapLabel = ({ location }) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='64.793'
			height='32.535'
			viewBox='0 0 64.793 32.535'
		>
			<g id='Chattanooga' transform='translate(-484.999 -472)'>
				<path
					id='BOX'
					fill={location.colorFill1}
					d='M0 0h64.792v25H0z'
					class='cls-1'
					transform='translate(485 472)'
				/>
				<path
					id='TIP'
					fill={location.colorFill2}
					d='M11585.474 5209.5h14v7.535z'
					class='cls-2'
					transform='translate(-11100.475 -4712.5)'
				/>
			</g>
			<text
				x={location.x}
				y='15'
				font-family='Bourgeois-BoldCondensed'
				font-size='11px'
				letter-spacing='0.7px'
				fill={location.fontColor ? location.fontColor : '#57396b'}
			>
				{location.location}
			</text>
		</svg>
	);
};

MapLabel.propType = {
	location: object,
};

export default MapLabel;
