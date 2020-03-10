import axios from 'axios';

import { ClientData } from './clientData';

export const setAxiosDefaults = async () => {
	const ip = await ClientData.getClientIp();
	axios.defaults.headers.common['clientip'] = ip;
};

export const setCompanyIdHeader = id => {
	axios.defaults.headers.common['companyid'] = id;
};

export const getCompanyIdHeader = id => {
	return axios.defaults.headers.common['companyid'];
};

export const RESOLUTIONS = {
	LOW: 928,
	MED: 1344,
	HIGH: 2240,
};

export const BREAKPOINT_COLCOUNT_MAP = {
	[RESOLUTIONS.LOW]: 96,
	[RESOLUTIONS.MED]: 144,
	[RESOLUTIONS.HIGH]: 240,
};
