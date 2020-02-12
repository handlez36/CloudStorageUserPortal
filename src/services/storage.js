import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const config = {
	withCredentials: true,
};

export class StorageApi {
	static getAll(filterParams = null) {
		const url = `${BASE_URL}/storage/`;
		const params = filterParams || { getObjectStorage: true, getFileStorage: true };

		return axios.post(url, params, config);
	}

	static getStorage() {
		const url = `${BASE_URL}/storage/`;

		return axios.get(url, config);
	}

	static get(id) {
		const url = `${BASE_URL}/storage/${id}`;

		return axios.get(url, config);
	}

	static updateStoragePassword(username, storageId) {
		const url = `${BASE_URL}/storage/password`;
		const params = { username, storageId };

		return axios.post(url, params, config);
	}

	static updateStoragePasswordTest() {
		return new Promise(resolve => {
			setTimeout(() => {
				resolve({ data: { password: 'ABCDE', error: null }, status: 200 });
			}, 1000);
		});
	}

	static getStorageStats() {
		const url = `${BASE_URL}/storage/stats`;

		return axios.get(url, config);
	}

	static getStorageTrends(params = null) {
		const url = `${BASE_URL}/storage/trends`;
		return axios.post(url, params, config);
	}

	static addStorage(params = null) {
		const url = `${BASE_URL}/storage/create`;
		return axios.post(url, params, config);
	}
}
