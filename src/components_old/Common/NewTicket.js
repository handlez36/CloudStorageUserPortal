// import React from 'react';
import React, { Component } from 'react';
import { TICKET_ICONS, BLANK_ICONS } from '../../containers/Support/TicketConstants';
import { TicketApi } from '../../services/ticket';
const CDN_URL = process.env.REACT_APP_CDN_URL;
const alertIcon = `${CDN_URL}common/tickets/icons-alert-reverse@3x.png`;

class NewTicket extends Component {
	constructor(props) {
		super(props);
		this.state = { numberColor: '#5b595b', clicked: false, active: false };
	}

	componentDidMount() {
		this.checkStatus();
	}
	componentDidUpdate(prevProps) {
		if (prevProps) {
			this.checkStatus(prevProps.ticket.status);
		}
	}
	checkStatus = prevStatus => {
		const status = this.props.ticket.status;

		if (
			status === 'In Progress' ||
			status === 'Pending Review' ||
			status === 'Waiting for Response' ||
			status === 'Waiting for Agent Response'
		) {
			status === 'new';
		}
		const newTicketStatus = this.refs.ticketStatus;
		if (status !== prevStatus) {
			try {
				newTicketStatus.classList.add(status.toLowerCase());
				newTicketStatus.classList.remove(prevStatus);
			} catch (e) {}
		}
	};
	createTicketImage = type => {
		if (type) {
			switch (type.toUpperCase()) {
				case 'BILLING':
					return {
						name: 'BILLING',
						image: TICKET_ICONS.BILLING,
						imageInvert: TICKET_ICONS.BILLING_TICKET_HOVER,
						bgColor: '#b5d334',
						originalbgColor: '#ffffff',
					};
				case 'OUTAGE':
					return {
						name: 'OUTAGE',
						image: TICKET_ICONS.OUTAGE,
						imageInvert: TICKET_ICONS.OUTAGE_TICKET_HOVER,
						bgColor: '#df6a2e',
						originalbgColor: '#ffffff',
					};
				case 'SUPPORT':
					return {
						name: 'SUPPORT',
						image: TICKET_ICONS.SUPPORT,
						imageInvert: TICKET_ICONS.SUPPPORT_TICKET_HOVER,
						bgColor: '#8060a9',
						originalbgColor: '#ffffff',
					};
				case 'STORAGE':
					return {
						name: 'STORAGE',
						image: TICKET_ICONS.STORAGE,
						imageInvert: TICKET_ICONS.STORAGE_TICKET_HOVER,
						bgColor: '#008388',
						originalbgColor: '#ffffff',
					};
				case 'REMOTE HANDS':
					return {
						name: 'Remote Hands',
						image: TICKET_ICONS.REMOTEHANDS,
						imageInvert: TICKET_ICONS.REMOTE_HANDS_SELECT,
						bgColor: '#a46cf4',
						originalbgColor: '#ffffff',
					};
				case 'GUEST ACCESS':
					return {
						name: 'Guest Access',
						image: TICKET_ICONS.GUESTACCESS,
						bgColor: '#79d2de',
						originalbgColor: '#ffffff',
						imageInvert: TICKET_ICONS.GUEST_ACCESS_SELECT,
					};
				default:
					return {
						name: 'SUPPORT',
						image: TICKET_ICONS.SUPPORT,
						imageInvert: TICKET_ICONS.SUPPPORT_TICKET_HOVER,
						bgColor: '#8060a9',
						originalbgColor: '#ffffff',
					};
			}
		}
		return {
			name: 'SUPPORT',
			image: TICKET_ICONS.SUPPORT,
			imageInvert: TICKET_ICONS.SUPPPORT_TICKET_HOVER,
			bgColor: '#8060a9',
			originalbgColor: '#ffffff',
		};
	};

	newMouseEnter = type => {
		const icon = this.refs.icon;
		const ticketText = this.refs.ticketText;
		ticketText.style.color = 'white';
		const image = this.refs.image;
		let className;
		image.src = type.imageInvert;
		icon.style.backgroundColor = type.bgColor;
		if (type.name === 'Remote Hands') {
			className = 'remotehands';
		} else {
			className = 'hovered';
		}

		icon.classList.add(className);
	};
	ticketDescription = description => {
		if (description) {
			if (description.length >= 40) {
				return description.substring(0, 40) + '...';
			} else {
				return description;
			}
		}
	};

	newMouseLeave = type => {
		const icon = this.refs.icon;
		const ticketText = this.refs.ticketText;
		const image = this.refs.image;
		image.src = type.image;
		ticketText.style.color = '#5b595b';
		icon.classList.remove('hovered');
		icon.style.backgroundColor = type.originalbgColor;
		if (type.name === 'Remote Hands') {
			type.name === 'Remote Hands' ? icon.classList.remove('remotehands') : '';
		}
	};

	constructTicketTypeElements() {
		const { ticket, active } = this.props;
		let type;
		if (ticket.name === 'Storage Add Request') {
			type = this.createTicketImage('STORAGE');
		} else {
			type = this.createTicketImage(ticket.type);
		}

		return (
			<div ref={'icon'} className='new-ticket-icon'>
				<img
					ref={'image'}
					className='new-ticket-type'
					id={ticket.id}
					src={active ? type.imageInvert : type.image}
					alt=''
				/>
			</div>
		);
	}

	render() {
		const { ticket, clickHandler, active } = this.props;
		let type;
		let ticketType;
		if (ticket.name === 'Storage Add Request') {
			ticketType = 'STORAGE';
			type = this.createTicketImage('STORAGE');
		} else {
			type = this.createTicketImage(ticket.type);
		}
		return (
			<div
				className='new-ticket-wrapper'
				id={this.props.key}
				onClick={() => clickHandler(ticket)}
				onMouseEnter={() => this.newMouseEnter(type)}
				onMouseLeave={() => !active && this.newMouseLeave(type)}
			>
				{this.constructTicketTypeElements()}
				<div
					ref={'ticketText'}
					className='new-ticket-type'
					id={ticket.id + 'new-ticket-type'}
					style={{ color: this.state.active ? '#ffffff' : this.state.numberColor }}
				>
					{ticketType === 'STORAGE' ? ticketType : ticket.type.toUpperCase() || 'OUTAGE'}
				</div>
				<div className='new-ticket-description'>{this.ticketDescription(ticket.description)}</div>
				<div className='new-ticket-middle-section'>
					<div className='row-1'>
						<span className='new-ticket-id'>TICKET # </span>
						<span className='ticket-details'>{ticket.id}</span>
					</div>
					<div className='row-2'>
						<span className='ticket-open'>OPENED:</span>
						<span className='ticket-date'>
							{TicketApi.formatDate(ticket.startDate)}
							<br />
						</span>
					</div>
					<div className='row-3'>
						<span className='ticket-time'>
							{' '}
							{TicketApi.getFormattedDateString(ticket.startDate)}
						</span>
					</div>
				</div>
				<div ref='ticketStatus' className='new-ticket-status'>
					{ticket.status === 'escalated' ? <img src={alertIcon} /> : ''}
					<span>{ticket.status ? ticket.status.toUpperCase() : 'No Status'}</span>
				</div>
			</div>
		);
	}
}

export default NewTicket;
