import axios from 'axios';

const FETCH_INVOICES = 'FETCH_INVOICES';

const BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/billing`;

export const fetchInvoices = invoices => {
	return {
		type: FETCH_INVOICES,
		invoices,
	};
};

export const fetchAllInvoices = () => {
	return dispatch => {
		return axios
			.get(BASE_URL)
			.then(response => {
				dispatch(fetchInvoices(response.data));
			})
			.catch(error => {
				throw error;
			});
	};
};
