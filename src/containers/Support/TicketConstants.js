const CDN_URL = process.env.REACT_APP_CDN_URL;

const BLANK_BILLING_OPTION = `${CDN_URL}support/Support_CreateTicket_BILLING_Option_Icon_blank_190x190.png`;
const BLANK_BILLING_SELECT = `${CDN_URL}support/Support_CreateTicket_BILLING_Icon_blank_190x190.png`;
const BLANK_OUTAGE_OPTION = `${CDN_URL}support/Support_CreateTicket_OUTAGE_Option_Icon_blank_190x190.png`;
const BLANK_OUTAGE_SELECT = `${CDN_URL}support/Support_CreateTicket_OUTAGE_Select_Icon_blank_190x190.png`;
const BLANK_SUPPORT_OPTION = `${CDN_URL}support/Support_CreateTicket_SUPPORT_Option_Icon_blank_190x190.png`;
const BLANK_SUPPORT_SELECT = `${CDN_URL}support/Support_CreateTicket_SUPPORT_Select_Icon_blank_190x190.png`;
const BLANK_STORAGE_OPTION = `${CDN_URL}support/Support_CreateTicket_STORAGE_Option_Icon_blank_190x190.png`;
const BLANK_STORAGE_SELECT = `${CDN_URL}support/Support_CreateTicket_STORAGE_Select_Icon_blank_190x190.png`;

const BILLING_OPTION = `${CDN_URL}support/Support_CreateTicket_Support_Icon.svg`;
const BILLING_SELECT = `${CDN_URL}support/Support_CreateTicket_Billing_Icon.svg`;
const OUTAGE_OPTION = `${CDN_URL}support/Support_CreateTicket_Outage_Icon.svg`;
const OUTAGE_SELECT = `${CDN_URL}support/Support_CreateTicket_Outage_Icon.svg`;
const SUPPORT_OPTION = `${CDN_URL}support/Support_CreateTicket_Support_Icon.svg`;
const SUPPORT_SELECT = `${CDN_URL}support/Support_CreateTicket_Support_Icon.svg`;
const STORAGE_OPTION = `${CDN_URL}storage/storageCreate.png`;
const STORAGE_SELECT = `${CDN_URL}storage/storageSelect.png`;

const BILLING_TICKET_CREATE = `${CDN_URL}common/tickets/icons-billing-ticket-hover@3x.png`;
const SUPPORT_TICKET_CREATE = `${CDN_URL}common/tickets/icons-support-ticket-hover@3x.png`;
const OUTAGE_TICKET_CREATE = `${CDN_URL}common/tickets/icons-outage-ticket-hover@3x.png`;

const REMOTEHANDS_TICKET = `${CDN_URL}common/tickets/icon-remote-hands-small.svg`;
const REMOTE_HANDS_HOVER = `${CDN_URL}common/tickets/icon-remote-hands-ticket-hover.png`;
const GUESTACCESS_TICKET = `${CDN_URL}common/tickets/icon-guest-access.svg`;
const GUEST_ACCESS_HOVER = `${CDN_URL}common/tickets/icon-guest-access-ticket-hover.png`;
const BILLING_TICKET = `${CDN_URL}common/tickets/icons-billing.svg`;
const SUPPORT_TICKET = `${CDN_URL}common/tickets/icons-support.svg`;
const OUTAGE_TICKET = `${CDN_URL}common/tickets/icons-outage.svg`;
const STORAGE_TICKET = `${CDN_URL}common/tickets/icon-storage-small.svg`;
const STORAGE_TICKET_HOVER = `${CDN_URL}common/tickets/icons-storage-ticket-hover.svg`;
const SUPPORT_TICKET_HOVER = `${CDN_URL}common/tickets/icons-support-ticket-hover.png`;
const BILLING_TICKET_HOVER = `${CDN_URL}common/tickets/icons-billing-ticket-hover.png`;
const OUTAGE_TICKET_HOVER = `${CDN_URL}common/tickets/icons-outage-ticket-hover.png`;

const REMOTE_HANDS_SUMMARY = `${CDN_URL}common/tickets/remote-hands.svg`;
const OUTAGE_SUMMARY = `${CDN_URL}common/tickets/outage-summary.svg`;
const SUPPORT_SUMMARY = `${CDN_URL}common/tickets/support-summary.svg`;
const BILLING_SUMMARY = `${CDN_URL}common/tickets/billing-summary.svg`;
const GUEST_ACCESS_SUMMARY = `${CDN_URL}common/tickets/guest-access-summary.svg`;
const STORAGE_SUMMARY = `${CDN_URL}common/tickets/storage-summary.svg`;

