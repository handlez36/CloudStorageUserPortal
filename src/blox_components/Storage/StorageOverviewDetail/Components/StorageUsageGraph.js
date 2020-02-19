import React, { Component, Fragment } from 'react';
import * as Victory from 'victory';
import moment from 'moment';

import { StorageApi } from '../../../../services/storage';
import { LOCATION_THEME } from '../../../../utils/StorageConstants';
import * as StorageUtils from '../../../../utils/StorageUtils';
import { Utils } from '../../../../services/utils';
import { ClientData } from '../../../../services/clientData';
// import FileStorageIcon from '../../assets/storage/Storage-file-icon-transparent.svg';
// import ObjectStorageIcon from '../../assets/storage/Storage-object-icon-transparent.svg';
// import LeftArrow from '../../assets/storage/Storage-left-Arrow.svg';
import { determineDataUnit } from '../../../../utils/StorageUtils';
import { RESOLUTIONS as BREAKPOINTS } from '../../../../services/config';
import GraphDetail from './GraphDetails';

const CDN_URL = process.env.REACT_APP_CDN_URL;
const FileStorageIcon = `${CDN_URL}storage/Storage-file-icon-transparent.svg`;
const ObjectStorageIcon = `${CDN_URL}storage/Storage-object-icon-transparent.svg`;
const LeftArrow = `${CDN_URL}storage/Storage-left-Arrow.svg`;

const RESOLUTIONS = {
	DAY: 'd',
	HOUR: 'h',
	MONTH: 'm',
};

const TIME_FORMATS = {
	DAY: 'MM.DD',
	HOUR: 'hA',
	MONTH: 'MMM',
};
const DIRECTION = {
	NEXT: 'next',
	PREV: 'prev',
};
const SHARE_TYPE_ICONS = {
	file: FileStorageIcon,
	object: ObjectStorageIcon,
};
const BREAKPOINT_MAP = {
	[BREAKPOINTS.LOW]: { width: 256, height: 129 },
	[BREAKPOINTS.MED]: { width: 384, height: 185 },
	[BREAKPOINTS.HIGH]: { width: 384, height: 281 },
};

class StorageUsageGraph extends Component {
	state = {
		share: null,
		data: null,
		rawData: null,
		dataResponse: null,
		unit: null,
		error: null,
		rangeMin: null,
		rangeMax: null,
		currMin: null,
		currMax: null,
		minDomain: null,
		maxDomain: null,
		resolution: RESOLUTIONS.DAILY,
	};

	getDataForCurrentRange = () => {
		const { data, currMax, currMin, resolution } = this.state;
		const locations = Object.keys(data);
		const filteredData = {};
		locations.forEach(key => {
			if (!filteredData[key]) {
				filteredData[key] = [];
			}

			filteredData[key] = data[key].filter(item =>
				moment(item.actualDate).isBetween(currMin, currMax, null, '[]'),
			);

			if (filteredData[key].length < StorageUtils.NUM_OF_GRAPH_DATA_POINTS) {
				const emptyDataPointsLength =
					StorageUtils.NUM_OF_GRAPH_DATA_POINTS - filteredData[key].length;
				const currDate = moment(currMin);
				const emptyDataPoints = [];
				for (let i = 0; i < emptyDataPointsLength; i++) {
					emptyDataPoints.push({
						x: currDate.format(TIME_FORMATS[resolution]),
						y: null,
						actualDate: currDate.format(StorageUtils.DEFAULT_TIME_FORMAT),
					});
					currDate.add(1, resolution);
				}
				filteredData[key].unshift(...emptyDataPoints);
			}
		});
		return filteredData;
	};

