import React from 'react';
import { string } from 'prop-types';
import each from 'lodash/each';

import COMPANYGrid from './COMPANYMicroGrid';
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

const COMPANYPage = ({ name, layout, parentEl, breakpoint, children }) => {
	const grid = createGrid(layout, breakpoint);

	return (
		<COMPANYGrid name={name} parentEl={parentEl} contentGrid={grid}>
			{children}
		</COMPANYGrid>
	);
};

COMPANYPage.propTypes = {
	parentEl: string,
};

COMPANYPage.defaultProps = {
	parentEl: '.main-content',
};

export default COMPANYPage;
