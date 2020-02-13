import React, { Component, Fragment } from 'react';

import { AvatarApi } from '../../../../services/avatar';
import SubmitButton from '../../../../components/Common/BloxButton';
const CDN_URL = process.env.REACT_APP_CDN_URL;
const AddCommentButton = `${CDN_URL}support/Support_AddComment_ConversationButton_Static.svg`;
const GrayPaperclipImage = `${CDN_URL}support/Support_Gray_PaperClip.svg`;
const PurplePaperclipImage = `${CDN_URL}support/Support_BrightPurple_PaperClip.svg`;
const HoverPaperclipImage = `${CDN_URL}support/Support_Hover_PaperClip.svg`;

class ConversationSubHeader extends Component {
	constructor(props) {
		super(props);

		this.state = {
			showFiles: false,
		};
	}

	showFiles = () => {
		this.setState({ showFiles: true });
	};

	hideFiles = () => {
		this.setState({ showFiles: false });
	};

	renderAttachmentDetails = () => {
		const { attachments } = this.props;
		if (attachments.length < 1) {
			return;
		}

		return (
			<div className={`attachment-details ${attachments.length > 0 ? 'show' : ''}`}>
				{attachments.map(attachment => {
					return (
						<div key={`${attachment.filename}-${attachment.index}`} className='attachment-detail'>
							<div className='filename'>{attachment.filename}</div>
							<div className='filesize'>{attachment.size}</div>
						</div>
					);
				})}
			</div>
		);
	};

	enableSubmitButton = value => {
		return value.length >= 10;
	};

	render() {
		const avatarApi = new AvatarApi();
		const { auth_status, onChange, onSubmit, attachFile, value, attachments } = this.props;
		const { showFiles } = this.state;

		return (
			<Fragment>
				<div className='conversation-sub-header'>
					<div className='new-comment-section'>
						<div className='new-comment-image'>
							<img src={AddCommentButton} alt='Add Comment' />
						</div>
						<div className='new-comment-text-field'>
							<div className='small-avatar'>
								<img src={avatarApi.getUserAvatar(auth_status)} alt='Add Comment' />
							</div>
							<textarea onChange={onChange} placeholder='Add a new comment...' value={value} />
							<div
								onClick={attachFile}
								onMouseEnter={this.showFiles}
								onMouseLeave={this.hideFiles}
								className='attachment-icon'
							>
								{attachments.length > 0 && (
									<div className='attachment-count'>
										{`${attachments.length} ${attachments.length > 1 ? 'DOCS' : 'DOC'}`}
									</div>
								)}
								<img
									onMouseEnter={e => (e.currentTarget.src = HoverPaperclipImage)}
									onMouseLeave={e =>
										(e.currentTarget.src =
											attachments.length > 0 ? PurplePaperclipImage : GrayPaperclipImage)
									}
									src={attachments.length > 0 ? PurplePaperclipImage : GrayPaperclipImage}
									className='paperclip-img'
									alt='attach'
								/>
								{showFiles && this.renderAttachmentDetails()}
							</div>
						</div>
					</div>
					<div className='submit-button-section'>
						<SubmitButton
							title='SUBMIT TICKET'
							enabled={this.enableSubmitButton(value)}
							onClick={onSubmit}
						/>
					</div>
				</div>
			</Fragment>
		);
	}
}

export default ConversationSubHeader;
