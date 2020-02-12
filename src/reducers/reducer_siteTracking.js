import { MODULE_SELECT, PAGE_SELECT } from '../actions/siteTracking';

const initialState = {
	module: 'LOGIN',
	page: 'LOGIN',
};

export default function(state = initialState, action) {
	switch (action.type) {
		case MODULE_SELECT:
			return { ...state, module: action.module };
		case PAGE_SELECT:
			return { ...state, page: action.page };
		default:
			return state;
	}
}