export const MENU = {
	OVERVIEW: 'OVERVIEW',
	TICKET_HISTORY: 'TICKET HISTORY',
	REMOTEHANDS: 'REMOTE HANDS',
	GUESTACCESS: 'GUEST ACCESS',
	CREATETICKET: 'CREATE TICKET',
};

export const CONFIRMATION = {
	TITLE: 'THANK YOU',
	MESSAGE: 'Your ticket has been created. Please allow 24-48 hours for us to review your request.',
};

export const STEPS = {
	TICKET_TYPE: 'ticketType',
	TICKET_SEVERITY: 'ticketSeverity',
	TICKET_DESCRIPTION: 'ticketDescription',
	TICKET_SUBMIT: 'ticketSubmit',
	TICKET_FINALIZED: 'ticketFinalized',
	TICKET_SUBMITTED: 'ticketSubmitted',
};

export const SUMMARY = {
	BILLING: BILLING_SUMMARY,
	OUTAGE: OUTAGE_SUMMARY,
	SUPPORT: SUPPORT_SUMMARY,
	STORAGE: STORAGE_SUMMARY,
	REMOTEHANDS: REMOTE_HANDS_SUMMARY,
	GUESTACCESS: GUEST_ACCESS_SUMMARY,
};

export const TicketHistoryFiltering = [
	{ value: 'Any' },
	{ value: 'General' },
	{ value: 'Billing' },
	{ value: 'Outage' },
	// {  value: 'Remote Hands' },
	{ value: 'Storage' },
];
export const TicketHistorySorting = [
	{ value: 'Any' },
	{ value: 'Open' },
	{ value: 'Closed' },
	{ value: 'Escalated' },
	// {  value: 'Cancelled' },
];

export const TYPES = {
	BILLING: 'BILLING',
	OUTAGE: 'OUTAGE',
	SUPPORT: 'SUPPORT',
	STORAGE: 'STORAGE',
	REMOTEHANDS: 'REMOTEHANDS',
	GUESTACCESS: 'GUESTACCESS',
	BUG: 'BUG',
	FEATURE: 'FEATURE',
	IMPROVEMENT: 'IMPROVEMENT',
	OTHER: 'OTHER',
};

export const SEVERITIES = {
	LOW: 'LOW',
	MEDIUM: 'MEDIUM',
	HIGH: 'HIGH',
	URGENT: 'URGENT',
};

export const TICKET_ICONS = {
	[TYPES.BILLING]: BILLING_TICKET,
	[TYPES.OUTAGE]: OUTAGE_TICKET,
	[TYPES.SUPPORT]: SUPPORT_TICKET,
	[TYPES.STORAGE]: STORAGE_TICKET,
	[TYPES.REMOTEHANDS]: REMOTEHANDS_TICKET,
	[TYPES.GUESTACCESS]: GUESTACCESS_TICKET,
	STORAGE_TICKET_HOVER,
	SUPPPORT_TICKET_HOVER: SUPPORT_TICKET_HOVER,
	OUTAGE_TICKET_HOVER,
	BILLING_TICKET_HOVER,
	REMOTE_HANDS_SELECT: REMOTE_HANDS_HOVER,
	GUEST_ACCESS_SELECT: GUEST_ACCESS_HOVER,
};

export const TICKET_CREATE_ICONS = {
	[TYPES.BILLING]: BILLING_TICKET_CREATE,
	[TYPES.OUTAGE]: OUTAGE_TICKET_CREATE,
	[TYPES.SUPPORT]: SUPPORT_TICKET_CREATE,
};

export const ICONS = {
	[TYPES.BILLING]: SUPPORT_OPTION,
	[TYPES.OUTAGE]: OUTAGE_OPTION,
	[TYPES.SUPPORT]: BILLING_OPTION,
	[TYPES.STORAGE]: STORAGE_OPTION,
	BILLING_SELECT,
	OUTAGE_SELECT,
	SUPPORT_SELECT,
	STORAGE_SELECT,
};

export const BLANK_ICONS = {
	[TYPES.BILLING]: BLANK_BILLING_OPTION,
	[TYPES.OUTAGE]: BLANK_OUTAGE_OPTION,
	[TYPES.SUPPORT]: BLANK_SUPPORT_OPTION,
	[TYPES.STORAGE]: BLANK_STORAGE_OPTION,
	BILLING_SELECT: BLANK_BILLING_SELECT,
	OUTAGE_SELECT: BLANK_OUTAGE_SELECT,
	SUPPORT_SELECT: BLANK_SUPPORT_SELECT,
	STORAGE_SELECT: BLANK_STORAGE_SELECT,
};

