import React, { Component } from 'react';

class CountDown15 extends Component {
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
            .cls-1{fill:#7c7a7c}.cls-2{fill:#3e3e3e}.cls-3{fill:#b5d334}.cls-4{fill:#949300}.cls-5{filter:url(#Path_1872)}.cls-6{filter:url(#Path_1870)}.cls-7{filter:url(#Path_1868)}.cls-8{filter:url(#Path_1867)}
        </style> */}
					<filter
						id='Path_1867'
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
						id='Path_1868'
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
						id='Path_1870'
						width='23.421'
						height='37.689'
						x='5.605'
						y='9.98'
						filterUnits='userSpaceOnUse'
					>
						<feOffset dx='2' dy='2' />
						<feGaussianBlur result='blur-3' stdDeviation='2' />
						<feFlood flood-opacity='.451' />
						<feComposite in2='blur-3' operator='in' />
						<feComposite in='SourceGraphic' />
					</filter>
					<filter
						id='Path_1872'
						width='31.922'
						height='37.837'
						x='25.254'
						y='9.807'
						filterUnits='userSpaceOnUse'
					>
						<feOffset dx='2' dy='2' />
						<feGaussianBlur result='blur-4' stdDeviation='2' />
						<feFlood flood-opacity='.451' />
						<feComposite in2='blur-4' operator='in' />
						<feComposite in='SourceGraphic' />
					</filter>
				</defs>
				<g id='countdown-billing-15' transform='translate(-73.69 -64.653)'>
					<g
						id='countdown-billing-15-2'
						data-name='countdown-billing-15'
						transform='translate(71.243 63.104)'
					>
						<g id='Countdown_Boards' data-name='Countdown Boards'>
							<g class='cls-8' transform='translate(2.45 1.55)'>
								<path
									id='Path_1867-2'
									d='M62.6 66.62v34.53a4.132 4.132 0 0 1-4.125 4.139H9.695a4.132 4.132 0 0 1-4.125-4.139V66.62z'
									class='cls-1'
									data-name='Path 1867'
									transform='translate(-4.57 -26.95)'
								/>
							</g>
							<g class='cls-7' transform='translate(2.45 1.55)'>
								<path
									id='Path_1868-2'
									d='M58.474 4.12H9.695A4.138 4.138 0 0 0 5.57 8.259v30.663h4.624v3.867h47.781v-3.867H62.6V8.259a4.138 4.138 0 0 0-4.126-4.139z'
									class='cls-2'
									data-name='Path 1868'
									transform='translate(-4.57 -3.12)'
								/>
							</g>
						</g>
						<path
							id='Path_1869'
							d='M26.259 79.341H20.4v4.733h16.464v-4.733H31.3V66.62h-5.041z'
							class='cls-3'
							data-name='Path 1869'
							transform='translate(-7.83 -25.402)'
						/>
						<g class='cls-6' transform='translate(2.45 1.55)'>
							<path
								id='Path_1870-2'
								d='M29.016 25.1l-9.466 9.243 2.629 3.081 3.756-3.756v17.12h5.036V25.1z'
								class='cls-4'
								data-name='Path 1870'
								transform='translate(-9.95 -11.12)'
							/>
						</g>
						<path
							id='Path_1871'
							d='M65.9 75.556c0 2.1-1.355 3.836-3.384 3.836h-3.607c-2.029 0-3.384-1.732-3.384-3.836v-3.91h-5.036V76.6a7.251 7.251 0 0 0 7.369 7.424h5.785a7.208 7.208 0 0 0 7.368-7.424v-9.99H65.9z'
							class='cls-3'
							data-name='Path 1871'
							transform='translate(-19.388 -25.398)'
						/>
						<g class='cls-5' transform='translate(2.45 1.55)'>
							<path
								id='Path_1872-2'
								d='M64.014 40h-3.007a6.15 6.15 0 0 0-4.507 1.81V29.553h14.36V24.82h-19.4v22.626h4.133a4.1 4.1 0 0 1 4.065-3.094h3.23a3.575 3.575 0 0 1 3.384 3.83v2.475h5.111v-2.988A7.373 7.373 0 0 0 64.014 40z'
								class='cls-4'
								data-name='Path 1872'
								transform='translate(-22.21 -11.01)'
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

export default CountDown15;
