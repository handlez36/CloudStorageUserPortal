import React, { Component } from 'react';
import Header from '../../components/Support/PageHeader';
import SelectInvoiceScreen from './SelectInvoiceScreen';
const CDN_URL = process.env.REACT_APP_CDN_URL;
const HeaderIcon = `${CDN_URL}billing/make-a-payment-icon.svg`;
const selectIconOn = `${CDN_URL}billing/Select-payment-method-icon-on.svg`;
const chequeIcon = `${CDN_URL}billing/select-invoice-icon-on.svg`;

const STEPS = {
	SELECT_INVOICES: 'SELECT_INVOICES',
};
class Payments extends Component {
	constructor(props) {
		super(props);
		this.state = { active: STEPS.SELECT_INVOICES };
	}
	updatePercentComplete = (step, numCompleted) => {
		console.log('updatePercent complete ' + step + numCompleted);
		switch (step) {
			case 'SELECT_INVOICES':
				this.setState({ completedInvoiceFields: numCompleted });
				break;
			case 'PAYMENT':
				this.setState({ completedCreditCardFields: numCompleted });
				break;
			default:
				return;
		}
	};
	getActivePage = () => {
		const { onComplete, goToTicketHistory, tickets, data } = this.props;
		const { active, editParams, submittedViaEmail, ticketNumber } = this.state;
		const params = {
			updatePercentComplete: this.updatePercentComplete,
			gotoNextStep: this.gotoNextStep,
		};

		switch (active) {
			case STEPS.SELECT_INVOICES:
				return <SelectInvoiceScreen data={this.props.data} />;
			case STEPS.PAYMENT:
			//return
			case STEPS.REVIEW:

			case STEPS.CONFIRMATION:

			default:
				return STEPS.SELECT_INVOICES;
		}
	};

	getActivePage = () => {
		const { active } = this.state;

		switch (active) {
			case STEPS.SELECT_INVOICES:
				return <SelectInvoiceScreen data={this.props.data} />;
			case STEPS.PAYMENT:
			//return
			case STEPS.REVIEW:

			case STEPS.CONFIRMATION:

			default:
				return STEPS.SELECT_INVOICES;
		}
	};

	getActivePage = () => {
		const { active } = this.state;

		switch (active) {
			case STEPS.SELECT_INVOICES:
				return <SelectInvoiceScreen data={this.props.data} />;
			case STEPS.PAYMENT:
			//return
			case STEPS.REVIEW:

			case STEPS.CONFIRMATION:

			default:
				return STEPS.SELECT_INVOICES;
		}
	};

	render() {
		const { active, stage } = this.state;

		const progressAttributes = [
			{
				key: STEPS.SELECT_INVOICES,
				icon: chequeIcon,
				total: 5,
				completed: 1,
				active: active === STEPS.SELECT_INVOICES,
				//showCheckMark: stage === STAGES.POPULATE && active !== STEPS.SELECT_INVOICES,
				//showCheckMark: this.showCheckMark(STEPS.PAYMENT, active, stage),
			},
			{
				key: STEPS.PAYMENT,
				icon: selectIconOn,
				total: 4,
				completed: 2,
				active: active === STEPS.PAYMENT,
				//showCheckMark: active === STEPS.REVIEW,
				//showCheckMark: this.showCheckMark(STEPS.PAYMENT, active, stage),
			},
		];

		return (
			<div className='payments-wrapper'>
				<Header
					icon={HeaderIcon}
					//pageTitle={pageTitle}
					moduleTitle='MAKE A PAYMENT'
					progressAttributes={progressAttributes}
				/>
				{this.getActivePage()}
			</div>
		);
	}
}

export default Payments;
