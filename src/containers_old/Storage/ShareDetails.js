import React, { Component, Fragment } from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { LAYOUT_GRID_SHARE_DETAILS } from './StorageConstants';
import HorizontalGrid from '../../components/Layout/HorizontalGrid';
import VerticalGrid from '../../components/Layout/VerticalGrid';
import BloxButton from '../../components/Common/BloxButton';
import { StorageApi } from '../../services/storage';
import Shares from './Shares';
import { PASSWORD_UPDATE_STATUS } from './StorageConstants';
import PasswordModal from './View/PasswordModal';
import StorageUsageGraph from './Components/StorageUsageGraph';
import ResolutionPicker from './Components/ResolutionPicker';
import { MENU } from './StorageConstants';
import WhiteListModal from './View/WhiteListModal';
import { STORAGE_AVATAR_URL_PREFIX } from '../../components/Common/CommonConstants';
import Configuration from './View/Configurations';
const CDN_URL = process.env.REACT_APP_CDN_URL;

const iconPrivate = `${CDN_URL}storage/icon-private.svg`;
const iconPublic = `${CDN_URL}storage/icon-public.svg`;
const StorageAddIconHover = `${CDN_URL}storage/add-storage-alert.svg`;
const ResetIconSelected = `${CDN_URL}storage/icon-reset.svg`;
const ResetIcon = `${CDN_URL}common/icon-reset-default.svg`;
const LadyBugIcon = `${CDN_URL}storage/Storage-ladybug-white-thinline.svg`;
const StorageAddIcon = `${CDN_URL}storage/icon-add-storage-default.svg`;
const DeleteIconHover = `${CDN_URL}storage/icon-delete-storage-select.svg`;
const DeleteIcon = `${CDN_URL}storage/icon-delete-storage-default.svg`;
const Arrow = `${CDN_URL}storage/left-arrow.svg`;
const ResponsiveReactGridLayout = WidthProvider(Responsive);

class ShareDetails extends Component {
	constructor(props) {
		super(props);
		this.myObserver = null;
		this.state = {
			rowHeight: 0,
			margin: [],
			containerPadding: [],
			layout: [],
			storageDetails: null,
			storageErr: null,
			includeDebugGridLines: false,
			storagePassword: null,
			whiteList: null,
			modalOpen: false,
			passwordUpdateStatus: PASSWORD_UPDATE_STATUS.NOT_STARTED,
			resolution: 'DAY',
			fileGraphOptions: {
				resolution: 'DAY',
				type: 'BAR',
			},
			objectGraphOptions: {
				resolution: 'DAY',
				type: 'BAR',
			},
		};
	}

