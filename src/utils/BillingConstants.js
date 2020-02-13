import {
	AmexCardIcon,
	VisaCardIcon,
	MastercardCardIcon,
} from './../sub_components/Billing/CardTypeIcons';
const CDN_URL = process.env.REACT_APP_CDN_URL;

const Billing_Due_Icon = `${CDN_URL}billing/Billing_Due_Icon.svg`;
const Billing_Past_Due_Icon = `${CDN_URL}billing/Billing_Past_Due_Icon.svg`;
const Billing_Paid_Icon = `${CDN_URL}billing/Billing_Paid_Icon.svg`;

export const ICON_TYPES = {
	PAID: 'PAID',
	DUE: 'DUE',
	PAST_DUE: 'PAST_DUE',
};

export const INVOICE_STATUS = {
	PAID: 'Paid',
	DUE: 'Due',
	PAST_DUE: 'Overdue',
};

export const ICONS = {
	[ICON_TYPES.DUE]: Billing_Due_Icon,
	[ICON_TYPES.PAST_DUE]: Billing_Past_Due_Icon,
	[ICON_TYPES.PAID]: Billing_Paid_Icon,
};

export const INVOICE_ICONS = {
	[INVOICE_STATUS.DUE]: Billing_Due_Icon,
	[INVOICE_STATUS.PAST_DUE]: Billing_Past_Due_Icon,
	[INVOICE_STATUS.PAID]: Billing_Paid_Icon,
};

export const MENU = {
	OVERVIEW: 'OVERVIEW',
	INVOICES: 'CURRENT INVOICES',
	HISTORY: 'INVOICE HISTORY',
	PAYMENT: 'MAKE A PAYMENT',
};

export const INVOICE_CYCLE_DIRECTION = {
	NEXT: 'NEXT',
	PREVIOUS: 'PREV',
};

export const INVOICE_LIST_TYPE = {
	CURRENT: 'CURRENT',
	PAID: 'PAID',
};
export const billingHistorySortingNew = [
	{ value: 'Invoice Date' },
	{ value: 'Due Date ' },
	{ value: 'Invoice #' },
];
export const billingHistorySorting = [
	{ value: 'Invoice Date (Asc)' },
	{ value: 'Invoice Date (Des)' },
	{ value: 'Due Date (Asc)' },
	{ value: 'Due Date (Des)' },
	{ value: 'Invoice # (Asc)' },
	{ value: 'Invoice # (Des)' },
];

export const INVOICES_AT_A_TIME = 2;

export const BILLING_MESSAGE_TEXT = {
	START: 'Want to see your invoices? ',
	CONTENT: 'You can view, download or check the status of any invoice.',
};

export const INVOICE_SUMMARY_HEADERS = {
	invoiceNumber: 'Invoice',
	billcycle: 'Sent',
	invoiceAmount: 'Total',
	dueDate: 'Due',
	amountDue: 'Balance',
};

export const INVOICE_DETAIL_HEADERS = {
	effectiveDate: 'Date',
	description: 'Description',
	amount: 'Amount',
};

export const CARD_TYPE_ICON = {
	'american-express': AmexCardIcon,
	visa: VisaCardIcon,
	'master-card': MastercardCardIcon,
};

export const Tickets = {
	tickets: [
		{
			id: '7011',
			name: 'Test Title',
			description: 'Hello World Hello World Hello World Hello World  Hello World Hello World  ',
			startDate: '2018-10-24T12:54:51.602',
			endDate: '2018-10-24T12:54:21.602',
			stateId: '1',
			lastUpdate: '2018-10-24T12:54:21.602',
			status: 'closed',
			type: 'STORAGE',
			firstname: 'Bryce',
			lastname: 'Stock',
			username: 'bryce.stock',
			priority: null,
		},
		{
			id: '7012',
			name: 'Test Title',
			description: 'IrtyrtrJBJBJBNKJNKDNALKSNDLKNASLKNDLKSANKLDNLKASNDLKNSLKANDL ',
			startDate: '2018-10-24T12:54:21.602',
			endDate: '2018-10-24T12:54:21.602',
			stateId: '1',
			lastUpdate: '2018-10-24T12:54:21.602',
			status: 'cancelled',
			type: 'Billing',
			firstname: 'Bryce',
			lastname: 'Stock',
			username: 'bryce.stock',
			priority: null,
		},
		{
			id: '7012',
			name: 'Test Title',
			description:
				'Welcome to remote hands Welcome to Remote Hands  welcome to remote hands Welcome to Remote Hands Welcome to Remote Hands',
			startDate: '2018-10-24T12:54:21.602',
			endDate: '2018-10-24T12:54:21.602',
			stateId: '1',
			lastUpdate: '2018-10-24T12:54:21.602',
			status: 'open',
			type: 'Remote Hands',
			firstname: 'Bryce',
			lastname: 'Stock',
			username: 'bryce.stock',
			priority: null,
		},
		{
			id: '7012',
			name: 'Test Title',
			description:
				'This is Guest Access This is Guest AccessThis is Guest Access   This is Guest AccessThis is Guest AccessThis is Guest Access ',
			startDate: '2018-10-24T12:54:21.602',
			endDate: '2018-10-24T12:54:21.602',
			stateId: '1',
			lastUpdate: '2018-10-24T12:54:21.602',
			status: 'escalated',
			type: 'Guest Access',
			firstname: 'Bryce',
			lastname: 'Stock',
			username: 'bryce.stock',
			priority: null,
		},
	],
	error: null,
};

