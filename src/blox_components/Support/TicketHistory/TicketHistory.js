import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Responsive, WidthProvider } from 'react-grid-layout';
import ResizeObserver from 'resize-observer-polyfill';
import { TicketApi } from 'services/ticket';
import { Utils } from 'services/utils';
import {
	TICKET_LIST_TYPE,
	STATUS,
	TicketHistoryFiltering,
	TicketHistorySorting,
} from 'utils/TicketConstants';
import Filter from 'components_old/Common/DropDownFilter';
import NewTicket from 'components_old/Common/NewTicket';
import { MENU } from 'utils/TicketConstants';
import { updateModule, updatePage, addPageToBreadCrumbs } from 'actions/siteTracking';
import { MENU as SUPPORT_MENU } from 'utils/TicketConstants';
import { SITE_PAGES, SITE_MODULES } from 'utils/CommonConstants';
import NavArrows from 'sub_components/Support/NavArrows';
import SupportSection from 'components_old/Common/SupportSection';

import {
	animateConvoCycle,
	updateArrowVisibility,
} from 'blox_components/Support/Conversations/Components/ConvoCycleAnimations';
import TicketHistoryDetail from 'blox_components/Support/TicketHistoryDetail/TicketHistoryDetail';
import TicketInformation from 'containers_old/Support/TicketHistory/TicketInformation';
const CDN_URL = process.env.REACT_APP_CDN_URL;
const TicketHistoryArrowUp = `${CDN_URL}support/TicketHistoryIndicator.svg`;
const TicketHistoryArrowDown = `${CDN_URL}support/TicketHistoryDOWN.svg`;

const ResponsiveReactGridLayout = WidthProvider(Responsive);
const PAGE_STATE = {
	LIST: 'LIST',
	DETAIL: 'DETAIL',
};

class TicketHistory extends Component {
	constructor(props) {
		super(props);
		this.myObserver = null;

		this.state = {
			error: null,
			topItem: 0,
			currentItem: 0,
			showBottomArrow: false,
			showTopArrow: false,
			selected: null,
			selectedTicketStatus: this.props.selectedTicketStatus,
			downCount: 0,
			upCount: 0,
			topRow: 0,
			rowCount: 0,
			filterArrow: 'Ascending',
			closedTickets: '',
			tickets: '',
			filteredTickets: '',
			pageState: PAGE_STATE.LIST,
			selectedTicketId: null,
			filterTitle: 'Any',
			rowHeight: 0,
			margin: [],
			containerPadding: [],
			layout: [],
		};
	}
	componentDidUpdate(prevProps) {
		const { pageState } = this.state;
		const pathname = window.location.pathname;
		const matches = pathname.split('/');
		const { updatePage, addPageToBreadCrumbs } = this.props;
		if (matches) {
			const [, , siteModule, sitePage, ticketNumber] = matches;

			if (ticketNumber && pageState === PAGE_STATE.LIST) {
				this.setState({ pageState: PAGE_STATE.DETAIL });
			} else if (!ticketNumber && pageState === PAGE_STATE.DETAIL) {
				updatePage(SITE_PAGES.SUPPORT[SUPPORT_MENU.TICKET_HISTORY]);
				addPageToBreadCrumbs(SITE_PAGES.SUPPORT[SUPPORT_MENU.TICKET_HISTORY], SITE_MODULES.SUPPORT);
				this.setState({ pageState: PAGE_STATE.LIST });
			}
		}

		if (prevProps.match != this.props.match) {
			this.updatePage();
		}
	}

	setShowTopArrow = showTopArrow => {
		this.setState({ showTopArrow });
	};

	setShowBottomArrow = showBottomArrow => {
		this.setState({ showBottomArrow });
	};
	getTicketId = () => {
		const {
			params: { ticketNumber },
		} = this.props.match;

		if (ticketNumber) {
			this.setState({ selectedTicket: true });
			return ticketNumber;
		}
	};
	updatePage = () => {
		const id = this.getTicketId();
		if (id) {
			this.setState({
				pageState: PAGE_STATE.DETAIL,
				selectedTicketId: id,
			});
		} else {
			this.getTickets();
			this.needDownArrow();
			this.myObserver = new ResizeObserver(entries => {
				entries.forEach(entry => {
					this.needDownArrow(entry);
				});
			});
			try {
				const ticketHistory = document.querySelector('.ticket-history-page');
				const ticketWrapper = document.querySelector('.open-section');
				this.myObserver.observe(ticketHistory);
				this.myObserver.observe(ticketWrapper);
			} catch (e) {}

			this.setState({ topItem: 0, currentItem: 0 });
		}
		if (this.props.selected) {
			this.setState({ selected: this.props.selected });
		}
	};

