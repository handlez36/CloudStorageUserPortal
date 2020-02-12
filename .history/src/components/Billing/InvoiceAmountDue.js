import React, { Component, Fragment } from 'react';

export default class InvoiceAmountDue extends Component {
	constructor() {
		super();

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
	}

	render() {
		let { screenSize } = this.state;
		if (screenSize > '1440' && screenSize <= '2560') {
			return (
				<div className='invoice-calendar-container'>
					{/* <div className='amount-due-column'>
						<CalendarDay screenSize={screenSize} />
					</div>
					<div className='amount-due-row'>
						<CallToAction screenSize={screenSize} />
						<BillingAddress />
						<div className='invoice-calendar-footnote'>
							<span className='footnote-remember'>REMEMBER</span>{' '}
							<span className='footnote-remaining'>
								note to which invoice(s) your payment should be applied.
							</span>
						</div>
					</div> */}
				</div>
			);
		} else if (screenSize <= '1440') {
			return (
				<Fragment>
					{/* <div className='invoice-calendar-container'>
						<CalendarDay screenSize={screenSize} />
						<CallToAction screenSize={screenSize} />
					</div>
					<div className='invoice-calendar-leftovers'>
						<div className='invoice-calendar-footnote'>
							<span className='footnote-remember'>REMEMBER</span>{' '}
							<span className='footnote-remaining'>
								note to which invoice(s) your payment should be applied.
							</span>
						</div>
						<BillingAddress />
					</div> */}
				</Fragment>
			);
		}
	}
}
