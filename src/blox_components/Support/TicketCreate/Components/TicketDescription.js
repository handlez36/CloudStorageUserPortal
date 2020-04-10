import React, { Component } from 'react';
import { connect } from 'react-redux';
import { STEPS, TYPES, MESSAGE_TEXT, TICKET_CREATE_ICONS } from 'utils/TicketConstants';
import IconInputComponent from 'sub_components/Common/IconInputComponent';
import PortalMessage from 'sub_components/Common/PortalMessage';
import SubmitButton from 'sub_components/Common/COMPANYButton';
import { ExitButton } from 'components_old/Common/ExitButton';
import { TicketApi } from 'services/ticket';
import { updatePage } from 'actions/siteTracking';
import { Utils } from 'services/utils';
import { TicketDetail } from './TicketDetail';
const CDN_URL = process.env.REACT_APP_CDN_URL;

const SuccessImage = `${CDN_URL}support/Support_SubmitTicket_CONFIRMED_320x286.png`;
const FailImage = `${CDN_URL}support/Support_SubmitTicket_FAILURE_320x286.png`;

class TicketDescription extends Component {
	constructor(props) {
		super(props);

		this.state = {
			description: null,
			modalText: null,
			bonitaApi: this.props.bonitaApi,
			error: null,
			modalImage: null,
		};
	}

	renderModal() {
		const { modalImage } = this.state;
		return (
			<div className='ticket-modal' ref='modal'>
				<div className='modal-image'>
					<img src={modalImage} />
				</div>
			</div>
		);
	}

	/**
	 * onChange handler for for description text changes
	 * Saves state on each text change
	 */
	onChange = event => {
		this.setState({ description: event.target.value });
	};

	/**
	 * onClick handler for Submit button
	 * Update Submit button text and start Bonita Api call process
	 */
	onClick = () => {
		// If all ticket details are available, construct ticketProperties object
		if (this.props.ticket && this.state.description) {
			// Change button state to display 'Submitted'
			this.updateButton();

			// Call Bonita API to create ticket
			this.handleSubmit();
		}
	};

	/**
	 * Updates button class when submitting ticket
	 */
	updateButton() {
		const buttonElement = document.querySelector('#formButton');

		buttonElement.classList.remove('btn-outline-primary');
		buttonElement.classList.add('btn-primary');
		buttonElement.innerText = 'Submitted';
	}

	/**
	 * Gets the proper icon image based on ticket type
	 */
	getIconImage = () => {
		let img = null;
		const { type } = this.props.ticket;

		if (type) {
			switch (type.toUpperCase()) {
				case TYPES.BILLING:
					img = TICKET_CREATE_ICONS.BILLING;
					break;
				case TYPES.OUTAGE:
					img = TICKET_CREATE_ICONS.OUTAGE;
					break;
				case TYPES.SUPPORT:
					img = TICKET_CREATE_ICONS.SUPPORT;
					break;
				case TYPES.STORAGE:
					img = TICKET_CREATE_ICONS.STORAGE;
					break;
				default:
					img = TICKET_CREATE_ICONS.SUPPORT;
			}
		}

		return img;
	};

	/**
	 * Handler for when user submits ticket.
	 * Shows and re-hides modal based on Api response
	 * @param response
	 */
	handleSubmitResponse(response, ticket, dateSubmitted) {
		const modal = this.refs.modal;
		const { history } = this.props;
		let valid = false;

		// Show modal based on response
		if (response.status === 200 && response.data.caseId !== null) {
			this.setState({ modalText: 'SUCCESS', modalImage: SuccessImage });
			valid = true;

			modal.classList.remove('fail');
			modal.classList.add('success');
			console.log('CALLING');
		} else {
			this.setState({ modalText: 'ERROR', modalImage: FailImage });

			modal.classList.remove('success');
			modal.classList.add('fail');
		}

		// Wait 1s before resetting (and hiding) the modal
		setTimeout(() => {
			modal.classList.remove('success');
			modal.classList.remove('fail');

			if (valid) {
				const { caseId } = response.data;

				this.setTicketAttribute(ticket, caseId, dateSubmitted);
			}
		}, 4000);
		setTimeout(() => {
			history.push('/portal/support');
		}, 10000);
	}

