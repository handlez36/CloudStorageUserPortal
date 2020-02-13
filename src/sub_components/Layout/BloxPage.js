import React from 'react';
import { string } from 'prop-types';
import each from 'lodash/each';

// import BloxGrid from './../Layoutv3/BloxMicroGrid';
// import LayoutManager from './../../services/layoutManager';

/** v3 imports */
import BloxGrid from './BloxMicroGrid';
import LayoutManager from './../../services/layoutManager';

const createGrid = (layoutConfig, breakpoint) => {
	const layoutManager = new LayoutManager(breakpoint);
	const grid = [];

	each(layoutConfig, (value, key) => {
		grid.push(
			layoutManager.getGridLocation(key, value.x, value.y, value.dim, value.customHeight || null),
		);
	});

	return grid;
};

const BloxPage = ({ name, layout, parentEl, breakpoint, children }) => {
	const grid = createGrid(layout, breakpoint);

	return (
		<BloxGrid name={name} parentEl={parentEl} contentGrid={grid}>
			{children}
		</BloxGrid>
	);
};

BloxPage.propTypes = {
	parentEl: string,
};

BloxPage.defaultProps = {
	parentEl: '.main-content',
};

export default BloxPage;