	componentDidUpdate() {
		const { resolution: existingResolution } = this.state;
		const { resolution: incomingResolution } = this.props;
		const { shareType: existingType } = this.state;
		const { type: incomingType } = this.props;
		const { share: existingShare } = this.state;
		const { share: incomingShare } = this.props;

		if (existingShare !== incomingShare || existingResolution !== incomingResolution) {
			if (incomingShare) {
				this.setState({ resolution: incomingResolution, share: incomingShare });
				this.retrieveTrendData(incomingResolution, {
					aggregateTimeSegment: incomingResolution,
					share: incomingShare.ml_id,
				});
			} else {
				this.setState({ resolution: incomingResolution });
				this.retrieveTrendData(incomingResolution, { aggregateTimeSegment: incomingResolution });
			}
		}
		if (existingType !== incomingType) {
			this.setState({ shareType: incomingType });
		}
	}

	processStorageData = (response, resolution) => {
		const { type, dataPoints } = this.props;
		const dataSubset = type === 'file' ? 'fileTrends' : 'objectTrends';

		const data = response.data[dataSubset];

		const unit = { ATL: 'MB', CHA: 'MB', HSV: 'MB', BHM: 'MB' };
		let formattedData = StorageUtils.formatDataForGraph(data, TIME_FORMATS[resolution], unit);
		const { rangeMax, rangeMin } = StorageUtils.getRangeMaxAndMin(formattedData);
		const { currMax, currMin } = StorageUtils.getCurrentRange(rangeMax, resolution, dataPoints);

		//filter unformatted data by currMax/Min
		//data.filter
		data.forEach(i => {
			const iDateTime = moment(i.dateTime);
			const isBetween = iDateTime.isBetween(
				currMin.clone().subtract(1, resolution),
				currMax.clone().add(1, resolution),
				resolution,
			);
			if (isBetween) {
				//for each visible data piece determine the best unit of measurement
				unit[i.location] = determineDataUnit(i, unit[i.location]);
			}
		});

		formattedData = StorageUtils.formatDataForGraph(data, TIME_FORMATS[resolution], unit);
		const minDomain = { y: StorageUtils.getDataRange(formattedData).minData };
		const maxDomain = { y: StorageUtils.getDataRange(formattedData).maxData };

		this.setState({
			shareType: type || 'file',
			data: formattedData,
			rawData: data,
			minDomain,
			maxDomain,
			rangeMin,
			rangeMax,
			currMin,
			currMax,
			unit,
		});
	};

	retrieveTrendData = async (resolution, params = null) => {
		// console.log('Pulling trend data');
		const timeZone = ClientData.getTimeZone();
		console.log('Got timezone: ', timeZone);
		console.log('Got timezone: ', new Date().getTimezoneOffset());
		const defaultParams = { aggregateTimeSegment: 'DAY' };
		// const defaultParams = { aggregateTimeSegment: 'DAY', timeZone };
		console.log(params);
		try {
			const response = await StorageApi.getStorageTrends(params || defaultParams);
			if (Utils.isValidResponse(response)) {
				this.processStorageData(response, resolution);
			} else {
				this.setState({ error: 'Error retrieving storage data' });
			}
		} catch (e) {
			//this.setState({ error: 'Network error retrieving storage data' });
		}
	};

	// TODO: If movement exceeds min and max, make another Api call to get data
	updateCurrMinAndMax = (direction = DIRECTION.NEXT) => {
		const { currMin, currMax, resolution } = this.state;
		const newMax = moment(currMax);
		const newMin = moment(currMin);
		// if (
		// 	(direction === DIRECTION.NEXT && newMax.add(1, resolution) > rangeMax) ||
		// 	(direction === DIRECTION.PREV && newMin.subtract(1, resolution) < rangeMin)
		// ) {
		// 	return null;
		// }
		if (
			(direction === DIRECTION.NEXT && this.isMovementBeyondBounds(DIRECTION.NEXT)) ||
			(direction === DIRECTION.PREV && this.isMovementBeyondBounds(DIRECTION.PREV))
		) {
			return null;
		}

		if (direction === DIRECTION.NEXT) {
			newMin.add(1, resolution);
			newMax.add(1, resolution);
		} else {
			newMax.subtract(1, resolution);
			newMin.subtract(1, resolution);
		}

		const unit = { ATL: 'MB', CHA: 'MB', HSV: 'MB', BHM: 'MB' };
		//filter unformatted data by currMax/Min
		const visibleData = [];
		this.state.rawData.forEach(i => {
			const iDateTime = moment(i.dateTime);
			const isBetween = iDateTime.isBetween(
				newMin.clone().subtract(1, resolution),
				newMax.clone().add(1, resolution),
				resolution,
			);
			if (isBetween) {
				//for each visible data piece determine the best unit of measurement
				visibleData.push(i);
				unit[i.location] = determineDataUnit(i, unit[i.location]);
			}
		});

		const formattedData = StorageUtils.formatDataForGraph(
			this.state.rawData,
			TIME_FORMATS[resolution],
			unit,
		);
		const formattedVisibleData = StorageUtils.formatDataForGraph(
			visibleData,
			TIME_FORMATS[resolution],
			unit,
		);

		const minDomain = { y: StorageUtils.getDataRange(formattedVisibleData).minData };
		const maxDomain = { y: StorageUtils.getDataRange(formattedVisibleData).maxData };

		this.setState({
			currMin: newMin,
			currMax: newMax,
			data: formattedData,
			unit,
			minDomain,
			maxDomain,
		});
	};

