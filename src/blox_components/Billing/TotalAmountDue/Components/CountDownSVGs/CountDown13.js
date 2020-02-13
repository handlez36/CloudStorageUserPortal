import React, { Component } from 'react';

class CountDown13 extends Component {
	render() {
		const { text } = this.props;

		return (
			<svg
				xmlns='http://www.w3.org/2000/svg'
				width='63.814'
				height='84.103'
				viewBox='0 0 63.814 84.103'
			>
				<defs>
					{/* <style>
            .cls-1{fill:#7c7a7c}.cls-2{fill:#3e3e3e}.cls-3{fill:#b5d334}.cls-4{fill:#949300}.cls-5{filter:url(#Path_1966)}.cls-6{filter:url(#Path_1964)}.cls-7{filter:url(#Path_1962)}.cls-8{filter:url(#Path_1961)}
        </style> */}
					<filter
						id='Path_1961'
						width='63.814'
						height='45.051'
						x='0'
						y='39.051'
						filterUnits='userSpaceOnUse'
					>
						<feOffset dx='2' dy='2' />
						<feGaussianBlur result='blur' stdDeviation='1' />
						<feFlood flood-opacity='.302' />
						<feComposite in2='blur' operator='in' />
						<feComposite in='SourceGraphic' />
					</filter>
					<filter
						id='Path_1962'
						width='63.796'
						height='45.051'
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
						id='Path_1964'
						width='23.54'
						height='38.73'
						x='4.529'
						y='9.321'
						filterUnits='userSpaceOnUse'
					>
						<feOffset dx='2' dy='2' />
						<feGaussianBlur result='blur-3' stdDeviation='2' />
						<feFlood flood-opacity='.451' />
						<feComposite in2='blur-3' operator='in' />
						<feComposite in='SourceGraphic' />
					</filter>
					<filter
						id='Path_1966'
						width='31.946'
						height='38.724'
						x='24.646'
						y='9.378'
						filterUnits='userSpaceOnUse'
					>
						<feOffset dx='2' dy='2' />
						<feGaussianBlur result='blur-4' stdDeviation='2' />
						<feFlood flood-opacity='.451' />
						<feComposite in2='blur-4' operator='in' />
						<feComposite in='SourceGraphic' />
					</filter>
				</defs>
				<g id='countdown-billing-13' transform='translate(-74.202 -63.943)'>
					<g
						id='countdown-billing-13-2'
						data-name='countdown-billing-13'
						transform='translate(71.885 62.075)'
					>
						<g id='Countdown_Boards' data-name='Countdown Boards'>
							<g class='cls-8' transform='translate(2.32 1.87)'>
								<path
									id='Path_1961-2'
									d='M63.125 67.09v34.871a4.186 4.186 0 0 1-4.18 4.18H9.49a4.18 4.18 0 0 1-4.18-4.18V67.09z'
									class='cls-1'
									data-name='Path 1961'
									transform='translate(-4.31 -27.04)'
								/>
							</g>
							<g class='cls-7' transform='translate(2.32 1.87)'>
								<path
									id='Path_1962-2'
									d='M58.945 4.59H9.49a4.174 4.174 0 0 0-4.18 4.18v30.966H10v3.905h48.42v-3.905h4.686V8.77a4.18 4.18 0 0 0-4.161-4.18z'
									class='cls-2'
									data-name='Path 1962'
									transform='translate(-4.31 -3.59)'
								/>
							</g>
						</g>
						<path
							id='Path_1963'
							d='M24.127 79.149H18.21v4.786h16.62v-4.786h-5.611V67.09h-5.092z'
							class='cls-3'
							data-name='Path 1963'
							transform='translate(-6.832 -25.171)'
						/>
						<g class='cls-6' transform='translate(2.32 1.87)'>
							<path
								id='Path_1964-2'
								d='M26.92 24.31l-9.56 9.335 2.655 3.112 3.793-3.793V51.04H28.9V24.31z'
								class='cls-4'
								data-name='Path 1964'
								transform='translate(-8.83 -10.99)'
							/>
						</g>
						<path
							id='Path_1965'
							d='M64.18 67.086v8.623a3.5 3.5 0 0 1-3.349 3.749h-3.649a3.487 3.487 0 0 1-3.355-3.749v-3.874h-5v4.917a7.073 7.073 0 0 0 7.085 7.3h6.248a7.073 7.073 0 0 0 7.079-7.3V67.08z'
							class='cls-3'
							data-name='Path 1965'
							transform='translate(-18.318 -25.167)'
						/>
						<g class='cls-5' transform='translate(2.32 1.87)'>
							<path
								id='Path_1966-2'
								d='M65.941 45.1A6.873 6.873 0 0 0 69 39.439V31.7a7.123 7.123 0 0 0-7.073-7.3h-5.289a7.123 7.123 0 0 0-7.079 7.3v5.061h5v-4.02a3.5 3.5 0 0 1 3.349-3.749h2.605a3.536 3.536 0 0 1 3.43 3.749v6.873a3.7 3.7 0 0 1-3.505 3.749h-4.625v4.093h5.142a3.436 3.436 0 0 1 3.486 3.2v.469H69.5v-.462a6.611 6.611 0 0 0-3.559-5.563z'
								class='cls-4'
								data-name='Path 1966'
								transform='translate(-20.91 -11.02)'
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

export default CountDown13;
