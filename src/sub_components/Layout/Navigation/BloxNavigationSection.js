import React from 'react';

import BloxGrid from './../BloxMicroGrid';
import NavMenu from './NavMenu';

const BloxNavigationSection = props => {
	const grid = [{ i: 'nav-wrapper', x: 0, y: 0, w: 30, h: 95, static: true }];

	return (
		<BloxGrid name='nav-grid' parentEl='.main-nav' contentGrid={grid}>
			<div key='nav-wrapper' className='nav-wrapper'>
				<NavMenu />
			</div>
		</BloxGrid>
	);
};

export default BloxNavigationSection;
