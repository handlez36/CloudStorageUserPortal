import React, { Fragment } from 'react';
import printJS from 'print-js';
const CDN_URL = process.env.REACT_APP_CDN_URL;
const print = `${CDN_URL}billing/Billing_INV_Print.svg`;

const Print = ({ invoice, width }) => {
	return (
		<Fragment>
			<div className='print'>
				<img src={print} width={width} onClick={invoice ? () => printJS(invoice) : function() {}} />
			</div>
		</Fragment>
	);
};
export default Print;
