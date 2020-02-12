import axios from 'axios';

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
export function getCompanyInfo() {
	return dispatch => {
		dispatch(companyRequest());

		companyApiRequest()
			.then(response => {
				if (response.status !== 200 || response.data.error) {
					dispatch(companyRequestError(response.data));
				} else {
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
