import React, { Component } from 'react';
import { Decimal } from 'decimal.js';
import { Sorting } from '../../services/sorting';
import SmallProgressCircle from './SmallProgressCircle';
import GraphBar from './GraphBar';
const CDN_URL = process.env.REACT_APP_CDN_URL;

const ProgressCircleDarkEmerald = `${CDN_URL}storage/progress-circle-emerald.svg`;
const atlanta = `${CDN_URL}common/atlanta-orange.svg`;
const huntsville = `${CDN_URL}common/huntsville-circle.svg`;
const birmingham = `${CDN_URL}common/birmingham-circle.svg`;
const chat = `${CDN_URL}common/chattanooga-circle.svg`;

class Graph extends Component {
	constructor(props) {
		super(props);

		this.state = {
			display: 'true',
			overQuota: false,
			percent: null,
			sizeType: 'MB',
		};
	}
	viewStorage = () => {
		this.props.selectMenuItem('VIEW STORAGE');
	};
	getTotalShares = () => {
		if (this.props.storages) {
			return this.props.storages.length;
		}
	};
	componentDidMount() {
		const { data } = this.props;
		if (data) {
			this.getTotalUsedStorage(data);
		}
	}

	getAllSizes = () => {
		const { data } = this.props;

		//need to return array converted to the highest type.
		const unitArray = [];
		const sizeArray = [];
		data.map(d => unitArray.push(this.determineShareSize(d)));

		const usePB = unitArray.filter(unit => unit.unit === 'PB');
		const useTB = unitArray.filter(unit => unit.unit === 'TB');
		const useGB = unitArray.filter(unit => unit.unit === 'GB');
		const useMB = unitArray.filter(unit => unit.unit === 'MB');

		if (usePB && usePB.length !== 0) {
			for (let i = 0; i <= data.length - 1; i++) {
				if (data[i].sizePB) {
					sizeArray.push(data[i].sizePB);
				} else {
					sizeArray.push(0);
				}
			}
		} else if (useTB && useTB.length !== 0) {
			for (let i = 0; i <= data.length - 1; i++) {
				if (data[i].sizeTB) {
					sizeArray.push(data[i].sizeTB);
				} else {
					sizeArray.push(0);
				}
			}
		} else if (useGB && useGB.length !== 0) {
			for (let i = 0; i <= data.length - 1; i++) {
				if (data[i].sizeGB) {
					sizeArray.push(data[i].sizeGB);
				} else {
					sizeArray.push(0);
				}
			}
		} else if (useMB && useMB.length !== 0) {
			for (let i = 0; i <= data.length - 1; i++) {
				if (data[i].sizeMB) {
					sizeArray.push(data[i].sizeMB);
				} else {
					sizeArray.push(0);
				}
			}
		}

		sizeArray.sort(function(a, b) {
			return b - a;
		});

		return sizeArray;
	};
	getUnitSize = share => {
		const { data } = this.props;
		const unitArray = [];

		let amount;
		data.map(d => unitArray.push(this.determineShareSize(d)));
		const usePB = unitArray.filter(unit => unit.unit === 'PB');
		const useTB = unitArray.filter(unit => unit.unit === 'TB');
		const useGB = unitArray.filter(unit => unit.unit === 'GB');
		const useMB = unitArray.filter(unit => unit.unit === 'MB');

		if (usePB && usePB.length !== 0) {
			//console.log('using PB');
			amount = share.sizePB;
		} else if (useTB.length && useTB.length !== 0) {
			//console.log('using TB');
			amount = share.sizeTB;
		} else if (useGB && useGB.length !== 0) {
			//console.log('using GB');
			amount = share.sizeGB;
		} else if (useMB && useMB.length !== 0) {
			//console.log('using MB');
			amount = share.sizeMB;
		}

		return amount;
	};

	getShareSize = share => {
		let shareSize = null;
		if (share.sizePB && share.sizePB < 1000 && share.sizePB >= 1) {
			shareSize = `PB`;
		} else if (share.sizeTB && share.sizeTB < 1000 && share.sizeTB >= 1) {
			shareSize = `TB`;
		} else if (share.sizeGB && share.sizeGB < 1000 && share.sizeGB >= 1) {
			shareSize = `GB`;
		} else if (share.sizeMB && share.sizeMB < 1000) {
			shareSize = `MB`;
		}
		const amount = share['size' + shareSize];

		return { sizeAggregate: shareSize, sizeAmount: amount ? amount : 0 };
	};
	determineShareSize = share => {
		let shareSize = null;
		if (share.sizePB && share.sizePB < 1000 && share.sizePB >= 1) {
			shareSize = { unit: 'PB' };
		} else if (share.sizeTB && share.sizeTB < 1000 && share.sizeTB >= 1) {
			shareSize = { unit: 'TB' };
		} else if (share.sizeGB && share.sizeGB < 1000 && share.sizeGB >= 1) {
			shareSize = { unit: 'GB' };
		} else if (share.sizeMB && share.sizeMB < 1000 && share.sizeMB >= 1) {
			shareSize = { unit: 'MB' };
		} else {
			shareSize = { unit: '' };
		}
		return shareSize;
	};

