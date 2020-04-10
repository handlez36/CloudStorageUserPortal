import React from 'react';

import LogoutComponent from './LogoutComponent';
import AccountsComponent from './AccountsComponent';
import BreadCrumbComponent from './BreadCrumbComponent';

const HeaderSection = ({ breakpoint, module: COMPANYModule, history }) => {
	return (
		<div className='header-section'>
			<div className='logout-component-section'>
				<LogoutComponent module={COMPANYModule} history={history} />
			</div>
			<div className='breadcrumb-component'>
				<BreadCrumbComponent history={history} breakpoint={breakpoint} />
			</div>
			<div className='accounts-component'>
				<AccountsComponent breakpoint={breakpoint} module={COMPANYModule} />
			</div>
		</div>
	);
};

export default HeaderSection;
