import React from 'react';
import { string, number } from 'prop-types';

const CircleIndicator = ({
	strokeColor,
	strokeWidth,
	textColor,
	text,
	index,
	type,
	name,
	needDecimalPlace,
}) => {
	if (text && needDecimalPlace) {
		text = text.toFixed(1);
	}
	return (
		<svg id={index} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80.99 80.99'>
			<circle
				className={`indicator indicator-${index} ${name || ''}`}
				cx='50%'
				cy='50%'
				r='35'
				stroke={strokeColor}
				fill='transparent'
				strokeWidth={strokeWidth ? strokeWidth : 6}
			/>
			<text
				className={`percentage percentage-${index}`}
				x='50%'
				y='46%'
				textAnchor='middle'
				fill={textColor}
				strokeWidth='2px'
				dy='.3em'
				fontSize='18'
			>
				{text}
			</text>
			<text
				className={`type type-${index}`}
				x='50%'
				y='71%'
				textAnchor='middle'
				fill={textColor}
				strokeWidth='2px'
				dy='.3em'
				fontSize='18'
			>
				{type}
			</text>
		</svg>
	);
};

CircleIndicator.propType = {
	strokeColor: string,
	textColor: string,
	text: string,
	dashoffset: number,
	index: number.isRequired,
};

CircleIndicator.defaultProps = {
	strokeColor: '#b4d334',
	textColor: 'white',
	text: '',
	dashoffset: 220,
};

export default CircleIndicator;
