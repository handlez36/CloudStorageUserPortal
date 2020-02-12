import React, { Component } from 'react';

class CountDown11 extends Component {
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
            .cls-1{fill:#7c7a7c}.cls-2{fill:#3e3e3e}.cls-3{fill:#b5d334}.cls-4{fill:#949300}.cls-5{filter:url(#Path_1846)}.cls-6{filter:url(#Path_1844)}.cls-7{filter:url(#Path_1842)}.cls-8{filter:url(#Path_1841)}
        </style> */}
					<filter
						id='Path_1841'
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
						id='Path_1842'
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
						id='Path_1844'
						width='23.427'
						height='38.468'
						x='6.231'
						y='9.201'
						filterUnits='userSpaceOnUse'
					>
						<feOffset dx='2' dy='2' />
						<feGaussianBlur result='blur-3' stdDeviation='2' />
						<feFlood flood-opacity='.451' />
						<feComposite in2='blur-3' operator='in' />
						<feComposite in='SourceGraphic' />
					</filter>
					<filter
						id='Path_1846'
						width='23.427'
						height='38.468'
						x='28.041'
						y='9.201'
						filterUnits='userSpaceOnUse'
					>
						<feOffset dx='2' dy='2' />
						<feGaussianBlur result='blur-4' stdDeviation='2' />
						<feFlood flood-opacity='.451' />
						<feComposite in2='blur-4' operator='in' />
						<feComposite in='SourceGraphic' />
					</filter>
				</defs>
				<g id='countdown-billing-11' transform='translate(-199.374 -63.84)'>
					<g id='CountdownTimer_11' transform='translate(197.014 62)'>
						<g id='Countdown_Boards' data-name='Countdown Boards'>
							<g class='cls-8' transform='translate(2.36 1.84)'>
								<path
									id='Path_1841-2'
									d='M62.66 67.09v34.53a4.139 4.139 0 0 1-4.139 4.139H9.569a4.145 4.145 0 0 1-4.139-4.139V67.09z'
									class='cls-1'
									data-name='Path 1841'
									transform='translate(-4.43 -27.42)'
								/>
							</g>
							<g class='cls-7' transform='translate(2.36 1.84)'>
								<path
									id='Path_1842-2'
									d='M58.521 4.59H9.569A4.139 4.139 0 0 0 5.43 8.729v30.663h4.64v3.867h47.95v-3.867h4.64V8.729a4.133 4.133 0 0 0-4.139-4.139z'
									class='cls-2'
									data-name='Path 1842'
									transform='translate(-4.43 -3.59)'
								/>
							</g>
						</g>
						<path
							id='Path_1843'
							d='M27.065 79.031H21.2v4.739h16.464v-4.739H32.1V67.09h-5.035z'
							class='cls-3'
							data-name='Path 1843'
							transform='translate(-8.083 -25.581)'
						/>
						<g class='cls-6' transform='translate(2.36 1.84)'>
							<path
								id='Path_1844-2'
								d='M29.822 24.31l-9.472 9.243 2.636 3.081 3.756-3.756v17.9h5.036V24.31z'
								class='cls-4'
								data-name='Path 1844'
								transform='translate(-10.12 -11.11)'
							/>
						</g>
						<path
							id='Path_1845'
							d='M62.315 79.031H56.45v4.739h16.464v-4.739h-5.562V67.09h-5.037z'
							class='cls-3'
							data-name='Path 1845'
							transform='translate(-21.524 -25.581)'
						/>
						<g class='cls-5' transform='translate(2.36 1.84)'>
							<path
								id='Path_1846-2'
								d='M65.072 24.31L55.6 33.553l2.629 3.081 3.762-3.756v17.9h5.036V24.31z'
								class='cls-4'
								data-name='Path 1846'
								transform='translate(-23.56 -11.11)'
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

export default CountDown11;
