import axios from 'axios';

import { UserApi } from 'services/user';

/**
 * Action creator type constants for user login
 */
export const LOGIN_RESET_WITH_USER = 'LOGIN_RESET_WITH_USER';
export const LOGIN_REQUEST_USERNAME = 'LOGIN_REQUEST_USERNAME';
export const LOGIN_USERNAME_ERROR = 'LOGIN_USERNAME_ERROR';
export const LOGIN_REQUEST_PHASE_ONE = 'LOGIN_REQUEST_PHASE_ONE';
export const LOGIN_SUCCESS_PHASE_ONE = 'LOGIN_SUCCESS_PHASE_ONE';
export const LOGIN_SUCCESS_PHASE_ONE_NO_MFA = 'LOGIN_SUCCESS_PHASE_ONE_NO_MFA';
export const LOGIN_ERROR_PHASE_ONE = 'LOGIN_ERROR_PHASE_ONE';
export const LOGIN_ERROR_PHASE_ONE_LOCK = 'LOGIN_ERROR_PHASE_ONE_LOCK';
export const LOGIN_REQUEST_PHASE_TWO = 'LOGIN_REQUEST_PHASE_TWO';
export const LOGIN_SUCCESS_PHASE_TWO = 'LOGIN_SUCCESS_PHASE_TWO';
export const LOGIN_ERROR_PHASE_TWO = 'LOGIN_ERROR_PHASE_TWO';
export const LOGIN_ERROR_PHASE_TWO_LOCK = 'LOGIN_ERROR_PHASE_TWO_LOCK';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_REQUEST_SUCCESS = 'LOGOUT_REQUEST_SUCCESS';
export const LOGOUT_REQUEST_ERROR = 'LOGOUT_REQUEST_ERROR';
export const JWT_VALIDATE_ERROR = 'JWT_VALIDATE_ERROR';
export const JWT_VALIDATE_SUCCESS = 'JWT_VALIDATE_SUCCESS';
export const SWITCH_COMPANY = 'SWITCH_COMPANY';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

/**
 * Returns action indicating a user restarting the login process
 * @param username
 * @param attemptCount
 */
export function requestLoginUsernameReset(username, attemptCount, message) {
	return {
		type: LOGIN_RESET_WITH_USER,
		status: 'USERNAME_RESET',
		current_context: 'USERNAME',
		context: 'USERNAME',
		isAuthenticated: false,
		isFetching: false,
		attemptCount,
		message,
		username,
	};
}

/**
 * Save state for entering a successful username
 * @param username
 */
function requestLoginUsername(username) {
	return {
		type: LOGIN_REQUEST_USERNAME,
		status: 'USERNAME_SUCCESS',
		current_context: 'USERNAME',
		context: 'PASSWORD',
		isFetching: false,
		isAuthenticated: false,
		timestamp: Date.now(),
		message: 'We  need  your  password,  It’s  a  security  thing.',
		username,
	};
}

/**
 * Save state for entering an invalid username
 * @param username
 */
function loginUsernameError({ error }) {
	return {
		type: LOGIN_USERNAME_ERROR,
		status: 'USERNAME_ERROR',
		current_context: 'USERNAME',
		context: 'USERNAME',
		isFetching: false,
		isAuthenticated: false,
		timestamp: Date.now(),
		message: error,
	};
}

/**
 * Login request with username and password
 * Used to show 'login processing' animation
 *  @param credentials
 */
function requestLoginPhaseOne(credentials, attemptCount) {
	return {
		type: LOGIN_REQUEST_PHASE_ONE,
		status: 'LOGIN_REQUEST',
		current_context: 'PASSWORD',
		context: 'PASSWORD',
		isFetching: false,
		isAuthenticated: false,
		timestamp: Date.now(),
		message: 'Validating password...',
		attemptCount,
		credentials,
	};
}

/**
 * Called upon successful phase one authentication
 * @param user
 */
function receiveLogin({ user }, attemptCount, msg) {
	return {
		type: LOGIN_SUCCESS_PHASE_ONE,
		status: 'LOGIN_SUCCESS',
		current_context: 'PASSWORD',
		context: 'MFA',
		isFetching: false,
		isAuthenticated: false,
		timestamp: Date.now(),
		message: msg,
		attemptCount,
		user,
	};
}

/**
 * Called upon successful phase one authentication (when bypassing MFA)
 * @param user
 */
