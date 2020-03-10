import React, { Component } from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import { shape, obj, string } from 'prop-types';

import NavArrows from 'containers_old/Support/TicketHistory/NavArrows';
import { animateConvoCycle } from 'containers_old/Support/TicketHistory/Conversations/ConvoCycleAnimations';
const CDN_URL = process.env.REACT_APP_CDN_URL;
const UpArrow = `${CDN_URL}support/TicketHistoryIndicator.svg`;
const DownArrow = `${CDN_URL}support/TicketHistoryDOWN.svg`;

class BloxCycleView extends Component {
	constructor(props) {
		super(props);

		this.myObserver = null;
		this.state = {
			showTopArrow: false,
			showBottomArrow: false,
			scrollPos: 0,
		};
	}

	updateArrowVisibility = () => {
		const { itemClass } = this.props;
		const { scrollPos } = this.state;
		const lastItem = document.querySelector(`${itemClass}:last-child`);
		const footer = document.querySelector('.footerContainer');

		if (footer && lastItem) {
			const footerBox = footer.getBoundingClientRect();
			const lastItemBox = lastItem.getBoundingClientRect();

			this.setState({
				showBottomArrow: lastItemBox.bottom > footerBox.top,
				showTopArrow: scrollPos > 0,
			});
		} else if (!lastItem) {
			this.setState({
				showBottomArrow: false,
				showTopArrow: false,
			});
		}
	};

	scrollUp = () => {
		const { itemClass, itemWrapperClass } = this.props;
		animateConvoCycle(
			[],
			{},
			'next',
			itemClass,
			itemWrapperClass,
			this.setShowTopArrow,
			this.setShowBottomArrow,
		);

		/** Allow time for animation to finish before checking new item locations */
		setTimeout(() => {
			this.setState(
				state => ({
					...state,
					scrollPos: state.scrollPos + 1,
				}),
				this.updateArrowVisibility,
			);
		}, 450);
	};

	scrollDown = () => {
		const { itemClass, itemWrapperClass } = this.props;
		animateConvoCycle(
			[],
			{},
			'prev',
			itemClass,
			itemWrapperClass,
			this.setShowTopArrow,
			this.setShowBottomArrow,
		);

		/** Allow time for animation to finish before checking new item locations */
		setTimeout(() => {
			this.setState(
				state => ({
					...state,
					scrollPos: state.scrollPos - 1,
				}),
				this.updateArrowVisibility,
			);
		}, 450);
	};

	componentDidMount() {
		const { itemWrapperClass } = this.props;

		this.myObserver = new ResizeObserver(entries => {
			entries.forEach(entry => {
				this.updateArrowVisibility();
				this.sizeBloxCycleView();
			});
		});

		setTimeout(() => {
			const wrapperElement = document.querySelector(itemWrapperClass);
			const htmlElement = document.querySelector('html');
			if (wrapperElement) {
				this.myObserver.observe(wrapperElement);
				this.myObserver.observe(htmlElement);
			}
		}, 500);
	}

	sizeBloxCycleView = () => {
		// setTimeout(() => {
		const bloxCycleViewEl = document.querySelector('.blox-cycle-view');
		const footer = document.querySelector('.footerContainer');
		if (bloxCycleViewEl && footer) {
			const height =
				footer.getBoundingClientRect().top - bloxCycleViewEl.getBoundingClientRect().top;
			bloxCycleViewEl.setAttribute('style', `height: ${height}px`);
		}
		// }, 1000);
	};

	render() {
		const { children, arrows } = this.props;
		const { showBottomArrow, showTopArrow } = this.state;

		return (
			<div className='blox-cycle-view'>
				{showTopArrow && (
					<div className='upper-section'>
						<div className='upper-filter' />{' '}
						<NavArrows
							customClass={`up-arrow`}
							items={{}}
							arrows={{ up: arrows.up, down: arrows.down }}
							params={{}}
							direction='UP'
							onClick={this.scrollDown}
						/>
					</div>
				)}
				{children}
				{showBottomArrow && (
					<div className='lower-section lower-section-default'>
						<NavArrows
							customClass={`down-arrow`}
							items={{}}
							arrows={{ up: arrows.up, down: arrows.down }}
							params={{}}
							direction='DOWN'
							onClick={this.scrollUp}
						/>
						<div className='lower-filter' />{' '}
					</div>
				)}
			</div>
		);
	}
}

BloxCycleView.propTypes = {
	itemClass: string,
	itemWrapperClass: string,
	arrows: shape({
		up: obj,
		down: obj,
	}),
};

BloxCycleView.defaultProps = {
	arrows: {
		up: UpArrow,
		down: DownArrow,
	},
};

export default BloxCycleView;
