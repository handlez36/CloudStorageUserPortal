import React, { Fragment, Component } from 'react';
import { withRouter } from 'react-router-dom';
import { shape, string, bool, any } from 'prop-types';
import { Responsive, WidthProvider } from 'react-grid-layout';
import ResizeObserver from 'resize-observer-polyfill';

import PortalUserMgmt from 'blox_components/Profile/PortalUserMgmt/PortalUserMgmt';
import ComponentWrapper from 'sub_components/Layout/ComponentWrapper';

import VerticalDebugGrid from './VerticalDebugGrid';
import HorizontalDebugGrid from './HorizontalDebugGrid';

/**
 * Generate grid layout for vertical debug lines
 * @param {*} count
 */
const generateCols = count => {
	const cols = [];
	for (let i = 0; i < count; i++) {
		cols.push({
			i: `col${i + 1}`,
			x: i,
			y: 0,
			w: 1,
			h: 45,
			static: true,
		});
	}

	return cols;
};

/**
 * Generate grid layout for horizontal debug lines
 * @param {*} count
 * @param {*} rowCount
 */
const generateRows = (count, rowCount) => {
	const rows = [];
	for (let i = 0; i < count; i++) {
		rows.push({
			i: `row${i + 1}`,
			x: 0,
			y: i,
			w: rowCount,
			h: 1,
			static: true,
		});
	}

	return rows;
};

const ResponsiveReactGridLayout = WidthProvider(Responsive);
class BloxMicroGrid extends Component {
	constructor(props) {
		super(props);

		this.observer = null;
		this.state = {
			colCount: null,
			rowCount: null,
			grid: null,
			horizGrid: null,
		};
	}

	enableDebug = (search = '') => {
		if (search === '') return false;

		return /\?debug=on/.test(search);
	};

	updateState = (colCount, rowCount, grid, horizGrid) => {
		this.setState({ colCount, rowCount, grid, horizGrid });
	};

	componentDidMount() {
		const { name, parentEl } = this.props;
		this.observer = new ResizeObserver(entries => {
			entries.forEach(entry => {
				const { width: parentWidth, height: parentHeight } = entry.contentRect;
				const columns = Math.ceil(parentWidth / 8);
				const rows = Math.ceil(parentHeight / 8);
				const grid = generateCols(columns);
				const horizGrid = generateRows(rows, columns);
				this.updateState(columns, rows, grid, horizGrid);

				setTimeout(() => {
					const rowEls = document.querySelectorAll(`.${name} .horizontal-column`);
					rowEls.forEach(el => (el.style.width = `${parentWidth}px`));
				}, 250);
			});
		});

		setTimeout(() => {
			const wrapperElement = document.querySelector(`${parentEl}`);
			if (wrapperElement) {
				this.observer.observe(wrapperElement);
			}
		}, 1000);
	}

	/**
	 * Update layout item name ('i' parameter) by adding number of columns in grid
	 *  - ResponsiveReactGridLayout does not seem to force layout updates with
	 *    column count changes. This method appends the accurate column count
	 *    value to the layout item name to force a layout update when the column
	 *    count changes.
	 */
	updateLayoutWithColumns = contentGrid => {
		const { colCount } = this.state;

		contentGrid.forEach(layoutItem => {
			const matches = layoutItem.i.split('-');
			if (matches && matches[0]) {
				const baseItemName = matches[0];
				layoutItem.i = `${baseItemName}-${colCount}`;
			}
		});
	};

	render() {
		const { name, children, contentGrid, location } = this.props;
		const { grid: colGrid, horizGrid: hGrid, colCount, rowCount } = this.state;
		let gridClassName = name ? ` ${name}` : '';

		const showGrid = this.enableDebug(location.search);
		gridClassName = showGrid ? gridClassName + ' debug' : gridClassName;

		this.updateLayoutWithColumns(contentGrid);

		return (
			<div className={`blox-micro-grid${gridClassName}`}>
				{colCount && (
					<ResponsiveReactGridLayout
						layouts={{
							lg: contentGrid,
							md: contentGrid,
							sm: contentGrid,
							xs: contentGrid,
						}}
						measureBeforeMount={true}
						className='content-grid'
						width={1152}
						rowHeight={8}
						isDraggable={false}
						breakpoints={{ lg: 1920, md: 1152, sm: 768, xs: 600 }}
						cols={{ lg: colCount, md: colCount, sm: colCount, xs: colCount }}
						margin={[0, 0]}
					>
						{children}
					</ResponsiveReactGridLayout>
				)}
				{showGrid && colCount && (
					<Fragment>
						<VerticalDebugGrid
							layouts={{ lg: colGrid, md: colGrid, sm: colGrid, xs: colGrid }}
							columnCount={{ lg: colCount, md: colCount, sm: colCount, xs: colCount }}
							show
						/>
						<HorizontalDebugGrid
							layouts={{ lg: hGrid, md: hGrid, sm: hGrid, xs: hGrid }}
							rowCount={{ lg: rowCount, md: rowCount, sm: rowCount, xs: rowCount }}
							show
						/>
					</Fragment>
				)}
			</div>
		);
	}
}

/**
 * contentGrid - Grid layout definitions for the children elements
 * parent - parent container selector (include '.' for classNames or '#' for ids)
 * name - Grid identifier; appended to grid classname
 * showGrid - Turn debug grid lines on or off
 */
BloxMicroGrid.propTypes = {
	contentGrid: shape({
		lg: any,
		md: any,
		sm: any,
		xs: any,
	}).isRequired,
	parent: string.isRequired,
	name: string,
	showGrid: bool,
};

BloxMicroGrid.defaultProps = {
	showGrid: false,
};

// export default BloxMicroGrid;
export default withRouter(BloxMicroGrid);
