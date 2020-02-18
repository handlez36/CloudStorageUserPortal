import React from 'react';
import moment from 'moment';

import Zero from '../Components/CountDownSVGs/Zero';
import PastDue from '../Components/CountDownSVGs/PastDue';
import DueToday from '../Components/CountDownSVGs/DueToday';
import { BillingApi, BillingUtils, INVOICES_STATUS } from '../../../../services/billing';

const selectCalendarImage = (invoices, status) => {
	const today = moment().startOf('day');

	switch (status) {
		case INVOICES_STATUS.DUE_TODAY:
			return <DueToday />;
		case INVOICES_STATUS.OVERDUE:
			const earliestOverdueDate = invoices.overdue[0].dueDate;
			const daysOverdue = today.diff(earliestOverdueDate, 'days');
			const daysOverdueStr = `${daysOverdue} ${daysOverdue > 1 ? 'DAYS' : 'DAY'}`;

			return <PastDue text={daysOverdueStr} />;
		case INVOICES_STATUS.DUE_FUTURE:
			const sortedFutureInvoices = BillingUtils.sortDueDate(invoices.dueFuture).reverse();
			const latestDueFutureDate = sortedFutureInvoices[0].dueDate;
			const diff = latestDueFutureDate.diff(today, 'days');

			return BillingApi.getCountDownNumber(diff);
		default:
			return <Zero text='PAID' />;
	}
};

const CalendarDay = ({ invoices }) => {
	if (!invoices) {
		return <div className='calendar-day'>Error pulling invoices</div>;
	}

	const { invoices: splitInvoices, status } = BillingUtils.getInvoiceStatus(invoices);

	return <div className='calendar-day'>{selectCalendarImage(splitInvoices, status)}</div>;
};

export default CalendarDay;
