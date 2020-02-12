import React from 'react';
import { shape, any, number, bool } from 'prop-types';
import { Responsive, WidthProvider } from 'react-grid-layout';

const drawRows = count => {
	const rows = [];
	for (let i = 0; i < count; i++) {
		rows.push(<div key={`row${i + 1}`} className={`horizontal-column row-${i + 1}`} />);
	}

	return rows;
};

const ResponsiveReactGridLayout = WidthProvider(Responsive);
const HorizontalDebugGrid = ({ layouts, breakpoints, show, rowCount }) => {
	return (
		<ResponsiveReactGridLayout
			layouts={{
				lg: layouts.lg,
				md: layouts.md,
				sm: layouts.sm,
				xs: layouts.xs,
			}}
			measureBeforeMount={false}
			className={`horizontal-grid${show ? ' show' : ''}`}
			width={2560}
			rowHeight={8}
			isDraggable={false}
			breakpoints={{
				lg: breakpoints.lg,
				md: breakpoints.md,
				sm: breakpoints.sm,
				xs: breakpoints.xs,
			}}
			cols={{ lg: rowCount.lg, md: rowCount.md, sm: rowCount.sm, xs: rowCount.xs }}
			margin={[0, 0]}
			// containerPadding={containerPadding}
			// onBreakpointChange={this.onBreakpointChange}
			// margin={margin}
			// onLayoutChange={this.onLayoutChange}
			// onWidthChange={this.onWidthChange}
		>
			{drawRows(rowCount.lg)}
		</ResponsiveReactGridLayout>
	);
};

HorizontalDebugGrid.propTypes = {
	layouts: shape({
		lg: any,
		md: any,
		sm: any,
		xs: any,
	}),
	show: bool,
	breakpoints: shape({
		lg: number,
		md: number,
		sm: number,
		xs: number,
	}),
	columnCount: shape({
		lg: number,
		md: number,
		sm: number,
		xs: number,
	}),
};

HorizontalDebugGrid.defaultProps = {
	breakpoints: shape({
		lg: 2560,
		md: 1440,
		sm: 1024,
		xs: 800,
	}),
};

export default HorizontalDebugGrid;
