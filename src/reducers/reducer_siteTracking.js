import { MODULE_SELECT, PAGE_SELECT, ADD_BREADCRUMB } from '../actions/siteTracking';

const initialState = {
	module: 'LOGIN',
	page: 'LOGIN',
	breadCrumbs: [],
};

export default function(state = initialState, action) {
	switch (action.type) {
		case MODULE_SELECT:
			return { ...state, module: action.module };
		case PAGE_SELECT:
			return { ...state, page: action.page };
		case ADD_BREADCRUMB:
			const module = action.module.toLowerCase();
			let page = action.page.toLowerCase();
			page = page.replace(' ', '_');
			page = page.replace(' ', '_');
			let url = '';
			if (page === 'overview') {
				url = `/portal/${module}`;
			} else {
				url = `/portal/${module}/${page}`;
			}
			const breadCrumb = { name: action.page, url };
			return { ...state, breadCrumbs: [...state.breadCrumbs, breadCrumb] };

		default:
			return state;
	}
}
