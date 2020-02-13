import React from 'react';
const CDN_URL = process.env.REACT_APP_CDN_URL;
const PaidSelectIcon = `${CDN_URL}billing/Billing_Invoices_PAID_Select_Icon_190x190.png`;

const PaidInvoice = ({ onFilterSelection, paid }) => {
	return (
		<div className='selection paid'>
			<img src={PaidSelectIcon} alt='Paid' onClick={() => onFilterSelection(paid)} />
			<div className='title'>PAID</div>
		</div>
	);
};

export default PaidInvoice;
