import { TYPES, SEVERITIES, WIZARD_TITLE_PREFIXES } from '../TicketConstants';
import { UserProfileApi } from '../../../services/userProfile';

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

	if (createDescription) {
		description = createDescription(what, when, who);
	}

	const { data: { attachments } = {} } = what;
	if (attachments && attachments.length > 0) {
		files = attachments.map(attachment => attachment.data_id);
	}

	return {
		title,
		status: 'NEW',
		requestor: UserProfileApi.getFirstAndLastName(auth_status),
		priority: SEVERITIES.MEDIUM,
		type,
		description,
		files,
		dateSubmitted: Date.now(),
		user_id,
		customer_id,
		feedback_browser_data: browser_info,
		feedback_type: '',
	};
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
