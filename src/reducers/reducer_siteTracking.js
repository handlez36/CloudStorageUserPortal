import { MODULE_SELECT, PAGE_SELECT, ADD_BREADCRUMB } from '../actions/siteTracking';

const initialState = {
	module: 'LOGIN',
	page: 'LOGIN',
	breadCrumbs: [],
};

const checkForDuplicateBreadCrumb = (state, page) => {
	const currentBreadCrumbs = [...state.breadCrumbs];
	const filteredBreadCrumbs = [];
	currentBreadCrumbs.filter(crumb => crumb.name !== page && filteredBreadCrumbs.push(crumb));
	return filteredBreadCrumbs;
};
const setUrl = (module, action) => {
	let page = action.page.toLowerCase();
	page = page.replace(' ', '_');
	page = page.replace(' ', '_');
	let url = action.url;

	if (!url) {
		if (page === `_${module}_overview` || page === `${module}_overview`) {
			url = `/portal/${module}`;
		} else if (page === 'home') {
			url = `/portal/`;
		} else {
			url = `/portal/${module}/${page}`;
		}
	}
	console.log('URL', url);
	return url;
};

export default function(state = initialState, action) {
	switch (action.type) {
		case MODULE_SELECT:
			return { ...state, module: action.module };
		case PAGE_SELECT:
			return { ...state, page: action.page };
		case ADD_BREADCRUMB:
			const module = action.module ? action.module.toLowerCase() : '';
			const breadCrumbs = checkForDuplicateBreadCrumb(state, action.page.toLowerCase());
			const url = setUrl(module, action);

			const breadCrumb = { name: action.page.toLowerCase(), url };
			//if module has changed refresh breadcrumbs
			if (module !== state.module.toLowerCase()) {
				return { ...state, breadCrumbs: [breadCrumb] };
			} else {
				return { ...state, breadCrumbs: [...breadCrumbs, breadCrumb] };
			}

		default:
			return state;
	}
}
