import React from 'react';

const CDN_URL = process.env.REACT_APP_CDN_URL;
const fullscreen = `${CDN_URL}billing/Billing_INV_Full_Screen.svg`;

const FullScreen = ({ width, goFull }) => {
	return (
		<div className='fullscreen'>
			<img src={fullscreen} width={width} onClick={goFull} />
		</div>
	);
};

export default FullScreen;
