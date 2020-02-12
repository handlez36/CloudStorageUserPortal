import {
	COMPANY_INFO_REQUEST,
	COMPANY_INFO_REQUEST_ERROR,
	COMPANY_INFO_REQUEST_SUCCESS,
} from '../actions/company';

export default function(state = {}, action) {
	switch (action.type) {
		case COMPANY_INFO_REQUEST:
			return Object.assign({}, state, action);
		case COMPANY_INFO_REQUEST_ERROR:
			return Object.assign({}, state, action);
		case COMPANY_INFO_REQUEST_SUCCESS:
			return Object.assign({}, state, action);
		default:
			return state;
	}
}
