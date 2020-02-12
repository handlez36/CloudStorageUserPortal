import React from 'react';

const TicketNumber = ({ number }) => {
	return (
		<svg height='100%' viewBox='0 0 209.208 107.359'>
			<defs>
				<linearGradient
					id='linear-gradient'
					x1='.301'
					x2='.916'
					y1='-.058'
					y2='.959'
					gradientUnits='objectBoundingBox'
				>
					<stop offset='0' stop-color='#8f3bd9' />
					<stop offset='1' stop-color='#592487' />
				</linearGradient>
				<filter
					id='Path_2064'
					width='209.208'
					height='107.359'
					x='0'
					y='0'
					filterUnits='userSpaceOnUse'
					viewBox='0 0 209.208 107.359'
				>
					<feOffset dx='1' dy='1' />
					<feGaussianBlur result='blur' stdDeviation='3' />
					<feFlood flood-opacity='.259' />
					<feComposite in2='blur' operator='in' />
					<feComposite in='SourceGraphic' />
				</filter>
			</defs>
			<g id='images-ticket' transform='translate(-490.769 -313.82)'>
				<g class='cls-3' transform='translate(490.77 313.82)'>
					<path
						id='Path_2064-2'
						d='M7.607 0h165.511a31.676 31.676 0 0 0 5.513 9.049 22.711 22.711 0 0 0 8.063 5.133v60.3a33 33 0 0 0-8.063 6.136 35.167 35.167 0 0 0-5.513 8.738H7.607a23.541 23.541 0 0 0-4.13-8.381 32.238 32.238 0 0 0-7.99-6.493v-60.3a21.622 21.622 0 0 0 7.99-5.335A22.763 22.763 0 0 0 7.607 0z'
						class='cls-1'
						data-name='Path 2064'
						transform='translate(12.51 8)'
					/>
				</g>
				<path
					id='Path_2068'
					d='M-6.393 0H12.4l104.61 89.359H-6.393a23.541 23.541 0 0 0-4.13-8.381 32.238 32.238 0 0 0-7.99-6.493v-60.3a21.622 21.622 0 0 0 7.99-5.335A22.763 22.763 0 0 0-6.393 0z'
					class='cls-2'
					data-name='Path 2068'
					transform='translate(517.281 321.82)'
				/>
			</g>
			<text
				x='50%'
				y='60%'
				height='100%'
				text-anchor='middle'
				//alignment-baseline='middle'
				font-family='ProximaNova-Light'
				letter-spacing='0.7px'
				fill={'#efeeed'}
			>
				{`#${number}`}
			</text>
		</svg>
	);
};

// MapLabel.propType = {
// 	location: object,
// };

export default TicketNumber;
