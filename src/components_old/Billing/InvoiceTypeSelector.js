import React from 'react';

import { INVOICE_LIST_TYPE } from '../../containers/Billing2.0/BillingConstants';
import DueInvoice from '../Common/DueInvoice';
import PaidInvoice from '../Common/PaidInvoice';

const InvoiceTypeSelector = ({ onFilterSelection }) => {
	return (
		<div className='invoice-selection'>
			<div className='selection-container'>
				<DueInvoice onFilterSelection={onFilterSelection} current={INVOICE_LIST_TYPE.CURRENT} />
				<PaidInvoice onFilterSelection={onFilterSelection} paid={INVOICE_LIST_TYPE.PAID} />
			</div>
		</div>
	);
};

export default InvoiceTypeSelector;
