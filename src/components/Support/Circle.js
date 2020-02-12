import React, { Component } from 'react';
import { Utils } from '../../services/utils';

class Circle extends Component {
	render() {
		const { index } = this.props;

		const indicatorWidth = Utils.scalePxUsingVw(34);
		const marginAmt = Utils.scalePxUsingVw(5.2);
		const marginLeft = indicatorWidth * index + marginAmt * (index + 1);

		return (
			<svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'>
				<circle cx='50' cy='50' r='50' />
			</svg>
			// <svg className={`svg-indicator-${index}`} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80.99 80.99'>
			// 	<circle
			// 		className={`indicator indicator-${index}`}
			// 		cx='50%'
			// 		cy='50%'
			// 		r='35'
			// 		stroke='#BBD053'
			// 		fill='transparent'
			// 		strokeWidth='5' // used to be stroke-width
			// 	/>
			// </svg>
		);
	}
}

export default Circle;
