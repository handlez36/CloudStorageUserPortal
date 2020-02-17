import React from 'react';
import { string, number } from 'prop-types';

import { RESOLUTIONS } from 'services/config';

const POINT_ONE_Y_COORD = 230.587;
const BAR_LENGTH = 161.527;
const SLOPE = 22.7;

const calculatePercentage = (size, sizeArray) => {
	if (!size) {
		return 0;
	}

	const total = sizeArray[0];
	const percent = ((size / total) * 100) / 1;
	return percent;
};

const UsageBar = ({ size, sizeArray, sizeType, location, breakpoint }) => {
	if (!sizeArray) {
		return <div>Loading...</div>;
	}

	const percentage = calculatePercentage(size, sizeArray);
	const usageHeight = POINT_ONE_Y_COORD - BAR_LENGTH * ((1 / 100) * percentage);
	const usageLeftAnchor = usageHeight + SLOPE;

	const hasStats = !!size;
	const barLabel = size && breakpoint !== RESOLUTIONS.LOW ? `${size} ${sizeType}` : '';

	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			// width='153.086'
			// height='249.307'
			// viewBox='0 0 153.086 249.307'
			width='120'
			height='249.307'
			viewBox='0 0 120 249.307'
			className={`usage-bar ${location.toLowerCase()} ${!hasStats ? 'no-stats' : ''}`}
		>
			<g id='building_bar_graph'>
				<path
					id='Shadow'
					d='M23503.73 1569.64l38.209-22.635 77.773 59.995h-68.041z'
					class='cls-1'
					transform='translate(-23466.627 -1357.693)'
				/>
				<path
					id='Top'
					d='M121.863 84.712L86.31 56.92 46.59 79.63l37.11 28.113z'
					class='cls-2'
					transform='translate(-46.59 -56.92)'
				/>
				<path
					id='Left'
					d='M83.7 94.953L46.59 66.84v161.2l37.11 28.109z'
					class='cls-3'
					transform='translate(-46.59 -44.13)'
				/>
				<path
					id='Right'
					d='M101.01 230.587V69.06L62.8 92.091v161.194z'
					class='cls-4'
					transform='translate(-25.692 -41.268)'
				/>
				<path
					id='UsageFill'
					// d='M 101.009 232.23 V 100.115L62.8 123.146v131.785z'
					// d={`M 101.009 232.23 V ${usageHeight} L 62.8 ${usageLeftAnchor} v 131.785z`}
					d={`M 101.009 232.23 V ${usageHeight} L 62.8 ${usageLeftAnchor} V 253.285 z`}
					class='usage-side'
					transform='translate(-25.692 -42.912)'
				/>
				<text
					x='42'
					y={POINT_ONE_Y_COORD - BAR_LENGTH}
					class='small label'
					transform='translate(-25.692 -41.268)'
				>
					{barLabel}
				</text>
				{/* <text id='_250_TB' class='cls-6' data-name='250 TB' transform='translate(23.844 30.428)'>
					<tspan x='0' y='0'>
						250 TB
					</tspan>
				</text> */}
			</g>
		</svg>
	);
};

UsageBar.propTypes = {
	percentage: number,
	color: string,
};

UsageBar.defaultProps = {
	percentage: 0,
	color: 'red',
};

export default UsageBar;