export const LAYOUT_GRID = {
	xs: [
		{ i: 'total-amount-due-label', x: 1, y: 1, w: 3, h: 1.5, static: true },
		{ i: 'ticket-status-label', x: 6, y: 1, w: 3, h: 1.5, static: true },
		{ i: 'total-amount-due', x: 1, y: 4, w: 5, h: 9, static: true },
		{ i: 'open-ticket', x: 6, y: 4, w: 2, h: 7, static: true },
		{ i: 'close-ticket', x: 8, y: 4, w: 2, h: 7, static: true },
		{ i: 'recent-invoice-label', x: 1, y: 17, w: 2, h: 1.5, static: true },
		{ i: 'horizontal-bar', x: 0, y: 15, w: 10, h: 1, static: true },
		{ i: 'recent-invoices', x: 1, y: 18, w: 5, h: 14, static: true },
		{ i: 'recent-payment-label', x: 6, y: 17, w: 4, h: 1.5, static: true },
		{ i: 'recent-payment', x: 6, y: 18, w: 2, h: 9, static: true },
	],
	sm: [
		{ i: 'total-amount-due-label', x: 1, y: 1, w: 3, h: 1.5, static: true },
		{ i: 'ticket-status-label', x: 6, y: 1, w: 3, h: 1.5, static: true },
		{ i: 'total-amount-due', x: 1, y: 4, w: 5, h: 9, static: true },
		{ i: 'open-ticket', x: 6, y: 4, w: 2, h: 7, static: true },
		{ i: 'close-ticket', x: 8, y: 4, w: 2, h: 7, static: true },
		{ i: 'recent-invoice-label', x: 1, y: 17, w: 2, h: 1.5, static: true },
		{ i: 'horizontal-bar', x: 0, y: 15, w: 10, h: 1, static: true },
		{ i: 'recent-invoices', x: 1, y: 18, w: 5, h: 14, static: true },
		{ i: 'recent-payment-label', x: 6, y: 17, w: 4, h: 1.5, static: true },
		{ i: 'recent-payment', x: 6, y: 18, w: 2, h: 9, static: true },
	],
	md: [
		{ i: 'total-amount-due-label', x: 1, y: 1, w: 3, h: 1.5, static: true },
		{ i: 'ticket-status-label', x: 6, y: 1, w: 3, h: 1.5, static: true },
		{ i: 'total-amount-due', x: 1, y: 4, w: 5, h: 9, static: true },
		{ i: 'open-ticket', x: 6, y: 4, w: 2, h: 7, static: true },
		{ i: 'close-ticket', x: 8, y: 4, w: 2, h: 7, static: true },
		{ i: 'recent-invoice-label', x: 1, y: 17, w: 2, h: 1.5, static: true },
		{ i: 'horizontal-bar', x: 0, y: 15, w: 10, h: 1, static: true },
		{ i: 'recent-invoices', x: 1, y: 18, w: 5, h: 14, static: true },
		{ i: 'recent-payment-label', x: 6, y: 17, w: 4, h: 1.5, static: true },
		{ i: 'recent-payment', x: 6, y: 18, w: 2, h: 9, static: true },
	],
	lg: [
		{ i: 'total-amount-due-label', x: 1, y: 1, w: 3, h: 1.5, static: true },
		{ i: 'ticket-status-label', x: 6, y: 1, w: 3, h: 1.5, static: true },
		{ i: 'total-amount-due', x: 1, y: 4, w: 5, h: 9, static: true },
		{ i: 'recent-invoice-label', x: 1, y: 17, w: 2, h: 1.5, static: true },
		{ i: 'horizontal-bar', x: 0, y: 15, w: 10, h: 1, static: true },
		{ i: 'recent-invoices', x: 1, y: 18, w: 5, h: 14, static: true },
		{ i: 'recent-payment-label', x: 6, y: 17, w: 4, h: 1.5, static: true },
		{ i: 'recent-payment', x: 6, y: 18, w: 2, h: 9, static: true },
		{ i: 'open-ticket', x: 6, y: 4, w: 2, h: 7, static: true },
		{ i: 'close-ticket', x: 8, y: 4, w: 2, h: 7, static: true },
	],
};
