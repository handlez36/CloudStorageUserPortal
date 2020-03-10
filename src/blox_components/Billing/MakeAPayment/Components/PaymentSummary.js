import React, { Component } from 'react';
import { string } from 'prop-types';

import ExpandableContent from 'components_old/Support/ExpandableContentComponent';
import Button from 'sub_components/Common/BloxButton';
import { CARD_TYPE_ICON } from 'utils/BillingConstants';
import InvoiceDetails from './InvoiceDetails';
import TotalAmountDue from './TotalAmount';
const CDN_URL = process.env.REACT_APP_CDN_URL;
const PrintIconInactive = `${CDN_URL}billing/icon-print-Active.svg`;
const PrintIconActive = `${CDN_URL}billing/icon-print-Default.svg`;
const ProfileIcon = `${CDN_URL}support/image-who.svg`;
const PaymentMethodIcon = `${CDN_URL}billing/select_payment_icon.svg`;
const InvoiceListIcon = `${CDN_URL}billing/invoice-allocations-icon.svg`;

const PHASE = {
	REVIEW: 'REVIEW',
	CONFIRMATION: 'CONFIRMATION',
};
const STEPS = {
	PAYMENT: 2,
	SELECT_INVOICES: 1,
};

class PaymentSummary extends Component {
	yourDetailSectionParams = params => {
		const { company, email, userName, phone, addressParts } = params['2'].data;
		const address = (
			<div>
				<div>{addressParts.address}</div>
				<div>{`${addressParts.city}, ${addressParts.state} ${addressParts.zip}`}</div>
			</div>
		);

		return {
			'1': {
				multiple: true,
				a: { label: 'Company', content: company },
				b: { label: 'Email', content: email },
			},
			'2': {
				multiple: true,
				a: { label: 'Name', content: userName },
				b: { label: 'Phone', content: phone },
			},
			'3': {
				multiple: true,
				a: { label: '', content: null },
				b: { label: 'Billing Address', content: address },
			},
		};
	};

	paymentDetailSectionParams = params => {
		const { cardholderName, cardType, lastFour } = params['2'].data;

		return {
			'1': {
				multiple: true,
				a: { label: 'Cardholder Name', content: cardholderName },
				b: { label: ' ', content: `Ending in ${lastFour}`, icon: CARD_TYPE_ICON[cardType] },
			},
		};
	};

	invoiceDetailSectionParams = params => {
		const { paymentAllocations: invoices } = params['1'].data;
		const { phase } = this.props;

		return {
			'1': {
				label: ' ',
				custom: true,
				type: InvoiceDetails,
				params: { invoices, phase },
			},
		};
	};

	printReceipt = () => {
		window.print();
	};

	togglePrintIcon = (state = 'MOUSE_OVER') => {
		const icon = document.getElementById('print-icon');
		if (icon) {
			icon.src = state === 'MOUSE_OVER' ? PrintIconActive : PrintIconInactive;
		}
	};

	render() {
		const { phase, data, submitPayment, editSection, submitted } = this.props;

		const yourDetails = this.yourDetailSectionParams(data);
		const paymentDetails = this.paymentDetailSectionParams(data);
		const invoiceDetails = this.invoiceDetailSectionParams(data);
		const totalPayment = data['1'].data.total;
		const invoiceDetail = data['1'].data.paymentAllocations;
		const paymentDetailsTitle = phase === PHASE.REVIEW ? 'Invoice Allocations' : 'Invoices Paid';
		const totalAmountLabel = phase === PHASE.REVIEW ? 'Payment Amount' : 'TOTAL Payment';

		return (
			<div className={`payment-summary-page ${phase === PHASE.REVIEW ? 'review' : ''}`}>
				<div className='user-actions-row'>
					<div className='icon'>
						<img
							id='print-icon'
							src={PrintIconInactive}
							alt='Print Receipt'
							onMouseEnter={() => this.togglePrintIcon('MOUSE_OVER')}
							onMouseLeave={() => this.togglePrintIcon('MOUSE_LEAVE')}
						/>
					</div>
					<div className='action' onClick={this.printReceipt}>
						Print Receipt
					</div>
				</div>
				<div className='payer-details-section'>
					<ExpandableContent title='Your Details' icon={ProfileIcon} fields={yourDetails} />
				</div>
				<div className='payment-details-section'>
					<ExpandableContent
						title='Payment Method'
						icon={PaymentMethodIcon}
						fields={paymentDetails}
						ctaCallback={phase === PHASE.REVIEW ? () => editSection(STEPS.PAYMENT, {}) : null}
					/>
				</div>
				<div className='invoices-section'>
					<ExpandableContent
						title={paymentDetailsTitle}
						icon={InvoiceListIcon}
						fields={invoiceDetails}
						ctaCallback={
							phase === PHASE.REVIEW
								? () => editSection(STEPS.SELECT_INVOICES, invoiceDetail)
								: null
						}
						ctaCallbackText='ADJUST AMTS'
					/>
				</div>
				<div className='total-payment-section'>
					<TotalAmountDue text={totalAmountLabel} amount={totalPayment} />
				</div>
				<Button
					title='PAY NOW'
					enabled={!submitted}
					customClass='blox-button circle-large'
					onClick={() => submitPayment(data)}
				/>
			</div>
		);
	}
}

PaymentSummary.propTypes = {
	phase: string,
};

PaymentSummary.defaultProps = {
	phase: PHASE.REVIEW,
};

export default PaymentSummary;