	onBreakpointChange = breakpoint => {
		let margin;
		let containerPadding;
		console.log(breakpoint);
		switch (breakpoint) {
			case 'xs':
				margin = [20, 0];
				containerPadding = [30, 0];
				break;
			case 'sm':
				margin = [20, 0];
				containerPadding = [30, 0];
				break;
			case 'md':
				margin = [22, 0];
				containerPadding = [30, 0];
				break;
			case 'lg':
				margin = [32, 0];
				containerPadding = [66, 0];
				break;
			default:
				margin = [22, 0];
				containerPadding = [30, 0];
				break;
		}

		const horizontalRule = document.querySelector('.gray-horizontal-bar');

		horizontalRule.setAttribute('style', `margin-left: ${-containerPadding[0]}px`);

		this.setState({ margin, containerPadding });
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

	toggleWhiteListOpen = () => {
		this.setState(state => ({ ...state, modalOpen: !state.modalOpen }));
	};

	getStorageStats = () => {
		StorageApi.getStorageStats()
			.then(response => {
				const validResponse = response.status === 200 && response.data;

				if (validResponse) {
					this.setState({
						data: response.data,
					});
				} else {
					this.setState({ error: 'Error pulling storage stat details' });
				}
			})
			.catch(error => this.setState({ error }));
	};

	componentDidMount() {
		this.getStorageStats();
		this.onBreakpointChange();
		this.myObserver = new ResizeObserver(entries => {
			entries.forEach(() => {
				this.onChange();
			});
		});

		const wrapperElement = document.querySelector('.layout');
		this.myObserver.observe(wrapperElement);
	}

	componentWillUnmount() {
		this.myObserver.disconnect();
	}

	onChange = () => {
		let height = window.innerHeight / 56;

		if (window.innerHeight >= 1010 && window.innerHeight <= 1030) {
			height = 18;
		} else if (window.innerHeight >= 1400 && window.innerHeight <= 1500) {
			height = 27;
		}

		if (window.innerHeight <= 660) {
			height = 11;
		}

		this.setState({
			rowHeight: height,
		});
	};

	goToDeleteStorage = () => {
		this.props.selectMenuItem('REMOVE STORAGE');
	};
	selectedShare = share => {
		this.props.getShareDetails(share);
	};

	changeStoragePassword = () => {
		const { share: { username, ml_id } = {} } = this.props;
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

	goToAddStorage = () => {
		const { selectMenuItem } = this.props;
		if (selectMenuItem) {
			selectMenuItem(MENU.ADD_STORAGE);
		}
	};

	onMouseOver = () => {
		document.getElementById('delete-button').src = DeleteIconHover;
	};
	onMouseOut = () => {
		document.getElementById('delete-button').src = DeleteIcon;
	};
	getUniqueShareIcon = icon => {
		const defaultIcon = LadyBugIcon;
		if (!icon) {
			return defaultIcon;
		}

		return `${STORAGE_AVATAR_URL_PREFIX}/${icon}.svg`;
	};
	onMouseOver = () => {
		document.getElementById('add-storage-ms').src = StorageAddIconHover;
	};
	onMouseOut = () => {
		document.getElementById('add-storage-ms').src = StorageAddIcon;
	};

	render() {
		const {
			containerPadding,
			margin,
			rowHeight,
			includeDebugGridLines,
			passwordUpdateStatus,
			storagePassword,
			fileGraphOptions,
			objectGraphOptions,
			modalOpen,
		} = this.state;
		const {
			share,
			storages,
			fileCommitment,
			objectCommitment,
			objectCommitmentSizeType,
			fileCommitmentSizeType,
			packageTypeFile,
			packageTypeObject,
		} = this.props;

		const uniqueIcon = this.getUniqueShareIcon(share.icon);
		const networkFields = {
			'1': {
				multiple: true,
				a: { label: 'Customer IP', content: share.customer_ip },
				b: { label: 'Vlan Tag', content: share.vlan },
			},
		};
		const label = share.type === 'object' ? 'Secret Key' : '';
		const content =
			share.type === 'object' ? 'You will need to update across all of your connections. ' : '';
		const shareFields = {
			'1': {
				multiple: true,
				a: { label: 'Share IP', content: share.ip_address },
				b: {
					label,
					content,
				},
			},
			'2': {
				multiple: true,
				a: { label: 'Access Key', content: share.username },
				b: { label: '', content: '' },
			},
			'3': {
				multiple: true,
				a: { label: 'Share Path', content: ' ' },
				b: { label: '', content: '' },
			},
		};
		return (
			<div className='storage-overview-page'>
				{includeDebugGridLines && (
					<Fragment>
						<HorizontalGrid />
						<VerticalGrid />
					</Fragment>
				)}
				<PasswordModal
					key='pwd-modal'
					status={passwordUpdateStatus}
					share={share}
					storagePassword={storagePassword}
					toggleOpen={this.togglePasswordModal}
				/>
				<WhiteListModal
					toggleOpen={this.toggleWhiteListOpen}
					whiteList={share.whitelist}
					storageId={share.ml_id}
					isOpen={modalOpen}
				/>
				<div className='header-container'>
					<div className='header-share-detail'>
						<div className='back-arrow' onClick={() => this.props.selectMenuItem('MANAGE STORAGE')}>
							<img src={Arrow} />
						</div>
					</div>
					<div
						className='delete-button'
						onMouseOver={this.onMouseOver}
						onMouseOut={this.onMouseOut}
					>
						<BloxButton
							imageId={'delete-button'}
							icon={DeleteIcon}
							title={'DELETE STORAGE'}
							enabled={true}
							customClass={`blox-button`}
							onClick={() => this.props.selectMenuItem('REMOVE STORAGE')}
						/>
					</div>
				</div>

				<ResponsiveReactGridLayout
					layouts={{
						lg: LAYOUT_GRID_SHARE_DETAILS.lg,
						md: LAYOUT_GRID_SHARE_DETAILS.md,
						sm: LAYOUT_GRID_SHARE_DETAILS.sm,
						xs: LAYOUT_GRID_SHARE_DETAILS.xs,
					}}
					measureBeforeMount={false}
					className='layout'
					rowHeight={rowHeight}
					isDraggable={false}
					isResizable={false}
					breakpoints={{ lg: 1450, md: 930, sm: 640, xs: 400 }}
					// breakpoints={{ lg: 1450, md: 1000, sm: 640, xs: 400 }}
					cols={{ lg: 12, md: 12, sm: 12, xs: 12 }}
					containerPadding={containerPadding}
					onBreakpointChange={this.onBreakpointChange}
					margin={margin}
					onLayoutChange={this.onLayoutChange}
					onWidthChange={this.onWidthChange}
				>
					<div key='horizontal-bar' className='gray-horizontal-bar' />
					<span key='share-name-label' className='share-name-label'>
						<div className='lady-bug'>
							<img src={uniqueIcon ? uniqueIcon : LadyBugIcon} className='image' />
						</div>
						<div className='title'>{share.name}</div>
					</span>

					<div key='share-config' className='share-config'>
						<Configuration
							toggleWhitelist={this.toggleWhiteListOpen}
							type='SHARE'
							share={share}
							fields={shareFields}
							changeStoragePassword={this.changeStoragePassword}
						/>
					</div>
					<div key='network-config' className='network-config'>
						<Configuration
							toggleWhitelist={this.toggleWhiteListOpen}
							type='NETWORK'
							share={share}
							fields={networkFields}
						/>
					</div>
					<span key='trending-label' className='trending-label'>
						<div className='single-share-graph'>
							<div className='header'>
								<span className='title grid-item'>TRENDING</span>
								{share.type === 'file' ? (
									<div
										key='file-storage-resolution-picker'
										className='file-storage-resolution-picker'
									>
										<ResolutionPicker
											selected={fileGraphOptions.resolution}
											selectResolution={resolution =>
												this.setState({ fileGraphOptions: { ...fileGraphOptions, resolution } })
											}
										/>
									</div>
								) : (
									<div
										key='object-storage-resolution-picker'
										className='object-storage-resolution-picker'
									>
										<ResolutionPicker
											selected={objectGraphOptions.resolution}
											selectResolution={resolution =>
												this.setState({ objectGraphOptions: { ...objectGraphOptions, resolution } })
											}
										/>
									</div>
								)}
							</div>
							<StorageUsageGraph
								resolution={
									share.type === 'file'
										? this.state.fileGraphOptions.resolution
										: this.state.objectGraphOptions.resolution
								}
								type={share.type === 'file' ? 'file' : 'object'}
								packageTypeFile={packageTypeFile}
								packageTypeObject={packageTypeObject}
								share={share}
								graphType={'singleShare'}
								dataPoints={6}
								fileCommitment={fileCommitment}
								objectCommitment={objectCommitment}
								objectCommitmentSizeType={objectCommitmentSizeType}
								fileCommitmentSizeType={fileCommitmentSizeType}
							/>
						</div>
					</span>

					<div key='access' className='access'>
						<img src={share.privateAccess ? iconPrivate : iconPublic} />
					</div>

					<span key='shares-label' className='shares-label'>
						<span className='title grid-item'>SHARES</span>
						{storages && (
							<span className='active-shares'>{`Active Shares: ${storages.length}`}</span>
						)}
					</span>
					<div key='shares' className='shares'>
						{storages && <Shares selectedShareCallback={this.selectedShare} shares={storages} />}
					</div>
					<div key='add-storage' className='add-storage'>
						<div
							className='add-storage-icon'
							onClick={this.goToAddStorage}
							onMouseOver={this.onMouseOver}
							onMouseOut={this.onMouseOut}
						>
							<img id='add-storage-ms' src={StorageAddIcon} />
							<div className='text'>ADD STORAGE</div>
						</div>
					</div>
				</ResponsiveReactGridLayout>
			</div>
		);
	}
}

export default ShareDetails;
