import React from 'react';
import BloxGrid from './BloxMicroGrid';
import LogoutComponent from './LogoutComponent';
const HeaderSection = props => {
	const grid = [{ i: 'card1', x: 0, y: 0, w: 10, h: 10, static: true }];

	return (
		<BloxGrid name='sample-header-grid' parentEl='.portal-header' contentGrid={grid}>
			<div key='card1' className='sample-card-1'>
				<LogoutComponent />
			</div>
		</BloxGrid>
	);
};

export default HeaderSection;