	componentDidMount() {
		const { updateModule, updatePage, addPageToBreadCrumbs } = this.props;
		updatePage(SITE_PAGES.SUPPORT[SUPPORT_MENU.TICKET_HISTORY]);
		addPageToBreadCrumbs(SITE_PAGES.SUPPORT[SUPPORT_MENU.TICKET_HISTORY], SITE_MODULES.SUPPORT);
		updateModule(SITE_MODULES.SUPPORT);

		this.updatePage();

		updateArrowVisibility(
			this.setShowTopArrow,
			this.setShowBottomArrow,
			'.ticket-history-ticket-row',
			'.ticket-history-row',
		);
	}

	displayTicketHistory = () => {
		const { history } = this.props;

		// Set 'selected ticket' to null
		history.push('/portal/support');
		//this.setState({ pageState: PAGE_STATE.LIST });
		this.getTickets();
	};

	cycleItems = (direction = 'next') => {
		const reverseDirection = direction === 'next' ? 'prev' : 'next';
		animateConvoCycle(
			[],
			{},
			reverseDirection,
			'.ticket-history-ticket-row',
			'.ticket-history-row',
			this.setShowTopArrow,
			this.setShowBottomArrow,
		);
	};

	downCounter = () => {
		if (this.state.rowCount >= this.state.downCount + 1) {
			this.setState(
				{
					downCount: this.state.downCount + 1,
				},
				() => {
					console.log(this.state.downCount + 'down');
				},
			);
			return true;
		}
		return false;
	};

	needDownArrow = () => {
		try {
			const footer = document.querySelector('.footerContainer');
			const tickets = document.querySelector('.open-section');
			const bottomOfTicketList =
				tickets.getBoundingClientRect().top + tickets.getBoundingClientRect().height;
			const topOfFooter = footer.getBoundingClientRect().top;

			this.setState({ showBottomArrow: bottomOfTicketList > topOfFooter });
		} catch (e) {}
	};

	onSelectTicket = ticket => {
		const { history, addPageToBreadCrumbs, updatePage } = this.props;
		const url = `/portal/support/ticket_history/${ticket.id}`;
		history.push(url);
		updatePage(SITE_PAGES.SUPPORT[SUPPORT_MENU.TICKET_HISTORY_DETAIL]);
		addPageToBreadCrumbs(`TICKET #${ticket.id}`, SITE_MODULES.SUPPORT, url);

		history.push(`/portal/support/ticket_history/${ticket.id}`);
		this.setState({
			pageState: PAGE_STATE.DETAIL,
			ticketType: ticket.type,
		});
	};

