import React, { Component } from 'react';
import { string, shape, func } from 'prop-types';
import moment from 'moment';

import { ExitButton } from '../../../components/Common/ExitButton';
import { BLANK_ICONS, ICONS, TYPES, SUMMARY } from '../TicketConstants';

export default class TicketSummary extends Component {
	static propTypes = {
		resetTicketCreation: func,
		ticket: shape({
			id: string,
			type: string,
			status: string,
			requestor: string,
			priority: string,
			description: string,
			dateSubmitted: string,
		}).isRequired,
	};

	getImage = type => {
		if (type) {
			type = type.toUpperCase();
			switch (type) {
				case TYPES.BILLING:
					return {
						image: <img alt='billing_ticket' src={SUMMARY.BILLING} />,
						imageInvert: <img alt='billing_ticket' src={BLANK_ICONS.BILLING} />,
					};
				case TYPES.OUTAGE:
					return {
						image: <img alt='outage_ticket' src={SUMMARY.OUTAGE} />,
						imageInvert: <img alt='outage_ticket' src={BLANK_ICONS.OUTAGE} />,
					};
				case 'SUPPORT':
					return {
						image: <img alt='support_ticket' src={SUMMARY.SUPPORT} />,
						imageInvert: <img alt='support_ticket' src={BLANK_ICONS.SUPPORT} />,
					};
				case 'STORAGE':
					return {
						name: 'STORAGE',
						image: <img alt='storage_ticket' src={SUMMARY.STORAGE} />,
						imageInvert: <img alt='storage_ticket' src={BLANK_ICONS.STORAGE} />,
					};
				case 'REMOTE HANDS':
					return {
						name: 'REMOTE HANDS',
						image: <img alt='storage_ticket' src={SUMMARY.REMOTEHANDS} />,
					};
				case 'GUEST ACCESS':
					return {
						name: 'GUEST ACCESS',
						image: <img alt='storage_ticket' src={SUMMARY.GUESTACCESS} />,
					};
				default:
					return {
						image: <img alt='support_ticket' src={ICONS.SUPPORT_SELECT} />,
						imageInvert: <img alt='support_ticket' src={BLANK_ICONS.SUPPORT} />,
					};
			}
		}
	};

	closeTicketDetails = () => {
		// const ticket = this.props;
		// try {
		// 	document.getElementById(ticket.id + 'ticket-number').style.color = '#5b595b';
		// 	document.getElementById(ticket.id).src = ticketImage.imageInvert.props.src;
		// 	this.props.resetSelectedTicket();
		// 	let callback = this.props.callback;

		// 	callback();

		// } catch (e) {

		// }
		const { onCompletion } = this.props;
		onCompletion();
	};

	getFormattedMonth(date) {
		let formattedDate = moment(date);

		try {
			if (date.substr(-1)) {
				formattedDate = moment(date + 'Z');
			}
		} catch (error) {
			console.log(error);
		}

		if (formattedDate.isValid()) {
			return formattedDate.format('LL');
		} else {
			return ' -- ';
		}
	}
	getFormattedDay(date) {
		let formattedDate = moment(date);

		try {
			if (date.substr(-1)) {
				formattedDate = moment(date + 'Z');
			}
		} catch (error) {
			console.log(error);
		}

		if (formattedDate.isValid()) {
			return formattedDate.format(' dddd  ');
		} else {
			return ' -- ';
		}
	}

	getFormattedTime(date) {
		let formattedDate = moment(date);

		try {
			if (date.substr(-1)) {
				formattedDate = moment(date + 'Z');
			}
		} catch (error) {
			console.log(error);
		}

		if (formattedDate.isValid()) {
			return formattedDate.format(' LT ');
		} else {
			return ' -- ';
		}
	}

	renderTicketNumberRow(ticket) {
		return (
			<div className='ticket-identifier-row'>
				<div className='ticket-id'>
					TICKET# <span>{ticket.id}</span>
				</div>
				<div className='ticket-status'>
					STATUS: <span>{ticket.status && ticket.status.toUpperCase()}</span>
				</div>
			</div>
		);
	}

	extractTicketPriority(ticket) {
		if (ticket.priority) {
			return ticket.priority;
		} else {
			const name = ticket.name || 'TYPE-UNKNOWN-DATE';

			if (name.split('-').length === 3) {
				return name.split('-')[1];
			}

			return 'UNKNOWN';
		}
	}

	renderTicketDetails(ticket) {
		let imageType;
		let ticketType;
		if (ticket.name === 'Storage Add Request') {
			ticketType = 'STORAGE';
			imageType = this.getImage('STORAGE');
		} else {
			imageType = this.getImage(ticket.type);
		}
		return (
			<div className='ticket-summary-details'>
				<div className='text-detail'>
					<table>
						<tbody>
							<tr>
								<td>TICKET REQUESTOR:</td>
								<td className='requestor'>
									{ticket.firstname ? ticket.firstname + ' ' + ticket.lastname : ticket.username}
								</td>
							</tr>
							<tr>
								<td>PRIORITY:</td>
								<td className='priority'>{ticket.priority.toUpperCase()}</td>
							</tr>
							<tr>
								<td>TICKET TYPE:</td>
								<td className='ticket-overview-type'>
									{ticketType === 'STORAGE' ? ticketType : ticket.type.toUpperCase() || 'OUTAGE'}
								</td>
							</tr>
							<tr>
								<td className='description-text'>DESCRIPTION:</td>
								<td className='description'>
									<textarea value={ticket.description} />
								</td>
							</tr>
							<tr>
								<td>DATE/TIME SUBMITTED:</td>
								<td className='date'>
									{this.getFormattedMonth(ticket.startDate)}
									<span style={{ color: 'red' }}> | </span>
									{this.getFormattedDay(ticket.startDate)}
									<span style={{ color: 'red' }}> | </span>
									{this.getFormattedTime(ticket.startDate)}
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div className='icon-detail'>{imageType.image}</div>
			</div>
		);
	}

	render() {
		const { ticket, backToOverview } = this.props;

		return (
			<div className='outer-wrapper ticket-summary'>
				<div className='exit-button-section' onClick={this.closeTicketDetails}>
					<ExitButton redirectTo={backToOverview} />
				</div>
				<div className='header'>{this.renderTicketNumberRow(ticket)}</div>
				<div className='body'>{this.renderTicketDetails(ticket)}</div>
			</div>
		);
	}
}
