import React from 'react';

const CDN_URL = process.env.REACT_APP_CDN_URL;

const CloseIcon = `${CDN_URL}profile/icons-close.svg`;
const AddUserIcon = `${CDN_URL}profile/images-modal-portal.svg`;

const ModalHeader = ({ closeModal }) => {
	return (
		<div className='add-user-modal-header'>
			<div className='user-icon'>
				<img src={AddUserIcon} alt='' />
			</div>
			<div className='exit'>
				<img style={{ cursor: 'pointer' }} src={CloseIcon} onClick={closeModal} alt='' />
			</div>
		</div>
	);
};

export default ModalHeader;
