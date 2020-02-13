import React from 'react';

const CDN_URL = process.env.REACT_APP_CDN_URL;
const minus = `${CDN_URL}billing/Billing_INV_Reduce.svg`;

const Minus = ({ pdfZoom, width }) => {
	return (
		<div className='minus'>
			<img src={minus} onClick={() => pdfZoom('subtract')} width={width} />
		</div>
	);
};

export default Minus;
