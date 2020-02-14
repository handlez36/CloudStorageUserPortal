import React, { Component } from 'react';

class CountDown9 extends Component {
	render() {
		const { text } = this.props;

		return (
			<svg
				xmlns='http://www.w3.org/2000/svg'
				width='63.23'
				height='83.338'
				viewBox='0 0 63.23 83.338'
			>
				<defs>
					{/* <style>
            .cls-1{fill:#7c7a7c}.cls-2{fill:#3e3e3e}.cls-3{fill:#b5d334}.cls-4{fill:#949300}.cls-5{filter:url(#Path_1834)}.cls-6{filter:url(#Path_1832)}.cls-7{filter:url(#Path_1831)}
        </style> */}
					<filter
						id='Path_1831'
						width='63.23'
						height='44.669'
						x='0'
						y='38.669'
						filterUnits='userSpaceOnUse'
					>
						<feOffset dx='2' dy='2' />
						<feGaussianBlur result='blur' stdDeviation='1' />
						<feFlood flood-opacity='.302' />
						<feComposite in2='blur' operator='in' />
						<feComposite in='SourceGraphic' />
					</filter>
					<filter
						id='Path_1832'
						width='63.23'
						height='44.669'
						x='0'
						y='0'
						filterUnits='userSpaceOnUse'
					>
						<feOffset dx='2' dy='2' />
						<feGaussianBlur result='blur-2' stdDeviation='1' />
						<feFlood flood-opacity='.302' />
						<feComposite in2='blur-2' operator='in' />
						<feComposite in='SourceGraphic' />
					</filter>
					<filter
						id='Path_1834'
						width='32.549'
						height='38.542'
						x='15.419'
						y='9.139'
						filterUnits='userSpaceOnUse'
					>
						<feOffset dx='2' dy='2' />
						<feGaussianBlur result='blur-3' stdDeviation='2' />
						<feFlood flood-opacity='.451' />
						<feComposite in2='blur-3' operator='in' />
						<feComposite in='SourceGraphic' />
					</filter>
				</defs>
				<g id='countdown-billing-09' transform='translate(-198.713 -63.84)'>
					<g
						id='countdown-billing-09-2'
						data-name='countdown-billing-09'
						transform='translate(196.359 62)'
					>
						<g id='Countdown_Boards' data-name='Countdown Boards'>
							<g class='cls-7' transform='translate(2.35 1.84)'>
								<path
									id='Path_1831-2'
									d='M62.65 67.09v34.53a4.139 4.139 0 0 1-4.139 4.139H9.559a4.145 4.145 0 0 1-4.139-4.139V67.09z'
									class='cls-1'
									data-name='Path 1831'
									transform='translate(-4.42 -27.42)'
								/>
							</g>
							<g class='cls-6' transform='translate(2.35 1.84)'>
								<path
									id='Path_1832-2'
									d='M58.511 4.59H9.559A4.139 4.139 0 0 0 5.42 8.729v30.663h4.64v3.867h47.95v-3.867h4.64V8.729a4.133 4.133 0 0 0-4.139-4.139z'
									class='cls-2'
									data-name='Path 1832'
									transform='translate(-4.42 -3.59)'
								/>
							</g>
						</g>
						<path
							id='Path_1833'
							d='M50.8 75.462c0 2.073-1.33 3.768-3.322 3.768h-3.844a3.472 3.472 0 0 1-3.329-3.768v-3.843H35.43v4.8a7.2 7.2 0 0 0 7.165 7.424h5.989a7.288 7.288 0 0 0 7.245-7.424V67.14H50.8z'
							class='cls-3'
							data-name='Path 1833'
							transform='translate(-13.509 -25.6)'
						/>
						<g class='cls-5' transform='translate(2.35 1.84)'>
							<path
								id='Path_1834-2'
								d='M48.492 24.21h-6.137a7.2 7.2 0 0 0-7.165 7.468V43.13a7.138 7.138 0 0 0 7.165 7.394h4.585a5.2 5.2 0 0 0 3.767-1.624v1.856h5.03V31.678a7.307 7.307 0 0 0-7.245-7.468zm2.215 20.417a3.5 3.5 0 0 1-3.094 1.627h-4.07a3.469 3.469 0 0 1-3.4-3.712v-9.98a3.525 3.525 0 0 1 3.4-3.768h3.842a3.514 3.514 0 0 1 3.322 3.768z'
								class='cls-4'
								data-name='Path 1834'
								transform='translate(-15.77 -11.07)'
							/>
						</g>
						<text
							font-family='Bourgeois-MediumCondensed'
							fill='white'
							x='14'
							y='73'
							font-size='14px'
						>
							DAYS LEFT
						</text>
					</g>
				</g>
			</svg>
		);
	}
}

export default CountDown9;
