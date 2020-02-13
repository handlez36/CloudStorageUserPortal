import React from 'react';

const LocationLabel = ({ location }) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='72.381'
			height='47.237'
			viewBox='0 0 72.381 47.237'
		>
			<defs>
				<filter
					id='Bubble-Dark_Emerald'
					width='72.381'
					height='47.237'
					x='0'
					y='0'
					filterUnits='userSpaceOnUse'
				>
					<feOffset dx='2' dy='2' />
					<feGaussianBlur result='blur' stdDeviation='1.5' />
					<feFlood flood-opacity='.251' />
					<feComposite in2='blur' operator='in' />
					<feComposite in='SourceGraphic' />
				</filter>
			</defs>
			<g id='Tooltip-Location-Atlanta' transform='translate(2.5 -1.5)'>
				<g class='cls-4' transform='translate(-2.5 1.5)'>
					<path
						id='Bubble-Dark_Emerald-2'
						d='M4 4h63.381v32H15.815L4 42.237V4z'
						class='cls-1'
						data-name='Bubble-Dark Emerald'
						transform='translate(-1.5 -1.5)'
					/>
				</g>
				<path
					id='Bubble-Black15_'
					d='M4 4h63.381v32H15.815L4 42.237V4z'
					class='cls-2'
					data-name='Bubble-Black15%'
					transform='translate(-4)'
				/>
				<text class='location-name' transform='translate(-.5 7.773)'>
					<tspan x='6.31' y='16'>
						{location}
					</tspan>
				</text>
			</g>
		</svg>
	);
};

// MapLabel.propType = {
// 	location: object,
// };

export default LocationLabel;
