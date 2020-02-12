import React, { Component } from 'react';

class PrimaryColumnSide extends Component {
	render() {
		const { navHeight, width, uniqueKey, side, percentage } = this.props;
		let translate = 529 - navHeight;
		translate = translate + 1055.685;
		translate = `translate(-9.442 -${translate})`;
		//console.log('TRANSLATE', key);
		// console.log(translate);
		// console.log('SIDEEEEE', side);
		console.log('');
		return (
			<svg
				xmlns='http://www.w3.org/2000/svg'
				width={width}
				height={navHeight}
				viewBox={`0 0 ${width} ${navHeight}`}
				//preserveAspectRatio='none'
			>
				{side === 'right' && (
					<defs>
						<linearGradient
							key='4'
							id='linear-gradient-right-primary'
							x1='0'
							x2='1'
							y1='0'
							gradientUnits='objectBoundingBox'
							gradientTransform='rotate(80)'
						>
							<stop offset='0.5' stop-color='#EFEEED' />
							<stop offset={percentage ? percentage : '0.75'} stop-color='#CFD2D3' />
							<stop offset='1' stop-color='#A2A9AD' />
						</linearGradient>
					</defs>
				)}
				{side === 'left' && (
					<defs>
						<linearGradient
							key='3'
							id='linear-gradient-left-primary'
							x1='0'
							x2='1'
							y1='0'
							gradientUnits='objectBoundingBox'
							gradientTransform='rotate(80)'
						>
							<stop offset='0' stop-color='#fff' />
							<stop offset={percentage ? percentage : '0.75'} stop-color='#dfe1e1' />
							<stop offset='1' stop-color='#c1c5c8' />
						</linearGradient>
					</defs>
				)}

				<g transform='translate(-.086 -81)'>
					<g transform='translate(.086 81)'>
						<path
							d='M113.452 1577.693l-.01-441.008-104-81 .01 441.008z'
							class={`cls-1-${uniqueKey}`}
							transform={translate}
						/>
					</g>
				</g>
			</svg>
		);
	}
}

export default PrimaryColumnSide;
