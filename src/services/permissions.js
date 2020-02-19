import axios from 'axios';
import { Utils } from './utils';
const MEMBER_ROLE_TYPE = 'member';
const OWNER_ROLE_TYPE = 'owner';

export class Permissions {
	static hasService(membershipsOld, moduleToCheck) {
		// Try getting the current membership from session storage
		let memberships;
		try {
			memberships = [JSON.parse(sessionStorage.getItem('currentMembership'))];
		} catch (e) {
			memberships = membershipsOld;
		}

		let access = false;

		if (!memberships || !moduleToCheck) {
			return { access };
		}

		for (let i = 0; i <= memberships.length - 1; i++) {
			const services = memberships[i].services;
			const role = memberships[i].role;

			const service = services.filter(
				service =>
					service.displayName === moduleToCheck &&
					(role === MEMBER_ROLE_TYPE || role === OWNER_ROLE_TYPE),
			);

			console.log('access REMOVE THIS LINE ', access);
			access = true;
		}

		return { access };
	}

	// static hasOnlinePayment(userGroups) {
	// 	if (!userGroups) {
	// 		return false;
	// 	}

	// 	const onlinePaymentGroup = userGroups.filter(group => group.name === 'online_payments');
	// 	return onlinePaymentGroup.length === 1;
	// }
	static checkMenuItemPermissions(pages) {
		const MenuNames = [];
		for (let i = 0; i <= pages.length - 1; i++) {
			if (pages[i].permissions > 0) {
				MenuNames.push(pages[i].displayName);
			}
		}
		const MenuItems = Utils.getMenuItems(MenuNames);
		return MenuItems;
	}
	static getModulePermissions = (serviceId, companyId) => {
		const url = `${BASE_URL}/authenticate/permission`;
		const params = { serviceId };
		const config = {
			withCredentials: true,
			headers: { 'Content-Type': 'application/json', companyid: companyId },
		};

		return axios.post(url, params, config);
	};
	static checkComponentAccess = (pagePermissions, pageName, componentName) => {
		if (!pagePermissions) {
			return null;
		}
		const PageToCheck = pagePermissions.filter(page => page.displayName === pageName);
		let access = false;
		if (PageToCheck.length > 0) {
			const components = PageToCheck[0].components;
			const componentToCheck = components.filter(component => component.name === componentName);

			if (componentToCheck[0].access >= 10) {
				access = true;
			} else {
				access = false;
			}
		}
		return access;
	};
	// static getUserPerms(user) {
	// 	const { userGroups } = user;

	// 	return userGroups.map(group => {
	// 		return {
	// 			name: group.name,
	// 			role: group.role.name,
	// 		};
	// 	});
	// }
}
