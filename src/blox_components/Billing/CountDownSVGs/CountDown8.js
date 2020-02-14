import React, { Component } from 'react';

class CountDown8 extends Component {
	render() {
		const { text } = this.props;

		return (
			<svg
				xmlns='http://www.w3.org/2000/svg'
				width='63.625'
				height='83.872'
				viewBox='0 0 63.625 83.872'
			>
				<defs>
					{/* <style>
            .cls-1{fill:#7c7a7c}.cls-2{fill:#3e3e3e}.cls-3{fill:#b5d334}.cls-4{fill:#949300}.cls-5{filter:url(#Path_1960)}.cls-6{filter:url(#Path_1958)}.cls-7{filter:url(#Path_1957)}
        </style> */}
					<filter
						id='Path_1957'
						width='63.625'
						height='44.936'
						x='0'
						y='38.936'
						filterUnits='userSpaceOnUse'
					>
						<feOffset dx='2' dy='2' />
						<feGaussianBlur result='blur' stdDeviation='1' />
						<feFlood flood-opacity='.302' />
						<feComposite in2='blur' operator='in' />
						<feComposite in='SourceGraphic' />
					</filter>
					<filter
						id='Path_1958'
						width='63.625'
						height='44.936'
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
						id='Path_1960'
						width='32.963'
						height='38.551'
						x='15.465'
						y='9.403'
						filterUnits='userSpaceOnUse'
					>
						<feOffset dx='2' dy='2' />
						<feGaussianBlur result='blur-3' stdDeviation='2' />
						<feFlood flood-opacity='.451' />
						<feComposite in2='blur-3' operator='in' />
						<feComposite in='SourceGraphic' />
					</filter>
				</defs>
				<g id='countdown-billing-08' transform='translate(-198.538 -63.063)'>
					<g
						id='countdown-billing-08-2'
						data-name='countdown-billing-08'
						transform='translate(196.342 61.203)'
					>
						<g id='Countdown_Boards' data-name='Countdown Boards'>
							<g class='cls-7' transform='translate(2.2 1.86)'>
								<path
									id='Path_1957-2'
									d='M62.755 67.09v34.768a4.174 4.174 0 0 1-4.168 4.168H9.3a4.174 4.174 0 0 1-4.168-4.168V67.09z'
									class='cls-1'
									data-name='Path 1957'
									transform='translate(-4.13 -27.15)'
								/>
							</g>
							<g class='cls-6' transform='translate(2.2 1.86)'>
								<path
									id='Path_1958-2'
									d='M58.587 4.59H9.3a4.168 4.168 0 0 0-4.17 4.168v30.874H9.8v3.894h48.28v-3.894h4.672V8.758a4.168 4.168 0 0 0-4.165-4.168z'
									class='cls-2'
									data-name='Path 1958'
									transform='translate(-4.13 -3.59)'
								/>
							</g>
						</g>
						<path
							id='Path_1959'
							d='M50.654 75.621A3.514 3.514 0 0 1 47.4 79.4h-4.514a3.547 3.547 0 0 1-3.252-3.775V67.08H34.65v9.575a7 7 0 0 0 6.884 7.251h7.2a7.019 7.019 0 0 0 6.959-7.251V67.08h-5.039z'
							class='cls-3'
							data-name='Path 1959'
							transform='translate(-13.064 -25.291)'
						/>
						<g class='cls-5' transform='translate(2.2 1.86)'>
							<path
								id='Path_1960-2'
								d='M52.033 44.921a6.6 6.6 0 0 0 3.183-5.7v-7.476a7.065 7.065 0 0 0-6.959-7.245h-6.136a7.026 7.026 0 0 0-6.853 7.251v7.476a6.6 6.6 0 0 0 3.183 5.7 6.946 6.946 0 0 0-3.682 5.488v.623h4.984v-.623a3.32 3.32 0 0 1 3.258-3.177h4.442a3.314 3.314 0 0 1 3.247 3.284v.53h5.034v-.53a6.934 6.934 0 0 0-3.7-5.6zm-1.869-5.607a3.358 3.358 0 0 1-3.233 3.563h-3.408a3.37 3.37 0 0 1-3.323-3.55v-6.541a3.533 3.533 0 0 1 3.258-3.738h3.472a3.5 3.5 0 0 1 3.252 3.738z'
								class='cls-4'
								data-name='Path 1960'
								transform='translate(-15.31 -11.1)'
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

export default CountDown8;
