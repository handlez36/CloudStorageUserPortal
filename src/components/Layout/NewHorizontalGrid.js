import React, { Component } from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import { Responsive, WidthProvider } from 'react-grid-layout';

import { Utils } from '../../services/utils';

const ResponsiveReactGridLayout = WidthProvider(Responsive);
const grid = [
	{ i: 'col1', x: 0, y: 0, w: 12, h: 1, static: true },
	{ i: 'col2', x: 0, y: 1, w: 12, h: 1, static: true },
	{ i: 'col3', x: 0, y: 2, w: 12, h: 1, static: true },
	{ i: 'col4', x: 0, y: 3, w: 12, h: 1, static: true },
	{ i: 'col5', x: 0, y: 4, w: 12, h: 1, static: true },
	{ i: 'col6', x: 0, y: 5, w: 12, h: 1, static: true },
	{ i: 'col7', x: 0, y: 6, w: 12, h: 1, static: true },
	{ i: 'col8', x: 0, y: 7, w: 12, h: 1, static: true },
	{ i: 'col9', x: 0, y: 8, w: 12, h: 1, static: true },
	{ i: 'col10', x: 0, y: 9, w: 12, h: 1, static: true },
	{ i: 'col11', x: 0, y: 10, w: 12, h: 1, static: true },
	{ i: 'col12', x: 0, y: 11, w: 12, h: 1, static: true },
	{ i: 'col13', x: 0, y: 12, w: 12, h: 1, static: true },
	{ i: 'col14', x: 0, y: 13, w: 12, h: 1, static: true },
	{ i: 'col15', x: 0, y: 14, w: 12, h: 1, static: true },
	{ i: 'col16', x: 0, y: 15, w: 12, h: 1, static: true },
	{ i: 'col17', x: 0, y: 16, w: 12, h: 1, static: true },
	{ i: 'col18', x: 0, y: 17, w: 12, h: 1, static: true },
	{ i: 'col19', x: 0, y: 18, w: 12, h: 1, static: true },
	{ i: 'col20', x: 0, y: 19, w: 12, h: 1, static: true },
	{ i: 'col21', x: 0, y: 20, w: 12, h: 1, static: true },
	{ i: 'col22', x: 0, y: 21, w: 12, h: 1, static: true },
	{ i: 'col23', x: 0, y: 22, w: 12, h: 1, static: true },
	{ i: 'col24', x: 0, y: 23, w: 12, h: 1, static: true },
	{ i: 'col25', x: 0, y: 24, w: 12, h: 1, static: true },
	{ i: 'col26', x: 0, y: 25, w: 12, h: 1, static: true },
	{ i: 'col27', x: 0, y: 26, w: 12, h: 1, static: true },
	{ i: 'col28', x: 0, y: 27, w: 12, h: 1, static: true },
	{ i: 'col29', x: 0, y: 28, w: 12, h: 1, static: true },
	{ i: 'col30', x: 0, y: 29, w: 12, h: 1, static: true },
	{ i: 'col31', x: 0, y: 30, w: 12, h: 1, static: true },
	{ i: 'col32', x: 0, y: 31, w: 12, h: 1, static: true },
	{ i: 'col33', x: 0, y: 32, w: 12, h: 1, static: true },
	{ i: 'col34', x: 0, y: 33, w: 12, h: 1, static: true },
	{ i: 'col35', x: 0, y: 34, w: 12, h: 1, static: true },
	{ i: 'col36', x: 0, y: 35, w: 12, h: 1, static: true },
	{ i: 'col37', x: 0, y: 36, w: 12, h: 1, static: true },
	{ i: 'col38', x: 0, y: 37, w: 12, h: 1, static: true },
	{ i: 'col39', x: 0, y: 38, w: 12, h: 1, static: true },
	{ i: 'col40', x: 0, y: 39, w: 12, h: 1, static: true },
	{ i: 'col41', x: 0, y: 40, w: 12, h: 1, static: true },
	{ i: 'col42', x: 0, y: 41, w: 12, h: 1, static: true },
	{ i: 'col43', x: 0, y: 42, w: 12, h: 1, static: true },
	{ i: 'col44', x: 0, y: 43, w: 12, h: 1, static: true },
	{ i: 'col45', x: 0, y: 44, w: 12, h: 1, static: true },
	{ i: 'col46', x: 0, y: 45, w: 12, h: 1, static: true },
	{ i: 'col47', x: 0, y: 46, w: 12, h: 1, static: true },
	{ i: 'col48', x: 0, y: 47, w: 12, h: 1, static: true },
];

class NewHorizontalGrid extends Component {
	constructor(props) {
		super(props);
		this.myObserver = null;
		this.state = {
			rowHeight: 0,
			margin: [],
			containerPadding: [],
			layout: [],
		};
	}

	onBreakpointChange = breakpoint => {
		let margin;
		let containerPadding;

		switch (breakpoint) {
			case 'xs':
				margin = [10, 0];
				containerPadding = [5, 5];
				break;
			case 'sm':
				margin = [12, 0];
				containerPadding = [10, 10];
				break;
			case 'md':
				margin = [22, 0];
				containerPadding = [30, 0];
				break;
			case 'lg':
				margin = [32, 0];
				containerPadding = [66, 0];
				break;
			default:
				margin = [22, 0];
				containerPadding = [30, 0];
				break;
		}

		this.setState({ margin, containerPadding });
	};

	componentDidMount() {
		this.onBreakpointChange();
		this.myObserver = new ResizeObserver(entries => {
			entries.forEach(() => {
				this.onChange();
			});
		});

		const wrapperElement = document.querySelector('.horizontal-grid');
		this.myObserver.observe(wrapperElement);
	}

	componentWillUnmount() {
		this.myObserver.disconnect();
	}

	onChange = () => {
		const newHeight = Utils.scalePxUsingRatio();
		if (window.innerHeight >= 1010 && window.innerHeight <= 1030) {
			height = 18;
		} else if (window.innerHeight >= 1400 && window.innerHeight <= 1500) {
			height = 27;
		}

		if (window.innerHeight <= 660) {
			height = 11;
		}

		this.setState({
			// rowHeight: height,
			rowHeight: newHeight,
		});
	};

	onWidthChange = () => {};

	renderCells = () => {
		const divs = [];
		for (let i = 1; i < 49; i++) {
			divs.push(<div key={`col${i}`} className='horizontal-column' />);
		}
		return divs;
	};

	render() {
		const { containerPadding, margin, rowHeight } = this.state;
		const { breakpoints } = this.props;

		return (
			<ResponsiveReactGridLayout
				layouts={{
					lg: grid,
					md: grid,
					sm: grid,
					xs: grid,
				}}
				measureBeforeMount={false}
				className='new-horizontal-grid horizontal-grid'
				// width={1252}
				rowHeight={rowHeight}
				isDraggable={false}
				breakpoints={breakpoints}
				cols={{ lg: 12, md: 12, sm: 12, xs: 12 }}
				containerPadding={containerPadding}
				onBreakpointChange={this.onBreakpointChange}
				margin={margin}
				onLayoutChange={this.onLayoutChange}
				onWidthChange={this.onWidthChange}
			>
				{this.renderCells()}
			</ResponsiveReactGridLayout>
		);
	}
}

export default NewHorizontalGrid;
