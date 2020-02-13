import React, { Component } from 'react';

class CountDown19 extends Component {
	render() {
		const { text } = this.props;

		return (
			<svg
				xmlns='http://www.w3.org/2000/svg'
				width='63.594'
				height='83.283'
				viewBox='0 0 63.594 83.283'
			>
				<defs>
					{/* <style>
                    .cls-1{fill:#7c7a7c}.cls-2{fill:#3e3e3e}.cls-3{fill:#b5d334}.cls-4{fill:#949300}.cls-5{filter:url(#Path_1896)}.cls-6{filter:url(#Path_1894)}.cls-7{filter:url(#Path_1892)}.cls-8{filter:url(#Path_1891)}
                </style> */}
					<filter
						id='Path_1891'
						width='63.594'
						height='44.915'
						x='0'
						y='38.368'
						filterUnits='userSpaceOnUse'
					>
						<feOffset dx='2' dy='2' />
						<feGaussianBlur result='blur' stdDeviation='1' />
						<feFlood flood-opacity='.302' />
						<feComposite in2='blur' operator='in' />
						<feComposite in='SourceGraphic' />
					</filter>
					<filter
						id='Path_1892'
						width='63.594'
						height='44.915'
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
						id='Path_1894'
						width='23.5'
						height='38.431'
						x='4.503'
						y='9.304'
						filterUnits='userSpaceOnUse'
					>
						<feOffset dx='2' dy='2' />
						<feGaussianBlur result='blur-3' stdDeviation='2' />
						<feFlood flood-opacity='.451' />
						<feComposite in2='blur-3' operator='in' />
						<feComposite in='SourceGraphic' />
					</filter>
					<filter
						id='Path_1896'
						width='32.543'
						height='38.568'
						x='24.247'
						y='9.371'
						filterUnits='userSpaceOnUse'
					>
						<feOffset dx='2' dy='2' />
						<feGaussianBlur result='blur-4' stdDeviation='2' />
						<feFlood flood-opacity='.451' />
						<feComposite in2='blur-4' operator='in' />
						<feComposite in='SourceGraphic' />
					</filter>
				</defs>
				<g id='countdown-billing-19' transform='translate(-74.269 -65.52)'>
					<g
						id='countdown-billing-19-2'
						data-name='countdown-billing-19'
						transform='translate(72 63.954)'
					>
						<g id='Countdown_Boards' data-name='Countdown Boards'>
							<g class='cls-8' transform='translate(2.27 1.57)'>
								<path
									id='Path_1891-2'
									d='M62.844 66.62v34.75a4.165 4.165 0 0 1-4.165 4.165H9.415a4.159 4.159 0 0 1-4.165-4.165V66.62z'
									class='cls-1'
									data-name='Path 1891'
									transform='translate(-4.25 -27.25)'
								/>
							</g>
							<g class='cls-7' transform='translate(2.27 1.57)'>
								<path
									id='Path_1892-2'
									d='M58.679 4.12H9.415A4.165 4.165 0 0 0 5.25 8.285v30.859h4.67v3.892h48.255v-3.892h4.67V8.285a4.172 4.172 0 0 0-4.166-4.165z'
									class='cls-2'
									data-name='Path 1892'
									transform='translate(-4.25 -3.12)'
								/>
							</g>
						</g>
						<path
							id='Path_1893'
							d='M24.053 78.422h-5.9v4.763h16.565v-4.763h-5.6V65.62h-5.065z'
							class='cls-3'
							data-name='Path 1893'
							transform='translate(-6.849 -25.086)'
						/>
						<g class='cls-6' transform='translate(2.27 1.57)'>
							<path
								id='Path_1894-2'
								d='M26.833 24.1L17.3 33.4l2.646 3.1 3.786-3.779v17.81H28.8V24.1z'
								class='cls-4'
								data-name='Path 1894'
								transform='translate(-8.8 -10.8)'
							/>
						</g>
						<path
							id='Path_1895'
							d='M64.658 75.191c0 2.073-1.332 3.773-3.325 3.773h-3.878c-2 0-3.325-1.7-3.325-3.773v-3.848h-4.882v4.807a7.185 7.185 0 0 0 7.173 7.4h5.99a7.291 7.291 0 0 0 7.229-7.4v-9.34h-4.982z'
							class='cls-3'
							data-name='Path 1895'
							transform='translate(-18.583 -25.537)'
						/>
						<g class='cls-5' transform='translate(2.27 1.57)'>
							<path
								id='Path_1896-2'
								d='M62.322 24.21h-6.139a7.2 7.2 0 0 0-7.173 7.472v11.456a7.138 7.138 0 0 0 7.173 7.4h4.583a5.205 5.205 0 0 0 3.8-1.625v1.868h4.981v-19.1a7.31 7.31 0 0 0-7.229-7.465zm2.248 20.416a3.493 3.493 0 0 1-3.113 1.625h-4.091a3.456 3.456 0 0 1-3.381-3.7v-9.966a3.527 3.527 0 0 1 3.4-3.773h3.848a3.52 3.52 0 0 1 3.325 3.773z'
								class='cls-4'
								data-name='Path 1896'
								transform='translate(-20.76 -10.84)'
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

export default CountDown19;
