import React, { Component } from 'react';

class CountDown7 extends Component {
	render() {
		const { text } = this.props;

		return (
			<svg
				xmlns='http://www.w3.org/2000/svg'
				width='63.666'
				height='83.927'
				viewBox='0 0 63.666 83.927'
			>
				<defs>
					{/* <style>
            .cls-1{fill:#7c7a7c}.cls-2{fill:#3e3e3e}.cls-3{fill:#b5d334}.cls-4{fill:#949300}.cls-5{filter:url(#Path_1956)}.cls-6{filter:url(#Path_1954)}.cls-7{filter:url(#Path_1953)}
        </style> */}
					<filter
						id='Path_1953'
						width='63.635'
						height='44.963'
						x='0'
						y='38.964'
						filterUnits='userSpaceOnUse'
					>
						<feOffset dx='2' dy='2' />
						<feGaussianBlur result='blur' stdDeviation='1' />
						<feFlood flood-opacity='.302' />
						<feComposite in2='blur' operator='in' />
						<feComposite in='SourceGraphic' />
					</filter>
					<filter
						id='Path_1954'
						width='63.666'
						height='44.951'
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
						id='Path_1956'
						width='32.51'
						height='38.85'
						x='16.101'
						y='9.113'
						filterUnits='userSpaceOnUse'
					>
						<feOffset dx='2' dy='2' />
						<feGaussianBlur result='blur-3' stdDeviation='2' />
						<feFlood flood-opacity='.451' />
						<feComposite in2='blur-3' operator='in' />
						<feComposite in='SourceGraphic' />
					</filter>
				</defs>
				<g id='countdown-billing-07' transform='translate(-198.629 -63.523)'>
					<g id='CountdownTimer_7' transform='translate(196.318 62.173)'>
						<g id='countdown-billing-07-2' data-name='countdown-billing-07'>
							<g id='Countdown_Boards' data-name='Countdown Boards'>
								<g class='cls-7' transform='translate(2.31 1.35)'>
									<path
										id='Path_1953-2'
										d='M62.945 66.27v34.793a4.177 4.177 0 0 1-4.171 4.171H9.481a4.171 4.171 0 0 1-4.171-4.171V66.27z'
										class='cls-1'
										data-name='Path 1953'
										transform='translate(-4.31 -26.31)'
									/>
								</g>
								<g class='cls-6' transform='translate(2.31 1.35)'>
									<path
										id='Path_1954-2'
										d='M58.774 3.77H9.481A4.164 4.164 0 0 0 5.31 7.941v30.884h4.676v3.9H58.3v-3.9h4.676V7.941a4.171 4.171 0 0 0-4.2-4.171z'
										class='cls-2'
										data-name='Path 1954'
										transform='translate(-4.31 -2.77)'
									/>
								</g>
							</g>
							<path
								id='Path_1955'
								d='M40.76 82.847h5.611l4.744-16.577h-5.524z'
								class='cls-3'
								data-name='Path 1955'
								transform='translate(-15.35 -24.956)'
							/>
							<g class='cls-5' transform='translate(2.31 1.35)'>
								<path
									id='Path_1956-2'
									d='M56.46 23.2H35.95v4.838h14.289L43.78 50.05h5.53l7.15-24.78z'
									class='cls-4'
									data-name='Path 1956'
									transform='translate(-15.85 -10.09)'
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
				</g>
			</svg>
		);
	}
}

export default CountDown7;
