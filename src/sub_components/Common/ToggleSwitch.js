import React, { Component } from 'react';

class ToggleSwitch extends Component {
	state = {
		on: false,
	};

	onClicked = () => {
		const { onToggle } = this.props;

		if (onToggle) {
			onToggle();
		}
	};

	componentDidUpdate() {
		const { on: incomingState } = this.props;
		const { on: existingState } = this.state;

		if (incomingState !== existingState) {
			this.setState({ on: incomingState });
		}
	}

	componentDidMount() {
		const g = document.querySelector('g');
		const transform = getComputedStyle(g).getPropertyValue('transform');
		g.setAttribute('transform', transform);
	}

	render() {
		const { on } = this.props;

		return (
			<svg
				className={`toggle-slider ${on ? 'on' : 'off'}`}
				onClick={this.onClicked}
				viewBox='0 0 40 20'
			>
				<rect
					width='300'
					height='100'
					fill={on ? 'rgba(91, 89, 91, 0.8)' : 'rgba(91, 89, 91, 0.2)'}
					className='slot'
				/>
				<g
					transform={on ? 'matrix(1, 0, 0, 1, 20, 0)' : 'matrix(1, 0, 0, 1, 0, 0)'}
					transition='transform 0.5s'
				>
					<path
						fill={on ? '#b5d334' : 'rgba(91, 89, 91, 0.2)'}
						d='M10,1 a8,8 0 0 1 0,18 a8,8 0 0 1 0,-18'
						className='slider'
					/>
				</g>
			</svg>
		);
	}
}
export default ToggleSwitch;
