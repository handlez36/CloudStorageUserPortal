import React, { Component } from 'react';

class CountDown12 extends Component {
	render() {
		const { text } = this.props;

		return (
			<svg
				xmlns='http://www.w3.org/2000/svg'
				width='62.913'
				height='82.909'
				viewBox='0 0 62.913 82.909'
			>
				<defs>
					{/* <style>
            .cls-1{fill:#7c7a7c}.cls-2{fill:#3e3e3e}.cls-3{fill:#b5d334}.cls-4{fill:#949300}.cls-5{filter:url(#Path_1854)}.cls-6{filter:url(#Path_1852)}.cls-7{filter:url(#Path_1850)}.cls-8{filter:url(#Path_1849)}
        </style> */}
					<filter
						id='Path_1849'
						width='62.913'
						height='44.454'
						x='0'
						y='38.454'
						filterUnits='userSpaceOnUse'
					>
						<feOffset dx='2' dy='2' />
						<feGaussianBlur result='blur' stdDeviation='1' />
						<feFlood flood-opacity='.302' />
						<feComposite in2='blur' operator='in' />
						<feComposite in='SourceGraphic' />
					</filter>
					<filter
						id='Path_1850'
						width='62.913'
						height='44.454'
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
						id='Path_1852'
						width='23.364'
						height='38.321'
						x='5.694'
						y='9.133'
						filterUnits='userSpaceOnUse'
					>
						<feOffset dx='2' dy='2' />
						<feGaussianBlur result='blur-3' stdDeviation='2' />
						<feFlood flood-opacity='.451' />
						<feComposite in2='blur-3' operator='in' />
						<feComposite in='SourceGraphic' />
					</filter>
					<filter
						id='Path_1854'
						width='32.527'
						height='38.223'
						x='25.056'
						y='9.238'
						filterUnits='userSpaceOnUse'
					>
						<feOffset dx='2' dy='2' />
						<feGaussianBlur result='blur-4' stdDeviation='2' />
						<feFlood flood-opacity='.451' />
						<feComposite in2='blur-4' operator='in' />
						<feComposite in='SourceGraphic' />
					</filter>
				</defs>
				<g id='countdown-billing-12' transform='translate(-199.584 -63.824)'>
					<g
						id='countdown-billing-12-2'
						data-name='countdown-billing-12'
						transform='translate(197.01 62)'
					>
						<g id='Countdown_Boards' data-name='Countdown Boards'>
							<g class='cls-8' transform='translate(2.57 1.82)'>
								<path
									id='Path_1849-2'
									d='M62.723 67.09v34.338a4.122 4.122 0 0 1-4.116 4.116H9.926a4.116 4.116 0 0 1-4.116-4.116V67.09z'
									class='cls-1'
									data-name='Path 1849'
									transform='translate(-4.81 -27.64)'
								/>
							</g>
							<g class='cls-7' transform='translate(2.57 1.82)'>
								<path
									id='Path_1850-2'
									d='M58.606 4.59H9.926A4.11 4.11 0 0 0 5.81 8.706V39.2h4.615v3.845h47.683V39.2h4.615V8.706a4.116 4.116 0 0 0-4.117-4.116z'
									class='cls-2'
									data-name='Path 1850'
									transform='translate(-4.81 -3.59)'
								/>
							</g>
						</g>
						<path
							id='Path_1851'
							d='M26.623 78.965H20.79v4.713h16.372v-4.713h-5.531V67.09h-5.008z'
							class='cls-3'
							data-name='Path 1851'
							transform='translate(-7.999 -25.811)'
						/>
						<g class='cls-6' transform='translate(2.57 1.82)'>
							<path
								id='Path_1852-2'
								d='M29.36 24.31l-9.42 9.19 2.615 3.064 3.745-3.732v17.8h5V24.31z'
								class='cls-4'
								data-name='Path 1852'
								transform='translate(-10.25 -11.18)'
							/>
						</g>
						<path
							id='Path_1853'
							d='M51.17 81.559v2.147h20.895v-4.59h-14L65.58 67.1h-5.439z'
							class='cls-3'
							data-name='Path 1853'
							transform='translate(-19.687 -25.815)'
						/>
						<g class='cls-5' transform='translate(2.57 1.82)'>
							<path
								id='Path_1854-2'
								d='M71.935 38.557v-6.6a7.322 7.322 0 0 0-7.242-7.482H58.6a7.263 7.263 0 0 0-7.186 7.482v4.922h4.965v-3.951a3.575 3.575 0 0 1 3.331-3.778h3.753a3.584 3.584 0 0 1 3.409 3.778v5.482a4.5 4.5 0 0 1-.664 2.67l-5.957 9.62h5.439l4.922-7.845a8.14 8.14 0 0 0 1.323-4.298z'
								class='cls-4'
								data-name='Path 1854'
								transform='translate(-22.35 -11.24)'
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

export default CountDown12;
