import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const config = {
	withCredentials: true,
	headers: { 'Content-Type': 'application/json' },
};

export class UserApi {
	static logoutUser() {
		const url = `${BASE_URL}/authenticate/logout`;

		return axios.get(url, config);
	}
	static getAllUsers(id) {
		const url = `${BASE_URL}/organization/${id}/users/`;

		return axios.get(url, config);
	}
	static getAllRosterUsers(id) {
		const url = `${BASE_URL}/organization/${id}/roster/`;

		return axios.get(url, config);
	}
	static getRosterSummary(id) {
		const url = `${BASE_URL}/organization/${id}/roster/summary`;

		return axios.get(url, config);
	}
	static resetUserPassword(email) {
		const url = `${BASE_URL}/user/forgotpassword`;
		const params = {
			userName: email,
		};

		return axios.post(url, params);
	}
}
