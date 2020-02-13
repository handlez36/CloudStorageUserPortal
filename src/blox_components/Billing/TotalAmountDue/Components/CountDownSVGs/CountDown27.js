import React, { Component } from 'react';

class CountDown27 extends Component {
	render() {
		const { text } = this.props;

		return (
			<svg
				xmlns='http://www.w3.org/2000/svg'
				width='75.073'
				height='95.126'
				viewBox='0 0 75.073 95.126'
			>
				<defs>
					{/* <style>
            .cls-1{fill:#7c7a7c}.cls-2{fill:#3e3e3e}.cls-3{fill:#b5d334}.cls-4{fill:#949300}.cls-5{filter:url(#Path_2008)}.cls-6{filter:url(#Path_2006)}.cls-7{filter:url(#Path_2004)}.cls-8{filter:url(#Path_2003)}
        </style> */}
					<filter
						id='Path_2003'
						width='75.073'
						height='56.563'
						x='0'
						y='38.563'
						filterUnits='userSpaceOnUse'
					>
						<feOffset dx='2' dy='2' />
						<feGaussianBlur result='blur' stdDeviation='3' />
						<feFlood flood-opacity='.161' />
						<feComposite in2='blur' operator='in' />
						<feComposite in='SourceGraphic' />
					</filter>
					<filter
						id='Path_2004'
						width='75.073'
						height='56.55'
						x='0'
						y='0'
						filterUnits='userSpaceOnUse'
					>
						<feOffset dx='2' dy='2' />
						<feGaussianBlur result='blur-2' stdDeviation='3' />
						<feFlood flood-opacity='.161' />
						<feComposite in2='blur-2' operator='in' />
						<feComposite in='SourceGraphic' />
					</filter>
					<filter
						id='Path_2006'
						width='32.585'
						height='37.612'
						x='9.885'
						y='15.945'
						filterUnits='userSpaceOnUse'
					>
						<feOffset dx='2' dy='2' />
						<feGaussianBlur result='blur-3' stdDeviation='2' />
						<feFlood flood-opacity='.451' />
						<feComposite in2='blur-3' operator='in' />
						<feComposite in='SourceGraphic' />
					</filter>
					<filter
						id='Path_2008'
						width='32.3'
						height='37.599'
						x='33.48'
						y='15.963'
						filterUnits='userSpaceOnUse'
					>
						<feOffset dx='2' dy='2' />
						<feGaussianBlur result='blur-4' stdDeviation='2' />
						<feFlood flood-opacity='.451' />
						<feComposite in2='blur-4' operator='in' />
						<feComposite in='SourceGraphic' />
					</filter>
				</defs>
				<g id='countdown-billing-27' transform='translate(-67.057 -58.944)'>
					<g
						id='countdown-billing-27-2'
						data-name='countdown-billing-27'
						transform='translate(70.49 63.618)'
					>
						<g id='Countdown_Boards' data-name='Countdown Boards'>
							<g class='cls-8' transform='translate(-3.43 -4.67)'>
								<path
									id='Path_2003-2'
									d='M62.853 66.27v34.435a4.134 4.134 0 0 1-4.128 4.128H9.908a4.134 4.134 0 0 1-4.128-4.128V66.27z'
									class='cls-1'
									data-name='Path 2003'
									transform='translate(1.22 -20.71)'
								/>
							</g>
							<g class='cls-7' transform='translate(-3.43 -4.67)'>
								<path
									id='Path_2004-2'
									d='M58.725 3.77H9.908A4.128 4.128 0 0 0 5.78 7.9v30.564h4.628v3.856h47.817v-3.856h4.628V7.9a4.128 4.128 0 0 0-4.128-4.13z'
									class='cls-2'
									data-name='Path 2004'
									transform='translate(1.22 3.23)'
								/>
							</g>
						</g>
						<path
							id='Path_2005'
							d='M16.7 81.444V83.6h20.953v-4.611H23.61l7.978-12.729h-5.454z'
							class='cls-3'
							data-name='Path 2005'
							transform='translate(-6.396 -25.377)'
						/>
						<g class='cls-6' transform='translate(-3.43 -4.67)'>
							<path
								id='Path_2006-2'
								d='M37.523 38.867v-6.614a7.342 7.342 0 0 0-7.281-7.5h-6.1a7.283 7.283 0 0 0-7.207 7.5v4.936h4.973v-3.968a3.583 3.583 0 0 1 3.344-3.795h3.788a3.6 3.6 0 0 1 3.418 3.795v5.5a4.442 4.442 0 0 1-.679 2.672l-5.553 8.971h5.454l4.5-7.182a8.163 8.163 0 0 0 1.343-4.315z'
								class='cls-4'
								data-name='Path 2006'
								transform='translate(-3.05 -4.81)'
							/>
						</g>
						<path
							id='Path_2007'
							d='M59.99 83.651h5.553l5-17.381h-5.469z'
							class='cls-3'
							data-name='Path 2007'
							transform='translate(-22.976 -25.381)'
						/>
						<g class='cls-5' transform='translate(-3.43 -4.67)'>
							<path
								id='Path_2008-2'
								d='M75.479 24.78H55.18v4.788h14.142l-6.1 20.812H68.7l6.781-23.545z'
								class='cls-4'
								data-name='Path 2008'
								transform='translate(-17.7 -4.82)'
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

export default CountDown27;
