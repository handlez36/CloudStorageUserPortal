import axios from 'axios';
import moment from 'moment';
const CDN_URL = process.env.REACT_APP_CDN_URL;

const FileUploadIcon_Doc = `${CDN_URL}billing/Billing_Download_INV_Doc.svg`;
const FileUploadIcon_Jpg = `${CDN_URL}billing/Billing_Download_INV_JPG.svg`;
const FileUploadIcon_Png = `${CDN_URL}billing/Billing_Download_INV_PNG.svg`;
const FileUploadIcon_Pdf = `${CDN_URL}billing/Billing_Download_INV_PDF.svg`;
const FileUploadIcon_General = `${CDN_URL}common/Icon-Download Generic.svg`;

const STATIC_EXCLUSION_LIST = 'EXE,COM,BAT,CMD,MSI,VB,VBS,WS,WSF,SCF,SCR,PIF';
const BASE_URL = process.env.REACT_APP_META_DEFENDER_URL;
let config = {
	crossDomain: true,
	headers: {
		apikey: process.env.REACT_APP_META_DEFENDER_API_KEY,
		samplesharing: 1,
		user_agent: 'mcl-metadefender-rest-sanitize-disabled-unarchive',
	},
};

export class AttachmentApi {
	static scanFile(file, type = 'image/jpeg', progressCallback = null) {
		const fileToUpload = file.file ? file.file : file;
		const url = `${BASE_URL}/file/`;
		const headers = config.headers;
		const updatedHeaders = { ...headers, 'Content-Type': `"${type}"` };
		const startTime = new moment();

		function withPercentage(fn) {
			return function(progressEvent) {
				const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
				fn(percentCompleted, progressEvent.loaded, progressEvent.total);
			};
		}

		function formatBytes(bytes, decimals = 0) {
			if (bytes === 0) return '0 Bytes';

			const k = 1024;
			const dm = decimals < 0 ? 0 : decimals;
			const sizes = ['bytes', 'kb', 'mb', 'gb', 'tb', 'pb', 'eb', 'zb', 'yb'];
			const i = Math.floor(Math.log(bytes) / Math.log(k));
			return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + sizes[i];
		}

		config = {
			...config,
			headers: updatedHeaders,
			onUploadProgress: withPercentage(function(percent, amtUploaded) {
				const endTime = new moment();
				const timeDiff = moment.duration(endTime.diff(startTime)).as('seconds');
				const speed = formatBytes(amtUploaded / timeDiff);
				const speedStr = `${speed} / sec`;
				if (progressCallback) {
					progressCallback(file, percent, speedStr);
				}
			}),
		};
		const view = new Uint8Array(fileToUpload);
		for (let i = 0; i < fileToUpload.length; i++) {
			view[i] = fileToUpload.charCodeAt(i);
		}

		// Create Blob from ArrayBuffer
		const blob = new Blob([view], { type });
		return axios.post(url, blob, config);
	}

	static formatBytes(bytes, decimals = 0) {
		if (bytes === 0) return '0 bytes';

		const k = 1024;
		const dm = decimals < 0 ? 0 : decimals;
		const sizes = ['bytes', 'kb', 'mb', 'gb', 'tb', 'pb', 'eb', 'zb', 'yb'];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + sizes[i];
	}

	static testAttachment() {
		fetch('/gradient-vector-multiply.jpg')
			.then(res => res.blob()) // Gets the response and returns it as a blob
			.then(blob => {
				this.scanFile(blob).then(response => {
					console.log('Response data id: ', response);
					this.getScannedFile(response.data.data_id);
				});
			});
	}

	static getScannedFile(id) {
		const url = `${BASE_URL}/file/${id}`;

		return axios.get(url, config);
	}

	static isValidAttachmentType(attachment) {
		const exclusionList = process.env.REACT_APP_FILE_ATTACHMENT_EXCLUSIONS
			? process.env.REACT_APP_FILE_ATTACHMENT_EXCLUSIONS
			: STATIC_EXCLUSION_LIST;

		const nonAcceptedTypes = exclusionList.split(',');
		let attachmentType = attachment.type.split('/')[1];
		let isValid = true;

		/** IE and Edge do not recognize certain file formats and
		 * will not populate the attachment.type param
		 */
		if (attachment.type === '' || attachmentType === undefined) {
			attachmentType = this.extractFileExtension(attachment.filename);
		}
		if (!attachmentType) return false;

		nonAcceptedTypes.forEach(invalidType => {
			if (invalidType.toLowerCase() === attachmentType.toLowerCase()) {
				isValid = false;
			}
		});

		return isValid;
	}

	static getFileTypeIcon(filename) {
		const extension = this.extractFileExtension(filename);

		switch (extension) {
			case 'pdf':
			case 'PDF':
				return FileUploadIcon_Pdf;
			case 'png':
			case 'PNG':
				return FileUploadIcon_Png;
			case 'jpg':
			case 'JPG':
				return FileUploadIcon_Jpg;
			case 'doc':
			case 'DOC':
			case 'docx':
				return FileUploadIcon_Doc;
			default:
				return FileUploadIcon_General;
		}
	}

	static extractFileExtension(filename) {
		const extensionRegex = /\.(\w+)$/;
		const matches = filename.match(extensionRegex);
		return matches && matches[1] ? matches[1] : '';
	}
}
