import { UserProfileApi } from './../services/userProfile';

/**
 * Action creator type constants for password registration
 */
export const NEW_PASSWORD_ERROR = 'NEW_PASSWORD_ERROR';
export const NEW_PASSWORD_SUCCESS = 'NEW_PASSWORD_SUCCESS';
export const CONFIRM_PASSWORD_REQUEST = 'CONFIRM_PASSWORD_REQUEST';
export const CONFIRM_PASSWORD_ERROR = 'CONFIRM_PASSWORD_ERROR';
export const CONFIRM_PASSWORD_SUCCESS = 'CONFIRM_PASSWORD_SUCCESS';
export const REGISTRATION_REQUEST = 'REGISTRATION_REQUEST';

function newPasswordRegistrationSuccess(password) {
	return {
		type: NEW_PASSWORD_SUCCESS,
		status: 'NEW_PASSWORD_SUCCESS',
		current_context: 'NEW',
		context: 'CONFIRM',
		isFetching: false,
		isRegistered: false,
		pwd: password,
		timestamp: Date.now(),
	};
}

function confirmPassword() {
	return {
		type: CONFIRM_PASSWORD_REQUEST,
		status: 'CONFIRM_PASSWORD_REQUEST',
		current_context: 'CONFIRM',
		context: 'CONFIRM',
		isFetching: true,
		isRegistered: false,
		timestamp: Date.now(),
	};
}

function confirmPasswordError() {
	return {
		type: CONFIRM_PASSWORD_ERROR,
		status: 'CONFIRM_PASSWORD_ERROR',
		current_context: 'CONFIRM',
		context: 'CONFIRM',
		isFetching: false,
		isRegistered: false,
		timestamp: Date.now(),
	};
}

function confirmPasswordSuccess() {
	return {
		type: CONFIRM_PASSWORD_SUCCESS,
		status: 'CONFIRM_PASSWORD_SUCCESS',
		current_context: 'CONFIRM',
		context: 'COMPLETED',
		isFetching: false,
		isRegistered: true,
		timestamp: Date.now(),
	};
}

export function resetRegistrationState() {
	return {
		type: REGISTRATION_REQUEST,
		status: 'REGISTRATION_REQUEST',
		current_context: 'NEW',
		context: 'NEW',
		isFetching: false,
		isRegistered: false,
	};
}

export function enterNewPassword(input) {
	return newPasswordRegistrationSuccess(input);
}

export function confirmNewPassword(newPwd, confirmedPwd, key) {
	return dispatch => {
		dispatch(confirmPassword());

		if (newPwd === confirmedPwd) {
			const userProfile = new UserProfileApi();
			if (key === undefined || key === '') {
				userProfile
					.updatePassword({ passwordConfirm: newPwd, newPassword: confirmedPwd })
					.then(response => {
						console.log(response);
						if (response.status !== 200 || response.data.error) {
							// dispatch(confirmPasswordError(response.data));
							dispatch(confirmPasswordError());
						} else {
							dispatch(confirmPasswordSuccess());
						}
					});
			} else {
				userProfile.updatePasswordNewUser({ newpassword: newPwd, key }).then(response => {
					console.log(response);
					if (response.status !== 200 || response.data.error) {
						// dispatch(confirmPasswordError(response.data));
						dispatch(confirmPasswordError());
					} else {
						dispatch(confirmPasswordSuccess());
					}
				});
			}
		} else {
			// dispatch(confirmPasswordError({ error: 'Passwords do not match' }));
			dispatch(confirmPasswordError());
		}
	};
}
