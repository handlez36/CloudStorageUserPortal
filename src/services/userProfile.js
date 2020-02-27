import axios from 'axios';

import { Utils } from 'services/utils';

export class UserProfileApi {
	constructor() {
		this.baseUrl = process.env.REACT_APP_API_BASE_URL;
		this.config = {
			withCredentials: true,
			headers: { 'Content-Type': 'application/json' },
		};
	}

	getCompanyServices = async () => {
		const url = `${this.baseUrl}/companyservice/`;
		const response = await axios.get(url, this.config);
		if (Utils.isValidResponse(response)) {
			const { companyServices } = response.data;
			console.log('Response: ', response);
			return { companyServices, errors: null };
		}

		const { error } = response.data;
		return { companyServices: null, error };
	};

	// getCompanyServices = () => {
	// 	const url = `${this.baseUrl}/companyservice/`;
	// 	return axios.get(url, this.config);
	// };

	validateRegistrationCode = code => {
		const url = `${this.baseUrl}/user/newuserreset/${code}`;

		return axios.get(url, this.config);
	};

	updatePassword = params => {
		const url = `${this.baseUrl}/user/password`;

		return axios.post(url, params, this.config);
	};

	updatePasswordNewUser = params => {
		const url = `${this.baseUrl}/user/newuserreset`;
		return axios.post(url, params, this.config);
	};

	updatePortalUserActivation = params => {
		const url = `${this.baseUrl}/user/activation`;

		return axios.put(url, params, this.config);
	};

	updatePortalRosterActivation = params => {
		const url = `${this.baseUrl}/roster/activation`;

		return axios.put(url, params, this.config);
	};

	addNewPortalUser = params => {
		const url = `${this.baseUrl}/user/`;

		return axios.post(url, params, this.config);
	};
	addNewRosterUser = params => {
		const url = `${this.baseUrl}/roster/`;

		return axios.post(url, params, this.config);
	};

	getFirstName = auth_status => {
		const { user } = auth_status;

		if (user && user.firstname) {
			return user.firstname.toUpperCase();
		}

		return 'Hello';
	};

	getFirstAndLastName = auth_status => {
		const { user } = auth_status;
		let first = '';
		let last = '';

		if (user) {
			if (user.firstname) {
				first = user.firstname;
			}

			if (user.lastname) {
				last = user.lastname;
			}

			const name = `${first} ${last}`;

			return name.trim();
		}

		return 'First Last';
	};

	static areContactDetailsAvailable = auth_status => {
		return auth_status && auth_status.user && auth_status.user.contactDetails;
	};

	static getEmail = auth_status => {
		if (UserProfileApi.areContactDetailsAvailable(auth_status)) {
			const email = auth_status.user.contactDetails.email;
			return email || 'Email';
		} else {
			return 'Email';
		}
	};

	static getPhone = auth_status => {
		if (UserProfileApi.areContactDetailsAvailable(auth_status)) {
			const phone = auth_status.user.contactDetails.phone_number;
			return phone || 'Phone Number';
		} else {
			return 'Phone Number';
		}
	};

	static getBillingAddressParts = auth_status => {
		if (UserProfileApi.areContactDetailsAvailable(auth_status)) {
			const address = auth_status.user.contactDetails.address;
			const city = auth_status.user.contactDetails.city;
			const state = auth_status.user.contactDetails.state;
			const zip = auth_status.user.contactDetails.zipcode;

			return { address, city, state, zip };
		} else {
			return { address: 'Address' };
		}
	};

	static getBillingAddress = auth_status => {
		const { address, city, state, zip } = getBillingAddressParts(auth_status);
		const fullAddress = `${address}\n${city}, ${state} ${zip}`;

		return address === 'Address' ? 'Address' : fullAddress;
	};
}
