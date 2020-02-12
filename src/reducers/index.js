import { combineReducers } from 'redux';
import AuthReducer from './reducer_authentication';
import RegistrationReducer from './reducer_registration';
import CompanyReducer from './reducer_company';
import SiteTrackingReducer from './reducer_siteTracking';

const rootReducer = combineReducers({
	auth_status: AuthReducer,
	registration_status: RegistrationReducer,
	company_info: CompanyReducer,
	site_tracking: SiteTrackingReducer,
});

export default rootReducer;
