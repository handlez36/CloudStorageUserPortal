import React, { Component } from 'react';

class CountDown14 extends Component {
	render() {
		const { text } = this.props;

		return (
			<svg
				xmlns='http://www.w3.org/2000/svg'
				width='63.095'
				height='83.155'
				viewBox='0 0 63.095 83.155'
			>
				<defs>
					{/* <style>
                    .cls-1{fill:#7c7a7c}.cls-2{fill:#3e3e3e}.cls-3{fill:#b5d334}.cls-4{fill:#949300}.cls-5{filter:url(#Path_1972)}.cls-6{filter:url(#Path_1970)}.cls-7{filter:url(#Path_1968)}.cls-8{filter:url(#Path_1967)}
                </style> */}
					<filter
						id='Path_1967'
						width='63.095'
						height='44.578'
						x='0'
						y='38.578'
						filterUnits='userSpaceOnUse'
					>
						<feOffset dx='2' dy='2' />
						<feGaussianBlur result='blur' stdDeviation='1' />
						<feFlood flood-opacity='.302' />
						<feComposite in2='blur' operator='in' />
						<feComposite in='SourceGraphic' />
					</filter>
					<filter
						id='Path_1968'
						width='63.095'
						height='44.578'
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
						id='Path_1970'
						width='23.4'
						height='38.406'
						x='4.839'
						y='9.172'
						filterUnits='userSpaceOnUse'
					>
						<feOffset dx='2' dy='2' />
						<feGaussianBlur result='blur-3' stdDeviation='2' />
						<feFlood flood-opacity='.451' />
						<feComposite in2='blur-3' operator='in' />
						<feComposite in='SourceGraphic' />
					</filter>
					<filter
						id='Path_1972'
						width='29.771'
						height='38.375'
						x='23.467'
						y='9.203'
						filterUnits='userSpaceOnUse'
					>
						<feOffset dx='2' dy='2' />
						<feGaussianBlur result='blur-4' stdDeviation='2' />
						<feFlood flood-opacity='.451' />
						<feComposite in2='blur-4' operator='in' />
						<feComposite in='SourceGraphic' />
					</filter>
				</defs>
				<g id='countdown-billing-14' transform='translate(-75.07 -64.435)'>
					<g
						id='countdown-billing-14-2'
						data-name='countdown-billing-14'
						transform='translate(72.477 62.602)'
					>
						<g id='Countdown_Boards' data-name='Countdown Boards'>
							<g class='cls-8' transform='translate(2.59 1.83)'>
								<path
									id='Path_1967-2'
									d='M62.915 67.09v34.448a4.136 4.136 0 0 1-4.129 4.129H9.949a4.129 4.129 0 0 1-4.129-4.129V67.09z'
									class='cls-1'
									data-name='Path 1967'
									transform='translate(-4.82 -27.51)'
								/>
							</g>
							<g class='cls-7' transform='translate(2.59 1.83)'>
								<path
									id='Path_1968-2'
									d='M58.786 4.59H9.949A4.123 4.123 0 0 0 5.82 8.719V39.31h4.629v3.858h47.837V39.31h4.629V8.719a4.129 4.129 0 0 0-4.129-4.129z'
									class='cls-2'
									data-name='Path 1968'
									transform='translate(-4.82 -3.59)'
								/>
							</g>
						</g>
						<path
							id='Path_1969'
							d='M25.221 79H19.37v4.728h16.425V79h-5.549V67.09h-5.025z'
							class='cls-3'
							data-name='Path 1969'
							transform='translate(-7.414 -25.679)'
						/>
						<g class='cls-6' transform='translate(2.59 1.83)'>
							<path
								id='Path_1970-2'
								d='M27.97 24.31l-9.45 9.222 2.623 3.074 3.757-3.747v17.857h5.02V24.31z'
								class='cls-4'
								data-name='Path 1970'
								transform='translate(-9.68 -11.14)'
							/>
						</g>
						<path
							id='Path_1971'
							d='M60.2 69.664h-9.977l1.309-2.574H47.3l-2.25 4.376v2.771H60.2v9.45h4.876v-9.45H68.6v-4.573h-3.527V67.09H60.2z'
							class='cls-3'
							data-name='Path 1971'
							transform='translate(-17.243 -25.679)'
						/>
						<g class='cls-5' transform='translate(2.59 1.83)'>
							<path
								id='Path_1972-2'
								d='M62.421 24.36L48.7 50.735h4.228l8.666-16.771v16.771h4.876V24.36z'
								class='cls-4'
								data-name='Path 1972'
								transform='translate(-21.23 -11.16)'
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

export default CountDown14;
