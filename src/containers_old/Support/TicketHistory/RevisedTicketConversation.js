import React, { Component } from 'react';

import Header from './Conversations/ConversationHeader';
import SubHeader from './Conversations/ConversationSubHeader';
import Body from './Conversations/ConversationBody';
import AttachmentModal from './Conversations/AttachmentModal';
import { TicketApi } from '../../../services/ticket';
import { animateConvoCycle } from './Conversations/ConvoCycleAnimations';
import { TICKET_ATTACHMENT_PHASE as PHASE } from '../TicketConstants';
import NavArrow from './NavArrows';
const CDN_URL = process.env.REACT_APP_CDN_URL;
const UpArrow = `${CDN_URL}common/Common_White_UpArrow.svg`;
const DownArrow = `${CDN_URL}common/Common_White_DownArrow.svg`;
const DoneCloud = `${CDN_URL}support/Support_DoneCloud_Icon.svg`;

class RevisedTicketConversation extends Component {
	constructor(props) {
		super(props);

		this.state = {
			ticket: null,
			comment: '',
			convos: null,
			topConvo: null,
			attachmentModalOpen: false,
			attachments: [],
			attachmentErrors: [],
			phase: PHASE.NOT_STARTED,
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
				const isSuccess = response.status === 200 && !response.data.error;
				this.displayAttachmentDoneModal(isSuccess);

				if (isSuccess) {
					setTimeout(() => {
						this.retrieveTicket(ticket.caseid);
					}, 5000);
				} else {
					console.log('Failed to save!');
				}

				this.setState({ comment: '', phase: PHASE.TICKET_SUBMITTED });
			})
			.catch(error => {
				this.displayAttachmentDoneModal(false);

				console.log('Error updating ticket: ', error);
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

	cycleConvos = (items, params, direction) => {
		animateConvoCycle(items, params, direction);
	};
	sendTicketDetailsToParent(ticketDetails) {
		let callback = this.props.callback;

		callback(ticketDetails);
	}

	retrieveTicket(id) {
		console.log('Retrieving ticket ', id);
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

	displayAttachmentDoneModal = isSuccess => {
		const modal = document.querySelector('.attachment-done-modal');
		const msg = isSuccess
			? 'Comment added successfully!'
			: 'Sorry, there was an error adding the comment';

		modal.innerHTML = `<div class='msg'>${msg}</div>`;
		modal.classList.add('done');

		setTimeout(() => {
			modal.classList.remove('done');
		}, 2000);
	};

	componentDidMount() {
		const { ticket } = this.props;

		if (ticket) {
			const { id } = ticket;
			this.retrieveTicket(id);
		}
	}

	UNSAFE_componentWillUpdate(newProps) {
		if (newProps.ticket.id !== this.props.ticket.id) {
			this.retrieveTicket(newProps.ticket.id);
		}
	}
	filterComments = convos => {
		let filteredConvos = convos.filter(convo => convo.comment !== ' Listening for updates...');
		filteredConvos = filteredConvos.filter(convo => convo.comment !== ' Received Support Request');
		return filteredConvos;
	};

	renderNavArrows() {
		const viewportHeight = document.documentElement.clientHeight;
		const portalHeader = document.querySelector('.portal-header');
		const summaryTop = document.querySelector('ticket-summary-details');
		const footer = document.querySelector('.footerContainer');
		const commentElements = document.querySelectorAll('.comment');

		const commentSize = commentElements.reduce(
			(acc, comment) => acc + comment.getBoundingClientRect().height,
		);

		return commentSize >= viewportHeight - portalHeader - summaryTop - footer;
	}

	render() {
		const { auth_status, ticket } = this.props;
		let { convos, comment, attachmentModalOpen, attachments } = this.state;
		let convoLength;
		if (convos) {
			convoLength = convos.length;
		}

		return (
			<div className='revised-ticket-conversation-section'>
				<div className='attachment-done-modal done'>
					<div className='attachment-modal-image'>
						<img src={DoneCloud} />
					</div>
					{/* <div className='msg' /> */}
				</div>
				<AttachmentModal
					isOpen={attachmentModalOpen}
					toggle={this.toggleAttachmentModal}
					saveAttachments={this.saveAttachments}
					phase={this.state.phase}
				/>
				<div className='ticket-conversation outer-wrapper'>
					<div className='conversation'>
						<Header id={ticket.id} />
						<SubHeader
							auth_status={auth_status}
							onChange={this.onChange}
							onSubmit={this.onSubmit}
							attachFile={this.toggleAttachmentModal}
							attachments={attachments}
							value={comment}
						/>
						{!convos && <div className='no-comments'>Loading comments</div>}
						{convos && <Body auth_status={auth_status} convos={convos} />}
					</div>
					{convoLength > 1 && (
						<NavArrow
							items={convos}
							params={{ dummy: 1 }}
							onClick={this.cycleConvos}
							arrows={{ up: UpArrow, down: DownArrow }}
						/>
					)}
				</div>
			</div>
		);
	}
}

export default RevisedTicketConversation;
