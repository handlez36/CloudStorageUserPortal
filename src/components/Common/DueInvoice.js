import React from 'react';
const CDN_URL = process.env.REACT_APP_CDN_URL;
const DueSelectIcon = `${CDN_URL}billing/Billing_Invoices_DUE_Select_Icon_190x190.png`;

const DueInvoice = ({ onFilterSelection, current }) => {
	return (
		<div className='selection current'>
			<img src={DueSelectIcon} alt='Due' onClick={() => onFilterSelection(current)} />
			<div className='title'>CURRENT</div>
		</div>
	);
};

export default DueInvoice;
