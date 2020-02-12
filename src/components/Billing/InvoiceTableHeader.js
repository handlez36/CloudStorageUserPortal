import React from 'react';

const InvoiceTableHeader = props => {
	return (
		<thead className='thead-dark'>
			<tr>
				<th>INVOICE #</th>
				<th>DATE SENT</th>
				<th>DATE DUE</th>
				<th>AMT DUE</th>
				<th>AMT PAST DUE</th>
				<th>INV DETAIL</th>
				<th>DOWNLOAD INV</th>
			</tr>
		</thead>
	);
};

export default InvoiceTableHeader;
