import React from 'react';
const CDN_URL = process.env.REACT_APP_CDN_URL;
const CloseIcon = `${CDN_URL}profile/icons-close-reverse.png`;
const RosterAddUserIcon = `${CDN_URL}profile/images-roster-overlay.png`;

const RosterModalHeader = ({ closeModal }) => {
	return (
		<div className='roster-add-user-modal-header'>
			<div className='user-icon'>
				<img src={RosterAddUserIcon} alt='' />
			</div>
			<div className='exit' onClick={closeModal}>
				<img src={CloseIcon} alt='' />
			</div>
		</div>
	);
};

export default RosterModalHeader;
