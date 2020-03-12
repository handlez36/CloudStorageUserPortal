import axios from 'axios';

const CDN_URL = process.env.REACT_APP_CDN_URL;

const companyAvatarDNALarge = `${CDN_URL}common/company-avatar-dna-lg.svg`;
const companyAvatarMapLarge = `${CDN_URL}common/company-avatar-map-lg.svg`;
const companyAvatarEnergyLarge = `${CDN_URL}common/company-avatar-energy-lg.svg`;
const companyAvatarLabLarge = `${CDN_URL}common/company-avatar-lab-lg.svg`;

const companyAvatarDNADropDownActiveLarge = `${CDN_URL}common/company-avatar-dna-dropdown-active-lg.svg`;
const companyAvatarLabDropDownActiveLarge = `${CDN_URL}common/company-avatar-lab-dropdown-active-lg.svg`;
const companyAvatarEnergyDropDownActiveLarge = `${CDN_URL}common/company-avatar-energy-dropdown-active-lg.svg`;
const companyAvatarMapDropDownActiveLarge = `${CDN_URL}common/company-avatar-map-dropdown-active-lg.svg`;

const companyAvatarLabDropDownLarge = `${CDN_URL}common/company-avatar-lab-dropdown-lg.svg`;
const companyAvatarMapDropDownLarge = `${CDN_URL}common/company-avatar-map-dropdown-lg.svg`;
const companyAvatarDNADropDownLarge = `${CDN_URL}common/company-avatar-dna-dropdown-lg.svg`;
const companyAvatarEnergyDropDownLarge = `${CDN_URL}common/company-avatar-energy-dropdown-lg.svg`;

export class CompanyProfileApi {
	constructor() {
		this.baseUrl = process.env.REACT_APP_API_BASE_URL;
		this.config = {
			withCredentials: true,
			headers: { 'Content-Type': 'application/json' },
		};
	}

	get() {
		const url = `${this.baseUrl}/billing/companyprofile`;

		return axios.get(url, this.config);
	}

	getCompanyAvatar = (position, type) => {
		if (type === 'energy') {
			return companyAvatarEnergyDropDownLarge;
		}
		return companyAvatarEnergyLarge;
	};
}
