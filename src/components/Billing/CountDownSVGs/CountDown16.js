import React, { Component } from 'react';

class CountDown16 extends Component {
	render() {
		const { text } = this.props;

		return (
			<svg
				xmlns='http://www.w3.org/2000/svg'
				width='63.125'
				height='83.196'
				viewBox='0 0 63.125 83.196'
			>
				<defs>
					{/* <style>
            .cls-1{fill:#7c7a7c}.cls-2{fill:#3e3e3e}.cls-3{fill:#b5d334}.cls-4{fill:#949300}.cls-5{filter:url(#Path_1978)}.cls-6{filter:url(#Path_1976)}.cls-7{filter:url(#Path_1974)}.cls-8{filter:url(#Path_1973)}
        </style> */}
					<filter
						id='Path_1973'
						width='63.125'
						height='44.598'
						x='0'
						y='38.598'
						filterUnits='userSpaceOnUse'
					>
						<feOffset dx='2' dy='2' />
						<feGaussianBlur result='blur' stdDeviation='1' />
						<feFlood flood-opacity='.302' />
						<feComposite in2='blur' operator='in' />
						<feComposite in='SourceGraphic' />
					</filter>
					<filter
						id='Path_1974'
						width='63.125'
						height='44.598'
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
						id='Path_1976'
						width='23.406'
						height='37.641'
						x='5.053'
						y='9.957'
						filterUnits='userSpaceOnUse'
					>
						<feOffset dx='2' dy='2' />
						<feGaussianBlur result='blur-3' stdDeviation='2' />
						<feFlood flood-opacity='.451' />
						<feComposite in2='blur-3' operator='in' />
						<feComposite in='SourceGraphic' />
					</filter>
					<filter
						id='Path_1978'
						width='32.506'
						height='38.735'
						x='25.368'
						y='9.747'
						filterUnits='userSpaceOnUse'
					>
						<feOffset dx='2' dy='2' />
						<feGaussianBlur result='blur-4' stdDeviation='2' />
						<feFlood flood-opacity='.451' />
						<feComposite in2='blur-4' operator='in' />
						<feComposite in='SourceGraphic' />
					</filter>
				</defs>
				<g id='countdown-billing-16' transform='translate(-75.079 -65.123)'>
					<g
						id='countdown-billing-16-2'
						data-name='countdown-billing-16'
						transform='translate(72.46 63.579)'
					>
						<g id='Countdown_Boards' data-name='Countdown Boards'>
							<g class='cls-8' transform='translate(2.62 1.54)'>
								<path
									id='Path_1973-2'
									d='M62.985 66.62v34.467a4.125 4.125 0 0 1-4.132 4.132H9.992a4.132 4.132 0 0 1-4.132-4.132V66.62z'
									class='cls-1'
									data-name='Path 1973'
									transform='translate(-4.86 -27.02)'
								/>
							</g>
							<g class='cls-7' transform='translate(2.62 1.54)'>
								<path
									id='Path_1974-2'
									d='M58.854 4.12H9.992A4.138 4.138 0 0 0 5.86 8.252v30.606h4.632v3.86h47.861v-3.86h4.632V8.252a4.132 4.132 0 0 0-4.131-4.132z'
									class='cls-2'
									data-name='Path 1974'
									transform='translate(-4.86 -3.12)'
								/>
							</g>
						</g>
						<path
							id='Path_1975'
							d='M25.6 79.317h-5.85v4.724h16.434v-4.724h-5.552V66.62H25.6z'
							class='cls-3'
							data-name='Path 1975'
							transform='translate(-7.553 -25.478)'
						/>
						<g class='cls-6' transform='translate(2.62 1.54)'>
							<path
								id='Path_1976-2'
								d='M28.355 25.1L18.9 34.326l2.631 3.074 3.749-3.749v17.09h5.027V25.1z'
								class='cls-4'
								data-name='Path 1976'
								transform='translate(-9.85 -11.14)'
							/>
						</g>
						<path
							id='Path_1977'
							d='M67.293 76.121c0 2.069-1.235 3.767-3.316 3.767h-3.841c-1.989 0-3.316-1.7-3.316-3.767V68H51.8v9.084a7.232 7.232 0 0 0 7.23 7.416h6.126a7.17 7.17 0 0 0 7.144-7.416V68h-5.007z'
							class='cls-3'
							data-name='Path 1977'
							transform='translate(-19.809 -26.005)'
						/>
						<g class='cls-5' transform='translate(2.62 1.54)'>
							<path
								id='Path_1978-2'
								d='M65.156 41.657h-4.588a5.268 5.268 0 0 0-3.761 1.7V33.1a3.507 3.507 0 0 1 3.316-3.761h3.841a3.507 3.507 0 0 1 3.317 3.761v3.835h4.873v-4.721A7.189 7.189 0 0 0 65 24.76h-5.97a7.25 7.25 0 0 0-7.23 7.454v19.25h5.021v-3.9a3.644 3.644 0 0 1 3.088-1.624h4.064a3.405 3.405 0 0 1 3.316 3.705v1.853H72.3v-2.387a7.179 7.179 0 0 0-7.144-7.454z'
								class='cls-4'
								data-name='Path 1978'
								transform='translate(-22.43 -11.01)'
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

export default CountDown16;
