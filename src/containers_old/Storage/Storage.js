import React, { Component } from 'react';
import { connect } from 'react-redux';

import { MENU } from './StorageConstants';
import PortalLayout from '../Layout/PortalLayout';
import SupportSection from '../../components/Common/SupportSection';
import { StorageApi } from '../../services/storage';
import { updateModule } from '../../actions/siteTracking';
import { SITE_MODULES } from '../../components/Common/CommonConstants';
import Overview from './Overview';
import ManageStorage from './ManageStorage';
import DeleteStorage from './DeleteStorage/DeleteStorageGrid';
import ShareDetails from './ShareDetails';
import StorageAddOverview from './Add/StorageAddWizard';
import * as StorageUtils from './Utils/StorageUtils';
import { FifthColumn } from '../../components/Common/FifthColumn';

export class Storage extends Component {
	constructor(props) {
		super(props);

		this.menuItems = {
			[MENU.OVERVIEW]: 1,
			[MENU.MANAGE]: 2,
		};

		this.state = {
			active: MENU.OVERVIEW,
			//active: MENU.MANAGE,
			supportSectionComponent: null,
			supportParams: null,
			storages: null,
			error: null,
			selectedShare: null,
			storageStats: null,
			fileShare: null,
			objectShare: null,
			commitmentSizeType: 'MB',
			packageTypeFile: null,
			packageTypeObject: null,
		};
	}

	/**
	 * Switch between Support module menu options
	 */
	selectMenuItem = item => {
		this.setState({ active: item });
		window.history.replaceState('share', 'share', '/portal/storage/0');
		//this.unloadSupportColumn();
	};

	loadSupportColumn = (component, params) => {
		this.setState({
			supportSectionComponent: component,
			supportParams: params,
		});
	};

