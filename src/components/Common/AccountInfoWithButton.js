import React from 'react';

const AccountInfoWithButton = ({ amountDue, nextPaymentDue, button, size, amountPastDue }) => {
	return (
		<div id={size === 'large' ? 'account-info-block-lg' : 'account-info-block'}>
			<div className='amount-due'>{`$ ${amountDue}`}</div>
			<div className='next-payment-due'>{`Next payment due  ${nextPaymentDue}`}</div>
			<div className='button'>{button}</div>
			<div className='additional-text'>{`Note: Your amount due includes  ${`$` +
				amountPastDue} that's past due.`}</div>
		</div>
	);
};

export default AccountInfoWithButton;