export const STATUS = {
	NEW: 'New',
	OPEN: 'Open',
	PENDING: 'Pending',
	ONHOLD: 'On-Hold',
	SOLVED: 'Solved',
	RESOLVED: 'Resolved',
};

export const TICKET_LIST_TYPE = {
	OPEN: 'open',
	CLOSED: 'closed',
};

export const TICKET_LIST_CYCLE_DIRECTION = {
	NEXT: 'next',
	PREV: 'prev',
};

export const TICKET_ATTACHMENT_PHASE = {
	NOT_STARTED: 'NOT_STARTED',
	IN_PROGRESS: 'IN_PROGRESS',
	TICKET_REQUESTED: 'TICKET_REQUESTED',
	TICKET_SUBMITTED: 'TICKET_SUBMITTED',
};

/**
 * Message Text appearing on middle Portal section
 */
export const MESSAGE_TEXT = {
	[TYPES.BILLING]: {
		START: 'Too much or too little? ',
		CONTENT: `We'll be happy to help with your billing discrepancy.`,
	},
	[TYPES.OUTAGE]: {
		START: 'Ouch! ',
		CONTENT: `We hate when that happens. Let us know what's down.`,
	},
	[TYPES.SUPPORT]: {
		START: 'Need support? ',
		CONTENT: `That's why we're here. How can we help?`,
	},
	[TYPES.STORAGE]: {
		START: 'Need to remove some storage?',
		CONTENT: `The storage you currently have is listed below. Feel free to look around and get a good understanding of what you have. If you feel like you no longer need a some storage, select the one you want to remove from the list below and we'll handle the rest.`,
	},
};

export const TICKET_TYPE_MESSAGE_TEXT = {
	START: "Sorry you're having an issue. ",
	CONTENT: `But we're here to help. To create a ticket, select one of the categories below:`,
};

export const TICKET_PRIORITY_MESSAGE_TEXT = {
	START: 'Got it! ',
	CONTENT: 'How bad is it?',
};

export const TICKET_DESCRIPTION_MESSAGE_TEXT = {
	START: `Sorry you're having an issue. `,
	CONTENT: `But we're here to help. To create a ticket, select one of the categories below:`,
};

export const HISTORY_MESSAGE_TEXT = {
	START: 'Ticket history? ',
	CONTENT:
		"Let's take a look. Select the OPEN Ticket you wish to review or visit the PAST Tickets section below for Closed Tickets History.",
};

export const WIZARD_TITLE_PREFIXES = {
	REMOTEHANDS: 'Remote Hands Request',
	GUESTACCESS: 'Guest Access Request',
};

