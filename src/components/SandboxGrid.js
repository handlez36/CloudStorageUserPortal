import React, { Component } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

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

const drawCols = count => {
	const divs = [];
	for (let i = 0; i < count; i++) {
		divs.push(<div key={`col${i + 1}`} className={`vertical-column col-${i + 1}`} />);
	}

	return divs;
};

const drawRows = count => {
	const rows = [];
	for (let i = 0; i < count; i++) {
		rows.push(<div key={`row${i + 1}`} className={`horizontal-column row-${i + 1}`} />);
	}

	return rows;
};

let observer = null;
class SandboxGrid extends Component {
	state = {
		colCount: 96,
		rowCount: 96,
		grid: null,
		horizGrid: null,
	};

	componentDidMount() {
		observer = new ResizeObserver(entries => {
			entries.forEach(() => {
				const { innerWidth: screenWidth, innerHeight: screenHeight } = window;
				const columns = Math.ceil(screenWidth / 8);
				const rows = Math.ceil(screenHeight / 8);
				const grid = generateCols(columns);
				const horizGrid = generateRows(rows, columns);
				this.setState({ colCount: columns, rowCount: rows, grid, horizGrid });

				console.log(`Stats at ${screenWidth}x${screenHeight}: Cols - ${columns}; Rows - ${rows}`);
				setTimeout(() => {
					const rowEls = document.querySelectorAll(`.horizontal-column`);
					rowEls.forEach(el => (el.style.width = `${screenWidth}px`));
				}, 50);
			});
		});

		const wrapperElement = document.querySelector('body');
		observer.observe(wrapperElement);
	}

	render() {
		const { showGrid } = this.props;
		const { grid: colGrid, horizGrid: hGrid, colCount, rowCount } = this.state;
		return (
			<div className='sandbox-test-grid'>
				<ResponsiveReactGridLayout
					layouts={{
						lg: colGrid,
						md: colGrid,
						sm: colGrid,
						xs: colGrid,
					}}
					measureBeforeMount={false}
					className={`vertical-grid${showGrid ? ' show' : ''}`}
					width={2560}
					rowHeight={8}
					isDraggable={false}
					breakpoints={{ lg: 2560, md: 1440, sm: 1024, xs: 800 }}
					cols={{ lg: colCount, md: colCount, sm: colCount, xs: colCount }}
					margin={[0, 0]}
					// containerPadding={containerPadding}
					// onBreakpointChange={this.onBreakpointChange}
					// margin={margin}
					// onLayoutChange={this.onLayoutChange}
					// onWidthChange={this.onWidthChange}
				>
					{drawCols(colCount)}
				</ResponsiveReactGridLayout>
				<ResponsiveReactGridLayout
					layouts={{
						lg: hGrid,
						md: hGrid,
						sm: hGrid,
						xs: hGrid,
					}}
					measureBeforeMount={false}
					className={`horizontal-grid${showGrid ? ' show' : ''}`}
					width={2560}
					rowHeight={8}
					// rowHeight={20}
					isDraggable={false}
					breakpoints={{ lg: 2560, md: 1440, sm: 1024, xs: 800 }}
					cols={{ lg: colCount, md: colCount, sm: colCount, xs: colCount }}
					margin={[0, 0]}
					// containerPadding={containerPadding}
					// onBreakpointChange={this.onBreakpointChange}
					// margin={margin}
					// onLayoutChange={this.onLayoutChange}
					// onWidthChange={this.onWidthChange}
				>
					{drawRows(rowCount)}
				</ResponsiveReactGridLayout>
			</div>
		);
	}
}

export default SandboxGrid;
