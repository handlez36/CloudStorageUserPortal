import React from 'react';

import BloxPage from 'sub_components/Layout/BloxPage';
import { RESOLUTIONS, BREAKPOINT_COLCOUNT_MAP } from 'services/config';
import { DIMENSIONS } from 'services/layoutManager';
import LogoutComponent from './LogoutComponent';
import AccountsComponent from './AccountsComponent';
import BreadCrumbComponent from './BreadCrumbComponent';

const HeaderSection = props => {
	const LAYOUT_CONFIG = {
		[RESOLUTIONS.LOW]: {
			logoutComponent: { x: 0, y: 0, dim: DIMENSIONS.TWO_BY_TWO, customHeight: 5 },
			breadcrumbComponent: { x: 6, y: 0, dim: DIMENSIONS.TWO_BY_TWO, customHeight: 5 },
			accountsComponent: { x: 12, y: 0, dim: DIMENSIONS.TWO_BY_TWO, customHeight: 5 },
		},
		[RESOLUTIONS.MED]: {
			logoutComponent: { x: 0, y: 0, dim: DIMENSIONS.TWO_BY_TWO, customHeight: 8 },
			breadcrumbComponent: { x: 6, y: 0, dim: DIMENSIONS.TWO_BY_TWO, customHeight: 8 },
			accountsComponent: { x: 12, y: 0, dim: DIMENSIONS.TWO_BY_TWO, customHeight: 8 },
		},
		[RESOLUTIONS.HIGH]: {
			logoutComponent: { x: 0, y: 0, dim: DIMENSIONS.TWO_BY_TWO, customHeight: 10 },
			breadcrumbComponent: { x: 6, y: 0, dim: DIMENSIONS.TWO_BY_TWO, customHeight: 10 },
			accountsComponent: { x: 12, y: 0, dim: DIMENSIONS.TWO_BY_TWO, customHeight: 10 },
		},
	};

	const { breakpoint } = props;
	const columnCount = BREAKPOINT_COLCOUNT_MAP[breakpoint];
	return (
		<BloxPage
			name='header-grid'
			layout={LAYOUT_CONFIG[props.breakpoint]}
			breakpoint={props.breakpoint}
		>
			<div key={`logoutComponent-${columnCount}`} className='logout-component'>
				<LogoutComponent module={props.module} history={props.history} />
			</div>
			<div key={`breadcrumbComponent-${columnCount}`}>
				<BreadCrumbComponent history={props.history} breakpoint={props.breakpoint} />
			</div>
			<div key={`accountsComponent-${columnCount}`} className='accounts-component'>
				<AccountsComponent breakpoint={props.breakpoint} module={props.module} />
			</div>
		</BloxPage>
	);
};

export default HeaderSection;
