import React, { Fragment } from 'react';

import PortalModal from './PortalModal';
import Button from './COMPANYButton';

const CDN_URL = process.env.REACT_APP_CDN_URL;
const AlertIcon = `${CDN_URL}common/icons-alert-reverse.svg`;
const ExitIcon = `${CDN_URL}common/icons-close-reverse.svg`;

function getHeader(toggleOpen, customTitle, customImage, customExitIcon, useHeader, headerMessage) {
	const title = customTitle || 'SERVER Unresponsive';
	const image = customImage || AlertIcon;
	let headerText;
	if (headerMessage) {
		headerText = headerMessage.split(',');
	}

	return (
		<div className='error-modal-header'>
			{useHeader !== false && (
				<Fragment>
					<div className='modal-icon'>
						<img src={image} alt='' />
					</div>
					<div className='error-modal-title'>{title}</div>
				</Fragment>
			)}
			{headerMessage && (
				<div className='header-message'>
					<span className='start'>{headerText[0]}</span>
					<span className='underline'>{headerText[1]}</span>
				</div>
			)}
			<div className='exit'>
				<img src={customExitIcon ? customExitIcon : ExitIcon} onClick={toggleOpen} alt='' />
			</div>
		</div>
	);
}

const defaultBody = toggleOpen => (
	<Fragment>
		<div className='top-message'>
			Looks like something went wrong on our end. Please try submitting the form again.
		</div>
		<div className='bottom-message'>
			If the problem persists please call
			<br />
			877-590-1684.
		</div>
		<div className='buttons-row'>
			{/* <div className='email-option'>&nbsp;</div> */}
			<div className='try-again-option'>
				<Button
					title='TRY AGAIN'
					enabled={true}
					customClass='COMPANY-button'
					onClick={toggleOpen}
				/>
			</div>
		</div>
	</Fragment>
);

const ErrorModal = ({
	useHeader,
	isOpen,
	toggleOpen,
	customBody,
	customTitle,
	customImage,
	customExitIcon,
	headerMessage,
	additionalClasses,
}) => {
	return (
		<div className='error-modal'>
			<PortalModal
				header={getHeader(
					toggleOpen,
					customTitle,
					customImage,
					customExitIcon,
					useHeader,
					headerMessage,
				)}
				useButton={true}
				isOpen={isOpen}
				toggleOpen={toggleOpen}
				additionalClass={additionalClasses}
			>
				<div className='error-modal-body'>
					{customBody && customBody}
					{!customBody && defaultBody(toggleOpen)}
				</div>
			</PortalModal>
		</div>
	);
};

export default ErrorModal;
