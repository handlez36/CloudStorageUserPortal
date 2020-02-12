import React from 'react';

const CDN_URL = process.env.REACT_APP_CDN_URL;
const download = `${CDN_URL}billing/Billing_INV_Download.svg`;

const Download = ({ width, invoiceId, downloadPdf }) => {
	return (
		<div className='download'>
			<img src={download} width={width} onClick={() => downloadPdf(invoiceId)} />
		</div>
	);
};

export default Download;
