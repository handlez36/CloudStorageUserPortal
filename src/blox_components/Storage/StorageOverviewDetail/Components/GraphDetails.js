import React, { Component, Fragment } from 'react';
import { Decimal } from 'decimal.js';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';

import { SITE_COLORS } from 'utils/Misc/CommonConstants';
import * as StorageUtils from 'utils/StorageUtils';

const CDN_URL = process.env.REACT_APP_CDN_URL;
const ObjectStorage = `${CDN_URL}storage/object-storage-icon.png`;
const FileStorage = `${CDN_URL}storage/file-storage-icon.svg`;

/**
 * GraphDetail component with circular progress bar
 * @param {*} param0
 */
const GraphDetails = ({ id, percentage, label, text, isOverQuota, packageType, hideUsage }) => {
	const image = id === 'file' ? FileStorage : ObjectStorage;
	let trailColor;
	let backgroundColor;
	if (packageType === 'month') {
		trailColor = SITE_COLORS.Bright_Emerald;
		backgroundColor = SITE_COLORS.Bright_Emerald;
	} else {
		trailColor = isOverQuota ? SITE_COLORS.DCBLOX_Lime : SITE_COLORS.Cool_Gray_Med_2;
		backgroundColor = SITE_COLORS.Dark_Emerald;
	}

	return (
		<div className='graph-details info-wrapper v3'>
			<div className={`side-info${hideUsage ? ' no-usage' : ''}`}>
				<div className='package-type heading71'>{label}</div>
				<div className='type-image'>
					<img src={image} />
				</div>
				{!hideUsage && (
					<div className={`total-storage${isOverQuota ? ' over-quota' : ''}`}>
						<CircularProgressbarWithChildren
							value={percentage < 1 ? 1 : percentage}
							background={true}
							styles={buildStyles({
								strokeLinecap: 'butt',
								pathColor: SITE_COLORS.Bright_Emerald,
								trailColor,
								backgroundColor,
								// trailColor: SITE_COLORS.Bright_Emerald,
								// backgroundColor: SITE_COLORS.Bright_Emerald,
								// trailColor: isOverQuota ? SITE_COLORS.DCBLOX_Lime : SITE_COLORS.Cool_Gray_Med_2,
								// backgroundColor: SITE_COLORS.Dark_Emerald,
								pathTransitionDuration: 0.5,
							})}
						>
							{text}
						</CircularProgressbarWithChildren>
					</div>
				)}
			</div>
		</div>
	);
};

const getCommitmentAmount = packageData => {
	if (!packageData) return { commitmentAmount: null, unit: null };

	const unit = StorageUtils.determineDataUnitShare(packageData, null, 'commitmentAmount');
	return { commitmentAmount: packageData[`commitmentAmount${unit}`], unit };
};

const calculateTotalUsage = (data, type, unit = null) => {
	const usageUnit = unit
		? unit
		: data[type].reduce((type, item) => StorageUtils.determineDataUnit(item, type));
	let totalUsage = data[type].reduce(
		(total, location) => (total += location[`size${usageUnit}`]),
		0,
	);
	totalUsage = new Decimal(totalUsage).toPrecision(2);
	return { totalUsage, unit: usageUnit };
};

const getPercentageDetails = (isOverQuota, commitmentAmount, totalUsage) => {
	const percent = isOverQuota
		? (commitmentAmount / totalUsage) * 100
		: (totalUsage / commitmentAmount) * 100;

	return new Decimal(percent).toPrecision(2);
};

/**
 * GraphDetail component wrapper
 * Allows animation from 0 to current percentage
 * using React lifecycle methods
 */
class GraphDetailWrapper extends Component {
	state = {
		value: 0,
	};

	calculatePercentage = () => {
		const { data, packageData, id } = this.props;
		if (!data) return null;

		const { totalUsage: totalUsageSameMb } = calculateTotalUsage(data, id, 'MB');
		const isOverQuota = totalUsageSameMb > packageData.commitmentAmountMB;
		const percentage = getPercentageDetails(
			isOverQuota,
			packageData.commitmentAmountMB,
			totalUsageSameMb,
		);
		return { percentage, isOverQuota };
	};

	getText = () => {
		const { data, id, hideUsage } = this.props;
		if (hideUsage) {
			return '';
		}

		const { totalUsage, unit: totalUsageUnit } = calculateTotalUsage(data, id);
		return (
			<Fragment>
				<div className='count numbers20' style={{}}>
					{totalUsage || '-'}
				</div>
				<div className='new-title heading90'>{totalUsageUnit || '-'}</div>
			</Fragment>
		);
	};

	componentDidUpdate() {
		const { hideUsage } = this.props;
		const { value: existingValue } = this.state;
		const { percentage: incomingPercentage, isOverQuota } = hideUsage
			? { percentage: null, isOverQuota: null }
			: this.calculatePercentage();

		if (!existingValue && incomingPercentage && !hideUsage) {
			this.setState({ value: incomingPercentage, isOverQuota });
		}
	}

	render() {
		const { isOverQuota } = this.state;
		const { packageType, packageData, hideUsage } = this.props;
		const { commitmentAmount, unit: commitmentUnit } = getCommitmentAmount(packageData);
		const label =
			packageType === 'month' ? 'Month-to-Month' : `${commitmentAmount} ${commitmentUnit} Plan`;

		return (
			<GraphDetails
				{...this.props}
				percentage={this.state.value}
				label={label}
				text={this.getText()}
				isOverQuota={isOverQuota}
				packageType={packageType}
				hideUsage={hideUsage}
			/>
		);
	}
}

// export default GraphDetails;
export default GraphDetailWrapper;
