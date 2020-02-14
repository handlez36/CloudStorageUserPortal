import React, { Component } from 'react';

class CountDown4 extends Component {
	render() {
		const { text } = this.props;

		return (
			<svg
				xmlns='http://www.w3.org/2000/svg'
				width='63.446'
				height='83.63'
				viewBox='0 0 63.446 83.63'
			>
				<defs>
					{/* <style>
                    .cls-1{fill:#7c7a7c}.cls-2{fill:#3e3e3e}.cls-3{fill:#b5d334}.cls-4{fill:#949300}.cls-5{filter:url(#Path_1948)}.cls-6{filter:url(#Path_1946)}.cls-7{filter:url(#Path_1945)}
                </style> */}
					<filter
						id='Path_1945'
						width='63.446'
						height='44.815'
						x='0'
						y='38.815'
						filterUnits='userSpaceOnUse'
					>
						<feOffset dx='2' dy='2' />
						<feGaussianBlur result='blur' stdDeviation='1' />
						<feFlood flood-opacity='.302' />
						<feComposite in2='blur' operator='in' />
						<feComposite in='SourceGraphic' />
					</filter>
					<filter
						id='Path_1946'
						width='63.446'
						height='44.802'
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
						id='Path_1948'
						width='30.091'
						height='38.953'
						x='13.706'
						y='8.862'
						filterUnits='userSpaceOnUse'
					>
						<feOffset dx='2' dy='2' />
						<feGaussianBlur result='blur-3' stdDeviation='2' />
						<feFlood flood-opacity='.451' />
						<feComposite in2='blur-3' operator='in' />
						<feComposite in='SourceGraphic' />
					</filter>
				</defs>
				<g id='countdown-billing-04' transform='translate(-198.65 -63.179)'>
					<g
						id='countdown-billing-04-2'
						data-name='countdown-billing-04'
						transform='translate(196.004 61.838)'
					>
						<g id='Countdown_Boards' data-name='Countdown Boards'>
							<g class='cls-7' transform='translate(2.65 1.34)'>
								<path
									id='Path_1945-2'
									d='M63.316 66.27v34.66a4.155 4.155 0 0 1-4.155 4.155H10.025a4.161 4.161 0 0 1-4.155-4.155V66.27z'
									class='cls-1'
									data-name='Path 1945'
									transform='translate(-4.87 -26.46)'
								/>
							</g>
							<g class='cls-6' transform='translate(2.65 1.34)'>
								<path
									id='Path_1946-2'
									d='M59.161 3.77H10.025A4.155 4.155 0 0 0 5.87 7.925v30.766h4.658v3.881h48.13v-3.881h4.658V7.925a4.149 4.149 0 0 0-4.155-4.155z'
									class='cls-2'
									data-name='Path 1946'
									transform='translate(-4.87 -2.77)'
								/>
							</g>
						</g>
						<path
							id='Path_1947'
							d='M44.7 68.444H34.664l1.106-2.174h-4.254l-2.056 3.987v2.788H44.7v9.508h4.906v-9.507h3.546v-4.6h-3.546V66.27H44.7z'
							class='cls-3'
							data-name='Path 1947'
							transform='translate(-11.164 -25.114)'
						/>
						<g class='cls-5' transform='translate(2.65 1.34)'>
							<path
								id='Path_1948-2'
								d='M46.787 22.87L32.77 49.823h4.254l8.931-17.3v17.3h4.906V22.87z'
								class='cls-4'
								data-name='Path 1948'
								transform='translate(-15.06 -10.01)'
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

export default CountDown4;
