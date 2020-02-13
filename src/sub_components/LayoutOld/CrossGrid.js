import React from 'react';
import { bool } from 'prop-types';

import HorizontalGrid from './NewHorizontalGrid';
import VerticalGrid from './VerticalGrid';

const CrossGrid = ({ showGrid, breakpoints }) => {
	return showGrid ? (
		<div className='cross-grid'>
			<HorizontalGrid breakpoints={breakpoints} />
			<VerticalGrid breakpoints={breakpoints} />
		</div>
	) : null;
};

CrossGrid.propTypes = {
	showGrid: bool,
};

CrossGrid.defaultProps = {
	showGrid: false,
};

export default CrossGrid;
