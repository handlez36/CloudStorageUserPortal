import React, { Component } from 'react';

class CountDown3 extends Component {
	render() {
		const { text } = this.props;

		return (
			<svg
				xmlns='http://www.w3.org/2000/svg'
				width='63.589'
				height='83.876'
				viewBox='0 0 63.589 83.876'
			>
				<defs>
					{/* <style>
            .cls-1{fill:#7c7a7c}.cls-2{fill:#3e3e3e}.cls-3{fill:#b5d334}.cls-4{fill:#949300}.cls-5{filter:url(#Path_1944)}.cls-6{filter:url(#Path_1942)}.cls-7{filter:url(#Path_1941)}
        </style> */}
					<filter
						id='Path_1941'
						width='63.589'
						height='44.938'
						x='0'
						y='38.938'
						filterUnits='userSpaceOnUse'
					>
						<feOffset dx='2' dy='2' />
						<feGaussianBlur result='blur' stdDeviation='1' />
						<feFlood flood-opacity='.302' />
						<feComposite in2='blur' operator='in' />
						<feComposite in='SourceGraphic' />
					</filter>
					<filter
						id='Path_1942'
						width='63.589'
						height='44.926'
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
						id='Path_1944'
						width='31.889'
						height='38.87'
						x='15.875'
						y='9.043'
						filterUnits='userSpaceOnUse'
					>
						<feOffset dx='2' dy='2' />
						<feGaussianBlur result='blur-3' stdDeviation='2' />
						<feFlood flood-opacity='.451' />
						<feComposite in2='blur-3' operator='in' />
						<feComposite in='SourceGraphic' />
					</filter>
				</defs>
				<g id='countdown-billing-03' transform='translate(-198.704 -62.55)'>
					<g
						id='countdown-billing-03-2'
						data-name='countdown-billing-03'
						transform='translate(196.34 61.201)'
					>
						<g id='Countdown_Boards' data-name='Countdown Boards'>
							<g class='cls-7' transform='translate(2.36 1.35)'>
								<path
									id='Path_1941-2'
									d='M62.989 66.27v34.77a4.173 4.173 0 0 1-4.171 4.168H9.565A4.167 4.167 0 0 1 5.4 101.04V66.27z'
									class='cls-1'
									data-name='Path 1941'
									transform='translate(-4.4 -26.33)'
								/>
							</g>
							<g class='cls-6' transform='translate(2.36 1.35)'>
								<path
									id='Path_1942-2'
									d='M58.818 3.77H9.565A4.16 4.16 0 0 0 5.4 7.938V38.8h4.669v3.9H58.32v-3.9h4.669V7.938a4.167 4.167 0 0 0-4.171-4.168z'
									class='cls-2'
									data-name='Path 1942'
									transform='translate(-4.4 -2.77)'
								/>
							</g>
						</g>
						<path
							id='Path_1943'
							d='M50.305 66.266v8.3A3.491 3.491 0 0 1 46.96 78.3h-3.639a3.476 3.476 0 0 1-3.339-3.738V70.7H35v4.9a7.052 7.052 0 0 0 7.065 7.277h6.23a7.052 7.052 0 0 0 7.059-7.277v-9.34z'
							class='cls-3'
							data-name='Path 1943'
							transform='translate(-13.211 -24.979)'
						/>
						<g class='cls-5' transform='translate(2.36 1.35)'>
							<path
								id='Path_1944-2'
								d='M52.1 43.74a6.853 6.853 0 0 0 3.042-5.64v-7.723a7.1 7.1 0 0 0-7.09-7.277h-5.271a7.1 7.1 0 0 0-7.052 7.277v5.046h4.984v-4.012a3.49 3.49 0 0 1 3.339-3.738h2.6a3.534 3.534 0 0 1 3.414 3.738v6.853A3.682 3.682 0 0 1 46.575 42h-4.61v4.081h5.146a3.427 3.427 0 0 1 3.458 3.119v.766h5.046v-.76a6.591 6.591 0 0 0-3.52-5.47z'
								class='cls-4'
								data-name='Path 1944'
								transform='translate(-15.85 -10.06)'
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

export default CountDown3;