function receiveLoginSkipMfa({ user, memberships }, attemptCount) {
	return {
		type: LOGIN_SUCCESS_PHASE_ONE_NO_MFA,
		status: 'LOGIN_SUCCESS',
		current_context: 'PASSWORD',
		context: 'AUTHENTICATED',
		isFetching: false,
		isAuthenticated: true,
		timestamp: Date.now(),
		attemptCount,
		user,
		memberships,
	};
}

/**
 * Called upon phase one authentication failure
 * @param msg
 */
function loginError({ error }, attemptCount, failedUserName) {
	return {
		type: LOGIN_ERROR_PHASE_ONE,
		status: 'LOGIN_ERROR',
		current_context: 'PASSWORD',
		context: 'USERNAME',
		isFetching: false,
		isAuthenticated: false,
		timestamp: Date.now(),
		attemptCount,
		failedUserName,
		message: error,
	};
}

/**
 * Login request with multi-factor authentication code
 * Used to show 'login processing' animation
 * @param mfaCode
 */
function requestLoginPhaseTwo(mfaCode, attemptCount) {
	return {
		type: LOGIN_REQUEST_PHASE_TWO,
		status: 'MFA_REQUEST',
		current_context: 'MFA',
		context: 'MFA',
		isFetching: true,
		isAuthenticated: false,
		timestamp: Date.now(),
		message: 'Validating your code',
		attemptCount,
		mfaCode,
	};
}

/**
 * Called upon successful phase two authentication
 * @param user
 */
function receiveMFALogin({ user, memberships }, attemptCount) {
	return {
		type: LOGIN_SUCCESS_PHASE_TWO,
		status: 'MFA_SUCCESS',
		current_context: 'MFA',
		context: 'AUTHENTICATED',
		isFetching: false,
		isAuthenticated: true,
		timestamp: Date.now(),
		message: "You're all logged in!",
		memberships,
		attemptCount,
		user,
	};
}

/**
 * Called upon phase two authentication failure
 * @param msg
 */
function mfaLoginError({ error }, attemptCount, failedUserName) {
	return {
		type: LOGIN_ERROR_PHASE_TWO,
		status: 'MFA_ERROR',
		current_context: 'MFA',
		context: 'MFA',
		isFetching: false,
		isAuthenticated: false,
		timestamp: Date.now(),
		attemptCount,
		failedUserName,
		message: error,
	};
}

function validateJWTError({ error }, path) {
	return {
		type: JWT_VALIDATE_ERROR,
		isAuthenticated: false,
		error,
		path,
	};
}

function validateJWTSuccess({ user, sessionInfo, memberships }, path) {
	const { sessionId, sessionToken } = sessionInfo;

	return {
		type: JWT_VALIDATE_SUCCESS,
		isAuthenticated: true,
		user,
		sessionId,
		sessionToken,
		memberships,
		path,
	};
}

export function validateAuthState(path, search = '') {
	return dispatch => {
		return makeJwtValidationRequest()
			.then(response => {
				if (response.status !== 200 || response.data.error) {
					dispatch(validateJWTError(response.data, '/'));
				} else {
					dispatch(validateJWTSuccess(response.data, path + search));
					// dispatch(validateJWTSuccess(response.data, path));
				}
			})
			.catch(error => dispatch(validateJWTError({ error: error.message }, '/')));
	};
}

/**
 * Exported function to kick off phase one login process
 * username and password
 */
export function loginUserPhaseOne(credentials) {
	return (dispatch, getState) => {
		let attemptCount = getState().auth_status.attemptCount;
		const userName = getState().auth_status.username;

		dispatch(requestLoginPhaseOne(credentials));

		return makeLoginRequest(credentials, attemptCount)
			.then(loginDetails => {
				if (loginDetails.status !== 200 || loginDetails.data.error) {
					attemptCount++;
					dispatch(loginError(loginDetails.data, attemptCount, userName));
				} else {
					attemptCount = 1;
					const { data: { user: { authTypes, userProfile } = {} } = {} } = loginDetails;

					/** If user profile comes back, skip MFA attept */
					if (userProfile) {
						dispatch(receiveLoginSkipMfa(loginDetails.data, attemptCount));
					} else {
						const msg =
							authTypes.length === 1
								? 'Preparing to send email verification code'
								: 'HOW SHOULD WE SEND THE VERIFICATION CODE?';
						dispatch(receiveLogin(loginDetails.data, attemptCount, msg));
					}
				}
			})
			.catch(error => dispatch(loginError({ error: error.message }, attemptCount, userName)));
	};
}

