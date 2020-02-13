import React, { Component } from 'react';

// import FileUpload from '../containers/Support/TicketHistory/Conversations/FileUpload';
// import { TICKET_ATTACHMENT_PHASE as PHASE } from '../containers/Support/TicketConstants';
// import SubHeader from "../containers/Support/TicketHistory/TicketConversation";
export default class Sandbox extends Component {
	state = {
		wrapperScrollHeight: 0,
		wrapperClientHeight: 0,
		input: '',
		ticket: null,
		comment: '',
		convos: null,
		topConvo: null,
		attachmentModalOpen: false,
		attachments: [],
		attachmentErrors: [],
		// phase: PHASE.NOT_STARTED,
	};

	callback = wrapper => {
		this.setState({ wrapperScrollHeight: wrapper.scrollHeight });
		this.setState({ wrapperClientHeight: wrapper.clientHeight });
	};

	onChange = event => {
		this.setState({ input: event.target.value });
	};

	toggleAttachmentModal = () => {
		this.setState(state => {
			state.attachmentModalOpen = !state.attachmentModalOpen;
			// state.phase = PHASE.IN_PROGRESS;

			return state;
		});
	};

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

	render() {
		const { attachmentModalOpen } = this.state;

		return (
			<div id='sandbox'>
				{/*Sample Page*/}
				{/*<div className='test-expandable-section'>*/}
				{/*Description:*/}
				{/*/!* <ExpandableSection label='Description' content={content4} callback={this.callback} /> *!/*/}
				{/*</div>*/}
				{/*<SubHeader*/}
				{/*onChange={this.onChange}*/}
				{/*onSubmit={this.onSubmit}*/}
				{/*attachFile={this.toggleAttachmentModal}*/}
				{/*attachments={attachments}*/}
				{/*/>*/}
				{/* <FileUpload
					isOpen={attachmentModalOpen}
					toggle={this.toggleAttachmentModal}
					saveAttachments={this.saveAttachments}
					phase={this.state.phase}
				/> */}
			</div>
		);
	}
}
