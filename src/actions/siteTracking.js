export const MODULE_SELECT = 'MODULE_SELECT';
export const PAGE_SELECT = 'PAGE_SELECT';
export const ADD_BREADCRUMB = 'ADD_BREADCRUMB';

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

export const addPageToBreadCrumbs = page => {
	return {
		type: ADD_BREADCRUMB,
		page,
	};
};
