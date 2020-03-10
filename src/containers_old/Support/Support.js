import React, { Component } from 'react';
import { connect } from 'react-redux';
import SupportOverview from './Overview';
import PortalLayout from '../Layout/PortalLayout';
import TicketHistory from '../Support/TicketHistory/TicketHistory';
import TicketInformation from '../Support/TicketHistory/TicketInformation';
import { updateModule, updatePage } from '../../actions/siteTracking';
import { MENU, STATUS } from '../Support/TicketConstants';
import { SITE_MODULES } from '../../components/Common/CommonConstants';
import SupportSection from '../../components/Common/SupportSection';
import { TicketApi } from '../../services/ticket';
import { FifthColumn } from '../../components/Common/FifthColumn';

/**
 * Support Component
 */
class Support extends Component {
	constructor(props) {
		super(props);

		this.menuItems = {
			[MENU.OVERVIEW]: 1,
			[MENU.TICKET_HISTORY]: 2,
		};

		this.state = {
			active: MENU.OVERVIEW,
			tickets: {
				open: 0,
				closed: 0,
			},
			sideMenuClicked: false,
			resetTicketCreation: null,
			selectedTicket: null,
			selected: null,
		};
	}

	resetTicketCreationProcess = () => {
		this.setState({ resetTicketCreation: true });

		setTimeout(() => {
			this.setState({ resetTicketCreation: false });
		}, 200);
	};

	/**
	 * Switch between Support module menu options
	 */
	selectMenuItem = item => {
		this.setState({ active: item, selectedTicket: null, sideMenuClicked: true });
	};

	resetSideMenuClicked = () => {
		this.setState({ sideMenuClicked: false });
		this.refreshTickets();
	};

	backToHome = () => {
		this.props.history.push('/home');
	};

	clickHandler = selectedTicket => {
		this.setState({ selectedTicket });
	};

	resetSelectedTicket = () => {
		this.setState({ selectedTicket: null });
	};

	refreshTickets = () => {
		this.getTickets();
	};

	splitTickets(response) {
		const {
			data: { tickets },
		} = response;
		const open = tickets.filter(
			ticket => ticket.status !== STATUS.SOLVED || ticket.status !== STATUS.RESOLVED,
		);
		const closed = tickets.filter(
			ticket => ticket.status === STATUS.SOLVED || ticket.status === STATUS.RESOLVED,
		);

		return { open, closed };
	}

	getTickets = () => {
		TicketApi.getAll()
			.then(response => {
				const validResponse = response.status === 200 && response.data && response.data.tickets;

				if (validResponse) {
					const { open, closed } = this.splitTickets(response);
					const tickets = {
						openCount: open.length,
						closeCount: closed.length,
						totalCount: open.length + closed.length,
						tickets: response.data.tickets,
					};
					this.setState({ tickets, sideMenuClicked: false });
				} else {
					this.setState({ error: 'Error pulling ticket details' });
				}
			})
			.catch(error => this.setState({ error }));
	};

	componentDidMount() {
		const { updateModule } = this.props;
		updateModule(SITE_MODULES.SUPPORT);

		if (this.props.location.state) {
			const ticketType = this.props.location.state.ticketType;
			const selected = this.props.location.state.selected;
			if (ticketType) {
				this.goToTicketHistory(ticketType);
			}
			if (selected) {
				this.setState({ selected });
			}
		}

		this.getTickets();
	}

	componentDidUpdate(prevProps, prevState) {
		const { active } = this.state;
		if (prevState.active !== active) {
			this.getTickets();
		}
	}

	goToTicketHistory = (type, selectedTicket = null) => {
		if (type === 'open') {
			this.setState({ active: MENU.TICKET_HISTORY, selectedTicketStatus: 'Open', selectedTicket });
		} else if (type === 'closed') {
			this.setState({
				active: MENU.TICKET_HISTORY,
				selectedTicketStatus: 'Closed',
				selectedTicket,
			});
		} else {
			this.setState({ active: MENU.TICKET_HISTORY, selectedTicketStatus: 'Open', selectedTicket });
		}
	};
	render() {
		const { active, tickets, sideMenuClicked } = this.state;
		return (
			<PortalLayout
				page='support'
				sideMenu={this.menuItems}
				history={this.props.history}
				activePage={this.menuItems[active]}
				callback={this.selectMenuItem}
				match={this.props.match}
			>
				<div className='main support'>
					<div className='portal-header'>
						<div className='menu-selection'>{this.state.active}</div>
					</div>
					{this.state.active === MENU.OVERVIEW && (
						<SupportOverview
							tickets={tickets}
							resetSideMenu={this.resetSideMenuClicked}
							sideMenuClicked={sideMenuClicked}
							activePage={this.state.active}
							refreshTickets={this.refreshTickets}
							goToTicketHistory={this.goToTicketHistory}
						/>
					)}
					{this.state.active === MENU.TICKET_HISTORY && (
						<TicketHistory
							auth_status={this.props.auth_status}
							selectedTicket={this.state.selectedTicket}
							clickHandler={this.clickHandler}
							selectedTicketStatus={this.state.selectedTicketStatus}
							selected={this.state.selected}
						/>
					)}
				</div>
				<SupportSection
					callback={this.resetSelectedTicket}
					content={TicketInformation}
					auth_status={this.props.auth_status}
					ticket={this.state.selectedTicket}
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

export default connect(mapStateToProps, { updateModule, updatePage })(Support);
