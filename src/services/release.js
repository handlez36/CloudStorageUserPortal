import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const config = {
	withCredentials: true,
};

export class ReleaseApi {
	getAll() {
		const url = `${BASE_URL}/release/`;
		return axios.get(url, config);
	}
	getAllNew() {
		const url = 'hidden';
		return axios.get(url, {
			withCredentials: false,
		});
	}

	get(key) {
		const url = `${BASE_URL}/release/`;
		return axios.post(url, { filename: `${key}` }, config);
	}

	viewPdfInPanel(pdf) {
		const blob = this.getPdfBlob(pdf);
		const fileUrl = URL.createObjectURL(blob);

		return fileUrl;
	}

	getPdfBlob(pdf) {
		// Set filename
		// let filename = "invoice.pdf";

		// Convert Base64 PDF to ArrayBuffer
		const binary = atob(pdf.replace(/\s/g, ''));
		const length = binary.length;
		const buffer = new ArrayBuffer(length);
		const view = new Uint8Array(buffer);
		for (let i = 0; i < length; i++) {
			view[i] = binary.charCodeAt(i);
		}

		// Create Blob from ArrayBuffer
		const blob = new Blob([view], { type: 'application/pdf' });

		return blob;
	}
}
