import React from 'react';

const BillingAddress = () => {
	return (
		<div className='invoice-calendar-address'>
			<span className='address-bold'>Make a payment via</span>
			<br />
			<span className='address-bold'>check or money order to:</span>
			<br />
			<span className='address'>COMPANY</span>
			<br />
			<span className='address'>6 W Druid Hills Dr NE</span>
			<br />
			<span className='address'>Atlanta, GA 30329</span>
		</div>
	);
};

export default BillingAddress;
