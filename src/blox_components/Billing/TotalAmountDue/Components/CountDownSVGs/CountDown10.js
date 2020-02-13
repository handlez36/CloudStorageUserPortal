import React, { Component } from 'react';

class CountDown10 extends Component {
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
            .cls-1{fill:#7c7a7c}.cls-2{fill:#3e3e3e}.cls-3{fill:#b5d334}.cls-4{fill:#949300}.cls-5{filter:url(#Path_1840)}.cls-6{filter:url(#Path_1838)}.cls-7{filter:url(#Path_1836)}.cls-8{filter:url(#Path_1835)}
        </style> */}
					<filter
						id='Path_1835'
						width='63.199'
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
						id='Path_1836'
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
						id='Path_1838'
						width='35.449'
						height='38.413'
						x='21.785'
						y='9.256'
						filterUnits='userSpaceOnUse'
					>
						<feOffset dx='2' dy='2' />
						<feGaussianBlur result='blur-3' stdDeviation='2' />
						<feFlood flood-opacity='.451' />
						<feComposite in2='blur-3' operator='in' />
						<feComposite in='SourceGraphic' />
					</filter>
					<filter
						id='Path_1840'
						width='23.427'
						height='38.468'
						x='2.803'
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
				<g id='countdown-billing-10' transform='translate(-199.072 -63.84)'>
					<g
						id='countdown-billing-10-2'
						data-name='countdown-billing-10'
						transform='translate(196.359 62)'
					>
						<g id='Countdown_Boards' data-name='Countdown Boards'>
							<g class='cls-8' transform='translate(2.71 1.84)'>
								<path
									id='Path_1835-2'
									d='M63.2 67.09v34.53a4.139 4.139 0 0 1-4.139 4.139H10.114A4.145 4.145 0 0 1 6 101.62V67.09z'
									class='cls-1'
									data-name='Path 1835'
									transform='translate(-5 -27.42)'
								/>
							</g>
							<g class='cls-7' transform='translate(2.71 1.84)'>
								<path
									id='Path_1836-2'
									d='M59.06 4.59H10.114A4.139 4.139 0 0 0 6 8.729v30.663h4.64v3.867h47.95v-3.867h4.64V8.729a4.133 4.133 0 0 0-4.17-4.139z'
									class='cls-2'
									data-name='Path 1836'
									transform='translate(-5 -3.59)'
								/>
							</g>
						</g>
						<path
							id='Path_1837'
							d='M64.6 75.783a3.459 3.459 0 0 1-3.5 3.626h-6.573a3.446 3.446 0 0 1-3.477-3.626v-8.662H46.1V76.6a7.344 7.344 0 0 0 7.363 7.313h8.662a7.295 7.295 0 0 0 7.424-7.313v-9.51H64.6z'
							class='cls-3'
							data-name='Path 1837'
							transform='translate(-17.578 -25.581)'
						/>
						<g class='cls-6' transform='translate(2.71 1.84)'>
							<path
								id='Path_1838-2'
								d='M62.109 24.4h-8.662a7.363 7.363 0 0 0-7.387 7.424v18.988h4.95V32.6a3.57 3.57 0 0 1 3.477-3.712h6.6a3.6 3.6 0 0 1 3.472 3.712v18.212h4.95V31.793a7.319 7.319 0 0 0-7.4-7.394z'
								class='cls-4'
								data-name='Path 1838'
								transform='translate(-20.27 -11.14)'
							/>
						</g>
						<path
							id='Path_1839'
							d='M22.1 79.031h-5.87v4.739h16.464v-4.739h-5.562V67.09H22.1z'
							class='cls-3'
							data-name='Path 1839'
							transform='translate(-6.188 -25.581)'
						/>
						<g class='cls-5' transform='translate(2.71 1.84)'>
							<path
								id='Path_1840-2'
								d='M24.852 24.31l-9.472 9.243 2.629 3.081 3.762-3.756v17.9h5.036V24.31z'
								class='cls-4'
								data-name='Path 1840'
								transform='translate(-8.58 -11.11)'
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

export default CountDown10;
