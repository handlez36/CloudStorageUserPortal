import React from 'react';

import { AttachmentApi } from '../../services/attachment';

const AttachmentItem = ({ attachment }) => {
	return (
		<div className='attachment-item'>
			<div className='icon-section'>
				<img src={AttachmentApi.getFileTypeIcon(attachment.filename)} alt='icon' />
			</div>
			<div className='detail-section'>
				<div className='filename body-copy-small-regular'>{attachment.filename}</div>
				<div className='size body-copy-small-regular'>
					{AttachmentApi.formatBytes(attachment.size)}
				</div>
			</div>
		</div>
	);
};

export default AttachmentItem;