	/**
	 * Call Support handler to set description once ticket creation is confirmed
	 * @param description
	 */
	setTicketAttribute(ticket, caseId, dateSubmitted) {
		const finalizedTicket = { ...ticket, caseId, startDate: dateSubmitted };

		// Wait 1s before transitioning to the next wizard step
		setTimeout(() => {
			const attribute = {
				[STEPS.TICKET_FINALIZED]: finalizedTicket,
			};
			this.props.setTicketAttribute(attribute);
		}, 1000);
	}

	/**
	 * Generate ticket title based on type, severity and current time
	 * @param ticket
	 */
	generateTicketTitle(ticket) {
		const { type, priority } = ticket;

		const timestamp = Date.now();

		// Create default title in case type and severity attributes are unavailable
		let title = `SUPPORT-NORMAL-${timestamp}`;

		if (type && priority) {
			title = `${type.toUpperCase()}-${priority.toUpperCase()}-${timestamp}`;
		}

		return title;
	}

	handleSubmit = async () => {
		try {
			const ip = await Utils.retrieveIPParams();

			this.submitTicket(ip);
		} catch (e) {
			this.submitTicket('Network error finding Ip');
		}
	};

	/**
	 * Make Bonita Api call to create ticket
	 */
	submitTicket(ip) {
		const { ticket, auth_status, company_info, site } = this.props;

		const dateSubmitted = new Date();
		const newTicket = {
			requester: Utils.getRequester(auth_status),
			requestor_id: 0,
			public_request: null,
			status: '',
			title: this.generateTicketTitle(ticket),
			description: this.state.description,
			priority: ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1).toLowerCase(),
			internal_priority: '',
			type: ticket.type.charAt(0).toUpperCase() + ticket.type.slice(1).toLowerCase(),
			request_type: '',
			request_method: '',
			process_id: 0,
			customer_id: company_info.fuseBillId,
			user_id: auth_status.user.id,
			jira_ticket: '',
			location: '',
			impact_to_customer: '',
			resolution_notes: '',
			general_support_question_type: '',
			general_support_question: '',
			general_support_equipment: '',
			feedback_type: Utils.getClientParams(ip, site),
			feedback_jira_ticket: '',
			feedback_browser_data: Utils.getClientParams(ip, site),
			billing_detail: [],
			outage_details: [],
			related_tickets: [],
			assignes: [],
			request_log: [],
			comments: [],
			attachments: [],
			notifications: [],
			related_services: [],
			test_results: [],
		};

		TicketApi.createTicket(newTicket)
			.then(response => this.handleSubmitResponse(response, newTicket, dateSubmitted))
			.catch(error => this.handleSubmitResponse({ error }, newTicket, dateSubmitted));
	}

	/**
	 * Determine if conditions have been met to enable the Submit button
	 */
	shouldEnableSubmitButton() {
		const { description } = this.state;
		if (description !== null && description.length >= 10) {
			return true;
		} else {
			return false;
		}
	}

	resetTicketCreation = () => {
		const { resetTicketCreation } = this.props;
		resetTicketCreation();
	};

	render() {
		const { type } = this.props.ticket;

		return (
			<div className='ticket-description'>
				{/* <div className='exit-button-section'>
					<ExitButton redirectTo={this.resetTicketCreation} />
				</div> */}
				{this.renderModal()}
				<PortalMessage start={MESSAGE_TEXT[type].START} content={MESSAGE_TEXT[type].CONTENT} />
				<TicketDetail ticket={this.props.ticket} />
				<div className='icon-input-container'>
					<IconInputComponent icon={this.getIconImage()}>
						<div className='ticket-detail-form'>
							<div className='ticket-description-label'>
								<label htmlFor='description'>DESCRIPTION</label>
							</div>
							<div className='ticket-description-text'>
								<textarea name='description' onChange={this.onChange} className='form-control' />
							</div>

							<div className='ticket-form-bottom-row'>
								<SubmitButton onClick={this.onClick} enabled={this.shouldEnableSubmitButton()} />
							</div>
						</div>
					</IconInputComponent>
				</div>
			</div>
		);
	}
}
function mapStateToProps(state) {
	return {
		auth_status: state.auth_status,
		company_info: state.company_info,
		site: state.site_tracking,
	};
}

export default connect(
	mapStateToProps,
	{ updatePage },
)(TicketDescription);