/**
 * Exported function to kick off phase two login process
 * mult-factor authentication code
 */
export function loginUserPhaseTwo(mfaCode) {
	return (dispatch, getState) => {
		const username = getState().auth_status.username;
		let attemptCount = getState().auth_status.attemptCount;

		dispatch(requestLoginPhaseTwo(mfaCode, attemptCount));
		setTimeout(function() {
			return makeMFAAuthenticationRequest(mfaCode, username, attemptCount)
				.then(loginDetails => {
					if (loginDetails.status !== 200 || loginDetails.data.error) {
						attemptCount++;
						dispatch(mfaLoginError(loginDetails.data, attemptCount, username));
						if (attemptCount > 2) {
							dispatch(loginError(loginDetails.data, attemptCount, username));
						}
					} else {
						attemptCount = 1;
						dispatch(receiveMFALogin(loginDetails.data, attemptCount));
					}
				})
				.catch(err => console.log('MFA error: ', err));
		}, 3000);
	};
}

/**
 * Exported function to kick off username entry
 * @param username
 */
export function sampleEnterUsername(username) {
	return username
		? requestLoginUsername(username.toLowerCase())
		: loginUsernameError({ msg: 'Invalid username' });
}

export function mfaOptionRequest(username, attemptCount, selection) {
	return dispatch => {
		dispatch({ type: 'MFA_REQUEST_OPTION', message: 'Sending Code' });

		const url = `${BASE_URL}/authenticate/requestSecondFactor`;
		const params = {
			attemptCount,
			authType: selection,
			userName: username,
		};

		return axios
			.post(url, params, { withCredentials: true })
			.then(response => {
				if (response.status === 200 || !response.data.error) {
					dispatch({
						type: 'MFA_REQUEST_SUCCESS',
						message: 'Now  enter  the  code  we  just  sent you.',
					});
				} else {
					dispatch({
						type: 'MFA_REQUEST_ERROR',
						message: 'Sorry, there was an error sending the code',
					});
				}
			})
			.catch(err => console.log('MFA options error: ', err));
	};
}

function makeLoginRequest(credentials, attemptCount) {
	const url = `${BASE_URL}/authenticate/login`;
	const params = {
		attemptCount,
		password: credentials.password,
		userName: credentials.username,
	};

	return axios.post(url, params, { withCredentials: true });
}

function makeMFAAuthenticationRequest(mfa, username, attemptCount) {
	const url = `${BASE_URL}/authenticate/secondfactor`;
	const params = {
		attemptCount,
		oneTimeCode: mfa,
		userName: username,
	};

	return axios.post(url, params, { withCredentials: true });
}

export function makeJwtValidationRequest() {
	const url = `${BASE_URL}/authenticate/authenticateuser`;

	return axios.get(url, { withCredentials: true });
}

export const enterMfaTimeout1 = () => {
	return dispatch => {
		dispatch({ type: 'MFA_ENTER_TIMEOUT1', message: 'DID YOU FORGET TO ENTER YOUR CODE?' });
	};
};

export const enterMfaTimeout2 = () => {
	return dispatch => {
		dispatch({ type: 'MFA_ENTER_TIMEOUT2', message: 'YOUR CODE HAS EXPIRED!' });
	};
};

export const resetMfaTimeoutCondition = () => {
	return dispatch => {
		dispatch({ type: 'LOGIN_SUCCESS_PHASE_ONE' });
	};
};

export const switchCompany = id => (dispatch, getState) => {
	const { memberships = [] } = getState().auth_status;
	const currentMembership = memberships.filter(membership => membership.organizationId === id);

	if (currentMembership && currentMembership[0]) {
		dispatch({
			type: SWITCH_COMPANY,
			currentMembership: currentMembership[0],
		});
	}
};

export const logoutUser = () => {
	return dispatch => {
		setTimeout(() => {
			return UserApi.logoutUser()
				.then(response => {
					const { status, data, data: { error = null } = {} } = response;
					const validResponse = status === 200 && data === '' && !error;
					dispatch({ type: LOGOUT_REQUEST_SUCCESS });
				})
				.catch(err => console.log('Error logging out: ', err));
		}, 2000);
	};
};
