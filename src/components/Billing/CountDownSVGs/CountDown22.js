import React, { Component } from 'react';

class CountDown22 extends Component {
	render() {
		const { text } = this.props;

		return (
			<svg
				xmlns='http://www.w3.org/2000/svg'
				width='63.029'
				height='83.338'
				viewBox='0 0 63.029 83.338'
			>
				<defs>
					{/* <style>
                    .cls-1{fill:#7c7a7c}.cls-2{fill:#3e3e3e}.cls-3{fill:#b5d334}.cls-4{fill:#949300}.cls-5{filter:url(#Path_1914)}.cls-6{filter:url(#Path_1912)}.cls-7{filter:url(#Path_1910)}.cls-8{filter:url(#Path_1909)}
                </style> */}
					<filter
						id='Path_1909'
						width='63.029'
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
						id='Path_1910'
						width='63.029'
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
						id='Path_1912'
						width='32.654'
						height='37.682'
						x='2.216'
						y='9.962'
						filterUnits='userSpaceOnUse'
					>
						<feOffset dx='2' dy='2' />
						<feGaussianBlur result='blur-3' stdDeviation='2' />
						<feFlood flood-opacity='.451' />
						<feComposite in2='blur-3' operator='in' />
						<feComposite in='SourceGraphic' />
					</filter>
					<filter
						id='Path_1914'
						width='32.642'
						height='37.682'
						x='26.015'
						y='9.962'
						filterUnits='userSpaceOnUse'
					>
						<feOffset dx='2' dy='2' />
						<feGaussianBlur result='blur-4' stdDeviation='2' />
						<feFlood flood-opacity='.451' />
						<feComposite in2='blur-4' operator='in' />
						<feComposite in='SourceGraphic' />
					</filter>
				</defs>
				<g id='countdown-billing-22' transform='translate(-74.566 -64.71)'>
					<g
						id='countdown-billing-22-2'
						data-name='countdown-billing-22'
						transform='translate(72.119 63.359)'
					>
						<g id='Countdown_Boards' data-name='Countdown Boards'>
							<g class='cls-8' transform='translate(2.45 1.35)'>
								<path
									id='Path_1909-2'
									d='M62.6 66.3v34.53a4.138 4.138 0 0 1-4.125 4.139H9.695a4.138 4.138 0 0 1-4.125-4.139V66.3z'
									class='cls-1'
									data-name='Path 1909'
									transform='translate(-4.57 -26.63)'
								/>
							</g>
							<g class='cls-7' transform='translate(2.45 1.35)'>
								<path
									id='Path_1910-2'
									d='M58.474 3.8H9.695A4.138 4.138 0 0 0 5.57 7.939V38.6h4.624v3.867h47.781V38.6H62.6V7.939A4.138 4.138 0 0 0 58.474 3.8z'
									class='cls-2'
									data-name='Path 1910'
									transform='translate(-4.57 -2.8)'
								/>
							</g>
						</g>
						<path
							id='Path_1911'
							d='M13.78 81.486v2.159h21.011v-4.621H20.709l8-12.764H23.24z'
							class='cls-3'
							data-name='Path 1911'
							transform='translate(-5.254 -25.265)'
						/>
						<g class='cls-6' transform='translate(2.45 1.35)'>
							<path
								id='Path_1912-2'
								d='M34.652 38.906v-6.633a7.363 7.363 0 0 0-7.3-7.523h-6.113A7.314 7.314 0 0 0 14 32.273v4.95h4.993v-3.978a3.593 3.593 0 0 1 3.353-3.805h3.8a3.606 3.606 0 0 1 3.428 3.805v5.513a4.455 4.455 0 0 1-.674 2.679l-5.568 9H28.8l4.51-7.2a8.185 8.185 0 0 0 1.342-4.331z'
								class='cls-4'
								data-name='Path 1912'
								transform='translate(-7.78 -10.79)'
							/>
						</g>
						<path
							id='Path_1913'
							d='M52.46 81.486v2.159h21.011v-4.621H59.389l8-12.764H61.92z'
							class='cls-3'
							data-name='Path 1913'
							transform='translate(-20.147 -25.265)'
						/>
						<g class='cls-5' transform='translate(2.45 1.35)'>
							<path
								id='Path_1914-2'
								d='M73.34 38.906v-6.633a7.363 7.363 0 0 0-7.3-7.523h-6.114a7.3 7.3 0 0 0-7.226 7.523v4.95h4.993v-3.978a3.6 3.6 0 0 1 3.353-3.805h3.8a3.606 3.606 0 0 1 3.428 3.805v5.513a4.5 4.5 0 0 1-.668 2.679l-5.568 9h5.451l4.51-7.2a8.186 8.186 0 0 0 1.343-4.325z'
								class='cls-4'
								data-name='Path 1914'
								transform='translate(-22.68 -10.79)'
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

export default CountDown22;
