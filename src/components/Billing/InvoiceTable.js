import React from 'react';

import InvoiceTableHeader from './InvoiceTableHeader';
import { BillingApi } from '../../services/billing';
import { Utils } from '../../services/utils';
import DisplayBill from './DisplayBill';
import PropTypes, { checkPropTypes } from 'prop-types';
const CDN_URL = process.env.REACT_APP_CDN_URL;
const binoculars = `${CDN_URL}billing/Billing_Invoices_Table_VIEWInv_Icon_102x30.png`;
const download = `${CDN_URL}billing/Billing_Invoices_Table_DOWNLOADInv_Icon_102x30.png`;

function highlightDate(date) {
	if (date === '-') return '';

	const today = new Date();
	const dueDate = new Date(date);

	return dueDate <= today ? 'highlight' : '';
}

const InvoiceTable = ({ invoices, type, downloadPdfCallback, loadSupportColumn, showPdf }) => {
	const billingApi = new BillingApi();
	const clickHandler = data => {
		loadSupportColumn(DisplayBill, data);
	};
	return (
		<div className={`invoice-table ${type}`}>
			{invoices &&
				invoices.length && [
					<table key='0'>
						<InvoiceTableHeader />
						<tbody>
							{invoices.map(row => {
								let sentDate;
								let dueDate;
								let highlight;
								let invoiceId;
								let invoiceObj;
								let amountDue;
								let invoiceAmount;
								if (row) {
									sentDate = Utils.formatDate(row.billcycle) || '-';
									dueDate = Utils.formatDate(row.dueDate) || '-';
									highlight = highlightDate(dueDate);
									invoiceId = row.invoiceId;
									amountDue = billingApi.formatCurrency(row.amountDue);
									invoiceAmount = billingApi.formatCurrency(row.invoiceAmount);
									invoiceObj = {
										invoiceId: invoiceId,
										invoiceNumber: row.invoiceNumber,
										downloadPdf: downloadPdfCallback,
									};
								}

								return (
									<tr key={invoiceId || '-'}>
										<td className='invoice-number'>{`#${invoiceId || ''}` || '-'}</td>
										<td className='date-sent'>{sentDate}</td>
										<td className={`date-due ${highlight}`}>{dueDate}</td>
										<td className='amt-due'>{invoiceAmount || '-'}</td>
										<td className={`amt-past-due ${highlight}`}>{amountDue || '-'}</td>
										<td className={invoiceId ? 'pdf-button view' : 'pdf-button view disabled'}>
											<img src={binoculars} alt='view' onClick={() => clickHandler(invoiceObj)} />
										</td>
										<td
											className={invoiceId ? 'pdf-button download' : 'pdf-button download disabled'}
											onClick={() => downloadPdfCallback(row.invoiceId)}
										>
											<img src={download} alt='download' />
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>,
					// <br />
				]}
		</div>
	);
};

InvoiceTable.PropType = {
	invoices: PropTypes.array.isRequired,
};
export default InvoiceTable;
