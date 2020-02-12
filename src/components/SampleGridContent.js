import React, { Component } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import ResizeObserver from 'resize-observer-polyfill';

const TestInnerContent = props => {
	// return <div key='card-inner-content' className='card-inner-content' />;
	return <div key='card1' className='sample-card-1' />;
};

const grid = [
	{ i: 'card1', x: 5, y: 5, w: 10, h: 10, static: true },
	{ i: 'card-inner-content', x: 5, y: 5, w: 2, h: 2, static: true },
];
const ResponsiveReactGridLayout = WidthProvider(Responsive);
let observer = null;

// const SampleGridContent = props => {
class SampleGridContent extends Component {
	state = {
		colCount: 96,
		rowCount: 96,
	};

	componentDidMount() {
		observer = new ResizeObserver(entries => {
			entries.forEach(() => {
				const { innerWidth: screenWidth, innerHeight: screenHeight } = window;
				const columns = Math.ceil(screenWidth / 8);
				const rows = Math.ceil(screenHeight / 8);

				this.setState({ colCount: columns, rowCount: rows });
			});
		});

		const wrapperElement = document.querySelector('body');
		observer.observe(wrapperElement);
	}

	render() {
		const { colCount: columns, rowCount: rows } = this.state;
		return (
			<div className='sample-grid-content'>
				<ResponsiveReactGridLayout
					layouts={{
						lg: grid,
						md: grid,
						sm: grid,
						xs: grid,
					}}
					measureBeforeMount={false}
					className='content-grid'
					width={2560}
					rowHeight={8}
					isDraggable={false}
					breakpoints={{ lg: 2560, md: 1440, sm: 1024, xs: 800 }}
					cols={{ lg: columns, md: columns, sm: columns, xs: columns }}
					margin={[0, 0]}
					// containerPadding={containerPadding}
					// onBreakpointChange={this.onBreakpointChange}
					// margin={margin}
					// onLayoutChange={this.onLayoutChange}
					// onWidthChange={this.onWidthChange}
				>
					<div key='card1' className='sample-card-1' />
					<TestInnerContent />
				</ResponsiveReactGridLayout>
			</div>
		);
	}
}

export default SampleGridContent;
