import React, { Component, Fragment } from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import { Utils, SIDES } from 'services/utils';
import { RESOLUTIONS } from 'services/config';
import { Permissions } from 'services/permissions';
import ColumnSide from './ColumnSide';
import MenuItems from './MenuItems';
import PrimaryMenu from './PrimaryMenu';

const CDN_URL = process.env.REACT_APP_CDN_URL;
const Layer2 = `${CDN_URL}navigation/nav-layer-2.svg`;
const MenuArrowActive = `${CDN_URL}navigation/nav-menu-triangle-active.svg`;
const MenuArrow = `${CDN_URL}navigation/nav-menu-triangle.svg`;

class SecondaryMenu extends Component {
	constructor(props) {
		super(props);
		this.myObserver = null;
		this.state = {
			navHeight: null,
			screenSize: null,
			column: null,
			columnWidth: null,
			showPrimaryMenu: false,
			menu: null,
		};
	}
	componentDidMount() {
		const { module } = this.props;
		let clientHeight;
		try {
			clientHeight = document.getElementById('menu-secondary').clientHeight;
		} catch (e) {}
		this.getMenuNames(module);
		this.setNavHeight(clientHeight);
		this.setColumnWidth();
		this.myObserver = new ResizeObserver(entries => {
			// const newClientHeight = document.getElementById('menu-secondary').clientHeight;
			const newClientHeight = document.getElementById('menu-secondary')
				? document.getElementById('menu-secondary').clientHeight
				: null;
			entries.forEach(() => {
				this.checkScreenSize();
				this.setColumnWidth();
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

	componentDidUpdate(prevProps, prevState) {
		const { menu } = this.state;
		const { module } = this.props;
		if (menu !== null && menu !== prevState.menu) {
			let clientHeight;
			try {
				clientHeight = document.getElementById('menu-secondary').clientHeight;
			} catch (e) {}

			this.setNavHeight(clientHeight);
			this.setColumnWidth();
		}
		if (module !== prevProps.module) {
			this.getMenuNames(module);
		}
	}
	setGradientPercentage = () => {
		try {
			const { gradientLine, percentage, crossPoint } = Utils.calculateGradientPath(
				'top-graphic',
				'bottom-graphic',
				SIDES.LEFT,
			);
			this.setState({ percentage });
		} catch (e) {}
	};
	checkScreenSize = () => {
		const screenSize = window.innerWidth;

		this.setState({ screenSize });
	};

	setNavHeight(menuItemsHeight) {
		if (!menuItemsHeight) return;
		const screenSize = window.innerWidth;
		let height;
		if (screenSize >= RESOLUTIONS.HIGH) {
			height = 270;
		} else if (screenSize >= RESOLUTIONS.MED) {
			height = 217;
		} else {
			height = 182;
		}
		const newHeight = height + menuItemsHeight;

		this.setState({ navHeight: newHeight });
	}

	setColumnWidth = () => {
		const { navHeight, screenSize } = this.state;

		let columnWidth;
		if (screenSize >= RESOLUTIONS.HIGH) {
			columnWidth = 104.5;
		} else if (screenSize > RESOLUTIONS.MED) {
			columnWidth = 72;
		} else {
			columnWidth = 56;
		}

		this.setState({ columnWidth });
	};

	onMouseOver = () => {
		const { showPrimaryMenu } = this.state;
		if (!showPrimaryMenu) {
			this.setState({ showPrimaryMenu: true });
		}
	};
	onMouseLeave = () => {
		const { showPrimaryMenu } = this.state;
		if (showPrimaryMenu) {
			this.setState({ showPrimaryMenu: false });
		}
	};
	getMenuNames = async module => {
		const ModuleNumber = Utils.getModuleNumber(module);
		const response = await Permissions.getModulePermissions(ModuleNumber);

		if (response && !response.data.error) {
			const pages = response.data.pages;
			const menu = Permissions.checkMenuItemPermissions(pages);
			this.setState({ menu });
		}
	};

	render() {
		const { columnWidth, navHeight, percentage, showPrimaryMenu, menu } = this.state;
		const { module } = this.props;
		const Assets = Utils.getNavigationAssets(module, 'md');
		const TopGraphic = Assets.top;
		const BottomGraphic = Assets.bottom;

		return (
			<div className='nav-menu-secondary'>
				<div className='columns-wrapper'>
					<span className='top-graphic'>
						<img src={TopGraphic} />{' '}
					</span>
					<span className='columns'>
						<span className='left-column'>
							<ColumnSide
								navHeight={navHeight}
								width={columnWidth}
								percentage={percentage}
								side='left'
							/>
						</span>

						<span className='right-column'>
							<ColumnSide
								navHeight={navHeight}
								width={columnWidth}
								percentage={percentage}
								side='right'
							/>
						</span>
					</span>
					<span className='bottom-graphic' onMouseOver={this.onMouseOver}>
						<img id='bottomGraphic' src={BottomGraphic} />
					</span>
					{showPrimaryMenu && (
						<Fragment>
							<div className='primary-menu-wrapper'>
								<PrimaryMenu
									columnWidth={columnWidth}
									onMouseLeave={this.onMouseLeave}
									module={module}
								/>
							</div>
							<div className='primary-menu-active-shadow' />
						</Fragment>
					)}
					<MenuItems section={module} navigation='secondary' menu={menu} />
					<div className={showPrimaryMenu ? 'menu active' : 'menu'}>
						<span className='text nav-menu'>MENU</span>
						<span className='arrow'>
							<img src={showPrimaryMenu ? MenuArrowActive : MenuArrow} />
						</span>
					</div>
					<div className='layer-2'>
						<img src={Layer2} />{' '}
					</div>
				</div>
			</div>
		);
	}
}

export default SecondaryMenu;
