import axios from 'axios';

const BASE_URL = 'hidden';

export class ReleaseNotesApi {
	static getReleaseNotes(version) {
		return axios.get(`${BASE_URL}/${version}`);
	}
}
