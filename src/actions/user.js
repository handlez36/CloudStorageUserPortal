import axios from 'axios';

/**
 * Action creator type constants for user login
 */
export const USER_UPDATE_REQUEST = 'USER_UPDATE_REQUEST';
export const USER_UPDATE_SUCCESS = 'USER_UPDATE_SUCCESS';
export const USER_UPDATE_ERROR = 'USER_UPDATE_ERROR';
export const AVATAR_UPDATE_SUCCESS = 'AVATAR_UPDATE_SUCCESS';
export const AVATAR_UPDATE_ERROR = 'AVATAR_UPDATE_ERROR';
export const USER_UPDATE_STATUS_RESET = 'USER_UPDATE_STATUS_RESET';

const BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/userapi`;

/**
 * Returns action indicating a user is requesting profile edits
 * @param params
 */
export function requestUserUpdate(params) {
	return {
		type: USER_UPDATE_REQUEST,
		params,
	};
}

/**
 * Action creator indicating a user update error
 * @param username
 */
function userUpdateError({ error }) {
	return {
		type: USER_UPDATE_ERROR,
		status: USER_UPDATE_ERROR,
		isFetching: false,
		timestamp: Date.now(),
		error,
	};
}

/**
 * Action creator indicating a user update success
 *  @param credentials
 */
function userUpdateSuccess({ user }) {
	return {
		type: USER_UPDATE_SUCCESS,
		status: USER_UPDATE_SUCCESS,
		isFetching: false,
		user,
		timestamp: Date.now(),
	};
}

/**
 * Action creator indicating a user avatar error
 * @param username
 */
function avatarUpdateError({ error }) {
	return {
		type: AVATAR_UPDATE_ERROR,
		isFetching: false,
		timestamp: Date.now(),
		error,
	};
}

/**
 * Action creator indicating a user avatar success
 *  @param credentials
 */
function avatarUpdateSuccess(imageId) {
	return {
		type: AVATAR_UPDATE_SUCCESS,
		isFetching: false,
		imageId,
		timestamp: Date.now(),
	};
}

export function resetUserUpdateStatus() {
	return {
		type: USER_UPDATE_STATUS_RESET,
		status: null,
	};
}

/**
 * Exported function to kick off phase one login process
 * username and password
 */
export function updateUser(params) {
	return dispatch => {
		dispatch(requestUserUpdate(params));

		return makeUpdateRequest(params)
			.then(response => {
				console.log('Update user response: ', response);

				if (response.status !== 200 || response.data.error) {
					dispatch(userUpdateError(response.data));
				} else {
					dispatch(userUpdateSuccess(response.data));
				}
				return response;
			})
			.catch(err => console.log('Error!!!!: ', err));
	};
}

export function updateUserAvatar(id) {
	return (dispatch, getState) => {
		dispatch(requestUserUpdate(id));

		const user = getState().auth_status.user;
		console.log('User is ', user);
		return makeUpdateAvatarRequest(id)
			.then(response => {
				console.log('Avatar Update Response: ', response);
				if (response.status !== 200 || response.data.error) {
					dispatch(avatarUpdateError(response.data));
				} else {
					dispatch(avatarUpdateSuccess(id));
				}
			})
			.catch(err => console.log('Error!!!!: ', err));
	};
}

function makeUpdateRequest(params) {
	const url = `${BASE_URL}/user/`;

	return axios.put(url, params, { withCredentials: true });
}

function makeUpdateAvatarRequest(id) {
	const url = `${BASE_URL}/user/profileimage`;
	const config = {
		withCredentials: true,
		headers: { 'Content-Type': 'application/json' },
	};

	return axios.put(url, `${id}`, config);
}
