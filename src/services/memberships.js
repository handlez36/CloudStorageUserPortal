import { setCompanyIdHeader } from './config';

const CURRENT_MEMBERSHIP_KEY = 'currentMembership';

export const saveCurrentMembership = membership => {
	try {
		sessionStorage.setItem(CURRENT_MEMBERSHIP_KEY, JSON.stringify(membership));
		setCompanyIdHeader(membership.organizationId);
	} catch (e) {
		return false;
	}

	return true;
};

export const getCurrentMembership = () => {
	let currentMembership;
	try {
		currentMembership = JSON.parse(sessionStorage.getItem(CURRENT_MEMBERSHIP_KEY));
	} catch (e) {
		return null;
	}

	return currentMembership;
};
