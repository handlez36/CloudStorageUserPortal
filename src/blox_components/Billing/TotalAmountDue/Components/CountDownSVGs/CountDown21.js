import React, { Component } from 'react';

class CountDown21 extends Component {
	render() {
		const { text } = this.props;

		return (
			<svg
				xmlns='http://www.w3.org/2000/svg'
				width='63.765'
				height='84.061'
				viewBox='0 0 63.765 84.061'
			>
				<defs>
					{/* <style>
                    .cls-1{fill:#7c7a7c}.cls-2{fill:#3e3e3e}.cls-3{fill:#b5d334}.cls-4{fill:#949300}.cls-5{filter:url(#Path_1990)}.cls-6{filter:url(#Path_1988)}.cls-7{filter:url(#Path_1986)}.cls-8{filter:url(#Path_1985)}
                </style> */}
					<filter
						id='Path_1985'
						width='63.733'
						height='45.03'
						x='0'
						y='39.03'
						filterUnits='userSpaceOnUse'
					>
						<feOffset dx='2' dy='2' />
						<feGaussianBlur result='blur' stdDeviation='1' />
						<feFlood flood-opacity='.302' />
						<feComposite in2='blur' operator='in' />
						<feComposite in='SourceGraphic' />
					</filter>
					<filter
						id='Path_1986'
						width='63.765'
						height='45.03'
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
						id='Path_1988'
						width='23.534'
						height='37.929'
						x='30.647'
						y='10.102'
						filterUnits='userSpaceOnUse'
					>
						<feOffset dx='2' dy='2' />
						<feGaussianBlur result='blur-3' stdDeviation='2' />
						<feFlood flood-opacity='.451' />
						<feComposite in2='blur-3' operator='in' />
						<feComposite in='SourceGraphic' />
					</filter>
					<filter
						id='Path_1990'
						width='32.835'
						height='37.922'
						x='4.425'
						y='10.102'
						filterUnits='userSpaceOnUse'
					>
						<feOffset dx='2' dy='2' />
						<feGaussianBlur result='blur-4' stdDeviation='2' />
						<feFlood flood-opacity='.451' />
						<feComposite in2='blur-4' operator='in' />
						<feComposite in='SourceGraphic' />
					</filter>
				</defs>
				<g id='countdown-billing-21' transform='translate(-73.219 -64.671)'>
					<g
						id='countdown-billing-21-2'
						data-name='countdown-billing-21'
						transform='translate(70.902 63.098)'
					>
						<g id='Countdown_Boards' data-name='Countdown Boards'>
							<g class='cls-8' transform='translate(2.32 1.57)'>
								<path
									id='Path_1985-2'
									d='M63.044 66.62v34.852a4.178 4.178 0 0 1-4.178 4.178H9.488a4.172 4.172 0 0 1-4.178-4.178V66.62z'
									class='cls-1'
									data-name='Path 1985'
									transform='translate(-4.31 -26.59)'
								/>
							</g>
							<g class='cls-7' transform='translate(2.32 1.57)'>
								<path
									id='Path_1986-2'
									d='M58.866 4.12H9.488A4.178 4.178 0 0 0 5.31 8.3v30.947h4.684v3.9h48.4v-3.9h4.684V8.3a4.184 4.184 0 0 0-4.212-4.18z'
									class='cls-2'
									data-name='Path 1986'
									transform='translate(-4.31 -3.12)'
								/>
							</g>
						</g>
						<path
							id='Path_1987'
							d='M65.96 79.459h-5.92v4.777h16.611v-4.777h-5.608V66.62H65.96z'
							class='cls-3'
							data-name='Path 1987'
							transform='translate(-22.546 -25.017)'
						/>
						<g class='cls-6' transform='translate(2.32 1.57)'>
							<path
								id='Path_1988-2'
								d='M68.751 25.1l-9.561 9.33 2.654 3.11 3.8-3.791v17.28h5.083V25.1z'
								class='cls-4'
								data-name='Path 1988'
								transform='translate(-24.54 -11)'
							/>
						</g>
						<path
							id='Path_1989'
							d='M16.96 81.979v2.179h21.214V79.5h-14.22l8.075-12.89h-5.52z'
							class='cls-3'
							data-name='Path 1989'
							transform='translate(-6.369 -25.013)'
						/>
						<g class='cls-5' transform='translate(2.32 1.57)'>
							<path
								id='Path_1990-2'
								d='M38.033 39.4v-6.706a7.431 7.431 0 0 0-7.369-7.594h-6.17a7.372 7.372 0 0 0-7.294 7.594v5h5.04v-4.02a3.629 3.629 0 0 1 3.385-3.834h3.834a3.634 3.634 0 0 1 3.46 3.834v5.564a4.571 4.571 0 0 1-.674 2.71l-5.62 9.074h5.5l4.559-7.25a8.306 8.306 0 0 0 1.349-4.372z'
								class='cls-4'
								data-name='Path 1990'
								transform='translate(-8.78 -11)'
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

export default CountDown21;
