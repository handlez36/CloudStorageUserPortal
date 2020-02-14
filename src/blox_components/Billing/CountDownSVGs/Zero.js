import React, { Component } from 'react';

class Zero extends Component {
	render() {
		const { text } = this.props;

		return (
			<svg
				xmlns='http://www.w3.org/2000/svg'
				xlink='http://www.w3.org/1999/xlink'
				width='57.599'
				height='77.854'
				viewBox='0 0 57.599 77.854'
			>
				<defs>
					<filter
						id='Upper_zero'
						x='14.87'
						y='8.934'
						width='31.973'
						height='34.993'
						filterUnits='userSpaceOnUse'
					>
						<feOffset dx='2' dy='2' input='SourceAlpha' />
						<feGaussianBlur stdDeviation='1' result='blur' />
						<feFlood flood-opacity='0.451' />
						<feComposite operator='in' in2='blur' />
						<feComposite in='SourceGraphic' />
					</filter>
				</defs>
				<g
					id='countndown_0__duetoday'
					data-name='countndown_0!_duetoday'
					transform='translate(-75.264 -65.751)'
				>
					<g
						id='Countdown_Timer_-_22_Days'
						data-name='Countdown Timer - 22 Days'
						transform='translate(71.826 62.998)'
					>
						<path
							id='Bottom_board'
							data-name='Bottom board'
							class='cls-1'
							d='M63.119,66.92v34.76a4.167,4.167,0,0,1-4.167,4.167H9.687A4.173,4.173,0,0,1,5.52,101.68V66.92Z'
							transform='translate(-2.082 -25.24)'
						/>
						{/* <text fill='white' x='10' y='10' font-size='60px'>
							MED
						</text> */}
						<path
							id='Top_Board'
							data-name='Top Board'
							class='cls-2'
							d='M58.965,4.42H9.687A4.173,4.173,0,0,0,5.52,8.587V39.454h4.659v3.893H58.448V39.454h4.671V8.587A4.167,4.167,0,0,0,58.965,4.42Z'
							transform='translate(-2.082 -1.667)'
						/>
						<path
							id='Lower_zero'
							data-name='Lower zero'
							class='cls-3'
							d='M51.479,76.855a3.83,3.83,0,0,1-3.855,4.017H40.342a3.98,3.98,0,0,1-3.855-4.017V66.89H31V77.758a8.153,8.153,0,0,0,8.2,8.1h9.592a8.1,8.1,0,0,0,8.2-8.1V66.909H51.479Z'
							transform='translate(-11.692 -25.229)'
						/>
						<g class='cls-5' filter='url(#Upper_zero)' transform='matrix(1, 0, 0, 1, 3.44, 2.75)'>
							<path
								id='Upper_zero-2'
								data-name='Upper zero'
								class='cls-4'
								d='M48.775,20.37H39.184A8.178,8.178,0,0,0,31,28.572v20.79h5.493V29.482a3.955,3.955,0,0,1,3.849-4.111h7.281a3.825,3.825,0,0,1,3.855,4.1V49.362h5.493V28.572a8.1,8.1,0,0,0-8.2-8.2Z'
								transform='translate(-15.13 -10.44)'
							/>
						</g>
						<text
							font-family='Bourgeois-MediumCondensed'
							fill='white'
							x='22'
							y='73'
							font-size='15px'
						>
							{text}
						</text>
					</g>
				</g>
			</svg>
		);
	}
}

export default Zero;
