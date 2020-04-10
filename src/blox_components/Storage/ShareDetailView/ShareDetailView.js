import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

import PasswordModal from 'sub_components/Common/PasswordModal';
import COMPANYButton from 'sub_components/Common/COMPANYButton';
import WhiteListModal from 'sub_components/Storage/WhiteListModal';
import { StorageApi } from 'services/storage';
import { STORAGE_AVATAR_URL_PREFIX } from 'utils/Misc/CommonConstants';
import * as StorageUtils from 'utils/StorageUtils';
import { PASSWORD_UPDATE_STATUS } from 'utils/StorageConstants';
import Configuration from './Components/Configurations';
import StorageUsageGraph from './../StorageOverviewDetail/Components/StorageUsageGraph';

const CDN_URL = process.env.REACT_APP_CDN_URL;
const LadyBugIcon = `${CDN_URL}storage/Storage-ladybug-white-thinline.svg`;
const IconPrivate = `${CDN_URL}storage/icon-private.svg`;
const IconPublic = `${CDN_URL}storage/icon-public.svg`;
const DeleteIconHover = `${CDN_URL}storage/icon-delete-storage-select.svg`;
const DeleteIcon = `${CDN_URL}storage/icon-delete-storage-default.svg`;
const Arrow = `${CDN_URL}storage/left-arrow.svg`;

class ShareDetailView extends Component {
	state = {
		storageId: null,
		storageDetails: {},
		storageError: null,
		stats: [],
		statsError: null,
		storagePassword: null,
		passwordUpdateStatus: PASSWORD_UPDATE_STATUS.NOT_STARTED,
		resolution: 'DAY',
		whiteListModalOpen: false,
	};

	togglePasswordModal = () => {
		const resetButton = document.querySelector('.reset-button');
		document.getElementById('reset-icon').src = ResetIcon;
		resetButton.classList.remove('selected');
		this.setState({
			passwordUpdateStatus: PASSWORD_UPDATE_STATUS.NOT_STARTED,
			storagePassword: null,
		});
	};

	changeStoragePassword = () => {
		const { storage: { username, ml_id } = {} } = this.state.storageDetails;
		const resetButton = document.querySelector('.reset-button');
		document.getElementById('reset-icon').src = ResetIconSelected;
		resetButton.classList.add('selected');

		if (username && ml_id) {
			StorageApi.updateStoragePassword(username, ml_id)
				.then(response => {
					if (response.status === 200 && !response.data.error) {
						const { password: storagePassword } = response.data;
						this.setState({
							storagePassword,
							passwordUpdateStatus: PASSWORD_UPDATE_STATUS.SUCCESS,
						});
					} else {
						this.setState({ passwordUpdateStatus: PASSWORD_UPDATE_STATUS.ERROR });
					}
				})
				.catch(() => this.setState({ passwordUpdateStatus: PASSWORD_UPDATE_STATUS.ERROR }));
		}
	};

	getUniqueShareIcon = icon => {
		return !icon ? LadyBugIcon : `${STORAGE_AVATAR_URL_PREFIX}/${icon}.svg`;
	};

	getShareDetails = async id => {
		if (!id) return;

		// Get single storage/share data
		const { storageDetails, error: storageError } = await StorageApi.get(id);

		// Get trend data
		const stats = StorageUtils.sampleNetworkRequest;
		this.setState({
			storageId: id,
			storageDetails,
			stats,
			statsError: null,
			storageError,
		});
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
		if (!stats || !stats.packages || (stats.packages.length && stats.packages.length < 1)) return;

		const matchingPackages = stats.packages.filter(pkg => pkg.storageType === type);
		return matchingPackages && matchingPackages[0] ? matchingPackages[0] : null;
	};

	getCommitmentSizes = packageData => {
		if (!packageData) return { commitmentAmount: null, unit: null };

		const unit = StorageUtils.determineDataUnitShare(packageData, null, 'commitmentAmount');
		return { commitmentAmount: packageData[`commitmentAmount${unit}`], unit };
	};

