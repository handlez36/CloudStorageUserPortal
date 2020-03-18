import { MENU as BILLING_MENU } from 'containers_old/Billing2.0/BillingConstants';
import { MENU as SUPPORT_MENU } from 'utils/TicketConstants';
import { MENU as PROFILE_MENU } from 'utils/ProfileConstants';
import { MENU as STORAGE_MENU } from 'utils/StorageConstants';

/** New for v3 */
// Home Page
import Home from 'pages/Home/Home';

// Profile Pages
import ProfileOverview from 'containers_old/Profile/Overview';
import ProfileUserContactSection from 'containers_old/Profile/UserContactInfo/UserContactSection';
import ProfileUserManagementSection from 'containers_old/Profile/UserManagement/UserManagement';
import ProfilePasswordSection from 'containers_old/Profile/Password/PasswordSection';
import ProfileAvatarSection from 'containers_old/Profile/Avatar/AvatarSection';

export const INPUT_TYPES = {
	INPUT: 'INPUT',
	TEXTAREA: 'TEXTAREA',
};

export const PHONEMASK = [
	'(',
	/[1-9]/,
	/\d/,
	/\d/,
	')',
	' ',
	/\d/,
	/\d/,
	/\d/,
	'-',
	/\d/,
	/\d/,
	/\d/,
	/\d/,
];

export const ZipCodeMask = [
	/[a-zA-Z1-9]/,
	/[a-zA-Z1-9]/,
	/[a-zA-Z1-9]/,
	/[a-zA-Z1-9]/,
	/[a-zA-Z1-9]/,
	'-',
	/[a-zA-Z1-9]/,
	/[a-zA-Z1-9]/,
	/[a-zA-Z1-9]/,
	/[a-zA-Z1-9]/,
];

export const numberMask = rawValue => {
	const numRegex = /([\d]{1,3})/;
	const matches = rawValue.match(numRegex);

	if (!matches) {
		return [];
	}
	const number = matches[1];
	const digits = [];
	const digitCount = number.toString().length;

	for (let i = 0; i < digitCount; i++) {
		digits.push(/[\d]/);
	}
	return digits;
};

export const storageNameMask = rawValue => {
	const nameLength = rawValue.length;
	const nameRegex = /[a-zA-Z0-9_-\s]/;
	const chars = [];

	for (let i = 0; i < nameLength; i++) {
		if (nameRegex.test(rawValue[i])) {
			chars.push(nameRegex);
		}
	}

	return chars;
};

// export const CURRENCYMASK = ['$', /[\d]/, /[\d]/, '.00'];
// export const CURRENCYMASK = ['$', /[1-9]{,5}/, '.', /[1-9]{2,2}/];
export const currencyMask = rawValue => {
	const amtRegex = /[$]?([0-9]*)(\.)?([0-9]*)/;
	const matches = rawValue.match(amtRegex);

	if (!matches) {
		return [];
	}

	const digitsBefore = matches[1];
	const digitsAfter = matches[3];
	const regex = ['$'];
	if (digitsBefore.length > 0) {
		digitsBefore
			.match(/\d/g)
			.slice(0, 5)
			.forEach(() => {
				regex.push(/[\d]/);
			});
	}
	regex.push(/\./);
	if (digitsAfter.length > 0) {
		digitsAfter
			.match(/\d/g)
			.splice(0, 2)
			.forEach(() => {
				regex.push(/[\d]/);
			});
	}

	return regex;
};

export const VALIDATIONS = {
	AT_LEAST_ONE_CHAR: { message: 'At least one character required', pattern: /.+/ },
	VALID_EMAIL: {
		message: 'Please enter a valid email address.',
		pattern: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
	},
	VALID_LOCATION: {
		message: 'Please choose a location.',
		pattern: /.+/,
	},
};

export const SITE_MODULES = {
	LOGIN: 'LOGIN',
	HOME: '- NONE SELECTED -',
	SUPPORT: 'SUPPORT',
	STORAGE: 'STORAGE',
	BILLING: 'BILLING',
	PROFILE: 'PROFILE',
};

