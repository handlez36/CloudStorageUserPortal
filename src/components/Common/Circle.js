import React, { Component } from 'react';

class Circle extends Component {
	render() {
		const { location } = this.props;

		return (
			<svg viewBox='0 0 80.99 80.99'>
				<circle cx='40' cy='40' r='30' stroke='white' strokeWidth='1' fill={'transparent'} />
				<text
					className={'location-title'}
					x='20%'
					y='100%'
					strokeWidth='2px'
					fontSize='12px'
					fill='white'
					textAnchor='start'
				>
					{location}
				</text>
			</svg>
		);
	}
}

export default Circle;
