import React, { Component } from 'react';
import { number } from 'prop-types';

import CircleIndicator from '../../components/Common/CircleIndicator';
const CDN_URL = process.env.REACT_APP_CDN_URL;
const ProgressCircle = `${CDN_URL}storage/progress-circle.svg`;

class SmallProgressCircle extends Component {
	componentDidMount() {
		this.updatePercentage();
	}
	componentDidUpdate() {
		this.updatePercentage();
	}
	updatePercentage = () => {
		const { total, id, overQuota, percent } = this.props;

		if (!overQuota && total !== 0) {
			const percentShown = percent === 0 ? 220 : 220 - 220 * (percent / total);

			document
				.querySelector(`.indicator.total-indicator-${id}`)
				.setAttribute('style', `stroke-dashoffset: ${percentShown}`);
		} else if (total === 0) {
			const percentShown = 0;
			document
				.querySelector(`.indicator.total-indicator-${id}`)
				.setAttribute('style', `stroke-dashoffset: ${percentShown}`);
		} else {
			const percentShown = percent === 0 ? 220 : 220 * (percent / total);
			document
				.querySelector(`.indicator.total-indicator-${id}`)
				.setAttribute('style', `stroke-dashoffset: ${percentShown}`);
		}
	};

	onClick = () => {};

	render() {
		const {
			goToTicketHistory,
			customImage,
			strokeColor,
			text,
			percent,
			id,
			packageType,
			strokeWidth,
		} = this.props;

		return (
			<div className='progress-circle-wrapper' id={packageType !== 'month' ? '' : 'monthly'}>
				<div
					className='circle'
					onClick={goToTicketHistory ? () => goToTicketHistory('open') : this.onClick}
				>
					<CircleIndicator
						strokeWidth={strokeWidth}
						index='open-count'
						text={percent ? percent : 0}
						type={text}
						name={`total-indicator-${id}`}
						strokeColor={strokeColor}
						needDecimalPlace={true}
					/>

					<img
						className='progress-background'
						src={customImage ? customImage : ProgressCircle}
						alt='open-ticket-count'
					/>
				</div>
			</div>
		);
	}
}

SmallProgressCircle.propType = {
	percent: number,
	total: number,
};

SmallProgressCircle.defaultProps = {
	percent: 0,
	total: 0,
};

export default SmallProgressCircle;