	unloadSupportColumn = (refresh = false) => {
		this.setState({ supportSectionComponent: null, supportParams: null });
		if (refresh) {
			this.grabStorageInfo();
		}
	};
	checkShares = (shares, type) => {
		if (!shares) {
			return false;
		}

		if (shares.length) {
			const share = shares.filter(share => share.type === type);
			if (share.length) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	};

	/**
	 * Grab storage object from Bonita (via Bryce's Java API (middleware))
	 */
	grabStorageInfo = () => {
		StorageApi.getAll()
			.then(response => {
				const validResponse = response.status === 200 && response.data;
				if (validResponse) {
					const sortedStorages = StorageUtils.sortShares(response.data.storages);
					const fileShare = this.checkShares(response.data.storages, 'file');
					const objectShare = this.checkShares(response.data.storages, 'object');
					this.setState(
						{
							storages: sortedStorages,
							fileShare,
							objectShare,
						},
						() => {
							this.getShare();
						},
					);
				} else {
					this.setState({ error: 'Error pulling storage details' });
				}
			})
			.catch(error => console.log(error));
	};

	getStorageStats = () => {
		StorageApi.getStorageStats()
			.then(response => {
				const validResponse = response.status === 200 && response.data;
				if (validResponse) {
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
				} else {
					this.setState({ error: 'Error pulling storage stat details' });
				}
			})
			.catch(error => this.setState({ error }));
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
		console.log(pkg);
		if (pkg.storageType === 'object') {
			this.setState({ objectCommitmentSizeType: commitmentSizeType });
		} else {
			this.setState({ fileCommitmentSizeType: commitmentSizeType });
		}
		return shareSize;
	};

	getSelectedShareDetails = id => {
		if (!id) {
			return null;
		}
		const { storages } = this.state;

		if (storages) {
			const filteredShares = storages.filter(share => share.ml_id.toString() === id);
			if (filteredShares && filteredShares[0]) {
				return filteredShares[0];
			} else {
				return null;
			}
		}

		return null;
	};

	getShare = () => {
		const { storages, active } = this.state;
		const {
			params: { share },
		} = this.props.match;

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

	/**
	 * Once component mounts, call the following functions
	 */
	componentDidMount() {
		const { updateModule } = this.props;
		updateModule(SITE_MODULES.STORAGE);

		this.grabStorageInfo();
		this.getStorageStats();
		this.getShare();
	}
	getShareDetails = share => {
		window.history.replaceState(share, 'share', `/portal/storage/${share.ml_id}`);
		this.setState({ active: 'SHARE DETAILS', selectedShare: share });
	};
	getPackage = (data, type) => {
		let totalCommitment;
		const packages = data.packages;
		if (packages.length) {
			totalCommitment = packages.filter(storagePackage => storagePackage.storageType === type);
			if (type === 'file') {
				this.setState({ packageTypeFile: totalCommitment[0].packageType });
			} else {
				this.setState({ packageTypeObject: totalCommitment[0].packageType });
			}
			return totalCommitment[0];
		} else {
			return null;
		}
	};

	changeToManageStorage = share => {
		this.setState({ active: 'MANAGE STORAGE' }, () => this.getShareDetails(share));
	};

	render() {
		const {
			active,
			supportSectionComponent,
			supportParams,
			selectedShare,
			storageStats,
			fileCommitment,
			objectCommitment,
			objectCommitmentSizeType,
			fileCommitmentSizeType,
			fileShare,
			objectShare,
			packageTypeFile,
			packageTypeObject,
		} = this.state;

		return (
			<PortalLayout
				page='storage'
				sideMenu={this.menuItems}
				history={this.props.history}
				activePage={this.menuItems[active]}
				callback={this.selectMenuItem}
			>
				<div className='main storage'>
					<div className='portal-header'>
						<div className='menu-selection'>{this.state.active}</div>
					</div>
					{this.state.active === MENU.OVERVIEW && (
						<Overview
							selectMenuItem={this.selectMenuItem}
							storages={this.state.storages}
							data={storageStats}
							fileCommitment={fileCommitment}
							objectCommitment={objectCommitment}
							viewShare={this.getShareDetails}
							fileShare={fileShare}
							objectShare={objectShare}
							objectCommitmentSizeType={objectCommitmentSizeType}
							fileCommitmentSizeType={fileCommitmentSizeType}
							changeToManageStorage={this.changeToManageStorage}
							packageTypeFile={packageTypeFile}
							packageTypeObject={packageTypeObject}
						/>
					)}
					{this.state.active === MENU.MANAGE && (
						<ManageStorage
							selectMenuItem={this.selectMenuItem}
							storages={this.state.storages}
							getShareDetails={this.getShareDetails}
						/>
					)}
					{this.state.active === 'SHARE DETAILS' && selectedShare && (
						<ShareDetails
							selectMenuItem={this.selectMenuItem}
							storages={this.state.storages}
							share={selectedShare}
							getShareDetails={this.getShareDetails}
							fileCommitment={fileCommitment}
							objectCommitment={objectCommitment}
							objectCommitmentSizeType={objectCommitmentSizeType}
							fileCommitmentSizeType={fileCommitmentSizeType}
							packageTypeFile={packageTypeFile}
							packageTypeObject={packageTypeObject}
						/>
					)}
					{this.state.active === MENU.ADD_STORAGE && (
						<StorageAddOverview
							selectMenuItem={this.selectMenuItem}
							refreshStorageInfo={this.grabStorageInfo}
						/>
					)}
					{this.state.active === MENU.REMOVE_STORAGE && selectedShare && (
						<DeleteStorage
							storage={selectedShare}
							storageID={selectedShare.ml_id}
							selectMenuItem={this.selectMenuItem}
							refreshStorageInfo={this.grabStorageInfo}
						/>
					)}
				</div>
				<SupportSection
					content={supportSectionComponent}
					auth_status={this.props.auth_status}
					supportParams={supportParams}
					unloadSupportColumn={this.unloadSupportColumn}
					updateStorageView={this.updateStorageView}
					grabStorageInfo={this.grabStorageInfo}
				/>
				<FifthColumn />
			</PortalLayout>
		);
	}
}

function mapStateToProps(state) {
	return {
		auth_status: state.auth_status,
	};
}

export default connect(
	mapStateToProps,
	{ updateModule },
)(Storage);
