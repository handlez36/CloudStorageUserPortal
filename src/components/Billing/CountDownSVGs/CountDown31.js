import React, { Component } from 'react';

class CountDown31 extends Component {
	render() {
		const { text } = this.props;

		return (
			<svg
				xmlns='http://www.w3.org/2000/svg'
				width='63.137'
				height='83.213'
				viewBox='0 0 63.137 83.213'
			>
				<defs>
					{/* <style>
            .cls-1{fill:#7c7a7c}.cls-2{fill:#3e3e3e}.cls-3{fill:#b5d334}.cls-4{fill:#949300}.cls-5{filter:url(#Path_2032)}.cls-6{filter:url(#Path_2030)}.cls-7{filter:url(#Path_2028)}.cls-8{filter:url(#Path_2027)}
        </style> */}
					<filter
						id='Path_2027'
						width='63.137'
						height='44.606'
						x='0'
						y='38.606'
						filterUnits='userSpaceOnUse'
					>
						<feOffset dx='2' dy='2' />
						<feGaussianBlur result='blur' stdDeviation='1' />
						<feFlood flood-opacity='.302' />
						<feComposite in2='blur' operator='in' />
						<feComposite in='SourceGraphic' />
					</filter>
					<filter
						id='Path_2028'
						width='63.137'
						height='44.606'
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
						id='Path_2030'
						width='31.732'
						height='38.116'
						x='5.8'
						y='9.502'
						filterUnits='userSpaceOnUse'
					>
						<feOffset dx='2' dy='2' />
						<feGaussianBlur result='blur-3' stdDeviation='2' />
						<feFlood flood-opacity='.451' />
						<feComposite in2='blur-3' operator='in' />
						<feComposite in='SourceGraphic' />
					</filter>
					<filter
						id='Path_2032'
						width='23.409'
						height='38.061'
						x='29.664'
						y='9.576'
						filterUnits='userSpaceOnUse'
					>
						<feOffset dx='2' dy='2' />
						<feGaussianBlur result='blur-4' stdDeviation='2' />
						<feFlood flood-opacity='.451' />
						<feComposite in2='blur-4' operator='in' />
						<feComposite in='SourceGraphic' />
					</filter>
				</defs>
				<g id='countdown-billing-31' transform='translate(-74.528 -65.224)'>
					<g
						id='countdown-billing-31-2'
						data-name='countdown-billing-31'
						transform='translate(71.877 63.821)'
					>
						<g id='Countdown_Boards' data-name='Countdown Boards'>
							<g class='cls-8' transform='translate(2.65 1.4)'>
								<path
									id='Path_2027-2'
									d='M63.047 66.39v34.474A4.132 4.132 0 0 1 58.915 105H10.042a4.126 4.126 0 0 1-4.132-4.132V66.39z'
									class='cls-1'
									data-name='Path 2027'
									transform='translate(-4.91 -26.78)'
								/>
							</g>
							<g class='cls-7' transform='translate(2.65 1.4)'>
								<path
									id='Path_2028-2'
									d='M58.915 3.89H10.042A4.132 4.132 0 0 0 5.91 8.022v30.614h4.633V42.5h47.872v-3.864h4.633V8.022a4.139 4.139 0 0 0-4.133-4.132z'
									class='cls-2'
									data-name='Path 2028'
									transform='translate(-4.91 -2.89)'
								/>
							</g>
						</g>
						<path
							id='Path_2029'
							d='M34.6 66.41v8.778a3.457 3.457 0 0 1-3.311 3.706H27.68a3.443 3.443 0 0 1-3.311-3.706v-3.83h-4.941v4.861a7 7 0 0 0 7 7.233H32.6a7 7 0 0 0 7-7.233V66.41z'
							class='cls-3'
							data-name='Path 2029'
							transform='translate(-7.426 -25.388)'
						/>
						<g class='cls-6' transform='translate(2.65 1.4)'>
							<path
								id='Path_2030-2'
								d='M36.355 44.594A6.8 6.8 0 0 0 39.369 39v-7.655a7.036 7.036 0 0 0-6.992-7.215h-5.226a7.042 7.042 0 0 0-6.992 7.215v5H25.1v-3.969a3.462 3.462 0 0 1 3.317-3.706h2.576a3.5 3.5 0 0 1 3.385 3.706v6.795a3.651 3.651 0 0 1-3.459 3.706h-4.577V46.9h5.078a3.4 3.4 0 0 1 3.465 3.132v.21h5v-.21a6.529 6.529 0 0 0-3.533-5.442z'
								class='cls-4'
								data-name='Path 2030'
								transform='translate(-10.36 -10.63)'
							/>
						</g>
						<path
							id='Path_2031'
							d='M65.5 78.726h-5.86v4.732h16.437v-4.732h-5.553V66.44H65.5z'
							class='cls-3'
							data-name='Path 2031'
							transform='translate(-22.8 -25.4)'
						/>
						<g class='cls-5' transform='translate(2.65 1.4)'>
							<path
								id='Path_2032-2'
								d='M68.247 24.25l-9.457 9.228 2.625 3.076 3.756-3.749v17.506H70.2V24.25z'
								class='cls-4'
								data-name='Path 2032'
								transform='translate(-25.13 -10.67)'
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

export default CountDown31;
