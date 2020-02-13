import React, { Component } from 'react';

class CountDown2 extends Component {
	render() {
		const { text } = this.props;

		return (
			<svg
				xmlns='http://www.w3.org/2000/svg'
				width='63.92'
				height='84.271'
				viewBox='0 0 63.92 84.271'
			>
				<defs>
					<filter
						id='Path_1937'
						width='63.92'
						height='45.136'
						x='0'
						y='39.136'
						filterUnits='userSpaceOnUse'
					>
						<feOffset dx='2' dy='2' />
						<feGaussianBlur result='blur' stdDeviation='1' />
						<feFlood flood-opacity='.302' />
						<feComposite in2='blur' operator='in' />
						<feComposite in='SourceGraphic' />
					</filter>
					<filter
						id='Path_1938'
						width='63.92'
						height='45.123'
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
						id='Path_1940'
						width='32.891'
						height='38.687'
						x='14.764'
						y='9.245'
						filterUnits='userSpaceOnUse'
					>
						<feOffset dx='2' dy='2' />
						<feGaussianBlur result='blur-3' stdDeviation='2' />
						<feFlood flood-opacity='.451' />
						<feComposite in2='blur-3' operator='in' />
						<feComposite in='SourceGraphic' />
					</filter>
				</defs>
				<g id='countdown-billing-02' transform='translate(-199.029 -63.361)'>
					<g
						id='countdown-billing-02-2'
						data-name='countdown-billing-02'
						transform='translate(196.359 62.035)'
					>
						<g id='Countdown_Boards' data-name='Countdown Boards'>
							<g class='cls-7' filter='url(#Path_1937)' transform='translate(2.67 1.325)'>
								<path
									id='Path_1937-2'
									d='M63.781 66.27v34.946a4.189 4.189 0 0 1-4.189 4.189H10.049a4.2 4.2 0 0 1-4.189-4.189V66.27z'
									class='cls-1'
									data-name='Path 1937'
									transform='translate(-4.86 -26.13)'
								/>
							</g>
							<g class='cls-6' filter='url(#Path_1938)' transform='translate(2.67 1.325)'>
								<path
									id='Path_1938-2'
									d='M59.591 3.77H10.049A4.189 4.189 0 0 0 5.86 7.959v31.02h4.7v3.914h48.524v-3.914h4.7V7.959a4.183 4.183 0 0 0-4.193-4.189z'
									class='cls-2'
									data-name='Path 1938'
									transform='translate(-4.86 -2.77)'
								/>
							</g>
						</g>
						<path
							id='Path_1939'
							d='M33.99 80.6v2.2h21.265v-4.681H41l7.655-12.229h-5.529z'
							class='cls-3'
							data-name='Path 1939'
							transform='translate(-12.707 -24.632)'
						/>
						<g transform='translate(2.67 1.33)'>
							<path
								id='Path_1940-2'
								d='M55.119 37.6v-6.71a7.458 7.458 0 0 0-7.389-7.62h-6.186a7.393 7.393 0 0 0-7.314 7.62v5.01h5.053v-4.033a3.639 3.639 0 0 1 3.394-3.845h3.845a3.648 3.648 0 0 1 3.469 3.845v5.579a4.571 4.571 0 0 1-.676 2.718l-6.086 9.793h5.535l5.009-7.984a8.259 8.259 0 0 0 1.346-4.373z'
								class='cls-4'
								data-name='Path 1940'
								transform='translate(-15.47 -10.02)'
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

export default CountDown2;
