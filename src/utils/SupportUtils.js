import { TYPES, SEVERITIES, WIZARD_TITLE_PREFIXES } from 'utils/TicketConstants';
import { UserProfileApi } from 'services/userProfile';

export function formatSupportTicket(
	params,
	type,
	auth_status,
	createDescription,
	company_info,
	browser_info,
) {
	const what = params['1'];
	const who = type === 'Remote Hands' ? params['3'] : params['2'];
	const when = type === 'Remote Hands' ? params['2'] : params['3'];
	const user_id = auth_status.user.id;
	const customer_id = company_info.fuseBillId;
	let description = '';
	let files = [];
	const titlePrefix =
		type === 'Remote Hands' ? WIZARD_TITLE_PREFIXES.REMOTEHANDS : WIZARD_TITLE_PREFIXES.GUESTACCESS;
	const title = `${titlePrefix} - ${what.data.title || 'No Custom Title'}`;
	const userProfile = new UserProfileApi();
	if (createDescription) {
		description = createDescription(what, when, who);
	}

	const { data: { attachments } = {} } = what;
	if (attachments && attachments.length > 0) {
		files = attachments.map(attachment => attachment.data_id);
	}

	const ticket = {
		requester: userProfile.getFirstAndLastName(auth_status),
		requestor_id: 0,
		public_request: null,
		status: 'NEW',
		title,
		description,
		priority: SEVERITIES.MEDIUM,
		internal_priority: '',
		type,
		request_type: '',
		request_method: '',
		process_id: 0,
		customer_id,
		user_id: auth_status.user.id,
		jira_ticket: '',
		location: '',
		impact_to_customer: '',
		impact_to_dcblox: '',
		resolution_notes: '',
		general_support_question_type: '',
		general_support_question: '',
		general_support_equipment: '',
		feedback_type: '',
		feedback_jira_ticket: '',
		feedback_browser_data: browser_info,
		billing_detail: [],
		outage_details: [],
		related_tickets: [],
		assignes: [],
		request_log: [],
		comments: [],
		attachments: [],
		notifications: [],
		related_services: [],
		test_results: [],
		files,
	};

	return ticket;
}

export const getTitlePlaceholder = (requestType, tickets) => {
	if (
		!tickets ||
		(requestType !== WIZARD_TITLE_PREFIXES.REMOTEHANDS &&
			requestType !== WIZARD_TITLE_PREFIXES.GUESTACCESS)
	) {
		return '';
	}

	const titleRegex = new RegExp(`^${requestType}`);
	const matchingTickets = tickets.filter(ticket => ticket.name.match(titleRegex));

	return `${requestType} ${matchingTickets.length + 1}`;
};

export const getRemoteHandsTickets = tickets =>
	tickets.filter(ticket => ticket.name.match(/Remote Hands Request/));

export const getGuestAccessTickets = tickets =>
	tickets.filter(ticket => ticket.name.match(/Guest Access Request/));
