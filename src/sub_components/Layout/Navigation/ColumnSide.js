import React, { Component } from 'react';

class ColumnSide extends Component {
	render() {
		const { navHeight, width, side, percentage } = this.props;
		let translate = 529 - navHeight;
		translate = translate + 1055.685;
		translate = `translate(-9.442 -${translate})`;
		// console.log('TRANSLATE');
		// console.log(translate);
		// console.log('SIDEEEEE', side);
		// console.log('');
		return (
			<svg
				xmlns='http://www.w3.org/2000/svg'
				width={width}
				height={navHeight}
				//viewBox={`0 0 ${width} ${navHeight}`}
				//preserveAspectRatio='none'
			>
				{side === 'right' && (
					<defs>
						<linearGradient
							key='4'
							id='linear-gradient-right'
							x1='0'
							x2='1'
							y1='0'
							gradientUnits='objectBoundingBox'
							gradientTransform='rotate(80)'
						>
							<stop offset='0' stop-color='#DFE1E1' />
							<stop offset={percentage ? percentage : '0.75'} stop-color='#A2A9AD' />
							<stop offset='1' stop-color='#5B6670' />
						</linearGradient>
					</defs>
				)}
				{side === 'left' && (
					<defs>
						<linearGradient
							key='3'
							id='linear-gradient-left'
							x1='0'
							x2='1'
							y1='0'
							gradientUnits='objectBoundingBox'
							gradientTransform='rotate(80)'
						>
							<stop offset='0.25' stop-color='#fff' />
							<stop offset={percentage ? percentage : '0.75'} stop-color='#cfd2d3' />
							<stop offset='1' stop-color='#5B6670' />
						</linearGradient>
					</defs>
				)}

				<g transform='translate(-.086 -81)'>
					<g transform='translate(.086 81)'>
						<path
							d='M113.452 1577.693l-.01-441.008-104-81 .01 441.008z'
							class={`cls-1-${side}`}
							transform={translate}
						/>
					</g>
				</g>
			</svg>
		);
	}
}

export default ColumnSide;
