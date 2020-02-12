import React from 'react';

import Field from '../../../components/Common/AccordianField';

const INVOICE_FIELD_HEADERS_COMPLETE = {
	invoiceid: 'Invoice #',
	due: 'Date Due',
	amountdue: 'Amount Due Today',
	amount: 'Amount Paid',
};
const INVOICE_FIELD_HEADERS_REVIEW = {
	invoiceid: 'Invoice #',
	sent: 'Date Sent',
	due: 'Date Due',
	amountdue: 'Amount Due Today',
	amount: 'Amount Paid',
};
const InvoiceDetails = ({ invoices, phase }) => {
	let INVOICE_FIELD_HEADERS;
	if (phase === 'REVIEW') {
		INVOICE_FIELD_HEADERS = INVOICE_FIELD_HEADERS_REVIEW;
	} else {
		INVOICE_FIELD_HEADERS = INVOICE_FIELD_HEADERS_COMPLETE;
		invoices.forEach(invoice => {
			delete invoice.sent;
		});
	}
	return (
		<div className='invoices'>
			{invoices &&
				invoices.map(invoice => {
					return (
						<div className={`invoice-row invoice-${invoice.num}`}>
							{Object.keys(invoice).map(field => {
								return (
									<Field
										key={`${field}-${invoice[field]}`}
										header={INVOICE_FIELD_HEADERS[field.toLowerCase()]}
										value={invoice[field]}
									/>
								);
							})}
						</div>
					);
				})}
		</div>
	);
};

export default InvoiceDetails;
