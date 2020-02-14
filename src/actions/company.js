import axios from 'axios';

import * as Config from '../services/config';

/**
 * Action creator type constants for company info
 */
export const COMPANY_INFO_REQUEST = 'COMPANY_INFO_REQUEST';
export const COMPANY_INFO_REQUEST_ERROR = 'COMPANY_INFO_REQUEST_ERROR';
export const COMPANY_INFO_REQUEST_SUCCESS = 'COMPANY_INFO_REQUEST_SUCCESS';

const BASE_URL = `${process.env.REACT_APP_API_BASE_URL}`;
const config = {
	withCredentials: true,
	headers: { 'Content-Type': 'application/json' },
};

/**
 * Action creator for initiating a company request
 */
function companyRequest() {
	return {
		type: COMPANY_INFO_REQUEST,
		isFetching: true,
	};
}

/**
 * Action creator for signaling a company request error
 * @param error
 */
function companyRequestError({ error }) {
	return {
		type: COMPANY_INFO_REQUEST_ERROR,
		isFetching: false,
		error,
	};
}

/**
 * Action creator for signaling a company request success
 * @param response
 */
function companyRequestSuccess({ addressPreferences, customer, fuseBillId }) {
	return {
		type: COMPANY_INFO_REQUEST_SUCCESS,
		isFetching: false,
		error: null,
		addressPreferences,
		customer,
		fuseBillId,
	};
}

/**
 * Exported function exposing an interface used to call company info request API
 */
export function getCompanyInfo(id = null) {
	return dispatch => {
		dispatch(companyRequest());

		const currentHeaderId = Config.getCompanyIdHeader();
		if (id) {
			Config.setCompanyIdHeader(id);
		}

		companyApiRequest()
			.then(response => {
				if (response.status !== 200 || response.data.error) {
					if (id) {
						Config.setCompanyIdHeader(currentHeaderId);
					}
					console.log('Switching company (ERROR)...');
					dispatch(companyRequestError(response.data));
				} else {
					console.log('Switching company (SUCCESS)...');
					dispatch(companyRequestSuccess(response.data));
				}
			})
			.catch(err => console.log('Company info request network error: ', err));
	};
}

function companyApiRequest() {
	const url = `${BASE_URL}/billing/companyprofile`;

	return axios.get(url, config);
}
