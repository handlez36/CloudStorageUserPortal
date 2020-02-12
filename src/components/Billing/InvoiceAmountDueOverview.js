import React, { Component, Fragment } from 'react';

import CalendarDay from './CalendarDay';
import CallToActionOverview from './CallToActionOverview';

export default class InvoiceAmountDueOverview extends Component {
	constructor(props) {
		super(props);

		this.state = {
			screenSize: window.innerWidth,
		};
	}

	resizeComponent = () => {
		window.addEventListener('resize', () => {
			this.setState({ screenSize: window.innerWidth });
		});
	};

	componentDidMount() {
		this.resizeComponent();
		const selectorIcon = document.getElementById('selector');
		const selectorBoundingBox = selectorIcon.getBoundingClientRect();
		this.selectorStartLocation = selectorBoundingBox;
	}

	goToPayments = () => {
		this.props.callback('MAKE A PAYMENT');
	};

	render() {
		const { screenSize } = this.state;
		const { eligibleForOnlinePayment, showAddress, currentInvoiceCopy, page } = this.props;

		return (
			<Fragment>
				<div className='invoice-calendar-container-overview'>
					<CalendarDay screenSize={screenSize} />

					<CallToActionOverview
						page={page}
						showAddress={showAddress}
						screenSize={screenSize}
						eligibleForOnlinePayment={eligibleForOnlinePayment}
						useAlternativeAmountDueText={true}
						goToPayments={this.goToPayments}
						currentInvoiceCopy={currentInvoiceCopy}
					/>
				</div>
			</Fragment>
		);
	}
}
