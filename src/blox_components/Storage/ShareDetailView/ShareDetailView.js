import React, { Component, Fragment } from 'react';

import { StorageApi } from 'services/storage';
import { STORAGE_AVATAR_URL_PREFIX } from 'utils/Misc/CommonConstants';
import * as StorageUtils from 'utils/StorageUtils';
import Configuration from './Components/Configurations';
import StorageUsageGraph from './../StorageOverviewDetail/Components/StorageUsageGraph';
import ResolutionPicker from './../StorageOverviewDetail/Components/ResolutionPicker';

const CDN_URL = process.env.REACT_APP_CDN_URL;
const LadyBugIcon = `${CDN_URL}storage/Storage-ladybug-white-thinline.svg`;
const IconPrivate = `${CDN_URL}storage/icon-private.svg`;
const IconPublic = `${CDN_URL}storage/icon-public.svg`;

class ShareDetailView extends Component {
	state = {
		storageDetails: {},
		storageError: null,
		stats: [],
		statsError: null,
		resolution: 'DAY',
	};

	getUniqueShareIcon = icon => {
		return !icon ? LadyBugIcon : `${STORAGE_AVATAR_URL_PREFIX}/${icon}.svg`;
	};

	getShareDetails = async id => {
		if (!id) return;

		// Get single storage/share data
		const { storageDetails, error: storageError } = await StorageApi.get(id);

		// Get trend data
		// const { stats, error: statsError } = await StorageApi.sampleNetworkRequest();
		const stats = StorageUtils.sampleNetworkRequest;
		this.setState({
			storageDetails,
			stats,
			statsError: null,
			storageError,
		});
		// this.setState({ storageDetails, stats, statsError, storageError });
	};

	generateShareDetails = storage => {
		if (!storage) return;

		return {
			'1': {
				multiple: true,
				a: { label: 'Share IP', content: storage.ip_address },
				b: {
					label: storage.type === 'object' ? 'Secret Key' : '',
					content:
						storage.type === 'object'
							? 'You will need to update across all of your connections. '
							: '',
				},
			},
			'2': {
				multiple: true,
				a: { label: 'Access Key', content: storage.username },
				b: { label: '', content: '' },
			},
			'3': {
				multiple: true,
				a: { label: 'Share Path', content: ' ' },
				b: { label: '', content: '' },
			},
		};
	};

	geenrateNetworkDetails = storage => {
		if (!storage) return;

		return {
			'1': {
				multiple: true,
				a: { label: 'Customer IP', content: storage.customer_ip },
				b: { label: 'Vlan Tag', content: storage.vlan },
			},
		};
	};

	parsePackageData = (stats, type) => {
		console.log('Stats: ', stats);
		console.log('Type: ', type);
		if (!stats || !stats.packages || (stats.packages.length && stats.packages.length < 1)) return;

		console.log(' --- filtering...');
		const matchingPackages = stats.packages.filter(pkg => pkg.storageType === type);
		return matchingPackages && matchingPackages[0] ? matchingPackages[0] : null;
	};

	getCommitmentSizes = packageData => {
		console.log('Package Data: ', packageData);
		if (!packageData) return { commitmentAmount: null, unit: null };

		// console.log('Package Data: ', packageData);
		const unit = StorageUtils.determineDataUnitShare(packageData, null, 'commitmentAmount');
		return { commitmentAmount: packageData[`commitmentAmount${unit}`], unit };
	};

	componentDidMount() {
		const { storageId } = this.props;
		this.getShareDetails(storageId);
	}

	render() {
		const { breakpoint } = this.props;
		const { storage, storage: { icon, name = '', type } = {} } = this.state.storageDetails || {};
		const { stats, resolution } = this.state;
		const uniqueIcon = this.getUniqueShareIcon(icon);
		const packageData = this.parsePackageData(stats, type);
		const { commitmentAmount, unit } = this.getCommitmentSizes(packageData);

		console.log('Commitment Amount: ', commitmentAmount);
		console.log('Unit: ', unit);
		return (
			<div className='share-detail-view'>
				<div className='share-options-bar' />
				{storage && (
					<div className='share-content'>
						<div className='left-pane'>
							<div className='share-name-label'>
								<div className='lady-bug'>
									<img src={uniqueIcon ? uniqueIcon : LadyBugIcon} className='image' />
								</div>
								<div className='title'>{name}</div>
								<div className='access'>
									<img src={storage.privateAccess ? IconPrivate : IconPublic} />
								</div>
							</div>
							<div key='share-config' className='share-config'>
								<Configuration
									// toggleWhitelist={this.toggleWhiteListOpen}
									toggleWhitelist={() => {}}
									type='SHARE'
									share={storage}
									fields={this.generateShareDetails(storage)}
									// changeStoragePassword={this.changeStoragePassword}
									changeStoragePassword={() => {}}
								/>
							</div>
							<div key='network-config' className='network-config'>
								<Configuration
									// toggleWhitelist={this.toggleWhiteListOpen}
									toggleWhitelist={() => {}}
									type='NETWORK'
									share={storage}
									fields={this.geenrateNetworkDetails(storage)}
								/>
							</div>
						</div>
						<div className='right-pane'>
							<span key='trending-label' className='trending-label'>
								<div className='single-share-graph'>
									<div className='header'>
										<div className='title grid-item'>TRENDING</div>
									</div>
									<StorageUsageGraph
										id={storage.type}
										resolution={resolution}
										stats={stats}
										type={storage.type === 'file' ? 'file' : 'object'}
										packageType={packageData}
										// packageTypeFile={packageTypeFile}
										// packageTypeObject={packageTypeObject}
										share={storage}
										graphType='singleShare'
										dataPoints={6}
										fileCommitment={storage.type === 'file' ? commitmentAmount : null}
										objectCommitment={storage.type === 'object' ? commitmentAmount : null}
										breakpoint={breakpoint}
									/>
								</div>
							</span>
						</div>
					</div>
				)}
			</div>
		);
	}
}

export default ShareDetailView;
