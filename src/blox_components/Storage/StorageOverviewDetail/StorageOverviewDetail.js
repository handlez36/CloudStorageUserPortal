import React, { Component, Fragment } from 'react';

import { StorageApi } from '../../../services/storage';
import * as StorageUtils from '../../../utils/StorageUtils';
import Graph from './Components/Graph';
// import Graph from './Graph_Old';
import ShareCardContainer from './Components/ShareCardContainer';
import StorageUsageGraph from './Components/StorageUsageGraph';
import ResolutionPicker from './Components/ResolutionPicker';
import GraphTypePicker from './Components/GraphTypePicker';
// import ObjectStorage from './../../assets/storage/object-storage-icon.png';
// import FileStorage from './../../assets/storage/file-storage-icon.svg';

const CDN_URL = process.env.REACT_APP_CDN_URL;
const ObjectStorage = `${CDN_URL}storage/object-storage-icon.png`;
const FileStorage = `${CDN_URL}storage/file-storage-icon.svg`;

class StorageOverviewDetail extends Component {
	state = {
		objectShare: null,
		fileShare: null,
		objectCommitment: null,
		fileCommitment: null,
		objectCommitmentSizeType: null,
		fileCommitmentSizeType: null,
		fileGraphOptions: null,
		objectGraphOptions: null,
		storageStats: null,
		storages: null,
		fileGraphOptions: {
			resolution: 'DAY',
			type: 'BAR',
			// type: 'LINE',
		},
		objectGraphOptions: {
			resolution: 'DAY',
			// type: 'BAR',
			type: 'LINE',
		},
	};

	getShare = () => {
		const { storages, active } = this.state;
		const { params: { share } = {} } = this.props.match || {};

		if (!share) return;

		if (share !== '0') {
			if (active !== 'SHARE DETAILS') {
				this.setState({ active: 'MANAGE STORAGE' });
			}
			if (storages) {
				const selected = this.getSelectedShareDetails(share);
				this.setState({ selectedShare: selected, active: 'SHARE DETAILS' });
			}
		}
	};

	getShareDetails = share => {
		window.history.replaceState(share, 'share', `/portal/storage/${share.ml_id}`);
		this.setState({ active: 'SHARE DETAILS', selectedShare: share });
	};

	graphTypeCallback = graphType => {
		this.setState({ graphType });
	};

	getPackage = (data, type) => {
		// console.log('Data: ', data);
		// console.log('Type: ', type);
		let totalCommitment;
		const packages = data.packages;
		if (packages.length) {
			totalCommitment = packages.filter(storagePackage => storagePackage.storageType === type);
			return totalCommitment[0];
		}
	};

	getCommitmentSize = pkg => {
		let shareSize = null;
		let commitmentSizeType = null;
		if (pkg.commitmentAmountMB && pkg.commitmentAmountMB < 1000) {
			shareSize = pkg.commitmentAmountMB;
			commitmentSizeType = 'MB';
		} else if (pkg.commitmentAmountGB && pkg.commitmentAmountGB < 1000) {
			shareSize = pkg.commitmentAmountGB;
			commitmentSizeType = 'GB';
		} else if (pkg.commitmentAmountTB && pkg.commitmentAmountTB < 1000) {
			shareSize = pkg.commitmentAmountTB;
			commitmentSizeType = 'TB';
		} else {
			if (pkg.commitmentAmountPB) {
				shareSize = pkg.commitmentAmountPB;
				commitmentSizeType = 'PB';
			} else {
				shareSize = pkg.commitmentAmountMB;
				commitmentSizeType = 'MB';
			}
		}
		if (pkg.storageType === 'object') {
			this.setState({ objectCommitmentSizeType: commitmentSizeType });
		} else {
			this.setState({ fileCommitmentSizeType: commitmentSizeType });
		}
		return shareSize;
	};

	isEmpty = obj => {
		if (obj) {
			return Object.keys(obj).length === 0;
		}
	};

	checkShares = (shares, type) => {
		if (!shares) {
			return false;
		}

		if (shares.length) {
			const share = shares.filter(share => share.type === type);
			return share.length;
		}
		return false;
	};

	grabStorageInfo = () => {
		StorageApi.getAll()
			.then(response => {
				const validResponse = response.status === 200 && response.data;
				if (validResponse) {
					const storages = StorageUtils.sortShares(response.data.storages);
					const fileShare = this.checkShares(response.data.storages, 'file');
					const objectShare = this.checkShares(response.data.storages, 'object');
					this.setState({ storages, fileShare, objectShare }, () => this.getShare());
				} else {
					this.setState({ error: 'Error pulling storage details' });
				}
			})
			.catch(error => console.log(error));
	};

	getStorageStats = () => {
		const response = { data: StorageUtils.sampleNetworkRequest };
		console.log('Data: ', response.data);
		const filePackage = this.getPackage(response.data, 'file');
		const objectPackage = this.getPackage(response.data, 'object');
		if (filePackage) {
			this.setState({
				fileCommitment: this.getCommitmentSize(this.getPackage(response.data, 'file')),
			});
		}
		if (objectPackage) {
			this.setState({
				objectCommitment: this.getCommitmentSize(this.getPackage(response.data, 'object')),
			});
		}
		this.setState({
			storageStats: response.data,
		});
	};
	// getStorageStats = () => {
	// 	StorageApi.getStorageStats()
	// 		.then(response => {
	// 			const validResponse = response.status === 200 && response.data;
	// 			if (validResponse) {
	// 				const filePackage = this.getPackage(response.data, 'file');
	// 				const objectPackage = this.getPackage(response.data, 'object');
	// 				if (filePackage) {
	// 					this.setState({
	// 						fileCommitment: this.getCommitmentSize(this.getPackage(response.data, 'file')),
	// 					});
	// 				}
	// 				if (objectPackage) {
	// 					this.setState({
	// 						objectCommitment: this.getCommitmentSize(this.getPackage(response.data, 'object')),
	// 					});
	// 				}
	// 				this.setState({
	// 					storageStats: response.data,
	// 				});
	// 			} else {
	// 				this.setState({ error: 'Error pulling storage stat details' });
	// 			}
	// 		})
	// 		.catch(error => this.setState({ error }));
	// };