	getFilterTickets = () => {
		const { filteredTickets } = this.state;

		const list = [];
		let row = 0;
		if (filteredTickets.length) {
			for (let i = 0; i < filteredTickets.length; i += 3) {
				list.push(
					<div
						key={`row-${filteredTickets[i].id}`}
						className={`ticket-history-ticket-row row-${row}`}
						data-row={row}
					>
						{filteredTickets[i] && (
							<NewTicket
								key={`ticket-${filteredTickets[i].id}`}
								ticket={filteredTickets[i]}
								active={
									this.props.selectedTicket &&
									filteredTickets[i].id === this.props.selectedTicket.id
								}
								clickHandler={this.onSelectTicket}
							/>
						)}
						{filteredTickets[i + 1] && (
							<NewTicket
								key={`ticket-${filteredTickets[i + 1].id}`}
								ticket={filteredTickets[i + 1]}
								active={
									this.props.selectedTicket &&
									filteredTickets[i + 1].id === this.props.selectedTicket.id
								}
								clickHandler={this.onSelectTicket}
							/>
						)}
						{filteredTickets[i + 2] && (
							<NewTicket
								key={`ticket-${filteredTickets[i + 2].id}`}
								ticket={filteredTickets[i + 2]}
								active={
									this.props.selectedTicket &&
									filteredTickets[i + 2].id === this.props.selectedTicket.id
								}
								clickHandler={this.onSelectTicket}
							/>
						)}
					</div>,
				);
				row++;
			}
			if (this.state.rowCount !== list.length) {
				this.setState({ rowCount: list.length });
			}
			return list;
		}
	};
	renderTickets(type) {
		const { tickets, showBottomArrow, showTopArrow } = this.state;

		try {
			downArrow = document.getElementById('ticket-history-down-arrow');
		} catch (e) {}
		const arrows = {
			up: TicketHistoryArrowDown,
			down: TicketHistoryArrowUp,
		};
		return (
			<div className={`${type}-section`}>
				{showTopArrow && (
					<div className='nav-arrow-bounding-box'>
						<NavArrows
							customClass='ticket-history-up-arrow'
							items={tickets}
							arrows={arrows}
							params={{ ticketList: type }}
							direction='DOWN'
							onClick={() => this.cycleItems('next')}
						/>
						<div className='upper-filter' />{' '}
					</div>
				)}
				<div className={`ticket-history-row ${tickets.length === 0 ? 'empty' : ''}`}>
					{tickets.length === 0 && <div className='no-tickets' />}
					{this.getFilterTickets()}
				</div>
				{showBottomArrow && (
					<div className='nav-arrow-bounding-box'>
						<NavArrows
							customClass='ticket-history-down-arrow'
							items={tickets}
							arrows={arrows}
							params={{ ticketList: type }}
							direction='UP'
							onClick={() => this.cycleItems('prev')}
						/>
						<div className='lower-filter' />{' '}
					</div>
				)}
			</div>
		);
	}
	filterList = (selected, selectedTicketStatus, filterArrow, list) => {
		if (selectedTicketStatus) {
			selectedTicketStatus = selectedTicketStatus.toLowerCase();
			if (selectedTicketStatus === 'closed') {
				list = this.state.closedTickets;
				list = list.filter(
					ticket =>
						ticket.status === 'Solved' ||
						ticket.status === 'Closed' ||
						ticket.status === 'Resolved' ||
						ticket.status === 'resolved',
				);
			} else if (selectedTicketStatus === 'open') {
				list = list.filter(
					ticket =>
						ticket.status === 'Open' ||
						ticket.status === 'New' ||
						ticket.status === 'In Progress' ||
						ticket.status === 'Pending Review',
				);
			} else if (selectedTicketStatus === 'any') {
				list = list;
			} else {
				list = list.filter(ticket => ticket.status === selectedTicketStatus);
			}
		}
		if (selected) {
			if (selected === 'Support') {
				list = list.filter(
					ticket =>
						(ticket.name !== 'Storage Add Request' && ticket.type === selected) ||
						(ticket.name !== 'Delete Storage' && ticket.type === selected) ||
						(ticket.name !== 'MODIFY WHITELIST' && ticket.type === selected),
				);
			} else if (selected === 'Storage') {
				list = list.filter(
					ticket =>
						ticket.name === 'Storage Add Request' ||
						ticket.type === selected ||
						ticket.name === 'Delete Storage' ||
						ticket.name === 'MODIFY WHITELIST',
				);
			} else if (selected === 'Any') {
				list = list;
			} else if (selected === 'General') {
				list = list.filter(ticket => ticket.name !== 'Storage Add Request');
				list = list.filter(
					ticket =>
						ticket.type === 'Billing' || ticket.type === 'Support' || ticket.type === 'Outage',
				);
			} else {
				list = list.filter(ticket => ticket.type === selected);
			}
		}

		filterArrow === 'Ascending' ? (list = Utils.sort(list)) : (list = Utils.sort(list).reverse());
		if (!list) {
			return [];
		} else {
			this.setState({ filteredTickets: list });
		}
	};

	splitTickets(tickets) {
		if (!tickets) return null;

		const open = tickets.filter(
			ticket => ticket.status !== STATUS.SOLVED || ticket.status !== STATUS.RESOLVED,
		);
		const closed = tickets.filter(
			ticket => ticket.status === STATUS.SOLVED || ticket.status === STATUS.RESOLVED,
		);

		return { open, closed };
	}
	sortArrow = option => {
		if (option === false) {
			this.setState(
				{
					filterArrow: 'Ascending',
				},
				() => {
					this.filterList(
						this.state.selected,
						this.state.selectedTicketStatus,
						this.state.filterArrow,
						this.state.tickets,
					);
				},
			);
		} else if (option === true) {
			this.setState(
				{
					filterArrow: 'Descending',
				},
				() => {
					this.filterList(
						this.state.selected,
						this.state.selectedTicketStatus,
						this.state.filterArrow,
						this.state.tickets,
					);
				},
			);
		}
	};
	ticketType = option => {
		this.setState(
			{
				selected: option,
			},
			() => {
				if (this.state.tickets) {
					this.filterList(
						this.state.selected,
						this.state.selectedTicketStatus,
						this.state.filterArrow,
						this.state.tickets,
					);
				}
			},
		);
	};

	ticketStatus = status => {
		if (status) {
			this.setState(
				{
					selectedTicketStatus: status,
				},
				() => {
					if (this.state.tickets) {
						this.filterList(
							this.state.selected,
							this.state.selectedTicketStatus,
							this.state.filterArrow,
							this.state.tickets,
						);
					}
				},
			);
		} else {
			this.setState(
				{
					selectedTicketStatus: this.state.selectedTicketStatus,
				},
				() => {
					this.filterList(
						this.state.selected,
						this.state.selectedTicketStatus,
						this.state.filterArrow,
						this.state.tickets,
					);
				},
			);
		}
	};

