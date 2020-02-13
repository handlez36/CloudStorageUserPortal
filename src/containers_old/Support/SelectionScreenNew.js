import React, { Component } from 'react';

import BloxGrid from '../../components/Layout/BloxGrid';
import TicketCountRow from '../Support/TicketCountRow';
import TicketType from '../Support/TicketCreate/NewTicketType';
import LargeCard from '../../components/Common/LargeCard';
import Button from '../../components/Common/BloxButton';
import { SUPPORT_OVERVIEW_GRID } from '../Support/TicketConstants';
const CDN_URL = process.env.REACT_APP_CDN_URL;
const remoteHands = `${CDN_URL}common/remote-hands-icon-test.svg`;
const guestAccess = `${CDN_URL}common/guest-access-icon.svg`;

class SelectionScreen extends Component {
	constructor(props) {
		super(props);
		this.myObserver = null;
		this.state = { width: 0 };
	}

	setTicketAttribute = ticketType => {
		const { makeScreenSelection } = this.props;
		makeScreenSelection('CUSTOM TICKET', { ticketType });
	};

	startTicketWizard = type => {
		const { makeScreenSelection } = this.props;
		makeScreenSelection(type);
	};

	render() {
		const { ticketCounts, goToTicketHistory } = this.props;

		return (
			<BloxGrid
				namespace='support-overview'
				layouts={SUPPORT_OVERVIEW_GRID}
				breakpoints={{ lg: 1450, md: 1000, sm: 640, xs: 400 }}
				onBreakpointChange={breakpoint => this.setState({ breakpoint })}
				onChange={() =>
					this.setState({
						width: document.querySelector('.support-overview-page')
							? document.querySelector('.support-overview-page').getBoundingClientRect().width
							: 0,
					})
				}
			>
				<div key='open-count'>
					<TicketCountRow {...ticketCounts} goToTicketHistory={goToTicketHistory} type='open' />
				</div>
				{/* <span key='open-count'>
					<TicketCountRow {...ticketCounts} goToTicketHistory={goToTicketHistory} type='open' />
				</span> */}
				<span key='close-count'>
					<TicketCountRow {...ticketCounts} goToTicketHistory={goToTicketHistory} type='closed' />
				</span>
				<span key='ticket-status' className='ticket-type-selection '>
					<span className='title'>
						{/* TICKET Status - {Math.round(this.state.width, 1)}px ({this.state.breakpoint}) */}
						TICKET Status
					</span>
				</span>
				<span key='service-request' className='ticket-type-selection'>
					<span className='title grid-item'>SERVICE Request</span>
				</span>
				<div key='remote-hands' className='grid-item-rh'>
					<LargeCard
						title='REMOTE HANDS'
						button={
							<Button
								title='NEW REQUEST'
								customClass='support-button'
								onClick={() => this.startTicketWizard('REMOTE HANDS')}
								enabled
							/>
						}
						description='Need us to do something for you in the Data Center?'
						image={remoteHands}
						customClass='guest-access'
						onClick={() => this.startTicketWizard('REMOTE HANDS')}
					/>
				</div>
				<div key='horizontal-bar' className='gray-horizontal-bar' />
				<div key='guest-access' className='grid-item-ga'>
					<LargeCard
						title='GUEST ACCESS'
						button={
							<Button
								title='NEW REQUEST'
								customClass='support-button'
								onClick={() => this.startTicketWizard('GUEST ACCESS')}
								enabled
							/>
						}
						description="Let us know who's coming to work on your equipment."
						image={guestAccess}
					/>
				</div>
				<div key='issue-request' className='ticket-type-selection '>
					<span className='title grid-item'>ISSUE Request</span>
					{/* <div className='title grid-item'>ISSUE Request</div> */}
				</div>
				{/* <span key='issue-request' className='ticket-type-selection '>
					<span className='title grid-item'>ISSUE Request</span>
				</span> */}
				<div key='billing' className='overflow'>
					<TicketType
						className='title grid-item '
						setTicketAttribute={this.setTicketAttribute}
						type='BILLING'
					/>{' '}
				</div>
				<div key='outage' className='overflow'>
					<TicketType setTicketAttribute={this.setTicketAttribute} type='OUTAGE' />
				</div>
				<div key='support' className='grid-item overflow'>
					<TicketType setTicketAttribute={this.setTicketAttribute} type='SUPPORT' />
				</div>
			</BloxGrid>
		);
	}
}

export default SelectionScreen;
