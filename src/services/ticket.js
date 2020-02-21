import axios from 'axios';
import moment from 'moment';

import { Utils } from 'services/utils';

const CDN_URL = process.env.REACT_APP_CDN_URL;
const ChattanoogaIcon = `${CDN_URL}support/Chattanooga-icon-building.svg`;
const AtlantaIcon = `${CDN_URL}support/Atlanta-icon-building.svg`;
const HuntsvilleIcon = `${CDN_URL}support/Huntsville-icon-building.svg`;
const BirminghamIcon = `${CDN_URL}support/Birmingham-icon-building.svg`;
const ChattanoogaBuilding = `${CDN_URL}profile/images-chattanooga-building.svg`;
const AtlantaBuilding = `${CDN_URL}profile/images-atlanta-building.svg`;
const HuntsvilleBuilding = `${CDN_URL}profile/huntsville-building-modal.svg`;
const BirminghamBuilding = `${CDN_URL}profile/BIRMINGHAMBuilding.svg`;

const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const config = {
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
	},
};

const EMAIL_SERVICE_URL = 'https://test.mydcblox.com/support-emailer/';

export class TicketApi {
	static remoteHandsEmailRequest = params => {
		return axios.post(EMAIL_SERVICE_URL, params, config);
	};

	static createTicket(params) {
		const url = `${BASE_URL}/ticket/`;
		params.type = params.type.charAt(0).toUpperCase() + params.type.slice(1).toLowerCase();
		params.priority =
			params.priority.charAt(0).toUpperCase() + params.priority.slice(1).toLowerCase();

		return axios.post(url, params, config);
	}

	static updateTicket(params) {
		const url = `${BASE_URL}/ticket/`;

		return axios.put(url, params, config);
	}

	static testUpdateTicket() {
		return new Promise(resolve => {
			setTimeout(() => {
				const data = {
					status: 200,
					data: {
						error: null,
					},
				};
				resolve(data);
			}, 2000);
		});
	}

	static getIcon = params => {
		if (params.data.location === 'Atlanta') {
			return AtlantaIcon;
		} else if (params.data.location === 'Chattanooga') {
			return ChattanoogaIcon;
		} else if (params.data.location === 'Birmingham') {
			return BirminghamIcon;
		} else {
			return HuntsvilleIcon;
		}
	};

	static getSmallBuildingIcons = location => {
		if (location === 'Atlanta') {
			return AtlantaBuilding;
		} else if (location === 'Chattanooga') {
			return ChattanoogaBuilding;
		} else if (location === 'Huntsville') {
			return HuntsvilleBuilding;
		} else {
			return BirminghamBuilding;
		}
	};

	static getTicket(caseId) {
		if (!caseId) return null;

		const url = `${BASE_URL}/ticket/${caseId}`;

		return axios.get(url, config);
	}

	static async getAll() {
		const url = `${BASE_URL}/ticket/`;
		const response = await axios.get(url, config);
		if (Utils.isValidResponse(response)) {
			const { tickets } = response.data;
			return { tickets, errors: null };
		}

		const { error } = response.data;
		return { tickets: null, error };
	}

	// static getAll() {
	// 	const url = `${BASE_URL}/ticket/`;

	// 	return axios.get(url, config);
	// }

	static constructTicket(finalizedTicket, auth_status) {
		const {
			user: { firstname, lastname },
		} = auth_status;
		let ticket = null;

		if (!finalizedTicket) {
			ticket = {
				id: '10003',
				title: 'Ticket Title',
				status: 'Open',
				requestor: 'Brandon',
				priority: 'NORMAL',
				type: 'SUPPORT',
				description: 'This is the ticket description',
				dateSubmitted: 'Oct 4, 2018 | 11:00 AM',
			};
		} else {
			ticket = {
				id: finalizedTicket.caseId || '',
				title: finalizedTicket.title,
				status: 'Open',
				username: `${firstname} ${lastname}`,
				priority: finalizedTicket.priority,
				type: finalizedTicket.type,
				description: finalizedTicket.description,
				startDate: finalizedTicket.startDate,
			};
		}

		return ticket;
	}

	static extractComments(data) {
		if (!data || !data.ticketDetails || !data.ticketDetails.notes) {
			return [];
		}

		const { ticketDetails } = data;
		const { notes } = ticketDetails;

		return notes.map(note => {
			const regex = /^(.*)?-(.*)?-?(.*)?$/;
			let time;
			let comment;

			if (note.match(regex)) {
				time = note.match(regex)[1];
				time = time.split('-')[0];
				comment = note.match(regex)[2];
			}

			return {
				id: ticketDetails.context.caseid,
				user: ticketDetails.supportRequest.requester,
				time,
				comment,
			};
		});
	}

	static formatDate(date) {
		const formattedDate = new Date(date);

		return `
            ${formattedDate.getMonth() +
							1}/${formattedDate.getDate()}/${formattedDate.getFullYear()}
        `;
	}

	static formatDateOnTicket(date) {
		const formattedDate = new Date(date);

		return `
            ${formattedDate.getMonth() +
							1}.${formattedDate.getDate()}.${formattedDate.getFullYear()}
    
        `;
	}

	static getFormattedDateString(date) {
		// const formattedDate = moment(date + 'Z');
		const formattedDate = moment(date);

		if (formattedDate.isValid()) {
			return formattedDate.format('LT');
		} else {
			return ' -- ';
		}
	}

	static getFormattedMonthDayYear(date) {
		const newDate = moment(date).format('MMMM Do YYYY');

		return newDate;
	}

	static getFormattedMonth(date) {
		let formattedDate = moment(date);

		try {
			if (date.substr(-1)) {
				formattedDate = moment(date + 'Z');
			}
		} catch (error) {
			console.log(error);
		}

		if (formattedDate.isValid()) {
			return formattedDate.format('LL');
		} else {
			return ' -- ';
		}
	}
}

export class TicketUtils {
	static TICKET_TYPES = {
		BILLING: 'Billing',
		STORAGE: 'Storage',
		SUPPORT: 'Support',
		PROFILE: 'Profile',
	};

	static TICKET_STATUS = {
		OPEN: 'open',
		CLOSED: 'closed',
	};
}
