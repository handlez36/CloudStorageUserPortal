import axios from 'axios';

export class CompanyProfileApi {
	constructor() {
		this.baseUrl = process.env.REACT_APP_API_BASE_URL;
		this.config = {
			withCredentials: true,
			headers: { 'Content-Type': 'application/json' },
		};
	}

	get() {
		const url = `${this.baseUrl}/billing/companyprofile`;

		return axios.get(url, this.config);
	}
}
