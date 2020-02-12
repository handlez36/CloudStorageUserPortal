import React, { Component } from 'react';
import { Decimal } from 'decimal.js';

import { Sorting } from '../../services/sorting';
import SmallProgressCircle from './../../containers/Storage/SmallProgressCircle';
import GraphBar from './../../containers/Storage/GraphBar';
import GraphDetail from './GraphDetails';
import UsageBar from './UsageBar';
import LocationBar from './LocationBar';
import * as StorageUtils from './../../containers/Storage/Utils/StorageUtils';

const CDN_URL = process.env.REACT_APP_CDN_URL;
const ProgressCircleDarkEmerald = `${CDN_URL}storage/progress-circle-emerald.svg`;
const atlanta = `${CDN_URL}common/atlanta-orange.svg`;
const huntsville = `${CDN_URL}common/huntsville-circle.svg`;
const birmingham = `${CDN_URL}common/birmingham-circle.svg`;
const chat = `${CDN_URL}common/chattanooga-circle.svg`;

class Graph extends Component {
	state = {
		display: 'true',
		overQuota: false,
		percent: null,
		sizeType: null,
	};

	componentDidMount() {
		const { stats, id } = this.props;
		if (stats && id) {
			this.getTotalUsedStorage(stats, id);
		}
	}

	getTotalUsedStorage = (data, storageType) => {
		const sizeType = data[storageType].reduce((type, item) =>
			StorageUtils.determineDataUnit(item, type),
		);
		this.setState({ sizeType });
	};

	getAllSizes = () => {
		const { stats, id } = this.props;
		const { sizeType } = this.state;
		return sizeType ? stats[id].map(item => item[`size${sizeType}`]).sort((a, b) => b - a) : null;
	};

	getGraphBars = () => {
		const { stats, id } = this.props;
		const { sizeType } = this.state;

		return (
			<div className='main-graph'>
				{stats &&
					sizeType &&
					stats[id].map(bar => {
						return (
							<div className='bar'>
								<UsageBar
									size={bar[`size${sizeType}`]}
									id={id}
									sizeArray={this.getAllSizes()}
									sizeType={sizeType}
									location={bar.location}
								/>
							</div>
						);
					})}
			</div>
		);
	};

	getPackageData = (data, type) => {
		if (!data || !data.packages || !type) return null;

		const matches = data.packages.filter(packageInfo => packageInfo.storageType === type);
		return matches && matches[0] ? matches[0] : null;
	};

	render() {
		const { id, stats, packageType } = this.props;
		const packageData = this.getPackageData(stats, id);

		return (
			<div className='graph-container v3'>
				{packageData && stats && (
					<GraphDetail data={stats} packageData={packageData} packageType={packageType} id={id} />
				)}
				<div className='graph-data-section'>
					<LocationBar data={stats[id]} />
					{this.getGraphBars()}
				</div>
			</div>
		);
	}
}
export default Graph;