	getTickets() {
		TicketApi.getAll()
			.then(response => {
				const validResponse = response.tickets;
				if (validResponse) {
					const splitTickets = this.splitTickets(response.tickets);
					this.needDownArrow();
					this.setState(
						{
							tickets: splitTickets['open'],
							closedTickets: splitTickets['closed'],
							filteredTickets: splitTickets,
						},
						() => {
							this.ticketStatus();
						},
					);
				} else {
					this.setState({ error: 'Error pulling ticket details' });
				}
			})
			.catch(error => this.setState({ error }));
	}

	onBreakpointChange = breakpoint => {
		let rowHeight = 0;
		let margin;
		let containerPadding;

		switch (breakpoint) {
			case 'xs':
				rowHeight = 16;
				margin = [20, 0];
				containerPadding = [30, 0];
				break;
			case 'sm':
				//1440
				rowHeight = 18;
				margin = [16, 0];
				containerPadding = [30, 0];
				break;
			case 'md':
				rowHeight = 23;
				margin = [22, 0];
				containerPadding = [40, 0];
				break;
			case 'lg':
				rowHeight = 27;
				margin = [23, 0];
				containerPadding = [63.5, 0];
				break;
			default:
				rowHeight = 23;
				margin = [22, 0];
				containerPadding = [30, 0];

				break;
		}

		this.setState({ rowHeight, margin, containerPadding });
	};

	render() {
		const { pageState, selectedTicketId } = this.state;
		const { containerPadding, margin, rowHeight } = this.state;

		const layout = [
			{ i: 'filter', x: 0.1, y: 1, w: 0, h: 2, static: true },
			{ i: 'filter-two', x: 2.7, y: 1, w: 3, h: 2, static: true },
			{ i: 'tickets', x: 0, y: 3, w: 6, h: 45, static: true },
		];
		const layoutSmall = [
			{ i: 'filter', x: 0.1, y: 1, w: 0, h: 2, static: true },
			{ i: 'filter-two', x: 2.7, y: 1, w: 3, h: 2, static: true },
			{ i: 'tickets', x: 0, y: 3, w: 6, h: 46, static: true },
		];

		return (
			<div className='ticket-history-page outer-wrapper'>
				{pageState === PAGE_STATE.LIST && (
					<ResponsiveReactGridLayout
						layouts={{ lg: layout, md: layout, sm: layoutSmall }}
						//layout={layout}
						measureBeforeMount={false}
						className='layout '
						rowHeight={rowHeight}
						isDraggable={false}
						isResizable={false}
						breakpoints={{ lg: 820, md: 700, sm: 440, xs: 200 }}
						cols={{ lg: 6, md: 6, sm: 6, xs: 6 }}
						containerPadding={containerPadding}
						onBreakpointChange={this.onBreakpointChange}
						margin={margin}
						//onLayoutChange={this.onLayoutChange}
					>
						{/* <div className='ticket-history-page outer-wrapper'> */}
						<div className='filter grid-item-rh' key='filter'>
							<Filter
								description='Ticket Type'
								callback={this.ticketType}
								title={this.state.selected ? this.state.selected : this.state.filterTitle}
								options={TicketHistoryFiltering}
							/>
						</div>
						<div key='filter-two' className='grid-item-rh filter-two'>
							<Filter
								description='Ticket Status'
								title={
									this.state.selectedTicketStatus
										? this.state.selectedTicketStatus
										: this.state.filterTitle
								}
								callback={this.ticketStatus}
								options={TicketHistorySorting}
								sortButton={true}
								sortArrowSelected={this.sortArrow}
							/>
						</div>
						<div key='tickets' className='tickets'>
							{pageState === PAGE_STATE.LIST && (
								<div className='open-tickets'>{this.renderTickets(TICKET_LIST_TYPE.OPEN)}</div>
							)}
						</div>
					</ResponsiveReactGridLayout>
				)}
				{pageState === PAGE_STATE.DETAIL && selectedTicketId && (
					<div className='support-ticket-details-section'>
						<TicketHistoryDetail
							id={selectedTicketId}
							displayTicketHistory={this.displayTicketHistory}
						/>

						<SupportSection
							callback={this.resetSelectedTicket}
							content={TicketInformation}
							auth_status={this.props.auth_status}
							ticketId={selectedTicketId}
						/>
					</div>
				)}
			</div>
		);
	}
}
function mapStateToProps(state) {
	return {
		auth_status: state.auth_status,
		site: state.site_tracking,
	};
}

export default connect(mapStateToProps, { updateModule, updatePage, addPageToBreadCrumbs })(
	TicketHistory,
);
