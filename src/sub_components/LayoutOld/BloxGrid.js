import React, { Component } from 'react';
import { string, shape, obj, number, func, bool } from 'prop-types';
import ResizeObserver from 'resize-observer-polyfill';
import { Responsive, WidthProvider } from 'react-grid-layout';

import CrossGrid from './CrossGrid';
import { Utils } from '../../services/utils';

const NO_OP = () => {};
const ResponsiveReactGridLayout = WidthProvider(Responsive);

class COMPANYGrid extends Component {
	constructor(props) {
		super(props);

		this.myObserver = null;
		this.timeout = null;
		this.state = {
			rowHeight: 0,
			margin: [],
			containerPadding: [],
			layout: [],
		};
	}

	onChange = () => {
		const { onChange } = this.props;
		const newHeight = Utils.scalePxUsingRatio();

		// if (window.innerHeight >= 1010 && window.innerHeight <= 1030) {
		// 	height = 18;
		// } else if (window.innerHeight >= 1400 && window.innerHeight <= 1500) {
		// 	height = 27;
		// }

		// if (window.innerHeight <= 660) {
		// 	height = 11;
		// }

		this.setState({
			// rowHeight: height,
			rowHeight: newHeight,
		});

		if (onChange) {
			onChange();
		}
	};

	onBreakpointChange = breakpoint => {
		let margin;
		let containerPadding;
		const { onBreakpointChange, setCustomMarginAndPadding } = this.props;

		const { customMargin, customPadding } = setCustomMarginAndPadding
			? setCustomMarginAndPadding(breakpoint)
			: { customMargin: null, customPadding: null };

		switch (breakpoint) {
			case 'xs':
				margin = customMargin ? customMargin : [10, 0];
				containerPadding = customPadding ? customPadding : [5, 5];
				break;
			case 'sm':
				margin = customMargin ? customMargin : [12, 0];
				containerPadding = customPadding ? customPadding : [10, 10];
				break;
			case 'md':
				margin = customMargin ? customMargin : [22, 0];
				containerPadding = customPadding ? customPadding : [30, 0];
				break;
			case 'lg':
				margin = customMargin ? customMargin : [32, 0];
				containerPadding = customPadding ? customPadding : [66, 0];
				break;
			default:
				margin = customMargin ? customMargin : [22, 0];
				containerPadding = customPadding ? customPadding : [30, 0];
				break;
		}

		const horizontalRule = document.querySelector('.gray-horizontal-bar');
		if (horizontalRule) {
			horizontalRule.setAttribute('style', `margin-left: ${-containerPadding[0]}px`);
		}
		const topNavBar = document.querySelector('.top-nav-bar');
		if (topNavBar) {
			topNavBar.setAttribute('style', `margin-left: ${-containerPadding[0]}px`);
		}

		if (onBreakpointChange) {
			onBreakpointChange(breakpoint);
		}
		this.setState({ margin, containerPadding });
	};

	toggleWidgetOutlines = show => {
		const borderStyle = show ? 'border: 1px solid blue;' : 'border: none';

		let reactGridItems = document.querySelectorAll(
			'.react-grid-layout.layout > .react-grid-item > div, .react-grid-layout.layout > .react-grid-item > span',
		);
		reactGridItems = Array.from(reactGridItems);
		if (reactGridItems) {
			reactGridItems.forEach(el => {
				el.setAttribute('style', borderStyle);
			});
		}
	};

	componentDidUpdate() {
		const { showWidgetOutlines } = this.props;
		if (showWidgetOutlines) {
			this.toggleWidgetOutlines(true);
		} else if (showWidgetOutlines !== undefined) {
			this.toggleWidgetOutlines(false);
		}
	}

	componentDidMount() {
		const { namespace } = this.props;
		this.onBreakpointChange();
		this.myObserver = new ResizeObserver(entries => {
			entries.forEach(() => {
				this.onChange();
			});
		});

		const wrapperElement = document.querySelector(`.layout.${namespace}`);
		this.myObserver.observe(wrapperElement);
	}

	componentWillUnmount() {
		this.myObserver.disconnect();
		clearTimeout(this.timeout);
	}

	render() {
		const { containerPadding, margin, rowHeight } = this.state;
		const {
			namespace,
			layouts,
			layoutClassname,
			colCount,
			breakpoints,
			onLayoutChange,
			onWidthChange,
			showCrossGrid,
			showWidgetOutlines,
		} = this.props;

		return (
			<div className='COMPANY-grid'>
				<CrossGrid showGrid={showCrossGrid} breakpoints={breakpoints} />
				<ResponsiveReactGridLayout
					layouts={layouts}
					measureBeforeMount={false}
					className={`layout${layoutClassname ? ` ${layoutClassname}` : ''} ${namespace} ${
						showWidgetOutlines ? 'widget-outline' : ''
					}`}
					rowHeight={rowHeight}
					isDraggable={false}
					isResizable={false}
					breakpoints={breakpoints}
					cols={{ lg: colCount, md: colCount, sm: colCount, xs: colCount }}
					containerPadding={containerPadding}
					onBreakpointChange={this.onBreakpointChange}
					margin={margin}
					onLayoutChange={onLayoutChange}
					onWidthChange={onWidthChange}
				>
					{this.props.children}
				</ResponsiveReactGridLayout>
			</div>
		);
	}
}

COMPANYGrid.propTypes = {
	layouts: shape({
		lg: obj,
		md: obj,
		sm: obj,
		sx: obj,
	}),
	layoutClassname: string,
	colCount: number,
	breakpoints: shape({
		lg: number,
		md: number,
		sm: number,
		xs: number,
	}),
	onLayoutChange: func,
	onWidthChange: func,
	setCustomMarginAndPadding: func,
	showCrossGrid: bool,
};

COMPANYGrid.defaultProps = {
	colCount: 12,
	breakpoints: {
		lg: 1450,
		md: 930,
		sm: 640,
		xs: 400,
	},
	onLayoutChange: NO_OP,
	onWidthChange: NO_OP,
	showCrossGrid: false,
};

export default COMPANYGrid;
