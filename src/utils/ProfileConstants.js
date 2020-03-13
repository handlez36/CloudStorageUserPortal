export const MENU = {
	OVERVIEW: 'OVERVIEW',
	USER_MANAGEMENT: 'USER MANAGEMENT',
	USER_PROFILE: 'CONTACT INFO',
	PASSWORD_CHANGE: 'CHANGE PASSWORD',
	AVATAR: 'AVATAR',
};

export const USER_MANAGEMENT_MENU = {
	PORTAL: 'PORTAL',
	ROSTER: 'ROSTER',
};

export const PROFILE_COMPANY_MESSAGE_TEXT = {
	START: "Here's what we know about your company. ",
	CONTENT:
		'If any of the details below need changing, please have the primary contact inform us so we can update them.',
};

export const PROFILE_USER_MESSAGE_TEXT = {
	START: "Here's your chance to be you. ",
	CONTENT:
		"Fill in your contact information so we'll know how to get in touch with you when you need us.",
};

export const PROFILE_PASSWORD_MESSAGE_TEXT = {
	START: 'Want to change your password. ',
	CONTENT: "Enter your new password a couple of times and we'll get it changed for you.",
};

export const PROFILE_AVATAR_MESSAGE_TEXT = {
	START: 'Choose your Avatar. ',
	CONTENT:
		'Select one of the avatars below. You can always change it later if you undergo a lifesyle change, or just get bored.',
};

export const PROFILE_OVERVIEW_CARDS = {
	MY_PROFILE: 'MY_PROFILE',
	COMPANY_PROFILE: 'COMPANY_PROFILE',
};

