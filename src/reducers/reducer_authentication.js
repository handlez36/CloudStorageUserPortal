import {
	LOGIN_REQUEST_USERNAME,
	LOGIN_SUCCESS_PHASE_ONE,
	LOGIN_SUCCESS_PHASE_ONE_NO_MFA,
	LOGIN_REQUEST_PHASE_ONE,
	LOGIN_ERROR_PHASE_ONE,
	LOGIN_REQUEST_PHASE_TWO,
	LOGIN_SUCCESS_PHASE_TWO,
	LOGIN_ERROR_PHASE_TWO,
	LOGIN_USERNAME_ERROR,
	JWT_VALIDATE_ERROR,
	JWT_VALIDATE_SUCCESS,
	LOGIN_ERROR_PHASE_ONE_LOCK,
	LOGIN_ERROR_PHASE_TWO_LOCK,
	LOGIN_RESET_WITH_USER,
	LOGOUT_REQUEST,
	LOGOUT_REQUEST_SUCCESS,
	LOGOUT_REQUEST_ERROR,
	USER_UPDATE_REQUEST,
	USER_UPDATE_ERROR,
	USER_UPDATE_SUCCESS,
	USER_UPDATE_STATUS_RESET,
	AVATAR_UPDATE_SUCCESS,
	AVATAR_UPDATE_ERROR,
	SWITCH_COMPANY,
} from '../actions';
import { saveCurrentMembership, getCurrentMembership } from './../services/memberships';
import { setCompanyIdHeader } from './../services/config';

const initialState = {
	status: 'USERNAME_START',
	current_context: 'USERNAME',
	context: 'USERNAME',
	isAuthenticated: false,
	isFetching: false,
	attemptCount: 1,
	message: 'HELLO. PLEASE ENTER YOUR EMAIL.',
};

export default function(state = initialState, action) {
	let currentMembership;

	switch (action.type) {
		case LOGIN_RESET_WITH_USER:
			return Object.assign({}, state, action);
		case LOGIN_REQUEST_USERNAME:
			return Object.assign({}, state, action);
		case LOGIN_USERNAME_ERROR:
			return Object.assign({}, state, action);
		case LOGIN_REQUEST_PHASE_ONE:
			return Object.assign({}, state, action);
		case LOGIN_REQUEST_PHASE_TWO:
			return Object.assign({}, state, action);
		case LOGIN_SUCCESS_PHASE_ONE:
			return { ...state, ...action, error: null, startTimeout: false };
		case LOGIN_SUCCESS_PHASE_ONE_NO_MFA:
			currentMembership = action.memberships.length > 0 ? action.memberships[0] : null;
			saveCurrentMembership(currentMembership);
			return {
				...state,
				...action,
				error: null,
				currentMembership,
			};
		case LOGIN_SUCCESS_PHASE_TWO:
			currentMembership = action.memberships.length > 0 ? action.memberships[0] : null;
			saveCurrentMembership(currentMembership);
			return {
				...state,
				...action,
				currentMembership,
			};
		case LOGIN_ERROR_PHASE_ONE:
			return Object.assign({}, state, action);
		case LOGIN_ERROR_PHASE_ONE_LOCK:
			return Object.assign({}, state, action);
		case LOGIN_ERROR_PHASE_TWO:
			return Object.assign({}, state, action);
		case LOGIN_ERROR_PHASE_TWO_LOCK:
			return Object.assign({}, state, action);
		case JWT_VALIDATE_ERROR:
			return Object.assign({}, state, action);
		case JWT_VALIDATE_SUCCESS:
			const savedMembership = getCurrentMembership();
			if (savedMembership) {
				setCompanyIdHeader(savedMembership.organizationId);
			}
			return Object.assign({}, state, action);
		case USER_UPDATE_REQUEST:
			return state;
		case USER_UPDATE_SUCCESS:
			return { ...state, user: action.user, type: action.type };
		case USER_UPDATE_ERROR:
			return { ...state, type: action.type };
		case USER_UPDATE_STATUS_RESET:
			return { ...state, ...action };
		case AVATAR_UPDATE_ERROR:
			return state;
		case AVATAR_UPDATE_SUCCESS:
			const user = state.user;
			user.userProfile.profileImage = action.imageId;
			return { ...state, ...action };
		case 'MFA_REQUEST_OPTION':
			return { ...state, message: action.message };
		case 'MFA_REQUEST_SUCCESS':
			return { ...state, message: action.message, startTimeout: true };
		case 'MFA_REQUEST_ERROR':
			return { ...state, message: action.message };
		case 'MFA_ENTER_TIMEOUT1':
			return { ...state, message: action.message, type: 'MFA_ENTER_TIMEOUT1' };
		case 'MFA_ENTER_TIMEOUT2':
			return { ...state, message: action.message, type: 'MFA_ENTER_TIMEOUT2' };
		case SWITCH_COMPANY:
			saveCurrentMembership(action.currentMembership);
			return { ...state, ...action };
		case LOGOUT_REQUEST_SUCCESS:
			return { ...initialState };
		default:
			return state;
	}
}
