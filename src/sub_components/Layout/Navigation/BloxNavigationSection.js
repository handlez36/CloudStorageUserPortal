import React from 'react';

import COMPANYGrid from './../COMPANYMicroGrid';
import NavMenu from './NavMenu';

const COMPANYNavigationSection = props => {
	const grid = [{ i: 'nav-wrapper', x: 0, y: 0, w: 30, h: 95, static: true }];

	return (
		<COMPANYGrid name='nav-grid' parentEl='.main-nav' contentGrid={grid}>
			<div key='nav-wrapper' className='nav-wrapper'>
				<NavMenu module={props.module} history={props.history} />
			</div>
		</COMPANYGrid>
	);
};

export default COMPANYNavigationSection;
