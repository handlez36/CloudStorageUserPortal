import React, { Component } from 'react';

class TestCircle extends Component {
	render() {
		const { index, id } = this.props;

		return (
			<svg
				className={`svg-indicator-${index} ${id}`}
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 80.99 80.99'
			>
				<circle
					className={`indicator indicator-${index}`}
					cx='50%'
					cy='50%'
					r='35'
					stroke='#BBD053'
					fill='transparent'
					strokeWidth='5' // used to be stroke-width
				/>
			</svg>
		);
	}
}

export default TestCircle;
