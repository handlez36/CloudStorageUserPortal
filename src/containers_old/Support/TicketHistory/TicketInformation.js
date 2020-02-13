import React, { Component } from 'react';

import TicketConversation from './TicketConversation';
import BloxGrid from '../../../components/Layout/BloxGrid';

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
		};
	}
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
		const { auth_status, ticket } = this.props;
		let display;

		// this.state.closeTicket
		!ticket
			? (display = <div />)
			: (display = (
					<BloxGrid
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
					</BloxGrid>
			  ));

		return display;
	}
}

export default TicketInformation;
