import React from 'react';
import BloxGrid from '../BloxMicroGrid';
import LogoutComponent from './LogoutComponent';
import AccountsComponent from './AccountsComponent';
import BreadCrumbComponent from './BreadCrumbComponent';
const HeaderSection = props => {
	const LAYOUT_CONFIG = {
		[RESOLUTIONS.LOW]: {
			logoutComponent: { x: 0, y: 0, dim: DIMENSIONS.TWO_BY_TWO },
			breadcrumbComponent: { x: 6, y: 0, dim: DIMENSIONS.TWO_BY_TWO },
			accountsComponent: { x: 12, y: 0, dim: DIMENSIONS.TWO_BY_TWO },
		},
		[RESOLUTIONS.MED]: {
			logoutComponent: { x: 0, y: 0, dim: DIMENSIONS.TWO_BY_TWO },
			breadcrumbComponent: { x: 6, y: 0, dim: DIMENSIONS.TWO_BY_TWO },
			accountsComponent: { x: 12, y: 0, dim: DIMENSIONS.TWO_BY_TWO },
		},
		[RESOLUTIONS.HIGH]: {
			logoutComponent: { x: 0, y: 0, dim: DIMENSIONS.TWO_BY_TWO },
			breadcrumbComponent: { x: 6, y: 0, dim: DIMENSIONS.TWO_BY_TWO },
			accountsComponent: { x: 12, y: 0, dim: DIMENSIONS.TWO_BY_TWO },
		},
	};

	return (
		<BloxGrid name='header-grid' parentEl='.portal-header' contentGrid={grid}>
			<div key='logout-component' className='logout-component'>
				<LogoutComponent />
			</div>
			<div key='breadcrumbComponent'>
				<BreadCrumbComponent />
			</div>
			<div key='accountsComponent' className='accounts-component'>
				<AccountsComponent breakpoint={props.breakpoint} />
			</div>
		</BloxGrid>
	);
};

export default HeaderSection;
