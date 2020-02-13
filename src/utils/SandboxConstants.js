export const INVOICE_STATUS = {
	PAID: 'Paid',
	DUE: 'Due',
	PAST_DUE: 'Past Due',
};

export const TEST_HEADERS = {
	invoiceNumber: 'Invoice',
	billcycle: 'Sent',
	invoiceAmount: 'Total',
	dueDate: 'Due',
	amountDue: 'Balance',
};

export const DETAIL_HEADERS = {
	effectiveDate: 'Date',
	description: 'Description',
	outstandingBalance: 'Amount Due',
};

export const TEST_DATA = [
	{
		customerid: 346361,
		billcycle: '2018-11-15 07:08:51',
		dueDate: '2018-12-15 05:00:00',
		invoiceId: 395393,
		invoiceNumber: 1283,
		invoiceAmount: '175',
		amountDue: '125',
		status: 'Past Due',
		filename: '34636120181215395393.pdf',
		published: true,
		transactions: [
			{
				invoiceId: '395393',
				customerId: '346361',
				invoiceNumber: '1283',
				amount: '$50.00',
				outstandingBalance: '$125.00',
				effectiveDate: '2018-12-15 05:00:00',
				description: 'Payment Received',
				invoiceTotal: '$175.00',
				uri: 'https://stg-secure.fusebill.com/v1/invoices/395393',
				transactionId: '53653000',
			},
			{
				invoiceId: '395393',
				customerId: '346361',
				invoiceNumber: '1283',
				amount: '$175.00',
				outstandingBalance: '$125.00',
				effectiveDate: '2018-12-15 05:00:00',
				description: 'Adjustment',
				invoiceTotal: '$175.00',
				uri: 'https://stg-secure.fusebill.com/v1/invoices/395393',
				transactionId: '52607452',
			},
			{
				invoiceId: '380229',
				customerId: '346361',
				invoiceNumber: '1242',
				amount: '$175.00',
				outstandingBalance: '$40.00',
				effectiveDate: '2018-12-15 05:00:00',
				description: 'Payment Received',
				invoiceTotal: '$175.00',
				uri: 'https://stg-secure.fusebill.com/v1/invoices/380229',
				transactionId: '51519527',
			},
			{
				invoiceId: '380229',
				customerId: '346361',
				invoiceNumber: '1242',
				amount: '$175.00',
				outstandingBalance: '$80.00',
				effectiveDate: '2018-12-15 05:00:00',
				description: 'Outstanding Balance',
				invoiceTotal: '$175.00',
				uri: 'https://stg-secure.fusebill.com/v1/invoices/380229',
				transactionId: '51519527',
			},
		],
	},
	{
		customerid: 346361,
		billcycle: '2018-11-15 07:08:51',
		dueDate: '2018-12-15 05:00:00',
		invoiceId: 380229,
		invoiceNumber: 1242,
		invoiceAmount: '175',
		amountDue: '80',
		status: 'Paid',
		filename: '34636120181115380229.pdf',
		published: true,
		transactions: [
			{
				invoiceId: '380229',
				customerId: '346361',
				invoiceNumber: '1242',
				amount: '$95.00',
				outstandingBalance: '$80.00',
				effectiveDate: '2018-12-15 05:00:00',
				description: 'Adjustment',
				invoiceTotal: '$175.00',
				uri: 'https://stg-secure.fusebill.com/v1/invoices/380229',
				transactionId: '53653000',
			},
			{
				invoiceId: '380229',
				customerId: '346361',
				invoiceNumber: '1242',
				amount: '$175.00',
				outstandingBalance: '$80.00',
				effectiveDate: '2018-12-15 05:00:00',
				description: 'Outstanding Balance',
				invoiceTotal: '$175.00',
				uri: 'https://stg-secure.fusebill.com/v1/invoices/380229',
				transactionId: '51519527',
			},
		],
	},
	{
		customerid: 346361,
		billcycle: '2018-11-15 07:08:51',
		dueDate: '2018-12-15 05:00:00',
		invoiceId: 308258,
		invoiceNumber: 1075,
		invoiceAmount: '175',
		amountDue: '50',
		status: 'Paid',
		filename: '34636120180715308258.pdf',
		published: true,
		transactions: [
			{
				invoiceId: '308258',
				customerId: '346361',
				invoiceNumber: '1075',
				amount: '$50.00',
				outstandingBalance: '$50.00',
				effectiveDate: '2018-12-15 05:00:00',
				description: 'Credit',
				invoiceTotal: '$175.00',
				uri: 'https://stg-secure.fusebill.com/v1/invoices/308258',
				transactionId: '53653000',
			},
			{
				invoiceId: '308258',
				customerId: '346361',
				invoiceNumber: '1075',
				amount: '$75.00',
				outstandingBalance: '$50.00',
				effectiveDate: '2018-12-15 05:00:00',
				description: 'Outstanding Balance',
				invoiceTotal: '$175.00',
				uri: 'https://stg-secure.fusebill.com/v1/invoices/308258',
				transactionId: '50813204',
			},
		],
	},
];

