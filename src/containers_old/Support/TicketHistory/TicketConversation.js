import React, { Component } from 'react';

import { TicketApi } from 'services/ticket';
import { TICKET_ATTACHMENT_PHASE as PHASE } from 'utils/TicketConstants';
import Header from './Conversations/ConversationHeader';
import SubHeader from './Conversations/ConversationSubHeader';
import Body from './Conversations/ConversationBody';
import AttachmentModal from './Conversations/AttachmentModal';
const CDN_URL = process.env.REACT_APP_CDN_URL;
const TicketBackground = `${CDN_URL}support/Support_TicketBackground_800x1200.jpg`;
const DoneCloud = `${CDN_URL}support/Support_DoneCloud_Icon.svg`;

const CONVO_UPDATE_INTERVAL = 15000;

class TicketConversation extends Component {
	constructor(props) {
		super(props);

		this.convoInterval = null;
		this.state = {
			ticket: null,
			comment: '',
			convos: null,
			topConvo: null,
			attachmentModalOpen: false,
			attachments: [],
			attachmentErrors: [],
			phase: PHASE.NOT_STARTED,
			msg: '',
		};
	}

	formTicketParams() {
		const { comment, ticketDetails, attachments, attachmentErrors } = this.state;
		const data_ids = attachments.map(attachment => attachment.data_id);
		let errorMessages = '';

		attachmentErrors.forEach(file => {
			errorMessages += `${file.filename} could not be attached: ${file.error}\n`;
		});
		const newComment =
			errorMessages === '' ? comment : `${comment}\nUpload errors:\n${errorMessages}`;

		return {
			caseid: ticketDetails.context.caseid,
			comment: newComment,
			files: data_ids,
			status: ticketDetails.status,
		};
	}

	onSubmit = () => {
		const ticket = this.formTicketParams();

		TicketApi.updateTicket(ticket)
			.then(response => {
				const isSuccess = response.status === 200 && !response.data.error && !response.error;
				const msg = isSuccess
					? 'Comment added successfully!'
					: 'Sorry, there was an error adding the comment';

				this.setState(
					{
						msg,
					},
					() => {
						this.displayAttachmentDoneModal();
					},
				);

				if (isSuccess) {
					console.log('TICKET niamh000', ticket);
					setTimeout(() => {
						this.retrieveTicket(ticket.caseid);
					}, 5000);
				} else {
					console.log('Failed to save!');
				}

				this.setState({ comment: '', phase: PHASE.TICKET_SUBMITTED });
			})
			.catch(() => {
				//this.displayAttachmentDoneModal(false);
			});
	};

	onChange = event => {
		const { value } = event.target;
		this.setState({ comment: value });
	};

	toggleAttachmentModal = () => {
		this.setState(state => {
			state.attachmentModalOpen = !state.attachmentModalOpen;
			state.phase = PHASE.IN_PROGRESS;

			return state;
		});
	};

	saveAttachments = (attachments, errors) => {
		this.setState(state => {
			if (attachments.length > 0) {
				state.attachments = state.attachments.concat(attachments);
			}
			if (errors.length > 0) {
				state.attachmentErrors = state.attachmentErrors.concat(errors);
			}
			state.attachmentModalOpen = false;

			return state;
		});
	};

	sendTicketDetailsToParent(ticketDetails) {
		const callback = this.props.callback;
		callback(ticketDetails);
	}

	retrieveTicket(id) {
		TicketApi.getTicket(id)
			.then(response => {
				if (response.status === 200) {
					try {
						const { ticketDetails } = response.data;
						let convos = TicketApi.extractComments(response.data);
						convos = this.filterComments(convos);
						this.sendTicketDetailsToParent(ticketDetails.supportRequest.requester);

						this.setState({
							ticketDetails,
							convos,
							comment: '',
							attachments: [],
							phase: PHASE.NOT_STARTED,
						});
					} catch (e) {
						console.log(e);
					}
				}
			})
			.catch(error => console.log('Error retrieving ticket: ', error));
	}

	updateTicketConvo = id => {
		TicketApi.getTicket(id)
			.then(response => {
				if (response.status === 200) {
					try {
						let convos = TicketApi.extractComments(response.data);
						convos = this.filterComments(convos);

						this.setState({ convos });
					} catch (e) {
						console.log(e);
					}
				}
			})
			.catch(error => console.log('Error updating ticket conversation: ', error));
	};

	displayAttachmentDoneModal = () => {
		const modal = document.querySelector('.attachment-done-modal');

		modal.classList.add('done');

		setTimeout(() => {
			modal.classList.remove('done');
		}, 2000);
	};

	setupConvoInterval = id => {
		this.convoInterval = setInterval(() => {
			this.updateTicketConvo(id);
		}, CONVO_UPDATE_INTERVAL);
	};

	componentDidMount() {
		const { ticket } = this.props;

		if (ticket) {
			console.log('TICKET niamh000', ticket);
			const id = parseInt(ticket) ? ticket : ticket.processid;
			this.retrieveTicket(id);
			this.setupConvoInterval(id);
		}
	}

	UNSAFE_componentWillUpdate(newProps) {
		if (newProps.ticket.processid !== this.props.ticket.processid) {
			this.retrieveTicket(newProps.ticket.processid);
			this.setupConvoInterval(newProps.ticket.processid);
		}
	}

	componentWillUnmount() {
		clearInterval(this.convoInterval);
	}

	filterComments = convos => {
		let filteredConvos = convos.filter(convo => convo.comment !== ' Listening for updates...');
		filteredConvos = filteredConvos.filter(convo => convo.comment !== ' Received Support Request');
		return filteredConvos;
	};

	render() {
		const { auth_status, ticket } = this.props;
		const { convos, comment, attachmentModalOpen, attachments, msg } = this.state;
		const id = parseInt(ticket) ? ticket : ticket.processid;
		let comments;

		if (convos) {
			comments = convos.length > 0 ? true : false;
		}
		return (
			<div className='ticket-conversation-section'>
				<div className='ticket-conversation-background'>
					<img src={TicketBackground} />
				</div>
				<div className='attachment-done-modal '>
					<div className='attachment-modal-image'>
						<img src={DoneCloud} />
					</div>
					<div className='msg'>{msg}</div>
				</div>
				<AttachmentModal
					isOpen={attachmentModalOpen}
					toggle={this.toggleAttachmentModal}
					saveAttachments={this.saveAttachments}
					phase={this.state.phase}
				/>
				{/* <COMPANYCycleView itemClass='.comment' itemWrapperClass='.conversation-body'> */}
				<div className='ticket-conversation outer-wrapper'>
					<div className='conversation'>
						<Header id={id} />
						<SubHeader
							id={id}
							auth_status={auth_status}
							onChange={this.onChange}
							onSubmit={this.onSubmit}
							attachFile={this.toggleAttachmentModal}
							attachments={attachments}
							value={comment}
						/>
						{!convos && <div className='no-comments'>Loading comments</div>}
						{convos && comments && <Body auth_status={auth_status} convos={convos} />}
					</div>
				</div>
				{/* </COMPANYCycleView> */}
			</div>
		);
	}
}

export default TicketConversation;
