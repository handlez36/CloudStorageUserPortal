export const MODULE_SELECT = 'MODULE_SELECT';
export const PAGE_SELECT = 'PAGE_SELECT';

export const updateModule = module => {
	return {
		type: MODULE_SELECT,
		module,
	};
};

export const updatePage = page => {
	return {
		type: PAGE_SELECT,
		page,
	};
};
