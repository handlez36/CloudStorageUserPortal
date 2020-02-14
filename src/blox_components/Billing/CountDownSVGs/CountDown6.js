import React, { Component } from 'react';

class CountDown6 extends Component {
	render() {
		const { text } = this.props;

		return (
			<svg
				xmlns='http://www.w3.org/2000/svg'
				width='63.087'
				height='83.144'
				viewBox='0 0 63.087 83.144'
			>
				<defs>
					{/* <style>
            .cls-1{fill:#7c7a7c}.cls-2{fill:#3e3e3e}.cls-3{fill:#b5d334}.cls-4{fill:#949300}.cls-5{filter:url(#Path_1952)}.cls-6{filter:url(#Path_1950)}.cls-7{filter:url(#Path_1949)}
        </style> */}
					<filter
						id='Path_1949'
						width='63.087'
						height='44.572'
						x='0'
						y='38.572'
						filterUnits='userSpaceOnUse'
					>
						<feOffset dx='2' dy='2' />
						<feGaussianBlur result='blur' stdDeviation='1' />
						<feFlood flood-opacity='.161' />
						<feComposite in2='blur' operator='in' />
						<feComposite in='SourceGraphic' />
					</filter>
					<filter
						id='Path_1950'
						width='63.087'
						height='44.56'
						x='0'
						y='0'
						filterUnits='userSpaceOnUse'
					>
						<feOffset dx='2' dy='2' />
						<feGaussianBlur result='blur-2' stdDeviation='1' />
						<feFlood flood-opacity='.161' />
						<feComposite in2='blur-2' operator='in' />
						<feComposite in='SourceGraphic' />
					</filter>
					<filter
						id='Path_1952'
						width='32.493'
						height='38.717'
						x='15.277'
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
				<g id='countdown-billing-06' transform='translate(-198.409 -62.934)'>
					<g
						id='countdown-billing-06-2'
						data-name='countdown-billing-06'
						transform='translate(195.842 61.608)'
					>
						<g id='Countdown_Boards' data-name='Countdown Boards'>
							<g class='cls-7' transform='translate(2.57 1.33)'>
								<path
									id='Path_1949-2'
									d='M62.867 66.27v34.443a4.135 4.135 0 0 1-4.129 4.129H9.909a4.135 4.135 0 0 1-4.129-4.129V66.27z'
									class='cls-1'
									data-name='Path 1949'
									transform='translate(-4.78 -26.7)'
								/>
							</g>
							<g class='cls-6' transform='translate(2.57 1.33)'>
								<path
									id='Path_1950-2'
									d='M58.738 3.77H9.909A4.129 4.129 0 0 0 5.78 7.9v30.573h4.629v3.857h47.83v-3.857h4.629V7.9a4.129 4.129 0 0 0-4.13-4.13z'
									class='cls-2'
									data-name='Path 1950'
									transform='translate(-4.78 -2.77)'
								/>
							</g>
						</g>
						<path
							id='Path_1951'
							d='M50.883 74.361c0 2.067-1.234 3.765-3.314 3.765H43.73c-1.987 0-3.314-1.7-3.314-3.765V66.27H35.4v9.054a7.227 7.227 0 0 0 7.227 7.406h6.1a7.165 7.165 0 0 0 7.153-7.406V66.27h-5z'
							class='cls-3'
							data-name='Path 1951'
							transform='translate(-13.551 -25.371)'
						/>
						<g class='cls-5' transform='translate(2.57 1.33)'>
							<path
								id='Path_1952-2'
								d='M48.729 39.875h-4.555a5.264 5.264 0 0 0-3.758 1.7V31.322a3.5 3.5 0 0 1 3.314-3.758h3.839a3.5 3.5 0 0 1 3.314 3.758v3.833h4.869v-4.716A7.18 7.18 0 0 0 48.6 22.99h-5.975a7.239 7.239 0 0 0-7.225 7.449V49.7h5.017v-3.925a3.654 3.654 0 0 1 3.083-1.623h4.055a3.4 3.4 0 0 1 3.314 3.7v1.851h5.017v-2.379a7.17 7.17 0 0 0-7.157-7.449z'
								class='cls-4'
								data-name='Path 1952'
								transform='translate(-16.12 -10.13)'
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

export default CountDown6;
