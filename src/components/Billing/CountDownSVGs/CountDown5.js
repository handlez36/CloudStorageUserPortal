import React, { Component } from 'react';

class CountDown5 extends Component {
	render() {
		const { text } = this.props;

		return (
			<svg
				xmlns='http://www.w3.org/2000/svg'
				width='63.656'
				height='83.347'
				viewBox='0 0 63.656 83.347'
			>
				<defs>
					{/* <style>
                    .cls-1{fill:#7c7a7c}.cls-2{fill:#3e3e3e}.cls-3{fill:#b5d334}.cls-4{fill:#949300}.cls-5{filter:url(#Path_1818)}.cls-6{filter:url(#Path_1816)}.cls-7{filter:url(#Path_1815)}
                </style> */}
					<filter
						id='Path_1815'
						width='63.656'
						height='44.63'
						x='0'
						y='38.717'
						filterUnits='userSpaceOnUse'
					>
						<feOffset dx='2' dy='2' />
						<feGaussianBlur result='blur' stdDeviation='1' />
						<feFlood flood-opacity='.302' />
						<feComposite in2='blur' operator='in' />
						<feComposite in='SourceGraphic' />
					</filter>
					<filter
						id='Path_1816'
						width='63.656'
						height='44.617'
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
						id='Path_1818'
						width='31.902'
						height='38.701'
						x='15.692'
						y='8.938'
						filterUnits='userSpaceOnUse'
					>
						<feOffset dx='2' dy='2' />
						<feGaussianBlur result='blur-3' stdDeviation='2' />
						<feFlood flood-opacity='.451' />
						<feComposite in2='blur-3' operator='in' />
						<feComposite in='SourceGraphic' />
					</filter>
				</defs>
				<g id='countdown-billing-05' transform='translate(-199.089 -63.33)'>
					<g
						id='countdown-billing-05-2'
						data-name='countdown-billing-05'
						transform='translate(196.844 62)'
					>
						<g id='countdown-billing-05-3' data-name='countdown-billing-05'>
							<g id='Countdown_Boards' data-name='Countdown Boards'>
								<g class='cls-7' transform='translate(2.24 1.33)'>
									<path
										id='Path_1815-2'
										d='M62.906 66.27v34.495a4.159 4.159 0 0 1-4.17 4.135H9.42a4.153 4.153 0 0 1-4.17-4.135V66.27z'
										class='cls-1'
										data-name='Path 1815'
										transform='translate(-4.25 -26.55)'
									/>
								</g>
								<g class='cls-6' transform='translate(2.24 1.33)'>
									<path
										id='Path_1816-2'
										d='M58.736 3.77H9.42a4.182 4.182 0 0 0-2.95 1.209A4.111 4.111 0 0 0 5.25 7.9v30.624h4.675v3.863h48.306v-3.863h4.675V7.9a4.153 4.153 0 0 0-4.17-4.13z'
										class='cls-2'
										data-name='Path 1816'
										transform='translate(-4.25 -2.77)'
									/>
								</g>
							</g>
							<path
								id='Path_1817'
								d='M49.545 74.323c0 2.1-1.354 3.832-3.381 3.832h-3.6c-2.027 0-3.381-1.731-3.381-3.832V70.43h-5.034v4.945a7.25 7.25 0 0 0 7.361 7.417h5.779a7.207 7.207 0 0 0 7.361-7.417v-9.1h-5.105z'
								class='cls-3'
								data-name='Path 1817'
								transform='translate(-12.815 -25.258)'
							/>
							<g class='cls-5' transform='translate(2.24 1.33)'>
								<path
									id='Path_1818-2'
									d='M47.661 38.217h-3a6.144 6.144 0 0 0-4.506 1.8V27.778H54.5V23.05H35.12v22.6h4.129a4.1 4.1 0 0 1 4.061-3.09h3.226a3.572 3.572 0 0 1 3.381 3.826v3.362h5.105v-3.86a7.351 7.351 0 0 0-7.361-7.671z'
									class='cls-4'
									data-name='Path 1818'
									transform='translate(-15.43 -10.11)'
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
				</g>
			</svg>
		);
	}
}

export default CountDown5;
