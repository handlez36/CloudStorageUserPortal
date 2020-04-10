import React, { Component } from 'react';
import { string, number, bool, func } from 'prop-types';
import ResizeObserver from 'resize-observer-polyfill';

/** Print functions for scrollbar */
// console.log('Content El Scroll Height: ', contentElement.scrollHeight);
// console.log('Content El Client Height: ', contentElement.clientHeight);
// console.log('Upper: ', upper);
// console.log('Content El Scroll Top: ', contentElement.scrollTop);
// console.log('Ratio: ', ratio);
// console.log('Wrapper El Client Height: ', wrapperElement.clientHeight);
// console.log('Scrollbar margin top: ', temp);

const DEFAULT_MAX_HEIGHT = 140;

class COMPANYScrollView extends Component {
	constructor(props) {
		super(props);
		this.timers = [];

		this.state = {
			myObserver: null,
		};
	}

	getContentElement = () => {
		const { content } = this.props;

		return content ? document.querySelector(`.${content}`) : this.refs.content;
	};

	getWrapperElement = () => {
		const { wrapper } = this.props;

		return wrapper ? document.querySelector(`.${wrapper}`) : this.refs.wrapper;
	};

	onScroll = () => {
		const { name, onScroll: onScrollCallback } = this.props;

		// Grab DOM elements
		const wrapperElement = this.getWrapperElement();
		const contentElement = this.getContentElement();
		const scrollbar = document.querySelector(`.${name} .scrollbar-img`);

		// this.printDetails();
		// Scrollbar movement calculations
		const upper = Math.max(contentElement.scrollHeight - contentElement.clientHeight, 1);
		// const upper = contentElement.scrollHeight - contentElement.clientHeight;
		const ratio = Math.min(contentElement.scrollTop / upper, 1);
		const temp = Math.max(wrapperElement.clientHeight * ratio - scrollbar.clientHeight, 0);

		setTimeout(() => {
			scrollbar.setAttribute('style', `margin-top: ${temp}px`);
		}, 100);
		// if (
		// 	onScrollCallback &&
		// 	parseFloat(contentElement.scrollTop) !== parseFloat(this.props.scrollTo)
		// ) {
		if (onScrollCallback) {
			onScrollCallback(contentElement.scrollTop);
		}
	};

	scrollToElement = scrollTo => {
		const contentEl = this.getContentElement();
		if (contentEl && scrollTo !== undefined) {
			setTimeout(() => {
				contentEl.scrollTop = parseFloat(scrollTo);
			}, 400);
		}
	};

	scrollToPosition = e => {
		const contentElement = this.getContentElement();
		const pagePosition = contentElement.getBoundingClientRect();
		const topPos = pagePosition.top;
		const y = e.clientY;

		let percentageScroll = (y - topPos) / contentElement.clientHeight;
		if (percentageScroll < 0.04) {
			percentageScroll = 0;
		} else if (percentageScroll > 0.96) {
			percentageScroll = 1;
		}

		contentElement.clientHeight; //height of box
		contentElement.scrollTop = contentElement.scrollHeight * percentageScroll;
		this.onScroll();
	};

	printDetails = () => {
		// const { name } = this.props;
		// const wrapperElement = this.getWrapperElement();
		// const contentElement = this.getContentElement();
		// console.log('');
		// console.log('*********************************');
		// console.log('Wrapper El Client Height: ', wrapperElement.clientHeight);
		// console.log('Wrapper El Scroll Height: ', wrapperElement.scrollHeight);
		// console.log('Content El Scroll Height: ', contentElement.scrollHeight);
		// console.log('Content El Client Height: ', contentElement.clientHeight);
		// console.log('*********************************');
		// console.log('');
	};

	displayScrollBar = () => {
		const { name, setOverflow } = this.props;
		const { expanded } = this.props;

		const wrapperElement = this.getWrapperElement();
		const contentElement = this.getContentElement();
		const scrollbar = document.querySelector(`.${name} .scrollbar-img`);
		const track = document.querySelector(`.${name} .scrollbar-track`);

		// if (wrapperElement.scrollHeight < maxHeight) {
		if (wrapperElement.scrollHeight <= wrapperElement.clientHeight) {
			if (scrollbar.classList.contains('show')) {
				scrollbar.classList.remove('show');
				track.classList.remove('show');
			}
		}

		// this.printDetails();
		// if (expanded && wrapperElement.scrollHeight > wrapperElement.clientHeight + 1) {
		if (
			expanded &&
			(wrapperElement.scrollHeight > wrapperElement.clientHeight + 0 ||
				contentElement.scrollHeight > contentElement.clientHeight + 0)
		) {
			// if (
			// 	expanded &&
			// 	(wrapperElement.scrollHeight > wrapperElement.clientHeight + 1 ||
			// 		contentElement.scrollHeight > contentElement.clientHeight + 1)
			// ) {
			setTimeout(() => {
				if (setOverflow) {
					contentElement.setAttribute('style', 'overflow-y: scroll; scrollbar-width: none');
				}

				if (!scrollbar.classList.contains('show')) {
					scrollbar.classList.add('show');
					if (!this.props.scrollTo) {
						scrollbar.setAttribute('style', `margin-top: 0`);
					}
					track.classList.add('show');
					track.setAttribute('style', `height: ${wrapperElement.clientHeight}px`);
				}
			}, 5);
			return null;
		}
	};

	shouldComponentUpdate(nextProps) {
		return !!!nextProps.scrollTo;
	}

	componentDidUpdate() {
		const { expanded, scrollTo } = this.props;
		this.displayScrollBar(expanded);

		if (scrollTo !== undefined && scrollTo >= 0) {
			this.scrollToElement(scrollTo);
		}
	}

	componentDidMount() {
		const { scrollTo } = this.props;
		this.state.myObserver = new ResizeObserver(entries => {
			entries.forEach((entry, index) => {
				this.timers[index] = setTimeout(() => {
					this.displayScrollBar(entry, true);
				}, 400);

				if (this.props.onResize) {
					this.props.onResize();
				}
			});
		});

		const wrapper = this.getWrapperElement();
		this.state.myObserver.observe(wrapper);

		if (scrollTo) {
			this.scrollToElement(scrollTo);
		}
	}

	componentWillUnmount() {
		this.state.myObserver.disconnect();
		for (let i = 0; i < this.timers.length; i++) {
			clearTimeout(this.timers[i]);
		}
		this.timers = [];
	}

	render() {
		const { name, children, expanded } = this.props;

		return (
			<div
				className={`scroll-view section-content ${name} ${expanded ? 'expanded' : ''}`}
				onScroll={this.onScroll}
				ref='wrapper'
			>
				<div className='scrollbar-track' onMouseDown={this.scrollToPosition}>
					<div className='scrollbar-img' />
					<div className={'scrollbar-line'} />
				</div>
				<div className='content' ref='content'>
					{children}
				</div>
			</div>
		);
	}
}

COMPANYScrollView.propTypes = {
	name: string,
	wrapper: string,
	content: string,
	setOverflow: bool,
	expanded: bool,
	maxHeight: number,
	onResize: func,
};

COMPANYScrollView.defaultProps = {
	name: `scroll-view-${Math.round(Math.random(1) * 100)}`,
	setOverflow: false,
	maxHeight: DEFAULT_MAX_HEIGHT,
	expanded: false,
};

export default COMPANYScrollView;
