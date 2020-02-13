import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import SelectionScreen from '../Support/SelectionScreenNew';
import RemoteHandsWizard from './RemoteHands/RemoteHandsRequest';
import GuestAccessWizard from './Guest Access/GuestAccessRequest';
import TicketCreate from './TicketCreate/TicketCreate';
import { MENU } from './TicketConstants';
import { updatePage } from '../../actions/siteTracking';
import { SITE_PAGES } from '../../components/Common/CommonConstants';

const PAGES = {
	OVERVIEW: 'OVERVIEW',
	REMOTEHANDS: 'REMOTE HANDS',
	GUESTACCESS: 'GUEST ACCESS',
	CUSTOMTICKET: 'CUSTOM TICKET',
};

class Overview extends Component {
	state = {
		active: PAGES.OVERVIEW,
		params: null,
	};

	makeScreenSelection = (active, params) => {
		this.setState({ active, params });
	};

	afterTicketCreate = (resetToOverview = false) => {
		const { refreshTickets } = this.props;

		refreshTickets();
		if (resetToOverview) {
			this.setState({ active: PAGES.OVERVIEW, params: null });
		}
	};

	backToOverview = () => {
		this.setState({ active: PAGES.OVERVIEW, params: null });
	};

	componentDidMount() {
		const { updatePage } = this.props;
		updatePage(SITE_PAGES.SUPPORT[MENU.OVERVIEW]);
	}

	componentDidUpdate() {
		if (this.props.activePage !== this.state.active && this.props.sideMenuClicked) {
			this.backToOverview();
			this.props.resetSideMenu();
		}
	}

	render() {
		const { tickets, goToTicketHistory, refreshTickets } = this.props;
		const { active, params } = this.state;

		return (
			<div className='support-overview-page'>
				{active === PAGES.OVERVIEW && (
					<Fragment>
						<div className='top-section' />

						<SelectionScreen
							goToTicketHistory={goToTicketHistory}
							makeScreenSelection={this.makeScreenSelection}
							ticketCounts={tickets}
						/>
					</Fragment>
				)}
				{active === PAGES.REMOTEHANDS && (
					<RemoteHandsWizard
						tickets={tickets}
						goToTicketHistory={goToTicketHistory}
						onComplete={this.afterTicketCreate}
						refreshTickets={refreshTickets}
					/>
				)}
				{active === PAGES.GUESTACCESS && (
					<GuestAccessWizard
						tickets={tickets}
						goToTicketHistory={goToTicketHistory}
						onComplete={this.afterTicketCreate}
						refreshTickets={refreshTickets}
					/>
				)}
				{active === PAGES.CUSTOMTICKET && (
					<TicketCreate
						{...params}
						backToOverview={this.backToOverview}
						onCompletion={this.afterTicketCreate}
					/>
				)}
			</div>
		);
	}
}

export default connect(
	null,
	{ updatePage },
)(Overview);
