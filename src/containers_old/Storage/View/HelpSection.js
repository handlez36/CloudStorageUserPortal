import React from 'react';

const HelpSection = ({ downloadPdfCallback, share }) => {
	return (
		<div key='help-section' className='help-section'>
			<div className='title'>Need help connecting?</div>
			{share.storageType === 'file' && (
				<div className='pdf-download-section'>
					<div className='windows' onClick={() => downloadPdfCallback('WINDOWS')}>
						WINDOWS
					</div>
					<div className='mac' onClick={() => downloadPdfCallback('MAC')}>
						MAC
					</div>
				</div>
			)}
			{share.storageType === 'object' && (
				<div className='pdf-download-section'>
					<div className='cloudBerry' onClick={() => downloadPdfCallback('CLOUDBERRY')}>
						CLOUDBERRY
					</div>
				</div>
			)}
		</div>
	);
};

export default HelpSection;