	displayLineGraphs = () => {
		const { currMax, resolution } = this.state;
		const filteredData = this.getDataForCurrentRange();
		const locations = Object.keys(filteredData);

		const labels = datum => {
			const item = datum.rawData;

			if (item === undefined || item === null) {
				return '';
			}
			// new line "\n" is a hack to make the labels display lower the tspan cannot be moved with css
			return datum.x === currMax.format(TIME_FORMATS[resolution])
				? `\n ${item[`size${datum.unit}`]} ${datum.unit}`
				: '';
		};

		return locations.slice(0, 5).map(location => (
			<Victory.VictoryLine
				key={`${location}-graph`}
				data={filteredData[location]}
				sortKey={datum => moment(datum.x)}
				sortOrder='ascending'
				labels={labels}
				theme={Victory.VictoryTheme.material}
				style={{
					data: { stroke: LOCATION_THEME.COLOR[location] },
				}}
			/>
		));
	};

	// TODO: Update left and right arrow state visuals
	generateLowerSection = () => {
		const { currMin, resolution, data } = this.state;
		const { dataPoints } = this.props;
		const dates = [];
		const currDate = moment(currMin);
		const displayNodes = dataPoints ? dataPoints : 9;

		for (let i = 0; i < displayNodes; i++) {
			dates.push(<div className='callout-sm'>{currDate.format(TIME_FORMATS[resolution])}</div>);
			currDate.add(1, resolution);
		}

		const leftDisabled = this.isMovementBeyondBounds(DIRECTION.PREV);
		const rightDisabled = this.isMovementBeyondBounds(DIRECTION.NEXT);
		return (
			<div className='lower-section'>
				{data && Object.keys(data).length > 0 && (
					<Fragment>
						<img src={LeftArrow} className={`left-arrow ${leftDisabled ? 'disabled' : ''}`} />
						<div
							className={`wrapper left-arrow-wrapper ${leftDisabled ? 'disabled' : ''}`}
							onClick={() => this.updateCurrMinAndMax(DIRECTION.PREV)}
						/>
						{dates}
						<img src={LeftArrow} className={`right-arrow ${rightDisabled ? 'disabled' : ''}`} />
						<div
							className={`wrapper right-arrow-wrapper ${rightDisabled ? 'disabled' : ''}`}
							onClick={() => this.updateCurrMinAndMax(DIRECTION.NEXT)}
						/>
					</Fragment>
				)}
				{!data ||
					(Object.keys(data).length === 0 && <div className='no-data'>No data available</div>)}
			</div>
		);
	};

	isMovementBeyondBounds = (direction = DIRECTION.NEXT) => {
		const { currMin, currMax, rangeMin, rangeMax, resolution } = this.state;
		const newMax = moment(currMax);
		const newMin = moment(currMin);

		if (direction === DIRECTION.NEXT && newMax.add(1, resolution) > rangeMax) {
			return true;
		} else if (direction === DIRECTION.PREV && newMin.subtract(1, resolution) < rangeMin) {
			return true;
		} else {
			return false;
		}
	};

