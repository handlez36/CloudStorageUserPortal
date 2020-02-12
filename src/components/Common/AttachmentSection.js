import React, { Fragment } from 'react';

import AttachmentItemContainer from '../../components/Common/AttachmentItemContainer';
const CDN_URL = process.env.REACT_APP_CDN_URL;
const CommonDropdownArrow = `${CDN_URL}common/Common_Dropdown_Arrow.svg`;

const AttachmentSection = ({ isOpen, onToggle, attachments }) => {
	return (
		<div className={`attachment-section ${isOpen ? 'open' : 'closed'}`}>
			<div className='attachment-top-section'>
				<div className='attachments-label'>
					<span className='label form-label-float'>Attachments</span>
					<span className='count form-hint-text'>({attachments ? attachments.length : 0})</span>
				</div>
				<div className='down-arrow' onClick={onToggle}>
					<img src={CommonDropdownArrow} alt='down-arrow' />
				</div>
			</div>
			{attachments && (
				<div className='attachment-bottom-section'>
					<AttachmentItemContainer attachments={attachments} />
				</div>
			)}
		</div>
	);
};

export default AttachmentSection;
