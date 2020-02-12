import 'clientjs';
import axios from 'axios';

export const clientJs = new ClientJS();

export class ClientData {
	static getTimeZone() {
		return clientJs.getTimeZone();
	}

	static getBrowser() {
		return clientJs.getBrowser();
	}

	static async getClientIp() {
		const url = 'https://api.ipify.org';

		try {
			const { data = null } = await axios.get(url);
			return data;
		} catch (e) {
			return null;
		}
	}
}
