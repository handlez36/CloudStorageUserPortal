import React, { Component } from 'react';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
const CDN_URL = process.env.REACT_APP_CDN_URL;
const CheckMark = `${CDN_URL}support/icons-check.svg`;

class PageStatus extends Component {
	constructor(props) {
		super(props);

		this.state = {
			percentage: 0,
		};
	}
	displayIndicators(attributes) {
		return attributes.map((attribute, index) => {
			const percentageNum = attribute.total === 0 ? 0 : attribute.completed / attribute.total;

			const percentage = Math.round(percentageNum * 100);
			const StyleOne = {
				path: {
					pathTransitionDuration: 'none',
					stroke: '#8060a9',
				},
			};
			const StyleTwo = {
				path: {
					pathTransitionDuration: 'none',
					stroke: '#b5d334',
				},
			};

			return (
				<div key={attribute.key} className={`indicator-wrapper indicator-${index}`}>
					<CircularProgressbarWithChildren
						value={percentage}
						strokeWidth={6}
						styles={percentage > 0 ? StyleTwo : StyleOne}
					>
						<img src={attribute.showCheckMark ? CheckMark : attribute.icon} />
					</CircularProgressbarWithChildren>
				</div>
			);
		});
	}

	// positionProgressIndicators = () => {
	// 	const { attributes } = this.props;

	// 	attributes.map((attribute, index) => {
	// 		const solidIndicator = document.querySelector(`.progress-indicator-${index}`);
	// 		const svg = document.querySelector(`.svg-indicator-${index}`);
	// 		if (solidIndicator && svg) {
	// 			const top = solidIndicator.getBoundingClientRect().top;
	// 			const left = solidIndicator.getBoundingClientRect().left;

	// 			svg.setAttribute('style', `top: ${Math.round(top) - 1}px;left: ${Math.round(left) - 1}px`);
	// 		}
	// 	});
	// };

	// componentDidUpdate(prevState) {
	// 	const { attributes, pageTitle } = this.props;
	// 	setTimeout(this.displayIndicators(attributes), 2000);
	// 	attributes.map((attribute, index) => {
	// 		const percentageComplete = attribute.total === 0 ? 0 : attribute.completed / attribute.total;
	// 		const indicator = document.querySelector(`.indicator.indicator-${index}`);
	// 		//	indicator.setAttribute('style', `stroke-dashoffset: ${220 - 220 * percentageComplete}`);
	// 	});
	// 	this.positionProgressIndicators();
	// }

	// componentDidMount() {
	// 	//	window.onresize = this.positionProgressIndicators;
	// }

	render() {
		const { attributes, pageTitle } = this.props;

		return (
			<div className='page-status'>
				<div className='wrapper'>{this.displayIndicators(attributes)}</div>
			</div>
		);
	}
}

export default PageStatus;
