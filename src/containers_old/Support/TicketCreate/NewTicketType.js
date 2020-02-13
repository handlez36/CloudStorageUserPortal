import React, { Component } from 'react';

import { STEPS, TICKET_ICONS } from '../TicketConstants';

export default class MyTicketType extends Component {
	constructor(props) {
		super(props);

		this.state = {
			clicked: false,
		};
	}

	/**
	 * Create mapping of ticket types and associates icon images
	 */
	createTicketImageMapping() {
		const ticketType = this.props.type;
		let ticket = {};

		switch (ticketType) {
			case 'BILLING':
				ticket = {
					name: 'BILLING',
					image: TICKET_ICONS.BILLING,
					imageInvert: TICKET_ICONS.BILLING_SELECT,
				};
				break;
			case 'OUTAGE':
				ticket = {
					name: 'OUTAGE',
					image: TICKET_ICONS.OUTAGE,
					imageInvert: TICKET_ICONS.OUTAGE_SELECT,
				};
				break;
			case 'SUPPORT':
				ticket = {
					name: 'SUPPORT',
					image: TICKET_ICONS.SUPPORT,
					imageInvert: TICKET_ICONS.SUPPORT_SELECT,
				};
				break;
			default:
		}

		return ticket;
	}

	/**
	 * Set element clicked as 'active' to enable image swap
	 * TODO: REMOVE; onMouseEnter function takes care of this
	 * @param type
	 */
	setActiveClass(type) {
		const currentActiveElement = document.querySelector('.ticket-type.active');
		const newActiveElement = this.refs[type];

		if (currentActiveElement) {
			currentActiveElement.classList.remove('active');
		}
		newActiveElement.classList.add('active');
	}

	/**
	 * onClick handler; Sets ticket type attribute and returns control
	 * to Support.js
	 */
	onClick = type => {
		this.setState({ clicked: true });
		setTimeout(() => {
			const attribute = {
				[STEPS.TICKET_TYPE]: type,
			};
			this.props.setTicketAttribute(attribute);
		}, 1000);
	};

	/**
	 * JSX to render ticket type images and event handlers
	 */
	constructTicketTypeElements() {
		const { setTicketAttribute } = this.props;

		const ticket = this.createTicketImageMapping();

		const tickets = this.state.clicked ? (
			<div
				key={ticket.name}
				className='ticket-type'
				onClick={() => this.onClick(ticket.name)}
				disabled
			>
				<div className={'image-wrapper'}>
					<img
						ref={ticket.name}
						alt={`Create ${ticket.name.toLowerCase()} ticket`}
						id={ticket.name}
						src={ticket.image}
					/>
				</div>
			</div>
		) : (
			<div
				key={ticket.name}
				className='ticket-type'
				onClick={() => setTicketAttribute(ticket.name)}
			>
				<div className={'image-wrapper'}>
					<img
						ref={ticket.name}
						alt={`Create ${ticket.name.toLowerCase()} ticket`}
						id={ticket.name}
						src={ticket.image}
					/>
				</div>
				{/* <span className={'create-ticket-label'}>{ticket.name}</span> */}
				<div className={'create-ticket-label'}>{ticket.name}</div>
			</div>
		);

		return tickets;
	}

	backToHome = () => {};

	resetTicketCreation = () => {
		this.props.resetTicketCreation();
	};

	render() {
		return (
			<div className='ticket-type-selection'>
				{/* <div className='title'>ISSUE Request</div> */}
				<div className='ticket-icons'>{this.constructTicketTypeElements()}</div>
			</div>
		);
	}
}
