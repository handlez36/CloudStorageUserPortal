import React from 'react';
import { string, number } from 'prop-types';

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

const UsageBar = ({ size, sizeArray, sizeType, location }) => {
	if (!sizeArray) {
		return <div>Loading...</div>;
	}

	const percentage = calculatePercentage(size, sizeArray);
	const usageHeight = POINT_ONE_Y_COORD - BAR_LENGTH * ((1 / 100) * percentage);
	const usageLeftAnchor = usageHeight + SLOPE;

	const hasStats = !!size;
	const barLabel = size ? `${size} ${sizeType}` : '';

	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='113.027'
			// height='249.436'
			height='160'
			viewBox='0 0 113.027 249.436'
			// viewBox='0 0 113.027 230'
			className={`usage-bar ${location.toLowerCase()} ${!hasStats ? 'no-stats' : ''}`}
		>
			<g id='building_bar_graph'>
				<path
					id='Shadow'
					d='M 23504.031 1569.769 l 38.2 -22.834 l 75.715 60.612 h -67.2 z'
					class='cls-1'
					transform='translate(-23466.92 -1357.693)'
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
					d={`M 101.01 230.587 V ${usageHeight} L 62.8 ${usageLeftAnchor} V 253.285 z`}
					class={`usage-side`}
					transform='translate(-25.692 -41.268)'
				/>
				<text
					x='50'
					y={POINT_ONE_Y_COORD - BAR_LENGTH}
					class='small label'
					transform='translate(-25.692 -41.268)'
				>
					{barLabel}
				</text>
				{false && (
					<text
						x='103'
						y={usageHeight - 2}
						class='small usage'
						width='25'
						transform='translate(-25.692 -41.268)'
					>
						<tspan>Test</tspan>
						<tspan>MB</tspan>
						{/* {unitSize} */}
					</text>
				)}
				{false && (
					<path
						id='UsageLine'
						d={`M 101.01 ${usageHeight + 2} h ${30}`}
						class={`usage-line`}
						stroke-width={1}
						transform='translate(-25.692 -41.268)'
					/>
				)}
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
