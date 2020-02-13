import React, { Component } from 'react';

class TotalAmount extends Component {
	render() {
		const { amount, text } = this.props;

		return (
			<div className='total-amount-due-wrapper'>
				<div className='total-amount'>{text ? text : 'TOTAL Payment'}</div>
				<div className='total-amount-due'>${amount.toFixed(2)}</div>
			</div>
		);
	}
}

export default TotalAmount;