export const SUPPORT_OVERVIEW_GRID = {
	xs: [
		{ i: 'open-count', x: 1, y: 3, w: 2, h: 6, static: true },
		{ i: 'close-count', x: 3, y: 3, w: 2, h: 6, static: true },
		{ i: 'ticket-status', x: 1, y: 0.5, w: 3, h: 1.2, static: true },
		{ i: 'remote-hands', x: 7, y: 15, w: 3, h: 7, static: true, minH: 22, maxH: 12 },
		{ i: 'guest-access', x: 7, y: 26, w: 3, h: 7, static: true },
		{ i: 'issue-request', x: 1, y: 13, w: 5, h: 1, static: true },
		{ i: 'billing', x: 1, y: 15, w: 2, h: 6, static: true },
		{ i: 'outage', x: 4, y: 15, w: 2, h: 6, static: true },
		{ i: 'support', x: 1, y: 26, w: 2, h: 6, static: true },
		{ i: 'horizontal-bar', x: 0, y: 11, w: 10, h: 1, static: true },
		{ i: 'service-request', x: 7, y: 13, w: 5, h: 1.2, static: true },
	],
	sm: [
		{ i: 'open-count', x: 1, y: 3, w: 2, h: 7, static: true },
		{ i: 'close-count', x: 3, y: 3, w: 2, h: 7, static: true },
		{ i: 'ticket-status', x: 1, y: 1.2, w: 3, h: 1.2, static: true },
		{ i: 'remote-hands', x: 6, y: 15, w: 3, h: 12, maxW: 3, minH: 10, static: true },
		{ i: 'guest-access', x: 6, y: 28, w: 3, h: 12, maxW: 3, static: true },
		{ i: 'issue-request', x: 1, y: 13, w: 3, h: 1, static: true },
		{ i: 'billing', x: 1, y: 15, w: 2, h: 8, static: true },
		{ i: 'outage', x: 3, y: 15, w: 2, h: 8, static: true },
		{ i: 'support', x: 1, y: 24, w: 2, h: 8, static: true },
		{ i: 'horizontal-bar', x: 0, y: 11, w: 10, h: 1, static: true },
		{ i: 'service-request', x: 6, y: 13, w: 3, h: 1.2, static: true },
	],
	md: [
		{ i: 'open-count', x: 1, y: 3, w: 2, h: 7, static: true },
		{ i: 'close-count', x: 3, y: 3, w: 2, h: 7, static: true },
		{ i: 'ticket-status', x: 1, y: 1.2, w: 3, h: 1.2, static: true },
		{ i: 'remote-hands', x: 6, y: 15, w: 3, h: 12, maxW: 3, minH: 10, static: true },
		{ i: 'guest-access', x: 6, y: 28, w: 3, h: 12, maxW: 3, static: true },
		{ i: 'issue-request', x: 1, y: 13, w: 3, h: 1, static: true },
		{ i: 'billing', x: 1, y: 15, w: 2, h: 8, static: true },
		{ i: 'outage', x: 3, y: 15, w: 2, h: 8, static: true },
		{ i: 'support', x: 1, y: 24, w: 2, h: 8, static: true },
		{ i: 'horizontal-bar', x: 0, y: 11, w: 10, h: 1, static: true },
		{ i: 'service-request', x: 6, y: 13, w: 3, h: 1.2, static: true },
		// { i: 'open-count', x: 1, y: 4, w: 2, h: 6, static: true },
		// { i: 'close-count', x: 3, y: 4, w: 2, h: 6, static: true },
		// { i: 'ticket-status', x: 1, y: 1, w: 3, h: 1.2, static: true },
		// { i: 'remote-hands', x: 6, y: 14, w: 3, h: 12, maxH: 12, static: true },
		// { i: 'guest-access', x: 6, y: 27, w: 3, h: 12, maxH: 12, static: true },
		// { i: 'issue-request', x: 1, y: 12, w: 3, h: 1, static: true },
		// { i: 'billing', x: 1, y: 14, w: 2, h: 8, static: true },
		// { i: 'outage', x: 3, y: 14, w: 2, h: 8, static: true },
		// { i: 'horizontal-bar', x: 0, y: 10, w: 10, h: 1, static: true },
		// { i: 'support', x: 1, y: 23, w: 2, h: 8, static: true },
		// { i: 'service-request', x: 6, y: 12, w: 3, h: 1.2, static: true },
	],
	lg: [
		{ i: 'open-count', x: 1, y: 3, w: 2, h: 7, static: true },
		{ i: 'close-count', x: 3, y: 3, w: 2, h: 7, static: true },
		{ i: 'ticket-status', x: 1, y: 1.2, w: 3, h: 1.2, static: true },
		{ i: 'remote-hands', x: 6, y: 15, w: 3, h: 12, maxW: 3, minH: 10, static: true },
		{ i: 'guest-access', x: 6, y: 28, w: 3, h: 12, maxW: 3, static: true },
		{ i: 'issue-request', x: 1, y: 13, w: 3, h: 1, static: true },
		{ i: 'billing', x: 1, y: 15, w: 2, h: 8, static: true },
		{ i: 'outage', x: 3, y: 15, w: 2, h: 8, static: true },
		{ i: 'support', x: 1, y: 24, w: 2, h: 8, static: true },
		{ i: 'horizontal-bar', x: 0, y: 11, w: 10, h: 1, static: true },
		{ i: 'service-request', x: 6, y: 13, w: 3, h: 1.2, static: true },
		// { i: 'open-count', x: 1, y: 4, w: 2, h: 6, static: true },
		// { i: 'close-count', x: 3, y: 4, w: 2, h: 6, static: true },
		// { i: 'ticket-status', x: 1, y: 1, w: 3, h: 1.2, static: true },
		// { i: 'remote-hands', x: 6, y: 14, w: 3, h: 12, maxW: 3, minH: 10, static: true },
		// { i: 'guest-access', x: 6, y: 27, w: 3, h: 12, maxW: 3, static: true },
		// { i: 'issue-request', x: 1, y: 12, w: 3, h: 1, static: true },
		// { i: 'billing', x: 1, y: 14, w: 2, h: 8, static: true },
		// { i: 'outage', x: 3, y: 14, w: 2, h: 8, static: true },
		// { i: 'support', x: 1, y: 23, w: 2, h: 8, static: true },
		// { i: 'horizontal-bar', x: 0, y: 10, w: 10, h: 1, static: true },
		// { i: 'service-request', x: 6, y: 12, w: 3, h: 1.2, static: true },
	],
};