export const SITE_PAGES = {
	[SITE_MODULES.LOGIN]: 'LOGIN',
	HOME: 'HOME',
	[SITE_MODULES.SUPPORT]: {
		[SUPPORT_MENU.OVERVIEW]: 'SUPPORT OVERVIEW',
		[SUPPORT_MENU.TICKET_HISTORY]: 'TICKET HISTORY',
		[SUPPORT_MENU.TICKET_HISTORY_DETAIL]: 'TICKET DETAILS',
		[SUPPORT_MENU.REMOTEHANDS]: 'REMOTE HANDS',
		[SUPPORT_MENU.GUESTACCESS]: 'GUEST ACCESS',
		[SUPPORT_MENU.CREATETICKET]: 'CREATE TICKET',
	},
	[SITE_MODULES.PROFILE]: {
		[PROFILE_MENU.OVERVIEW]: 'PROFILE OVERVIEW',
		[PROFILE_MENU.USER_PROFILE]: 'CONTACT INFO',
		[PROFILE_MENU.USER_MANAGEMENT]: 'USER MANAGEMENT',
		[PROFILE_MENU.PASSWORD_CHANGE]: 'CHANGE PASSWORD',
		[PROFILE_MENU.AVATAR]: 'AVATAR',
	},
	[SITE_MODULES.STORAGE]: {
		[STORAGE_MENU.OVERVIEW]: 'STORAGE OVERVIEW',
		[STORAGE_MENU.VIEW_STORAGE]: 'VIEW STORAGE',
		[STORAGE_MENU.ADD_STORAGE]: 'ADD STORAGE',
		[STORAGE_MENU.REMOVE_STORAGE]: 'REMOVE STORAGE',
	},
	[SITE_MODULES.BILLING]: {
		[BILLING_MENU.OVERVIEW]: 'BILLING OVERVIEW',
		[BILLING_MENU.INVOICES]: 'CURRENT INVOICES',
		[BILLING_MENU.HISTORY]: 'INVOICE HISTORY',
		[BILLING_MENU.PAYMENT]: 'MAKE A PAYMENT',
	},
};

export const STORAGE_AVATAR_URL_PREFIX = 'https://www.mydcblox.com/cdn/library/storage';

export const SITE_COLORS = {
	DCBLOX_Red: '#f23722',
	DCBLOX_Purple: '#583a6b',
	DCBLOX_Black: '#000000',
	DCBLOX_Gray: '#5b595b',
	DCBLOX_White: '#efeeed',
	DCBLOX_Aqua: '#79d2de',
	DCBLOX_Lime: '#b5d334',
	DCBLOX_Orange: '#fcaf17',
	Med_Lime: '#a8ad00',
	Dark_Lime: '#949300',
	Med_Rust: '#df6a2e',
	Bright_Rust: '#f58145',
	Dark_Rust: '#af5222',
	Bright_Blue: '#3192f4',
	Blue: '#2a7de1',
	Dark_Blue: '#416ba9',
	Bright_Purple: '#a46cf4',
	Purple: '#9164cc',
	Dark_Purple: '#8060a9',
	Extra_Dark_Purple: '#432c52',
	Bright_Emerald: '#00B0B9',
	Emerald: '#008388',
	Dark_Emerald: '#007377',
	Cool_Gray_Dark_1: '#323e48',
	Cool_Gray_Dark_2: '#5b6670',
	Cool_Gray_Dark_3: '#7b868c',
	Cool_Gray_Med_1: '#a2a9ad',
	Cool_Gray_Med_2: '#c1c5c8',
	Cool_Gray_Med_3: '#cfd2d3',
	Cool_Gray_Light_1: '#d4d7d8',
	Cool_Gray_Light_2: '#dfe1e1',
	Cool_Gray_Light_3: '#edefef',
	Warm_Gray_Dark_1: '#24272a',
	Warm_Gray_Dark_2: '#53575a',
	Warm_Gray_Dark_3: '#6f7271',
	Warm_Gray_Med_1: '#888b8d',
	Warm_Gray_Med_2: '#9ea1a2',
	Warm_Gray_Med_3: '#b0b3b2',
	Warm_Gray_Light_1: '#c8c8c8',
	Warm_Gray_Light_2: '#dedede',
	Warm_Gray_Light_3: '#eeeeee',
	White: '#ffffff',
};

/**
 * For Portal v3
 * SITE_MAP includes url mapping for
 * modules and pages
 * */
export const SITE_MAP = {
	HOME: {
		OVERVIEW: Home,
	},
	PROFILE: {
		OVERVIEW: ProfileOverview,
		USER_CONTACT: ProfileUserContactSection,
		USER_MGMT: ProfileUserManagementSection,
		PASSWORD: ProfilePasswordSection,
		AVATAR: ProfileAvatarSection,
	},
};
