import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ResizeObserver from 'resize-observer-polyfill';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { LAYOUT_GRID } from './StorageConstants';
import AddStorage from './AddStorage';
import TicketCountRow from '../Support/TicketCountRow';
import { TicketApi } from '../../services/ticket';
import Graph from './Graph';
import ShareCardContainer from './Components/ShareCardContainer';
import StorageUsageGraph from './Components/StorageUsageGraph';
import ResolutionPicker from './Components/ResolutionPicker';
import GraphTypePicker from './Components/GraphTypePicker';
const CDN_URL = process.env.REACT_APP_CDN_URL;
const ObjectStorage = `${CDN_URL}storage/object-storage-icon.png`;
const FileStorage = `${CDN_URL}storage/file-storage-icon.svg`;
const backgroundCounter = `${CDN_URL}storage/storage-donut.svg`;

const ResponsiveReactGridLayout = WidthProvider(Responsive);

class Overview extends Component {
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
			resolution: 'DAY',
			graphType: 'BAR',
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

	componentDidMount() {
		this.getTickets();
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
	filterTickets(response) {
		const {
			data: { tickets },
		} = response;

		const open = tickets.filter(
			ticket =>
				(ticket.status !== 'Solved' && ticket.name === 'Storage Add Request') ||
				(ticket.status !== 'Solved' && ticket.name === 'Delete Storage') ||
				(ticket.status !== 'Solved' && ticket.name === 'MODIFY WHITELIST'),
		);

		const closed = tickets.filter(
			ticket =>
				(ticket.status === 'Solved' && ticket.name === 'Storage Add Request') ||
				(ticket.status === 'Solved' && ticket.name === 'Delete Storage') ||
				(ticket.status === 'Solved' && ticket.name === 'MODIFY WHITELIST'),
		);

		return { open, closed };
	}
	getTickets = () => {
		TicketApi.getAll()
			.then(response => {
				const validResponse = response.status === 200 && response.data && response.data.tickets;

				if (validResponse) {
					const { open, closed } = this.filterTickets(response);
					console.log('tickets', response);
					this.setState({
						openCount: open.length,
						closeCount: closed.length,
						totalCount: open.length + closed.length,
					});
				} else {
					this.setState({ error: 'Error pulling billing ticket details' });
				}
			})
			.catch(error => this.setState({ error }));
	};

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
	getPackage = type => {
		const { data } = this.props;
		let totalCommitment;
		const packages = data.packages;
		if (packages.length) {
			totalCommitment = packages.filter(storagePackage => storagePackage.storageType === type);

			return totalCommitment[0];
		}
	};
	graphTypeCallback = graphType => {
		this.setState({ graphType });
	};
	isEmpty = obj => {
		if (obj) {
			return Object.keys(obj).length === 0;
		}
	};
	goToTicketHistory = ticketType => {
		this.props.history.push({
			pathname: '/portal/support',
			state: { ticketType, selected: 'Storage' },
		});
	};

	render() {
		const {
			containerPadding,
			margin,
			rowHeight,
			openCount,
			closeCount,
			totalCount,
			fileGraphOptions,
			objectGraphOptions,
		} = this.state;
		const {
			objectCommitment,
			fileCommitment,
			data,
			viewShare,
			objectShare,
			fileShare,
			objectCommitmentSizeType,
			fileCommitmentSizeType,
			changeToManageStorage,
			packageTypeFile,
			packageTypeObject,
		} = this.props;
		const shares = this.props.storages;

		return (
			<div className='storage-overview-page'>
				{/* <CrossGrid showGrid /> */}
				<ResponsiveReactGridLayout
					layouts={{
						lg: LAYOUT_GRID.lg,
						md: LAYOUT_GRID.md,
						sm: LAYOUT_GRID.sm,
						xs: LAYOUT_GRID.xs,
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
					<span key='add-storage-label' className='add-storage-label'>
						<span className='title grid-item'>ADD Storage</span>
					</span>
					<div key='add-storage' className='add-storage'>
						<AddStorage selectMenuItem={this.props.selectMenuItem} />{' '}
					</div>
					<span key='storage-ticket-label' className='storage-ticket-label'>
						{totalCount !== 0 && <span className='title grid-item'>STORAGE Tickets</span>}
					</span>
					<div key='open-tickets' className='open-tickets storage-icon'>
						<div className='storage-ticket'>
							{totalCount !== 0 && (
								<TicketCountRow
									openCount={openCount}
									text='OPEN'
									closeCount={closeCount}
									totalCount={totalCount}
									type='open'
									customImage={backgroundCounter}
									strokeColor={'#b5d334'}
									goToTicketHistory={this.goToTicketHistory}
								/>
							)}
						</div>
					</div>
					<div key='close-tickets' className='close-tickets network-icon'>
						<div className='storage-ticket'>
							{totalCount !== 0 && (
								<TicketCountRow
									text='CLOSED'
									openCount={openCount}
									closeCount={closeCount}
									totalCount={totalCount}
									type='closed'
									customImage={backgroundCounter}
									strokeColor={'#b5d334'}
									goToTicketHistory={this.goToTicketHistory}
								/>
							)}
						</div>
					</div>
					<div key='storage-graphs' className='storage-graphs'>
						{fileShare && !this.isEmpty(data) && data && (
							<div className='file-graph'>
								<div className='storage-graph-header'>
									<span className='graph-title'>FILE Storage</span>

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
									<Graph
										selectMenuItem={this.props.selectMenuItem}
										image={FileStorage}
										storages={shares}
										id='file'
										total={fileCommitment}
										data={data.file}
										commitmentSizeType={fileCommitmentSizeType}
										packageType={data.packages ? this.getPackage('file').packageType : ''}
									/>
								) : (
									<StorageUsageGraph
										resolution={this.state.fileGraphOptions.resolution}
										type={'file'}
										fileCommitment={fileCommitment}
										fileCommitmentSizeType={fileCommitmentSizeType}
										packageTypeFile={packageTypeFile}
									/>
								)}
							</div>
						)}
						{objectShare && !this.isEmpty(data) && data && (
							<div className='object-graph'>
								<div className='storage-graph-header'>
									<span className='graph-title'>OBJECT Storage</span>

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
									<Graph
										selectMenuItem={this.props.selectMenuItem}
										image={ObjectStorage}
										storages={shares}
										id='object'
										total={objectCommitment}
										data={data.object}
										commitmentSizeType={objectCommitmentSizeType}
										packageType={data.packages ? this.getPackage('object').packageType : ''}
									/>
								) : (
									<StorageUsageGraph
										resolution={this.state.objectGraphOptions.resolution}
										type={'object'}
										objectCommitment={objectCommitment}
										objectCommitmentSizeType={objectCommitmentSizeType}
										packageTypeObject={packageTypeObject}
									/>
								)}
							</div>
						)}
					</div>
					<span key='share-list-label' className='share-list-label'>
						{shares && <span className='title grid-item'>SHARES</span>}
					</span>
					<div key='share-list' className='share-list'>
						{shares && (
							<ShareCardContainer
								objectCommitment={objectCommitment}
								fileCommitment={fileCommitment}
								stats={data}
								shares={shares}
								selectMenuItem={this.props.selectMenuItem}
								viewShare={viewShare}
								changeToManageStorage={changeToManageStorage}
							/>
						)}
					</div>
				</ResponsiveReactGridLayout>
			</div>
		);
	}
}

export default withRouter(Overview);
