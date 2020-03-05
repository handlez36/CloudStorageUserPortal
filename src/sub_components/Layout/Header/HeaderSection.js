import React from 'react';
import { RESOLUTIONS } from 'services/config';
import { DIMENSIONS } from 'services/layoutManager';
import BloxPage from '../BloxPage';
import LogoutComponent from './LogoutComponent';
import AccountsComponent from './AccountsComponent';
const HeaderSection = props => {
	const LAYOUT_CONFIG = {
		[RESOLUTIONS.LOW]: {
			logoutComponent: { x: 0, y: 0, dim: DIMENSIONS.TWO_BY_TWO },
			accountsComponent: { x: 12, y: 0, dim: DIMENSIONS.TWO_BY_TWO },
		},
		[RESOLUTIONS.MED]: {
			logoutComponent: { x: 0, y: 0, dim: DIMENSIONS.TWO_BY_TWO },
			accountsComponent: { x: 12, y: 0, dim: DIMENSIONS.TWO_BY_TWO },
		},
		[RESOLUTIONS.HIGH]: {
			logoutComponent: { x: 0, y: 0, dim: DIMENSIONS.TWO_BY_TWO },
			accountsComponent: { x: 12, y: 0, dim: DIMENSIONS.TWO_BY_TWO },
		},
	};

	return (
		<BloxPage
			name='header-grid'
			layout={LAYOUT_CONFIG[props.breakpoint]}
			breakpoint={props.breakpoint}
		>
			<div key='logoutComponent' className='logout-component'>
				<LogoutComponent module={props.module} />
			</div>
			<div key='accountsComponent' className='accounts-component'>
				<AccountsComponent breakpoint={props.breakpoint} />
			</div>
		</BloxPage>
	);
};

export default HeaderSection;