	getFakeData = () => {
		const { resolution } = this.state;
		// const formattedData = this.formatDataForGraph(data2.fileTrends);
		const formattedData = StorageUtils.formatDataForGraph(data2.fileTrends);
		const { rangeMax, rangeMin } = StorageUtils.getRangeMaxAndMin(formattedData);
		const { currMax, currMin } = StorageUtils.getCurrentRange(rangeMax, resolution);

		this.setState({ data: formattedData, rangeMin, rangeMax, currMin, currMax });
	};

	componentDidMount() {
		const { resolution, graphType, share } = this.props;
		let params = { aggregateTimeSegment: resolution };
		this.setState({ resolution, share });

		if (graphType === 'singleShare') {
			params = { aggregateTimeSegment: resolution, share: share.ml_id };
		}
		this.retrieveTrendData(resolution, params);

		// this.getFakeData();

		setTimeout(() => {
			const container = document.querySelector('.VictoryContainer > svg');
			const backGrid = document.querySelector('.VictoryContainer > svg > g:nth-child(5)');
			if (container) {
				try {
					container.prepend(backGrid);
				} catch (e) {}
			}
		}, 500);
	}

	getPackageData = (data, type) => {
		if (!data || !data.packages || !type) return null;

		const matches = data.packages.filter(packageInfo => packageInfo.storageType === type);
		return matches && matches[0] ? matches[0] : null;
	};

	render() {
		const { shareType, data, error, minDomain, maxDomain } = this.state;
		const {
			stats,
			id,
			share,
			graphType,
			customHeight,
			fileCommitment,
			objectCommitment,
			type,
			packageType,
			packageTypeFile,
			packageTypeObject,
			breakpoint,
		} = this.props;
		let commitmentAmount;
		// type === 'file' ? `${fileCommitment}TB Plan` : `${objectCommitment}TB Plan`;
		if (type === 'file' && fileCommitment !== undefined && packageTypeFile !== 'month') {
			commitmentAmount = `${fileCommitment}TB Plan`;
		} else if (
			type === 'object' &&
			objectCommitment !== undefined &&
			packageTypeObject !== 'month'
		) {
			commitmentAmount = `${objectCommitment}TB Plan`;
		} else if (packageTypeFile === 'month') {
			commitmentAmount = 'Month to Month';
		} else if (packageTypeObject === 'month') {
			commitmentAmount = 'Month to Month';
		} else {
			commitmentAmount = 'Not Available';
		}
		const theme = {
			axis: {
				style: {
					grid: {
						stroke: '#edefef',
					},
				},
			},
		};

		const packageData = this.getPackageData(stats, id);

		return (
			<div className={`storage-usage-graph v3 ${graphType}`}>
				{data && (
					<Fragment>
						<div className='upper'>
							<div className='package-details'>
								<GraphDetail
									data={stats}
									packageData={packageData}
									packageType={packageType}
									id={id}
									hideUsage
								/>
							</div>
							<div className='chart-wrapper'>
								<Victory.VictoryChart
									theme={{
										...Victory.VictoryTheme.grayscale,
										...theme,
										chart: { ...theme.chart, padding: 5 },
									}}
									minDomain={minDomain}
									maxDomain={maxDomain}
									// height={customHeight ? customHeight : 232}
									// height={185}
									// width={384} // 384
									height={BREAKPOINT_MAP[breakpoint] ? BREAKPOINT_MAP[breakpoint].height : 0}
									width={BREAKPOINT_MAP[breakpoint] ? BREAKPOINT_MAP[breakpoint].width : 0} // 384
									responsive={false}
								>
									<Victory.VictoryAxis
										orientation='bottom'
										dependentAxis={false}
										style={{
											tickLabels: { fontSize: 0 },
										}}
									/>
									{this.displayLineGraphs(data)}
								</Victory.VictoryChart>
							</div>
						</div>
						<div className='lower'>{this.generateLowerSection()}</div>
					</Fragment>
				)}
			</div>
		);
	}
}

export default StorageUsageGraph;
