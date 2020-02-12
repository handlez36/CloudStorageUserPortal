import React from 'react';
import Scrollbar from 'react-scrollbars-custom';

import AttachmentItem from './AttachmentItem';
import { Utils } from '../../services/utils';

function renderAttachments(attachments) {
	const rows = [];
	let currentIndex = 0;
	let currentRow = 0;

	while (currentIndex < attachments.length) {
		rows.push(
			<div className={`attachment-row row-${currentRow}`}>
				{attachments.slice(currentIndex, currentIndex + 2).map(att => (
					<AttachmentItem attachment={att} />
				))}
			</div>,
		);
		currentIndex += 2;
		currentRow++;
	}

	return rows;
}

const AttachmentItemContainer = ({ attachments }) => {
	return (
		<Scrollbar disableTracksWidthCompensation noScrollX>
			<div className='attachment-item-container attachment-wrapper'>
				<div className='attachment-content'>{renderAttachments(attachments)}</div>
			</div>
		</Scrollbar>
	);
};

export default AttachmentItemContainer;
