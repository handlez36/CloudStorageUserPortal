import React, { Component } from 'react';

class CountDown17 extends Component {
	render() {
		const { text } = this.props;

		return (
			<svg
				xmlns='http://www.w3.org/2000/svg'
				width='63.671'
				height='83.934'
				viewBox='0 0 63.671 83.934'
			>
				<defs>
					{/* <style>
            .cls-1{fill:#7c7a7c}.cls-2{fill:#3e3e3e}.cls-3{fill:#b5d334}.cls-4{fill:#949300}.cls-5{filter:url(#Path_1984)}.cls-6{filter:url(#Path_1982)}.cls-7{filter:url(#Path_1980)}.cls-8{filter:url(#Path_1979)}
        </style> */}
					<filter
						id='Path_1979'
						width='63.671'
						height='44.967'
						x='0'
						y='38.967'
						filterUnits='userSpaceOnUse'
					>
						<feOffset dx='2' dy='2' />
						<feGaussianBlur result='blur' stdDeviation='1' />
						<feFlood flood-opacity='.161' />
						<feComposite in2='blur' operator='in' />
						<feComposite in='SourceGraphic' />
					</filter>
					<filter
						id='Path_1980'
						width='63.671'
						height='44.967'
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
						id='Path_1982'
						width='23.516'
						height='37.887'
						x='6.034'
						y='10.08'
						filterUnits='userSpaceOnUse'
					>
						<feOffset dx='2' dy='2' />
						<feGaussianBlur result='blur-3' stdDeviation='2' />
						<feFlood flood-opacity='.451' />
						<feComposite in2='blur-3' operator='in' />
						<feComposite in='SourceGraphic' />
					</filter>
					<filter
						id='Path_1984'
						width='32.519'
						height='38.853'
						x='25.829'
						y='9.999'
						filterUnits='userSpaceOnUse'
					>
						<feOffset dx='2' dy='2' />
						<feGaussianBlur result='blur-4' stdDeviation='2' />
						<feFlood flood-opacity='.451' />
						<feComposite in2='blur-4' operator='in' />
						<feComposite in='SourceGraphic' />
					</filter>
				</defs>
				<g id='countdown-billing-17' transform='translate(-74.323 -63.737)'>
					<g
						id='countdown-billing-17-2'
						data-name='countdown-billing-17'
						transform='translate(71.956 62.169)'
					>
						<g id='Countdown_Boards' data-name='Countdown Boards'>
							<g class='cls-8' transform='translate(2.37 1.57)'>
								<path
									id='Path_1979-2'
									d='M63.071 66.62v34.8a4.171 4.171 0 0 1-4.177 4.171H9.571a4.165 4.165 0 0 1-4.171-4.175V66.62z'
									class='cls-1'
									data-name='Path 1979'
									transform='translate(-4.4 -26.65)'
								/>
							</g>
							<g class='cls-7' transform='translate(2.37 1.57)'>
								<path
									id='Path_1980-2'
									d='M58.894 4.12H9.571A4.171 4.171 0 0 0 5.4 8.291v30.9h4.676v3.9H58.4v-3.9h4.676v-30.9a4.177 4.177 0 0 0-4.182-4.171z'
									class='cls-2'
									data-name='Path 1980'
									transform='translate(-4.4 -3.12)'
								/>
							</g>
						</g>
						<path
							id='Path_1981'
							d='M26.654 79.439h-5.9v4.77h16.58v-4.77h-5.605V66.62h-5.075z'
							class='cls-3'
							data-name='Path 1981'
							transform='translate(-7.813 -25.084)'
						/>
						<g class='cls-6' transform='translate(2.37 1.57)'>
							<path
								id='Path_1982-2'
								d='M29.435 25.1l-9.545 9.315 2.656 3.1 3.784-3.784v17.256h5.075V25.1z'
								class='cls-4'
								data-name='Path 1982'
								transform='translate(-9.86 -11.02)'
							/>
						</g>
						<path
							id='Path_1983'
							d='M56.46 84.618h5.611l4.745-16.578h-5.53z'
							class='cls-3'
							data-name='Path 1983'
							transform='translate(-21.259 -25.619)'
						/>
						<g class='cls-5' transform='translate(2.37 1.57)'>
							<path
								id='Path_1984-2'
								d='M72.158 24.97H51.64v4.838h14.3l-6.463 22.015H65l7.157-24.777z'
								class='cls-4'
								data-name='Path 1984'
								transform='translate(-21.81 -10.97)'
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

export default CountDown17;