export const ACCORDIAN_DATA = [
	{
		key: 1,
		status: 'PAID',
		Sent: 'One',
		Invoice: 'Two',
		'Invoice Amount': 'Three',
		Due: 'Four',
		Balance: 'Balance',
		details: [
			{
				'1': '12/02/2018',
				'2': 'Payment Received',
				'3': '175.00',
			},
			{
				'1': '11/10/2018',
				'2': 'Adjustment',
				'3': '5.00',
			},
			{
				'1': '11/08/2018',
				'2': 'Credit',
				'3': '10.00',
			},
			{
				'1': '11/01/2018',
				'2': 'Outstanding Balance',
				'3': '0.00',
			},
		],
	},
	{
		key: 2,
		status: 'UNPAID',
		Sent: 'One',
		Invoice: 'Two',
		'Invoice Amount': 'Three',
		Due: 'Four',
		Balance: 'Balance',
		details: [
			{
				'1': '12/02/2018',
				'2': 'Payment Received',
				'3': '175.00',
			},
			{
				'1': '11/10/2018',
				'2': 'Adjustment',
				'3': '5.00',
			},
			{
				'1': '11/08/2018',
				'2': 'Credit',
				'3': '10.00',
			},
			{
				'1': '11/01/2018',
				'2': 'Outstanding Balance',
				'3': '0.00',
			},
		],
	},
	{
		key: 3,
		status: 'UNPAID',
		Sent: 'One',
		Invoice: 'Two',
		'Invoice Amount': 'Three',
		Due: 'Four',
		Balance: 'Balance',
		details: [
			{
				'1': '12/02/2018',
				'2': 'Payment Received',
				'3': '175.00',
			},
			{
				'1': '11/10/2018',
				'2': 'Adjustment',
				'3': '5.00',
			},
			{
				'1': '11/08/2018',
				'2': 'Credit',
				'3': '10.00',
			},
			{
				'1': '11/01/2018',
				'2': 'Outstanding Balance',
				'3': '0.00',
			},
		],
	},
	// {
	//   key: 4,
	//   status: 'UNPAID',
	//   'Sent': "One",
	//   'Invoice': "Two",
	//   'Invoice Amount': "Three",
	//   'Due': "Four",
	//   "Balance": 'Balance',
	//   details: [
	//     {
	//       '1': '12/02/2018',
	//       '2': 'Payment Received',
	//       '3': '175.00'
	//     },
	//     {
	//       '1': '11/10/2018',
	//       '2': 'Adjustment',
	//       '3': '5.00'
	//     },
	//     {
	//       '1': '11/08/2018',
	//       '2': 'Credit',
	//       '3': '10.00'
	//     },
	//     {
	//       '1': '11/01/2018',
	//       '2': 'Outstanding Balance',
	//       '3': '0.00'
	//     }
	//   ]
	// },
];
