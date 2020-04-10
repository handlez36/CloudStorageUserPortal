import React, { Component, Fragment } from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { LAYOUT_GRID_MANAGE_STORAGE } from './StorageConstants';
import HorizontalGrid from '../../components/Layout/HorizontalGrid';
import VerticalGrid from '../../components/Layout/VerticalGrid';
import { StorageApi } from '../../services/storage';
import Shares from './Shares';
import { MENU } from './StorageConstants';
const CDN_URL = process.env.REACT_APP_CDN_URL;
const StorageAddIcon = `${CDN_URL}storage/icon-add-storage-default.svg`;
const StorageAddIconHover = `${CDN_URL}storage/add-storage-alert.svg`;

const ResponsiveReactGridLayout = WidthProvider(Responsive);

class ManageStorage extends Component {
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
			openCount: null,
			closeCount: null,
			totalCount: null,
		};
	}

	onBreakpointChange = breakpoint => {
		let margin;
		let containerPadding;

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

	goToAddStorage = () => {
		const { selectMenuItem } = this.props;
		if (selectMenuItem) {
			selectMenuItem(MENU.ADD_STORAGE);
		}
	};

	selectedShare = share => {
		this.props.getShareDetails(share);
	};
	onMouseOver = () => {
		document.getElementById('add-storage-ms').src = StorageAddIconHover;
	};
	onMouseOut = () => {
		document.getElementById('add-storage-ms').src = StorageAddIcon;
	};

	render() {
		const { containerPadding, margin, rowHeight, includeDebugGridLines } = this.state;
		const { storages } = this.props;

		return (
			<div className='support-overview-page'>
				{includeDebugGridLines && (
					<Fragment>
						<HorizontalGrid />
						<VerticalGrid />
					</Fragment>
				)}

				<div className='header-manage-storage'>
					<div className='title'>A NEW Trends Dynamic Graph is in Development. Coming soon!</div>
				</div>
				<div className='under-construction-text'>UNDER CONSTRUCTION</div>
				<ResponsiveReactGridLayout
					layouts={{
						lg: LAYOUT_GRID_MANAGE_STORAGE.lg,
						md: LAYOUT_GRID_MANAGE_STORAGE.md,
						sm: LAYOUT_GRID_MANAGE_STORAGE.sm,
						xs: LAYOUT_GRID_MANAGE_STORAGE.xs,
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

					<span key='video' className='video'>
						<div className='video'>
							<video autoPlay loop>
								<source src='hidden' type='video/mp4' />
								Your browser does not support the video tag.
							</video>
						</div>
					</span>
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

export default ManageStorage;
