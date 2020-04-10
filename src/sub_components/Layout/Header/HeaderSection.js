import React from 'react';

import COMPANYGrid from 'sub_components/Layout/COMPANYMicroGrid';
import COMPANYPage from 'sub_components/Layout/COMPANYPage';
import { RESOLUTIONS, BREAKPOINT_COLCOUNT_MAP } from 'services/config';
import { DIMENSIONS } from 'services/layoutManager';
import LogoutComponent from './LogoutComponent';
import AccountsComponent from './AccountsComponent';
import BreadCrumbComponent from './BreadCrumbComponent';

const HeaderSection = props => {
	const LAYOUT_CONFIG = {
		[RESOLUTIONS.LOW]: [
			{ i: 'logoutComponent-96', x: 0, y: 0, w: 37, h: 8, static: true },
			{ i: 'breadcrumbComponent-96', x: 114, y: 0, w: 20, h: 8, static: true },
			{ i: 'accountsComponent-96', x: 201, y: 0, w: 38, h: 8, static: true },
		],
		[RESOLUTIONS.MED]: [
			{ i: 'logoutComponent-144', x: 0, y: 0, w: 37, h: 8, static: true },
			{ i: 'breadcrumbComponent-144', x: 114, y: 0, w: 20, h: 8, static: true },
			{ i: 'accountsComponent-144', x: 201, y: 0, w: 38, h: 8, static: true },
		],
		[RESOLUTIONS.HIGH]: [
			{ i: 'logoutComponent-239', x: 0, y: 0, w: 37, h: 8, static: true },
			{ i: 'breadcrumbComponent-239', x: 114, y: 0, w: 20, h: 8, static: true },
			{ i: 'accountsComponent-239', x: 201, y: 0, w: 38, h: 8, static: true },
		],
	};

	const { breakpoint } = props;
	const columnCount = BREAKPOINT_COLCOUNT_MAP[breakpoint];

	const grid = LAYOUT_CONFIG[breakpoint];

	console.log('Column Count: ', columnCount);
	return (
		<COMPANYGrid name='header-grid' parentEl='.portal-header' contentGrid={grid} skipColUpdate>
			<div key={`logoutComponent-${columnCount}`} className='logout-component-section'>
				<LogoutComponent module={props.module} history={props.history} />
			</div>
			<div key={`breadcrumbComponent-${columnCount}`} className='breadcrumb-component'>
				<BreadCrumbComponent history={props.history} breakpoint={props.breakpoint} />
			</div>
			<div key={`accountsComponent-${columnCount}`} className='accounts-component'>
				<AccountsComponent breakpoint={props.breakpoint} module={props.module} />
			</div>
		</COMPANYGrid>
	);
	// return (
	// 	<COMPANYPage
	// 		name='header-grid'
	// 		layout={LAYOUT_CONFIG[props.breakpoint]}
	// 		breakpoint={props.breakpoint}
	// 		// parentEl='.portal-header'
	// 	>
	// 		<div key={`logoutComponent-${columnCount}`} className='logout-component'>
	// 			<LogoutComponent module={props.module} history={props.history} />
	// 		</div>
	// 		<div key={`breadcrumbComponent-${columnCount}`} className='breadcrumb-component'>
	// 			<BreadCrumbComponent history={props.history} breakpoint={props.breakpoint} />
	// 		</div>
	// 		<div key={`accountsComponent-${columnCount}`} className='accounts-component'>
	// 			<AccountsComponent breakpoint={props.breakpoint} module={props.module} />
	// 		</div>
	// 	</COMPANYPage>
	// );
};

export default HeaderSection;
