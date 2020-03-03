import React, { Fragment } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import moment from 'moment';

import BloxButton from 'sub_components/Common/BloxButton';

import { BillingUtils, INVOICES_STATUS } from 'services/billing';
import { Utils } from 'services/utils';

const getCurrentUser = () => {
	const { user } = useSelector(store => store.auth_status, shallowEqual);
	return user;
};

const calculateInvoiceAmount = invoices => {
	return invoices.reduce((total, invoice) => (total += invoice.amountDue), 0.0);
};

const findCurrentInvoice = invoices => {
	const today = moment();
	const invoicesDueToday = invoices.filter(invoice => {
		const invoiceStart = moment(invoice.billcycle).startOf('day');
		const invoiceEnd = moment(invoice.dueDate).endOf('day');
		return today.isBetween(invoiceStart, invoiceEnd);
	});

	return invoicesDueToday && invoicesDueToday[0] ? invoicesDueToday[0] : null;
};

const generateSummaryBalanceCopy = ({ balance }) => {
	const unknownBalanceEl = <div className='summary-balance'>Balance unknowned</div>;
	if (!balance) {
		return unknownBalanceEl;
	}

	const regex = /(\d*)\.?(\d*)/;
	const matches = balance.match(regex);
	const [, dollars, cents] = matches;
	if (dollars && cents) {
		return (
			<Fragment>
				<span className='dollar-sign '>$</span>
				<span className='dollars numbers30'>{Utils.formatCurrency(dollars, true)}</span>
				<span className='cents total-amount-dollars-and-cents'>{cents}</span>
			</Fragment>
		);
	}

	return unknownBalanceEl;
};

const generateDueTodayCopy = splitInvoices => {
	const amountDueToday = calculateInvoiceAmount(splitInvoices.dueToday);
	const amountOverdue = calculateInvoiceAmount(splitInvoices.overdue);
	let latestOverdueDate = '??.??.??';

	if (amountOverdue > 0) {
		const sortedOverdueInvoices = BillingUtils.sortDueDate(splitInvoices.overdue).reverse();
		if (sortedOverdueInvoices[0]) {
			latestOverdueDate = sortedOverdueInvoices[0].dueDate.format('MM.DD.YY');
		}
	}

	return (
		<span className='due-today-amount'>
			{`$${Utils.formatCurrency(amountDueToday)}`}
			<span className='total-amount-due-subtext-bold'> due today.</span>
			{amountOverdue > 0 && (
				<span className='amount-overdue due-today-more-detail'>
					{` ${Utils.formatCurrency(amountOverdue)} due on ${latestOverdueDate}.`}
				</span>
			)}
		</span>
	);
};

const generateOverdueCopy = splitInvoices => {
	const amountOverdue = calculateInvoiceAmount(splitInvoices.overdue);

	return (
		<span className='overdue-amount'>
			{`$${Utils.formatCurrency(amountOverdue)}`}
			<span className='total-amount-due-subtext-bold'> past due. </span>
		</span>
	);
};

const generateNextPaymentDateCopy = currentInvoice => {
	if (!currentInvoice) return null;

	const formattedCurrentInvoiceDate = currentInvoice.dueDate.format('MM.DD.YY');

	return (
		<span className='next-payment'>
			Next payment due&nbsp;
			<span className='next-payment-due-date'>{formattedCurrentInvoiceDate}</span>
		</span>
	);
};

const generateCurrentInvoiceCopy = currentInvoice => {
	if (!currentInvoice) return 'Unknown';

	const formattedCurrentInvoiceDate = currentInvoice.dueDate.format('MM.DD.YY');
	const currentInvoiceDue = currentInvoice.amountDue > 0;

	return currentInvoiceDue && `$${currentInvoice.amountDue} due ${formattedCurrentInvoiceDate}`;
};

const getCallToActionCopy = (splitInvoices, status, summary) => {
	const currentInvoice = findCurrentInvoice(splitInvoices.all);
	const summaryCopy = generateSummaryBalanceCopy(summary);
	const summaryBalance = summary.balance ? parseFloat(summary.balance) : null;
	let statusCopy = null;
	let nextPaymentCopy = null;

	if (status === INVOICES_STATUS.DUE_TODAY) {
		statusCopy = generateDueTodayCopy(splitInvoices);
	} else if (status === INVOICES_STATUS.OVERDUE) {
		statusCopy = generateOverdueCopy(splitInvoices);
		nextPaymentCopy = generateCurrentInvoiceCopy(currentInvoice);
	} else if (summaryBalance > 0) {
		statusCopy = generateNextPaymentDateCopy(currentInvoice);
	} else if (summaryBalance === 0 && summary.nextBillingDate) {
		const nextBillingDate = moment(summary.nextBillingDate).format('MM.DD.YY');
		statusCopy = `Your account is up to date.`;
		nextPaymentCopy = `Next invoice is on ${nextBillingDate}`;
	} else if (summaryBalance === 0 && !summary.nextBillingDate) {
		statusCopy = 'No payment due.';
	}

	return { summaryCopy, statusCopy, nextPaymentCopy };
};

const CallToAction = ({ invoices, summary, hasOnlinePaymentAccess }) => {
	if (!invoices || !summary) {
		return <div className='call-to-action'>Loading...</div>;
	}

	const user = getCurrentUser();
	const { invoices: splitInvoices, status } = BillingUtils.getInvoiceStatus(invoices);
	const customClass = hasOnlinePaymentAccess ? '' : 'no-button';
	const { summaryCopy, statusCopy, nextPaymentCopy } = getCallToActionCopy(
		splitInvoices,
		status,
		summary,
	);

	return (
		<div className='call-to-action'>
			<div className={`balance-summary ${customClass}`}>{summaryCopy}</div>
			<div className='sub-text-section'>
				<span className='balance-action total-amount-due-subtext'>{statusCopy}</span>
				{nextPaymentCopy && (
					<span className='next-invoice total-amount-due-subtext'>{nextPaymentCopy}</span>
				)}
			</div>

			{hasOnlinePaymentAccess && (
				<BloxButton
					title='PAY NOW'
					customClass='blox-button green-gradient'
					onClick={() => {}}
				/>
			)}
		</div>
	);
};

export default CallToAction;
