import React, { Component } from 'react';

class CountDown24 extends Component {
	render() {
		const { text } = this.props;

		return (
			<svg
				xmlns='http://www.w3.org/2000/svg'
				width='63.689'
				height='82.932'
				viewBox='0 0 63.689 82.932'
			>
				<defs>
					{/* <style>
            .cls-1{fill:#7c7a7c}.cls-2{fill:#3e3e3e}.cls-3{fill:#b5d334}.cls-4{fill:#949300}.cls-5{filter:url(#Path_1926)}.cls-6{filter:url(#Path_1924)}.cls-7{filter:url(#Path_1922)}.cls-8{filter:url(#Path_1921)}
        </style> */}
					<filter
						id='Path_1921'
						width='63.689'
						height='44.478'
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
						id='Path_1922'
						width='63.689'
						height='44.466'
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
						id='Path_1924'
						width='32.515'
						height='37.555'
						x='2.91'
						y='9.922'
						filterUnits='userSpaceOnUse'
					>
						<feOffset dx='2' dy='2' />
						<feGaussianBlur result='blur-3' stdDeviation='2' />
						<feFlood flood-opacity='.451' />
						<feComposite in2='blur-3' operator='in' />
						<feComposite in='SourceGraphic' />
					</filter>
					<filter
						id='Path_1926'
						width='29.361'
						height='37.629'
						x='26.422'
						y='9.854'
						filterUnits='userSpaceOnUse'
					>
						<feOffset dx='2' dy='2' />
						<feGaussianBlur result='blur-4' stdDeviation='2' />
						<feFlood flood-opacity='.451' />
						<feComposite in2='blur-4' operator='in' />
						<feComposite in='SourceGraphic' />
					</filter>
				</defs>
				<g id='countdown-billing-24' transform='translate(-74.354 -64.746)'>
					<g
						id='countdown-billing-24-2'
						data-name='countdown-billing-24'
						transform='translate(72.029 63.323)'
					>
						<g id='Countdown_Boards' data-name='Countdown Boards'>
							<g class='cls-8' transform='translate(2.32 1.422)'>
								<path
									id='Path_1921-2'
									d='M63.089 66.27v34.359a4.152 4.152 0 0 1-4.179 4.119H9.572a4.146 4.146 0 0 1-4.172-4.119V66.27z'
									class='cls-1'
									data-name='Path 1921'
									transform='translate(-4.4 -26.82)'
								/>
							</g>
							<g class='cls-7' transform='translate(2.32 1.422)'>
								<path
									id='Path_1922-2'
									d='M58.91 3.77H9.572a4.194 4.194 0 0 0-2.952 1.2A4.086 4.086 0 0 0 5.4 7.889v30.5h4.677v3.848h48.334v-3.849h4.677V7.889a4.092 4.092 0 0 0-1.224-2.915A4.2 4.2 0 0 0 58.91 3.77z'
									class='cls-2'
									data-name='Path 1922'
									transform='translate(-4.4 -2.77)'
								/>
							</g>
						</g>
						<path
							id='Path_1923'
							d='M14.71 81.411v2.149h20.913v-4.6H21.611l7.96-12.7h-5.442z'
							class='cls-3'
							data-name='Path 1923'
							transform='translate(-5.654 -25.383)'
						/>
						<g class='cls-6' transform='translate(2.32 1.42)'>
							<path
								id='Path_1924-2'
								d='M35.513 38.836v-6.6a7.326 7.326 0 0 0-7.265-7.486h-6.082A7.24 7.24 0 0 0 15 32.236v4.925h4.925V33.2a3.575 3.575 0 0 1 3.337-3.786h3.78a3.588 3.588 0 0 1 3.411 3.786v5.485a4.433 4.433 0 0 1-.677 2.666l-5.541 8.951h5.436l4.494-7.166a8.145 8.145 0 0 0 1.348-4.3z'
								class='cls-4'
								data-name='Path 1924'
								transform='translate(-8.09 -10.83)'
							/>
						</g>
						<path
							id='Path_1925'
							d='M63.248 69.514H53.3l1.662-3.244H50.75l-2.61 5.042v2.764h15.108V83.5h4.864v-9.424h3.515v-4.562h-3.515V66.27h-4.864z'
							class='cls-3'
							data-name='Path 1925'
							transform='translate(-17.977 -25.387)'
						/>
						<g class='cls-5' transform='translate(2.32 1.42)'>
							<path
								id='Path_1926-2'
								d='M65.7 24.64L52.38 50.269h4.211l8.287-16.056v16.056h4.864V24.64z'
								class='cls-4'
								data-name='Path 1926'
								transform='translate(-21.96 -10.79)'
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

export default CountDown24;
