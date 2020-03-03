import React from 'react';
import BloxGrid from '../BloxMicroGrid';
import LogoutComponent from './LogoutComponent';
import AccountsComponent from './AccountsComponent';
const HeaderSection = props => {
	const grid = [
		{ i: 'logout-component', x: 0, y: 0, w: 2, h: 8, static: true },
		{ i: 'accounts-component', x: 135, y: 0, w: 2, h: 8, static: true },
	];

	return (
		<BloxGrid name='header-grid' parentEl='.portal-header' contentGrid={grid}>
			<div key='logout-component' className='logout-component'>
				<LogoutComponent />
			</div>
			<div key='accounts-component' className='accounts-component'>
				<AccountsComponent />
			</div>
		</BloxGrid>
	);
};

export default HeaderSection;
