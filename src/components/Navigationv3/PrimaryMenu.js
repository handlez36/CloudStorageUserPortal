import React, { Component } from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import PrimaryColumn from './PrimaryColumnSide';
import MenuItems from './MenuItems';
import { Utils, SIDES } from '../../services/utils';
const CDN_URL = process.env.REACT_APP_CDN_URL;
const MenuTriangle = `${CDN_URL}navigation/nav-primary-module-top.svg`;
const MenuTriangleBottom = `${CDN_URL}navigation/nav-primary-bottom-triangle.svg`;
const BottomShadow = `${CDN_URL}navigation/nav-primary-bottom-shadow.svg`;
class PrimaryMenu extends Component {
	constructor(props) {
		super(props);
		this.myObserver = null;
		this.state = {
			navHeight: null,
			screenSize: null,
			column: null,

			showPrimaryMenu: true,
		};
	}

	componentDidMount() {
		const clientHeight = document.getElementById('menu-primary').clientHeight;
		this.setNavHeight(clientHeight);

		this.myObserver = new ResizeObserver(entries => {
			let newClientHeight;
			try {
				newClientHeight = document.getElementById('menu-primary').clientHeight;
			} catch (e) {}

			entries.forEach(() => {
				this.checkScreenSize();
				this.setNavHeight(newClientHeight);
				this.setGradientPercentage();
			});
		});

		setTimeout(() => {
			const wrapperElement = document.querySelector('.main-content');
			if (wrapperElement) {
				this.myObserver.observe(wrapperElement);
			}
		}, 500);
	}

	setGradientPercentage = () => {
		const { gradientLine, percentage, crossPoint } = Utils.calculateGradientPath(
			'top-graphic',
			'bottom-graphic',
			SIDES.LEFT,
		);

		this.setState({ percentage });
	};
	checkScreenSize = () => {
		const screenSize = window.innerWidth;

		this.setState({ screenSize });
	};

	setNavHeight(menuItemsHeight) {
		const screenSize = window.innerWidth;
		const bottomTriangle = document.getElementById('bottom-section-primary');
		const bottomShadow = document.getElementById('bottom-shadow-primary');
		let margin;
		let shadowMargin;
		let height;
		if (screenSize >= 2560) {
			height = 170;
			margin = menuItemsHeight + 85;
			shadowMargin = menuItemsHeight + 233;
		} else if (screenSize >= 1024) {
			height = 145;
			margin = menuItemsHeight + 57;
			shadowMargin = menuItemsHeight + 207;
		} else {
			height = 130;
			margin = menuItemsHeight + 30;
			shadowMargin = menuItemsHeight + 253;
		}
		if (bottomTriangle) {
			bottomTriangle.setAttribute('style', `margin-bottom: -${margin}px`);
		}
		if (bottomShadow) {
			bottomShadow.setAttribute('style', `margin-bottom: -${shadowMargin}px`);
		}
		const newHeight = height + menuItemsHeight;

		this.setState({ navHeight: newHeight });
	}
	render() {
		const { columnWidth, onMouseLeave } = this.props;
		const { navHeight } = this.state;
		const menu = [
			{ name: 'Home' },
			{ name: 'Billing' },
			{ name: 'Storage' },
			// { name: 'Support' },
			// { name: 'Hello' },
			// { name: 'Next' },
			// { name: 'Hey' },
			// { name: 'Ticket History' },
			// { name: 'Menu' },
			// { name: 'Navigation' },
		];
		return (
			<div className='nav-primary-menu' onMouseLeave={onMouseLeave}>
				<div className='top-section'>
					<img src={MenuTriangle} />
				</div>
				<div className='wrapper'>
					<div className='primary-columns'>
						<div className='left-column'>
							<PrimaryColumn
								width={columnWidth}
								navHeight={navHeight}
								side='left'
								uniqueKey='left-primary'
							/>
						</div>
						<div className='right-column'>
							<PrimaryColumn
								width={columnWidth}
								navHeight={navHeight}
								side='right'
								uniqueKey='right-primary'
							/>
						</div>
					</div>
					<div className='primary-menu-items'>
						<div className='primary-menu'>
							<MenuItems section={'support'} navigation='primary' menu={menu} />
						</div>
						<div className='bottom-section' id='bottom-section-primary'>
							<img src={MenuTriangleBottom} />
						</div>
						<div className='bottom-shadow' id='bottom-shadow-primary'>
							<img src={BottomShadow} />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default PrimaryMenu;
