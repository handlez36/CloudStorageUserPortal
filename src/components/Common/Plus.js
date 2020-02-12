import React from 'react';

const CDN_URL = process.env.REACT_APP_CDN_URL;
const plus = `${CDN_URL}billing/Billing_INV_Enlarge.svg`;

const Plus = ({ pdfZoom, width }) => {
	return (
		<div className='plus'>
			<img src={plus} onClick={() => pdfZoom('add')} width={width} />
		</div>
	);
};

export default Plus;
