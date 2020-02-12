import React, { Component } from 'react';

class DueToday extends Component {
	render() {
		const { text } = this.props;

		return (
			<svg
				xmlns='http://www.w3.org/2000/svg'
				width='63.599'
				height='83.854'
				viewBox='0 0 63.599 83.854'
			>
				<defs>
					<filter
						id='Path_2037'
						width='63.599'
						height='44.927'
						x='0'
						y='38.927'
						filterUnits='userSpaceOnUse'
					>
						<feOffset dx='2' dy='2' />
						<feGaussianBlur result='blur' stdDeviation='1' />
						<feFlood flood-opacity='.302' />
						<feComposite in2='blur' operator='in' />
						<feComposite in='SourceGraphic' />
					</filter>
					<filter
						id='Path_2038'
						width='63.599'
						height='44.927'
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
						id='Path_2042'
						width='31.973'
						height='34.993'
						x='15.87'
						y='9.934'
						filterUnits='userSpaceOnUse'
					>
						<feOffset dx='2' dy='2' />
						<feGaussianBlur result='blur-3' stdDeviation='1' />
						<feFlood flood-opacity='.451' />
						<feComposite in2='blur-3' operator='in' />
						<feComposite in='SourceGraphic' />
					</filter>
				</defs>
				<g
					id='countndown_0__duetoday'
					data-name='countndown_0!_duetoday'
					transform='translate(-74.264 -64.751)'
				>
					<g
						id='Countdown_Timer_-_22_Days'
						data-name='Countdown Timer - 22 Days'
						transform='translate(71.826 62.998)'
					>
						<g class='cls-8' filter='url(#Path_2037)' transform='translate(2.44 1.75)'>
							<path
								id='Path_2037-2'
								d='M63.119 66.92v34.76a4.167 4.167 0 0 1-4.167 4.167H9.687a4.173 4.173 0 0 1-4.167-4.167V66.92z'
								class='cls-1'
								data-name='Path 2037'
								transform='translate(-4.52 -26.99)'
							/>
						</g>
						<g class='cls-7' filter='url(#Path_2038)' transform='translate(2.44 1.75)'>
							<path
								id='Path_2038-2'
								d='M58.965 4.42H9.687A4.173 4.173 0 0 0 5.52 8.587v30.867h4.659v3.893h48.269v-3.893h4.671V8.587a4.167 4.167 0 0 0-4.154-4.167z'
								class='cls-2'
								data-name='Path 2038'
								transform='translate(-4.52 -3.42)'
							/>
						</g>
						<path
							id='Path_2039'
							d='M47.34 60.556a2.7 2.7 0 1 1 2.684 2.684 2.7 2.7 0 0 1-2.684-2.684zm.8-4.983l-.7-15.054h5.138l-.673 15.066z'
							//class='cls-3'
							fill='#f23722'
							data-name='Path 2039'
							transform='translate(-17.855 -15.283)'
						/>
						<path
							id='Path_2041'
							d='M51.479 76.855a3.83 3.83 0 0 1-3.855 4.017h-7.282a3.98 3.98 0 0 1-3.855-4.017V66.89H31v10.868a8.153 8.153 0 0 0 8.2 8.1h9.592a8.1 8.1 0 0 0 8.2-8.1V66.909h-5.513z'
							fill='#b5d334'
							data-name='Path 2041'
							transform='translate(-11.692 -25.229)'
						/>
						<g class='cls-6' filter='url(#Path_2042)' transform='translate(2.44 1.75)'>
							<path
								id='Path_2042-2'
								d='M48.775 20.37h-9.591A8.178 8.178 0 0 0 31 28.572v20.79h5.493v-19.88a3.955 3.955 0 0 1 3.849-4.111h7.281a3.825 3.825 0 0 1 3.855 4.1v19.891h5.493v-20.79a8.1 8.1 0 0 0-8.2-8.2z'
								fill='#949300'
								data-name='Path 2042'
								transform='translate(-14.13 -9.44)'
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

export default DueToday;
