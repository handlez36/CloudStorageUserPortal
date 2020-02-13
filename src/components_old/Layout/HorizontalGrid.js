import React from 'react';

const HorizontalGrid = () => {
	return (
		<div className='horizontal-grid'>
			{new Array(53).fill(1).map(item => (
				<div className={`row-${item}`} />
			))}
		</div>
	);
};

export default HorizontalGrid;
