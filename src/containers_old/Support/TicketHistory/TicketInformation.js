import React, { Component } from 'react';

import COMPANYGrid from 'components_old/Layout/COMPANYGrid';
import { TicketApi } from 'services/ticket';
import TicketConversation from './TicketConversation';

class TicketInformation extends Component {
	constructor(props) {
		super(props);

		this.state = {
			ticketRequestor: '',
			closeTicket: false,
			rowHeight: 0,
			margin: [],
			containerPadding: [],
			layout: [],
			ticket: null,
		};
	}
	componentDidMount = () => {
		const ticketId = this.props.ticketId;
		this.retrieveTicketDetails(ticketId);
	};
	retrieveTicketDetails = async id => {
		console.log('TICKET RESPONSE');
		try {
			const response = await TicketApi.getTicket(id);
			console.log('TICKET RESPONSE', response);
			if (
				response.status === 200 &&
				!response.data.error &&
				response.data.ticketDetails.processid
			) {
				const { ticketDetails = {} } = response.data;
				this.setState({ ticket: ticketDetails });
			} else {
				const { error = 'Error retrieving details' } = response.data;
				if (error) {
					this.setState({ error });
				} else {
					this.setState({ error: 'Error retrieving details' });
				}
			}
		} catch (e) {
			this.setState({ error: 'Network error' });
		}
	};
	onBreakpointChange = breakpoint => {
		switch (breakpoint) {
			case 'xs':
				return { customMargin: [20, 0], customPadding: [0, 0] };
			case 'sm':
				return { customMargin: [16, 0], customPadding: [0, 0] };
			case 'md':
				return { customMargin: [22, 0], customPadding: [0, 0] };
			case 'lg':
				return { customMargin: [23, 0], customPadding: [0, 0] };
			default:
				return { customMargin: [22, 0], customPadding: [0, 0] };
		}
	};

	UNSAFE_componentWillReceiveProps() {
		this.setState({ closeTicket: false });
	}

	recieveTicketDetails = ticketRequestor => {
		this.setState({ ticketRequestor });
	};

	closeTicketDetails = () => {
		this.setState({ closeTicket: true });
	};

	render() {
		const { auth_status } = this.props;
		const { ticket } = this.state;
		let display;

		// this.state.closeTicket
		!ticket
			? (display = <div />)
			: (display = (
					<COMPANYGrid
						namespace='ticket-information'
						breakpoints={{ lg: 820, md: 700, sm: 440, xs: 200 }}
						layoutClassname='layout six-column ticket-information-grid'
						colCount={6}
						setCustomMarginAndPadding={this.onBreakpointChange}
					>
						<div
							key='content'
							data-grid={{ x: 0, y: 0, w: 6, h: 49, static: true }}
							className='content'
						>
							{ticket && (
								<TicketConversation
									key='ticket-convo'
									callback={this.recieveTicketDetails}
									auth_status={auth_status}
									ticket={ticket}
								/>
							)}
						</div>
					</COMPANYGrid>
			  ));

		return display;
	}
}

export default TicketInformation;
