import React from 'react';
import { string } from 'prop-types';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';

import ModalButton from 'sub_components/Common/COMPANYButton';

const PortalModal = ({
	additionalClass,
	header,
	footer,
	buttonText,
	isOpen,
	submitEnabled,
	onSubmit,
	toggleOpen,
	children,
	useButton,
	buttonClass,
}) => {
	return (
		<Modal
			className={`portal-modal ${additionalClass}`}
			isOpen={isOpen}
			side
			position='bottom-right'
			// toggle={() => {}}
			toggle={toggleOpen}
		>
			{/* <ModalHeader className="modal-header" titleClass="w-100 font-weight-bold" toggle={toggleOpen}> */}
			{/* <ModalHeader className='' toggle={false}> */}
			<ModalHeader className=''>{header}</ModalHeader>
			<ModalBody id='modal-body' className='modal-body'>
				{children}
			</ModalBody>
			<ModalFooter className='modal-footer'>
				<div className='footer-content'>{footer}</div>
				{useButton && (
					<ModalButton
						customClass={buttonClass}
						title={buttonText}
						enabled={submitEnabled}
						onClick={onSubmit}
					/>
				)}
			</ModalFooter>
		</Modal>
	);
};

PortalModal.propTypes = {
	buttonClass: string,
};

PortalModal.defaultProps = {
	buttonClass: 'COMPANY-button',
};

export default PortalModal;