	toggleWhiteListOpen = () => {
		console.log('Opening whitelist modal');
		this.setState(state => ({ ...state, whiteListModalOpen: !state.whiteListModalOpen }));
	};

	onMouseOver = () => {
		document.getElementById('delete-button').src = DeleteIconHover;
	};
	onMouseOut = () => {
		document.getElementById('delete-button').src = DeleteIcon;
	};

	componentDidUpdate() {
		const { storageId: existingId } = this.state;
		const { storageId: incomingId } = this.props;

		if (existingId !== incomingId) {
			this.getShareDetails(incomingId);
		}
	}

	componentDidMount() {
		const { storageId } = this.props;
		this.getShareDetails(storageId);
	}

	render() {
		const { breakpoint, history } = this.props;
		const { storage, storage: { icon, name = '', type } = {} } = this.state.storageDetails || {};
		const {
			stats,
			resolution,
			storagePassword,
			passwordUpdateStatus,
			whiteListModalOpen,
		} = this.state;
		const uniqueIcon = this.getUniqueShareIcon(icon);
		const packageData = this.parsePackageData(stats, type);
		const { commitmentAmount, unit } = this.getCommitmentSizes(packageData);

		return storage ? (
			<div className='share-detail-view'>
				<PasswordModal
					status={passwordUpdateStatus}
					share={storage}
					storagePassword={storagePassword}
					toggleOpen={this.togglePasswordModal}
				/>
				<WhiteListModal
					toggleOpen={this.toggleWhiteListOpen}
					whiteList={storage.whitelist}
					storageId={storage.ml_id}
					isOpen={whiteListModalOpen}
				/>
				<div className='share-options-bar header-container'>
					<div className='header-share-detail'>
						<div className='back-arrow' onClick={() => {}}>
							<img src={Arrow} />
						</div>
					</div>
					<div
						className='delete-button'
						onMouseOver={this.onMouseOver}
						onMouseOut={this.onMouseOut}
					>
						<COMPANYButton
							imageId={'delete-button'}
							icon={DeleteIcon}
							title={'DELETE STORAGE'}
							enabled={true}
							customClass={`COMPANY-button`}
							// onClick={() => {}}
							onClick={() => history.push(`/portal/storage/delete/${storage.ml_id}`, { storage })}
						/>
					</div>
				</div>
				<div className='share-content'>
					<div className='left-pane'>
						<div className='share-name-label'>
							<div className='icon'>
								<img src={uniqueIcon ? uniqueIcon : LadyBugIcon} className='image' />
							</div>
							<div className='title'>{name}</div>
							<div className='access'>
								<img src={storage.privateAccess ? IconPrivate : IconPublic} />
							</div>
						</div>
						<div key='share-config' className='share-config-section'>
							<Configuration
								toggleWhitelist={this.toggleWhiteListOpen}
								type='SHARE'
								share={storage}
								fields={this.generateShareDetails(storage)}
								changeStoragePassword={this.changeStoragePassword}
							/>
						</div>
						<div key='network-config' className='network-config-section'>
							<Configuration
								toggleWhitelist={this.toggleWhiteListOpen}
								type='NETWORK'
								share={storage}
								fields={this.geenrateNetworkDetails(storage)}
							/>
						</div>
					</div>
					<div className='right-pane'>
						<span key='trending-label' className='trending-label' />
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
								share={storage}
								graphType='singleShare'
								dataPoints={6}
								fileCommitment={storage.type === 'file' ? commitmentAmount : null}
								objectCommitment={storage.type === 'object' ? commitmentAmount : null}
								breakpoint={breakpoint}
							/>
						</div>
					</div>
				</div>
			</div>
		) : (
			<div className='share-detail-view video'>
				<video autoPlay loop>
					<source src='https://hidden/cdn/library/video/chalkboard.mp4' type='video/mp4' />
					Your browser does not support the video tag.
				</video>
			</div>
		);
	}
}

export default withRouter(ShareDetailView);
