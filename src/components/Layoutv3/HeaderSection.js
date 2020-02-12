import React from 'react';
import BloxGrid from './BloxMicroGrid';

const HeaderSection = props => {
	const grid = [{ i: 'card1', x: 5, y: 5, w: 10, h: 10, static: true }];

	return (
		<BloxGrid name='sample-header-grid' parentEl='.portal-header' contentGrid={grid}>
			{/* <div key='card1' className='sample-card-1' /> */}
		</BloxGrid>
	);
};

export default HeaderSection;
