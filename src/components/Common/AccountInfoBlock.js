import React, { Component } from 'react';
export default class AccountInfoBlock extends Component {
	render() {
		let { amountDue, additionalText, nextPaymentDue, text, boldText, size } = this.props;

		return (
			<div>
				<div id={size === 'large' ? 'account-info-block-lg' : 'account-info-block'}>
					<div className='amount-due'>
						{`$${amountDue}`}
						<br />
					</div>
					<div className='next-payment-due'> {`Next payment due ${nextPaymentDue}`}</div>
					<div className='additional-text'>
						{text}
						<br />
						<strong>{boldText}</strong>
						<br />
						{additionalText}
					</div>
				</div>
			</div>
		);
	}
}