export const LAYOUT_GRID = {
	xs: [
		{ i: 'my-services-label', x: 2, y: 2, w: 6, h: 1.5, static: true },
		{ i: 'colocation-icon', x: 2, y: 4, w: 2, h: 7, static: true },
		{ i: 'storage-icon', x: 4, y: 4, w: 2, h: 7, static: true },
		{ i: 'network-icon', x: 6, y: 4, w: 2, h: 7, static: true }, // { i: 'colocation-icon', x: 2, y: 5.5, w: 1.5, h: 7, static: true }, // { i: 'storage-icon', x: 4, y: 5.5, w: 1.5, h: 7, static: true }, // { i: 'network-icon', x: 6, y: 5.5, w: 1.5, h: 7, static: true },
		{ i: 'horizontal-bar', x: 0, y: 11, w: 10, h: 1, static: true },
		{ i: 'my-account-label', x: 2, y: 13, w: 2, h: 1.5, static: true },
		{ i: 'my-account-card', x: 2, y: 15, w: 3, h: 10, static: true },
		{ i: 'company-card', x: 2, y: 26, w: 3, h: 10, static: true },
		{ i: 'user-mgmt-label', x: 5, y: 13, w: 3, h: 1.5, static: true },
		{ i: 'portal-card', x: 5, y: 15, w: 5, h: 10, static: true },
		{ i: 'roster-card', x: 5, y: 26.5, w: 5, h: 10, static: true },
	],
	sm: [
		{ i: 'my-services-label', x: 2, y: 2, w: 6, h: 1.5, static: true },
		{ i: 'colocation-icon', x: 2, y: 4, w: 2, h: 7, static: true },
		{ i: 'storage-icon', x: 4, y: 4, w: 2, h: 7, static: true },
		{ i: 'network-icon', x: 6, y: 4, w: 2, h: 7, static: true }, // { i: 'colocation-icon', x: 2, y: 5.5, w: 1.5, h: 7, static: true }, // { i: 'storage-icon', x: 4, y: 5.5, w: 1.5, h: 7, static: true }, // { i: 'network-icon', x: 6, y: 5.5, w: 1.5, h: 7, static: true },
		{ i: 'horizontal-bar', x: 0, y: 11, w: 10, h: 1, static: true },
		{ i: 'my-account-label', x: 2, y: 13, w: 2, h: 1.5, static: true },
		{ i: 'my-account-card', x: 2, y: 15, w: 3, h: 10, static: true },
		{ i: 'company-card', x: 2, y: 26, w: 3, h: 10, static: true },
		{ i: 'user-mgmt-label', x: 5, y: 13, w: 3, h: 1.5, static: true },
		{ i: 'portal-card', x: 5, y: 15, w: 5, h: 10, static: true },
		{ i: 'roster-card', x: 5, y: 26.5, w: 5, h: 10, static: true },
	],
	md: [
		{ i: 'my-services-label', x: 2, y: 2, w: 6, h: 1.5, static: true },
		{ i: 'colocation-icon', x: 2, y: 4, w: 2, h: 7, static: true },
		{ i: 'storage-icon', x: 4, y: 4, w: 2, h: 7, static: true },
		{ i: 'network-icon', x: 6, y: 4, w: 2, h: 7, static: true },
		{ i: 'horizontal-bar', x: 0, y: 11, w: 10, h: 1, static: true },
		{ i: 'my-account-label', x: 2, y: 13, w: 2, h: 1.5, static: true },
		{ i: 'my-account-card', x: 2, y: 15, w: 3, h: 10, static: true },
		{ i: 'company-card', x: 2, y: 26, w: 3, h: 10, static: true },
		{ i: 'user-mgmt-label', x: 5, y: 13, w: 2, h: 1.5, static: true },
		{ i: 'portal-card', x: 5, y: 15, w: 5, h: 10, static: true },
		{ i: 'roster-card', x: 5, y: 25.5, w: 5, h: 10, static: true },
	],
	lg: [
		{ i: 'my-services-label', x: 2, y: 2, w: 6, h: 1.5, static: true },
		{ i: 'colocation-icon', x: 2, y: 4, w: 2, h: 7, static: true },
		{ i: 'storage-icon', x: 4, y: 4, w: 2, h: 7, static: true },
		{ i: 'network-icon', x: 6, y: 4, w: 2, h: 7, static: true },
		{ i: 'horizontal-bar', x: 0, y: 11, w: 10, h: 1, static: true },
		{ i: 'my-account-label', x: 2, y: 13, w: 2, h: 1.5, static: true },
		{ i: 'my-account-card', x: 2, y: 15, w: 3, h: 10, static: true },
		{ i: 'company-card', x: 2, y: 26, w: 3, h: 10, static: true },
		{ i: 'user-mgmt-label', x: 5, y: 13, w: 2, h: 1.5, static: true },
		{ i: 'portal-card', x: 5, y: 15, w: 5, h: 10, static: true },
		{ i: 'roster-card', x: 5, y: 25.5, w: 5, h: 10, static: true },
	],
};

