import React from 'react';
import { shape, any, number, bool } from 'prop-types';
import { Responsive, WidthProvider } from 'react-grid-layout';

const drawCols = count => {
	const divs = [];
	for (let i = 0; i < count; i++) {
		divs.push(<div key={`col${i + 1}`} className={`vertical-column col-${i + 1}`} />);
	}

	return divs;
};

const ResponsiveReactGridLayout = WidthProvider(Responsive);
const VerticalDebugGrid = ({ layouts, breakpoints, show, columnCount }) => {
	return (
		<ResponsiveReactGridLayout
			layouts={{
				lg: layouts.lg,
				md: layouts.md,
				sm: layouts.sm,
				xs: layouts.xs,
			}}
			measureBeforeMount={false}
			className={`vertical-grid${show ? ' show' : ''}`}
			width={2560}
			rowHeight={8}
			isDraggable={false}
			breakpoints={{
				lg: breakpoints.lg,
				md: breakpoints.md,
				sm: breakpoints.sm,
				xs: breakpoints.xs,
			}}
			cols={{ lg: columnCount.lg, md: columnCount.md, sm: columnCount.sm, xs: columnCount.xs }}
			margin={[0, 0]}
			// containerPadding={containerPadding}
			// onBreakpointChange={this.onBreakpointChange}
			// margin={margin}
			// onLayoutChange={this.onLayoutChange}
			// onWidthChange={this.onWidthChange}
		>
			{drawCols(columnCount.lg)}
		</ResponsiveReactGridLayout>
	);
};

VerticalDebugGrid.propTypes = {
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

VerticalDebugGrid.defaultProps = {
	breakpoints: shape({
		lg: 2560,
		md: 1440,
		sm: 1024,
		xs: 800,
	}),
};

export default VerticalDebugGrid;
