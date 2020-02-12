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
					(role === MEMBER_ROLE_TYPE || role === OWNER_ROLE_TYPE || role === 'owner     '),
			);
			access = service.length > 0;
		}

		return { access };
	}

	static hasOnlinePayment(userGroups) {
		if (!userGroups) {
			return false;
		}

		const onlinePaymentGroup = userGroups.filter(group => group.name === 'online_payments');
		return onlinePaymentGroup.length === 1;
	}

	static getUserPerms(user) {
		const { userGroups } = user;

		return userGroups.map(group => {
			return {
				name: group.name,
				role: group.role.name,
			};
		});
	}
}