	getLocationColor = location => {
		let color;
		switch (location) {
			case 'ATL':
				color = '#df6a2e';
				break;
			case 'CHA':
				color = '#8060a9';
				break;
			case 'HSV':
				color = '#416ba9';
				break;
			case 'BHM':
				color = '#a8ad00';
				break;
			default:
				color = '#008388';
		}
		return color;
	};
	getLocationName = location => {
		let name;
		switch (location) {
			case 'ATL':
				name = 'ATLANTA';
				break;
			case 'CHA':
				name = 'CHATTANOOGA';
				break;
			case 'HSV':
				name = 'HUNTSVILLE';
				break;
			case 'BHM':
				name = 'BIRMINGHAM';
				break;
			default:
				return;
		}
		return name;
	};
	getLocationImage = location => {
		let image;
		switch (location) {
			case 'ATL':
				image = atlanta;
				break;
			case 'CHA':
				image = chat;
				break;
			case 'HSV':
				image = huntsville;
				break;
			case 'BHM':
				image = birmingham;
				break;
			default:
				return;
		}
		return image;
	};
	sortLocations = (a, b) => {
		if (a.location < b.location) {
			return -1;
		} else if (a.location > b.location) {
			return 1;
		} else {
			return 0;
		}
	};
	getGraphBars = () => {
		const { data, total } = this.props;

		const locations = ['ATL', 'BHM', 'CHA', 'HSV'];
		const activeLocations = [];
		if (data) {
			for (let i = 0; i <= data.length - 1; i++) {
				activeLocations.push(data[i].location);
			}
		}
		if (data) {
			for (let j = 0; j <= locations.length - 1; j++) {
				if (!activeLocations.includes(locations[j])) {
					const emptyLocation = { location: locations[j], sizeMB: 0 };
					data.push(emptyLocation);
				}
			}
			data.sort(this.sortLocations);
			return (
				<div className='main-graph'>
					{data &&
						data.map(bar => (
							<GraphBar
								key={`${bar.location}-${bar.sizeMB}`}
								color={this.getLocationColor(bar.location)}
								image={this.getLocationImage(bar.location)}
								name={this.getLocationName(bar.location)}
								location={bar.location}
								size={this.getShareSize(bar)}
								total={total}
								id={this.props.id}
								sizeArray={this.getAllSizes()}
								unitSize={this.getUnitSize(bar)}
							/>
						))}
				</div>
			);
		}
	};
	getTotalUsedStorage = data => {
		const rawTotalUsed = data.reduce((sum, bar) => (sum += bar.sizeMB), 0);
		let totalUsed = new Decimal(rawTotalUsed);
		let sizeType = 'MB';

		if (rawTotalUsed < 1000) {
			sizeType = 'MB';
		} else if (rawTotalUsed < 1000000) {
			sizeType = 'GB';
			totalUsed = totalUsed.dividedBy(1000);
		} else if (rawTotalUsed < 1000000000) {
			sizeType = 'TB';
			totalUsed = totalUsed.dividedBy(1000000);
		} else {
			sizeType = 'PB';
			totalUsed = totalUsed.dividedBy(1000000000);
		}
		this.setState({ percent: totalUsed.toNumber(), sizeType });
	};

	checkQuota = () => {
		const { total } = this.props;
		const { percent } = this.state;
		if (percent > total) {
			return true;
		} else {
			return false;
		}
	};

	getMonth = () => {
		const month = Sorting.getMonth(new Date());
		return month;
	};

	render() {
		const { id, image, total, packageType, commitmentSizeType } = this.props;
		const { sizeType } = this.state;

		return (
			<div className='graph-container'>
				<div className='info-wrapper'>
					<div className='side-info'>
						<div className='package-type'>
							{packageType === 'month' ? 'Month-to-Month' : `${total} ${commitmentSizeType} Plan`}
						</div>
						<div className='type-image'>
							<img src={image} />
						</div>
						<div className='total-storage'>
							<SmallProgressCircle
								customImage={ProgressCircleDarkEmerald}
								text={sizeType}
								id={id}
								total={total}
								percent={this.state.percent}
								strokeColor={this.checkQuota() ? '#b5d334' : '#00b0b9'}
								overQuota={this.checkQuota()}
								packageType={packageType}
								strokeWidth={7}
							/>
						</div>
						<div className='text'>{``}</div>
					</div>

					{this.getGraphBars()}
				</div>
				{/* <div className='bottom-section-graph'>
					<div className='shares'>
						<span className='text'>TOTAL SHARES : </span>
						<span className='amount'>{this.getTotalShares()}</span>
					</div>
					<div className='storage-button'>
						<Button
							title='MANAGE SHARES'
							enabled={true}
							customClass='support-button gradient'
							onClick={this.viewStorage}
						/>
					</div>
				</div> */}
			</div>
		);
	}
}
export default Graph;
