import axios from 'axios';

const BASE_URL = 'https://www.mydcblox.com/cdn/release';

export class ReleaseNotesApi {
	static getReleaseNotes(version) {
		return axios.get(`${BASE_URL}/${version}`);
	}
}
