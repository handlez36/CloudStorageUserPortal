import React, { Fragment } from 'react';

import Modal from '../../../components/Common/ErrorModal';
import Button from '../../../components/Common/BloxButton';
import { PASSWORD_UPDATE_STATUS } from '../StorageConstants';
const CDN_URL = process.env.REACT_APP_CDN_URL;
const checkMark = `${CDN_URL}billing/check-mark-circle.svg`;

function generateModalBody(status, storageType, storagePassword = null, toggleOpen) {
	return status === PASSWORD_UPDATE_STATUS.SUCCESS ? (
		<Fragment>
			<div className='top-message'>Success!</div>
			{storageType === 'file' && (
				<div className='bottom-message'>NEW PASSWORD: {storagePassword}</div>
			)}

			<div className='bottom-message'>Your password has been changed successfully.</div>
			<Button
				title='OKAY'
				enabled={true}
				customClass='support-button gradient'
				onClick={toggleOpen}
			/>
		</Fragment>
	) : (
		<Fragment>
			<div className='top-message'>
				Looks like something went wrong on our end. Please try again.
			</div>
			<div className='bottom-message'>
				If the problem persists please call
				<br />
				877-590-1684.
			</div>
		</Fragment>
	);
}

const PasswordModal = ({ status, toggleOpen, share, storagePassword }) => {
	const isOpen = status !== PASSWORD_UPDATE_STATUS.NOT_STARTED;
	const bodyText = generateModalBody(status, share.type, storagePassword, toggleOpen);
	const headerText =
		status === PASSWORD_UPDATE_STATUS.SUCCESS ? 'Password Reset' : 'ERROR UPDATING PASSWORD!';

	return (
		<div className='password-modal'>
			<Modal
				isOpen={isOpen}
				toggleOpen={toggleOpen}
				customBody={bodyText}
				customTitle={headerText}
				customImage={status === PASSWORD_UPDATE_STATUS.SUCCESS ? checkMark : ''}
			/>
		</div>
	);
};

export default PasswordModal;
