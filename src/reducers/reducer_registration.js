import {
	NEW_PASSWORD_SUCCESS,
	REGISTRATION_REQUEST,
	CONFIRM_PASSWORD_ERROR,
	CONFIRM_PASSWORD_SUCCESS,
} from '../actions/registration';

const initialState = {
	status: REGISTRATION_REQUEST,
	current_context: 'NEW',
	context: 'NEW',
	isFetching: false,
	isRegistered: false,
};

export default function(state = initialState, action) {
	switch (action.type) {
		case NEW_PASSWORD_SUCCESS:
			return { ...state, ...action };
		case CONFIRM_PASSWORD_SUCCESS:
			return { ...state, ...action };
		case CONFIRM_PASSWORD_ERROR:
			return { ...state, ...action };
		case REGISTRATION_REQUEST:
			return { ...state, ...action };
		default:
			return state;
	}
}
