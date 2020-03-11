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
			console.log('STATE', state.module);
			const breadCrumb = { name: action.page };
			return { ...state, breadCrumbs: [...state.breadCrumbs, breadCrumb] };

		default:
			return state;
	}
}
