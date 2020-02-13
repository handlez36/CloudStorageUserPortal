import React, { Component } from 'react';

class CountDown1 extends Component {
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
					<filter
						id='Path_1933'
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
						id='Path_1934'
						width='63.029'
						height='44.657'
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
				</defs>
				<g id='countdown-billing-01' transform='translate(-199.554 -64.035)'>
					<g id='CountdownTimer_1' transform='translate(197.107 62.702)'>
						<g id='Countdown_board' data-name='Countdown board'>
							<g class='cls-6' transform='translate(2.45 1.33)'>
								<path
									id='Path_1933-2'
									d='M62.6 66.27v34.53a4.138 4.138 0 0 1-4.125 4.139H9.695A4.138 4.138 0 0 1 5.57 100.8V66.27z'
									class='cls-1'
									data-name='Path 1933'
									transform='translate(-4.57 -26.6)'
								/>
							</g>
							<g class='number-filter' transform='translate(2.45 1.33)'>
								<path
									id='Path_1934-2'
									d='M58.474 3.77H9.695A4.132 4.132 0 0 0 5.57 7.909V38.56h4.624v3.867h47.781V38.56H62.6V7.909a4.132 4.132 0 0 0-4.126-4.139z'
									class='cls-2'
									data-name='Path 1934'
									transform='translate(-4.57 -2.77)'
								/>
							</g>
						</g>
						<path
							id='Path_1935'
							d='M43.965 78.094H38.1v4.739h16.464v-4.739H49V66.24h-5.035z'
							class='cls-3'
							data-name='Path 1935'
							transform='translate(-14.623 -25.257)'
						/>
						<path
							id='Path_1936'
							d='M46.722 23.32l-9.472 9.243 2.629 3.081 3.762-3.756v17.987h5.036V23.32z'
							class='cls-4'
							data-name='Path 1936'
							transform='translate(-14.288 -8.892)'
						/>
						<text
							font-family='Bourgeois-MediumCondensed'
							fill='white'
							x='14'
							y='73'
							font-size='14px'
						>
							DAY LEFT
						</text>
					</g>
				</g>
			</svg>
		);
	}
}

export default CountDown1;