export const LAYOUT_GRID_EXPANDED = {
	xs: [
		{ i: 'my-services-label', x: 2, y: 2, w: 6, h: 1.5, static: true },
		{ i: 'colocation-icon', x: 2, y: 4, w: 2, h: 7, static: true },
		{ i: 'storage-icon', x: 4, y: 4, w: 2, h: 7, static: true },
		{ i: 'network-icon', x: 6, y: 4, w: 2, h: 7, static: true }, // { i: 'colocation-icon', x: 2, y: 5.5, w: 1.5, h: 7, static: true }, // { i: 'storage-icon', x: 4, y: 5.5, w: 1.5, h: 7, static: true }, // { i: 'network-icon', x: 6, y: 5.5, w: 1.5, h: 7, static: true },
		{ i: 'horizontal-bar', x: 0, y: 11, w: 10, h: 1, static: true },
		{ i: 'my-account-label', x: 2, y: 13, w: 2, h: 1.5, static: true },
		{ i: 'my-account-card', x: 2, y: 15, w: 3, h: 10, static: true },
		{ i: 'company-card', x: 2, y: 36, w: 3, h: 10, static: true },
		{ i: 'user-mgmt-label', x: 5, y: 13, w: 3, h: 1.5, static: true },
		{ i: 'portal-card', x: 5, y: 15, w: 5, h: 10, static: true },
		{ i: 'roster-card', x: 5, y: 26.5, w: 5, h: 10, static: true },
	],
	sm: [
		{ i: 'my-services-label', x: 2, y: 2, w: 6, h: 1.5, static: true },
		{ i: 'colocation-icon', x: 2, y: 4, w: 2, h: 7, static: true },
		{ i: 'storage-icon', x: 4, y: 4, w: 2, h: 7, static: true },
		{ i: 'network-icon', x: 6, y: 4, w: 2, h: 7, static: true }, // { i: 'colocation-icon', x: 2, y: 5.5, w: 1.5, h: 7, static: true }, // { i: 'storage-icon', x: 4, y: 5.5, w: 1.5, h: 7, static: true }, // { i: 'network-icon', x: 6, y: 5.5, w: 1.5, h: 7, static: true },
		{ i: 'horizontal-bar', x: 0, y: 11, w: 10, h: 1, static: true },
		{ i: 'my-account-label', x: 2, y: 13, w: 2, h: 1.5, static: true },
		{ i: 'my-account-card', x: 2, y: 15, w: 3, h: 10, static: true },
		{ i: 'company-card', x: 2, y: 36, w: 3, h: 10, static: true },
		{ i: 'user-mgmt-label', x: 5, y: 13, w: 3, h: 1.5, static: true },
		{ i: 'portal-card', x: 5, y: 15, w: 5, h: 10, static: true },
		{ i: 'roster-card', x: 5, y: 26.5, w: 5, h: 10, static: true },
	],
	md: [
		{ i: 'my-services-label', x: 2, y: 2, w: 6, h: 1.5, static: true },
		{ i: 'colocation-icon', x: 2, y: 4, w: 2, h: 7, static: true },
		{ i: 'storage-icon', x: 4, y: 4, w: 2, h: 7, static: true },
		{ i: 'network-icon', x: 6, y: 4, w: 2, h: 7, static: true },
		{ i: 'horizontal-bar', x: 0, y: 11, w: 10, h: 1, static: true },
		{ i: 'my-account-label', x: 2, y: 13, w: 2, h: 1.5, static: true },
		{ i: 'my-account-card', x: 2, y: 15, w: 3, h: 10, static: true },
		{ i: 'company-card', x: 2, y: 36, w: 3, h: 10, static: true },
		{ i: 'user-mgmt-label', x: 5, y: 13, w: 2, h: 1.5, static: true },
		{ i: 'portal-card', x: 5, y: 15, w: 5, h: 10, static: true },
		{ i: 'roster-card', x: 5, y: 25.5, w: 5, h: 10, static: true },
	],
	lg: [
		{ i: 'my-services-label', x: 2, y: 2, w: 6, h: 1.5, static: true },
		{ i: 'colocation-icon', x: 2, y: 4, w: 2, h: 7, static: true },
		{ i: 'storage-icon', x: 4, y: 4, w: 2, h: 7, static: true },
		{ i: 'network-icon', x: 6, y: 4, w: 2, h: 7, static: true },
		{ i: 'horizontal-bar', x: 0, y: 11, w: 10, h: 1, static: true },
		{ i: 'my-account-label', x: 2, y: 13, w: 2, h: 1.5, static: true },
		{ i: 'my-account-card', x: 2, y: 15, w: 3, h: 10, static: true },
		{ i: 'company-card', x: 2, y: 36, w: 3, h: 10, static: true },
		{ i: 'user-mgmt-label', x: 5, y: 13, w: 2, h: 1.5, static: true },
		{ i: 'portal-card', x: 5, y: 15, w: 5, h: 10, static: true },
		{ i: 'roster-card', x: 5, y: 25.5, w: 5, h: 10, static: true },
	],
};