	packageType = (data, fileShare, objectShare) => {
		if (!data || (!fileShare && !objectShare)) {
			return null;
		}

		const storageType = fileShare ? 'file' : 'object';
		const packageInfo = this.getPackage(data, storageType);
		return packageInfo && packageInfo.packageType ? packageInfo.packageType : '';
	};

	componentDidMount() {
		this.grabStorageInfo();
		this.getStorageStats();
	}

	render() {
		const { breakpoint } = this.props;
		const {
			objectShare,
			fileShare,
			objectCommitment,
			fileCommitment,
			objectCommitmentSizeType,
			fileCommitmentSizeType,
			fileGraphOptions,
			objectGraphOptions,
			storageStats: data,
			storages: shares,
		} = this.state;

		const packageType = this.packageType(data, fileShare, objectShare);
		const sharesCountLabel = shares ? `(${shares.length} active)` : '';

		return (
			<div className='storage-overview-detail v3'>
				<div key='storage-graphs' className='storage-graphs'>
					{fileShare && !this.isEmpty(data) && data && (
						<div className='file-graph'>
							<div className='storage-graph-header'>
								<span className='graph-title heading60'>FILE Storage</span>
								{fileGraphOptions.type !== 'BAR' && (
									<div className='graph-resolution-picker'>
										<ResolutionPicker
											selected={fileGraphOptions.resolution}
											selectResolution={resolution =>
												this.setState({ fileGraphOptions: { ...fileGraphOptions, resolution } })
											}
										/>
									</div>
								)}
								<div className='graph-picker'>
									<GraphTypePicker
										selected={fileGraphOptions.type}
										storageType={'file'}
										callback={this.graphTypeCallback}
										selectType={type =>
											this.setState({ fileGraphOptions: { ...fileGraphOptions, type } })
										}
									/>
								</div>
							</div>
							{fileGraphOptions.type === 'BAR' ? (
								<Graph id='file' stats={data} packageType={packageType || ''} />
							) : (
								<StorageUsageGraph
									id='file'
									stats={data}
									packageType={packageType || ''}
									resolution={fileGraphOptions.resolution}
									type={'file'}
									fileCommitment={fileCommitment}
									fileCommitmentSizeType={fileCommitmentSizeType}
									packageTypeFile={packageType}
									breakpoint={breakpoint}
								/>
							)}
						</div>
					)}
					{objectShare > 0 && !this.isEmpty(data) && data && (
						<div className='object-graph'>
							<div className='storage-graph-header'>
								<span className='graph-title heading60'>OBJECT Storage</span>
								{objectGraphOptions.type !== 'BAR' && (
									<div className='graph-resolution-picker'>
										<ResolutionPicker
											selected={objectGraphOptions.resolution}
											selectResolution={resolution =>
												this.setState({
													objectGraphOptions: { ...objectGraphOptions, resolution },
												})
											}
										/>
									</div>
								)}
								<div className='graph-picker'>
									<GraphTypePicker
										selected={objectGraphOptions.type}
										storageType={'object'}
										selectType={type =>
											this.setState({ objectGraphOptions: { ...objectGraphOptions, type } })
										}
									/>
								</div>
							</div>
							{objectGraphOptions.type === 'BAR' ? (
								<Graph id='object' stats={data} packageType={packageType || ''} />
							) : (
								// <Graph
								// 	selectMenuItem={this.props.selectMenuItem}
								// 	image={ObjectStorage}
								// 	storages={shares}
								// 	id='object'
								// 	total={objectCommitment}
								// 	data={data.object}
								// 	commitmentSizeType={objectCommitmentSizeType}
								// 	packageType={packageType || ''}
								// />
								<StorageUsageGraph
									id='object'
									stats={data}
									packageType={packageType || ''}
									resolution={objectGraphOptions.resolution}
									type={'object'}
									objectCommitment={objectCommitment}
									objectCommitmentSizeType={objectCommitmentSizeType}
									packageTypeObject={packageType}
									breakpoint={breakpoint}
								/>
							)}
						</div>
					)}
				</div>
				<div key='share-list-section' className='share-list-section'>
					{shares && (
						<div className='share-list'>
							<div className='storage-graph-header'>
								<span className='graph-title heading60'>
									{/* <span>
										SHARES&nbsp;<span className='heading71'>{sharesCountLabel}</span>
									</span> */}
									<span>
										SHARES&nbsp;<span className='heading71'>{sharesCountLabel}</span>
									</span>
								</span>
							</div>
							<ShareCardContainer
								objectCommitment={objectCommitment}
								fileCommitment={fileCommitment}
								stats={data}
								shares={shares}
								selectMenuItem={this.props.selectMenuItem}
								viewShare={this.getShareDetails}
								changeToManageStorage={() => {}}
							/>
						</div>
					)}
				</div>
			</div>
		);
	}
}

export default StorageOverviewDetail;
