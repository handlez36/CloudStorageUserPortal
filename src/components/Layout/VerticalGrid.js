import React, { Component } from 'react';
import { shape, number } from 'prop-types';
import ResizeObserver from 'resize-observer-polyfill';
import { Responsive, WidthProvider } from 'react-grid-layout';

import { Utils } from '../../services/utils';

const ResponsiveReactGridLayout = WidthProvider(Responsive);
const grid = [
	{ i: 'col1', x: 0, y: 0, w: 1, h: 45, static: true },
	{ i: 'col2', x: 1, y: 0, w: 1, h: 45, static: true },
	{ i: 'col3', x: 2, y: 0, w: 1, h: 45, static: true },
	{ i: 'col4', x: 3, y: 0, w: 1, h: 45, static: true },
	{ i: 'col5', x: 4, y: 0, w: 1, h: 45, static: true },
	{ i: 'col6', x: 5, y: 0, w: 1, h: 45, static: true },
	{ i: 'col7', x: 6, y: 0, w: 1, h: 45, static: true },
	{ i: 'col8', x: 7, y: 0, w: 1, h: 45, static: true },
	{ i: 'col9', x: 8, y: 0, w: 1, h: 45, static: true },
	{ i: 'col10', x: 9, y: 0, w: 1, h: 45, static: true },
	{ i: 'col11', x: 10, y: 0, w: 1, h: 45, static: true },
	{ i: 'col12', x: 11, y: 0, w: 1, h: 45, static: true },
];

class VerticalGrid extends Component {
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

		const wrapperElement = document.querySelector('.vertical-grid');
		this.myObserver.observe(wrapperElement);
	}

	componentWillUnmount() {
		this.myObserver.disconnect();
	}

	onChange = () => {
		console.log('New Height: ', Utils.scalePxUsingRatio());
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

	onChange2 = () => {
		// let height = window.innerHeight / 53;
		let height = window.innerHeight / 48;

		if (window.innerHeight >= 1010 && window.innerHeight <= 1030) {
			height = 18;
		} else if (window.innerHeight >= 1400 && window.innerHeight <= 1500) {
			height = 27;
		}

		if (window.innerHeight <= 660) {
			height = 11;
		}

		this.setState({
			rowHeight: height,
		});
	};

	onWidthChange = () => {};

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
				className='vertical-grid'
				// width={1252}
				rowHeight={rowHeight}
				isDraggable={false}
				// breakpoints={{ lg: 1450, md: 930, sm: 640, xs: 400 }}
				breakpoints={breakpoints}
				cols={{ lg: 12, md: 12, sm: 12, xs: 12 }}
				containerPadding={containerPadding}
				onBreakpointChange={this.onBreakpointChange}
				margin={margin}
				onLayoutChange={this.onLayoutChange}
				onWidthChange={this.onWidthChange}
			>
				<div key='col1' className='vertical-column' />
				<div key='col2' className='vertical-column' />
				<div key='col3' className='vertical-column' />
				<div key='col4' className='vertical-column' />
				<div key='col5' className='vertical-column' />
				<div key='col6' className='vertical-column' />
				<div key='col7' className='vertical-column' />
				<div key='col8' className='vertical-column' />
				<div key='col9' className='vertical-column' />
				<div key='col10' className='vertical-column' />
				<div key='col11' className='vertical-column' />
				<div key='col12' className='vertical-column' />
			</ResponsiveReactGridLayout>
		);
	}
}

VerticalGrid.propTypes = {
	breakpoints: shape({
		lg: number,
		md: number,
		sm: number,
		xs: number,
	}),
};

VerticalGrid.defaultProps = {
	breakpoints: { lg: 1450, md: 930, sm: 640, xs: 400 },
};

export default VerticalGrid;
