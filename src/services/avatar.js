const CDN_URL = process.env.REACT_APP_CDN_URL;
// Load Avatar images
const Avatar1 = `${CDN_URL}common/avatars/avatar-1.png`;
const Avatar1Pass = `${CDN_URL}common/avatars/avatar-1-thumbsup.png`;
const Avatar1Fail = `${CDN_URL}common/avatars/avatar-1-fail.png`;
const Avatar1Rectangle = `${CDN_URL}common/avatars/avatar-1-rectangle.png`;

const Avatar2 = `${CDN_URL}common/avatars/avatar-2.png`;
const Avatar2Pass = `${CDN_URL}common/avatars/avatar-2-thumbsup.png`;
const Avatar2Fail = `${CDN_URL}common/avatars/avatar-2-fail.png`;
const Avatar2Rectangle = `${CDN_URL}common/avatars/avatar-2-rectangle.png`;

const Avatar3 = `${CDN_URL}common/avatars/avatar-3.png`;
const Avatar3Pass = `${CDN_URL}common/avatars/avatar-3-thumbsup.png`;
const Avatar3Fail = `${CDN_URL}common/avatars/avatar-3-fail.png`;
const Avatar3Rectangle = `${CDN_URL}common/avatars/avatar-3-rectangle.png`;

const Avatar4 = `${CDN_URL}common/avatars/avatar-4.png`;
const Avatar4Pass = `${CDN_URL}common/avatars/avatar-4-thumbsup.png`;
const Avatar4Fail = `${CDN_URL}common/avatars/avatar-4-fail.png`;
const Avatar4Rectangle = `${CDN_URL}common/avatars/avatar-4-rectangle.png`;

const Avatar5 = `${CDN_URL}common/avatars/avatar-5.png`;
const Avatar5Pass = `${CDN_URL}common/avatars/avatar-5-thumbsup.png`;
const Avatar5Fail = `${CDN_URL}common/avatars/avatar-5-fail.png`;
const Avatar5Rectangle = `${CDN_URL}common/avatars/avatar-5-rectangle.png`;

const Avatar6 = `${CDN_URL}common/avatars/avatar-6.png`;
const Avatar6Pass = `${CDN_URL}common/avatars/avatar-6-thumbsup.png`;
const Avatar6Fail = `${CDN_URL}common/avatars/avatar-6-fail.png`;
const Avatar6Rectangle = `${CDN_URL}common/avatars/avatar-6-rectangle.png`;

const Avatar7 = `${CDN_URL}common/avatars/avatar-7.png`;
const Avatar7Pass = `${CDN_URL}common/avatars/avatar-7-thumbsup.png`;
const Avatar7Fail = `${CDN_URL}common/avatars/avatar-7-fail.png`;
const Avatar7Rectangle = `${CDN_URL}common/avatars/avatar-7-rectangle.png`;

const Avatar8 = `${CDN_URL}common/avatars/avatar-8.png`;
const Avatar8Pass = `${CDN_URL}common/avatars/avatar-8-thumbsup.png`;
const Avatar8Fail = `${CDN_URL}common/avatars/avatar-8-fail.png`;
const Avatar8Rectangle = `${CDN_URL}common/avatars/avatar-8-rectangle.png`;

const Avatar9 = `${CDN_URL}common/avatars/avatar-9.png`;
const Avatar9Pass = `${CDN_URL}common/avatars/avatar-9-thumbsup.png`;
const Avatar9Fail = `${CDN_URL}common/avatars/avatar-9-fail.png`;
const Avatar9Rectangle = `${CDN_URL}common/avatars/avatar-9-rectangle.png`;

const AdminAvatar = `${CDN_URL}common/avatars//user-admin-avatar.png`;

const Avatar10 = `${CDN_URL}common/avatars/avatar-generic.png`;

const WHICH_AVATAR = {
	NORMAL: 'NORMAL',
	SUCCESS: 'SUCCESS',
	FAIL: 'FAIL',
};

export class AvatarApi {
	constructor() {
		this.avatars = [
			Avatar1,
			Avatar2,
			Avatar3,
			Avatar4,
			Avatar5,
			Avatar6,
			Avatar7,
			Avatar8,
			Avatar9,
			Avatar10,
		];
		this.rectangleAvatars = [
			Avatar1Rectangle,
			Avatar2Rectangle,
			Avatar3Rectangle,
			Avatar4Rectangle,
			Avatar5Rectangle,
			Avatar6Rectangle,
			Avatar7Rectangle,
			Avatar8Rectangle,
			Avatar9Rectangle,
			Avatar10,
			AdminAvatar,
		];

		this.updateSuccessAvatars = [
			Avatar1Pass,
			Avatar2Pass,
			Avatar3Pass,
			Avatar4Pass,
			Avatar5Pass,
			Avatar6Pass,
			Avatar7Pass,
			Avatar8Pass,
			Avatar9Pass,
		];

		this.updateFailAvatars = [
			Avatar1Fail,
			Avatar2Fail,
			Avatar3Fail,
			Avatar4Fail,
			Avatar5Fail,
			Avatar6Fail,
			Avatar7Fail,
			Avatar8Fail,
			Avatar9Fail,
		];

		this.baseUrl = process.env.REACT_APP_API_BASE_URL;
		this.config = {
			withCredentials: true,
			headers: { 'Content-Type': 'application/json' },
		};
	}

	userProfileExists(user) {
		return user && user.userProfile;
	}

	userProfileImageExists(userProfile) {
		return Object.keys(userProfile).includes('profileImage') && userProfile.profileImage >= 0;
	}

	getUserAvatar = (user, whichAvatar = WHICH_AVATAR.NORMAL) => {
		let avatar;

		/* Check if the auth_status is passed in versus the user object within auth_status */
		if (Object.keys(user).includes('user')) {
			user = user.user;
		}

		if (this.userProfileExists(user)) {
			const { userProfile } = user;

			if (this.userProfileImageExists(userProfile)) {
				avatar = this.get(userProfile.profileImage, whichAvatar);
			} else {
				avatar = this.getGenericAvatar();
			}
		} else {
			avatar = this.getGenericAvatar();
		}

		return avatar;
	};

	get(id, whichAvatar) {
		if (!id && id !== 0) {
			return this.getGenericAvatar();
		}
		switch (whichAvatar) {
			case WHICH_AVATAR.NORMAL:
				return this.avatars[id];
			case WHICH_AVATAR.SUCCESS:
				return this.updateSuccessAvatars[id];
			case WHICH_AVATAR.FAIL:
				return this.updateFailAvatars[id];
			default:
				return this.avatars[id];
		}
	}
	getRectangleAvatars(id) {
		if (!id && id !== 0) {
			return this.getGenericAvatar();
		}
		if (id === 'admin') {
			return this.getAdminAvatar();
		} else {
			return this.rectangleAvatars[id];
		}
	}
	getAdminAvatar() {
		return this.rectangleAvatars[this.rectangleAvatars.length - 1];
	}

	getGenericAvatar() {
		return this.avatars[this.avatars.length - 1];
	}

	getAll() {
		return this.avatars.slice(0, -1);
	}
}
