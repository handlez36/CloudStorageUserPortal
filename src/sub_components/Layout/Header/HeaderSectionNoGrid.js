import React from 'react';

import LogoutComponent from './LogoutComponent';
import AccountsComponent from './AccountsComponent';
import BreadCrumbComponent from './BreadCrumbComponent';

const HeaderSection = ({ breakpoint, module: bloxModule, history }) => {
	return (
		<div className='header-section'>
			<div className='logout-component-section'>
				<LogoutComponent module={bloxModule} history={history} />
			</div>
			<div className='breadcrumb-component'>
				<BreadCrumbComponent history={history} breakpoint={breakpoint} />
			</div>
			<div className='accounts-component'>
				<AccountsComponent breakpoint={breakpoint} module={bloxModule} />
			</div>
		</div>
	);
};

export default HeaderSection;
