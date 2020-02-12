import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ResizeObserver from 'resize-observer-polyfill';

/**
 * Component that creates a vertical, side menu
 */
export default class SideMenu extends Component {
	constructor(props) {
		super(props);

		this.state = {
			active: Object.keys(this.props.menuItems)[0],
		};
	}

	/**
	 * Returns JSX with a vertical list of menu options that are clickable
	 * @param menuItems - See proptypes below
	 */
	constructMenu(menuItems) {
		if (!menuItems) {
			return <div>No Menu</div>;
		}

		const menu = [];
		let index = 0;
		const { active: incomingActive } = this.props;

		for (const [menuItemName, component] of Object.entries(menuItems)) {
			const isActive = incomingActive ? index === incomingActive - 1 : index === 0;
			menu.push(
				<div
					key={menuItemName}
					// className={`menu-item-name menu-item-box ${index === 0 ? 'active' : ''}`}
					className={`menu-item-name menu-item-box ${isActive ? 'active' : ''}`}
					onClick={() => this.onClick(menuItemName, component)}
					data-item={menuItemName}
				>
					{menuItemName}
				</div>,
			);
			index++;
		}
		return <div className='menu-container'>{menu}</div>;
	}

	/**
	 * onClick handler that calls the parent component once an item is clicked
	 */
	onClick = (itemName, itemIndex) => {
		const { callback } = this.props;

		this.swapActiveClass(itemIndex);
		this.moveMenuSelectorIcon(itemIndex);

		callback(itemName);
	};

	swapActiveClass = active => {
		const currentlySelectedMenuItem = document.querySelector('.menu-item-box.active');
		if (currentlySelectedMenuItem) {
			currentlySelectedMenuItem.classList.remove('active');
		}

		const selectedMenuItem = document.querySelector(`.menu-item-box:nth-child(${active})`);
		selectedMenuItem.classList.add('active');
	};

	syncCrossMark = activeMenuItemMidway => {
		const selector = document.querySelector('.selector-img');
		const crossmark = document.querySelector('.crossmark');
		const portalHeader = document.querySelector('.portal-header');
		const portalHeaderHeight = portalHeader ? portalHeader.getBoundingClientRect().height : 0;

		if (selector && crossmark) {
			const crossmarkBounds = crossmark.getBoundingClientRect();
			const crossmarkHalfHeight = crossmarkBounds.height / 2;

			crossmark.setAttribute(
				'style',
				`transform: translateY(${activeMenuItemMidway -
					portalHeaderHeight -
					crossmarkHalfHeight}px)`,
			);
		}
	};

	moveMenuSelectorIcon() {
		const activeMenuItem = document.querySelector('.menu-item-box.active');
		const selectorIcon = document.querySelector('.selector-img');
		const portalHeader = document.querySelector('.portal-header');
		const portalHeaderHeight = portalHeader ? portalHeader.getBoundingClientRect().height : 0;

		/**
		 * Alternate diff calculation
		 */
		if (activeMenuItem && selectorIcon) {
			const activeMenuItemMidway =
				activeMenuItem.getBoundingClientRect().top +
				activeMenuItem.getBoundingClientRect().height / 2;

			const diff =
				activeMenuItemMidway - portalHeaderHeight - selectorIcon.getBoundingClientRect().height / 2;
			// Move selector
			selectorIcon.setAttribute(
				'style',
				`-webkit-transform: translateY(${diff}px);
		         -ms-transform: translateY(${diff}px);
		         transform: translateY(${diff}px);
		        `,
			);

			this.syncCrossMark(activeMenuItemMidway);
		}
	}

	componentDidUpdate() {
		const { active } = this.props;
		try {
			if (active) {
				this.swapActiveClass(active);
				this.moveMenuSelectorIcon(active);
			}
		} catch (e) {}
	}

	componentDidMount() {
		const selectorIcon = this.refs.selector;
		const selectorBoundingBox = selectorIcon.getBoundingClientRect();
		this.selectorStartLocation = selectorBoundingBox;

		this.myObserver = new ResizeObserver(entries => {
			entries.forEach(() => {
				this.moveMenuSelectorIcon(1);
			});
		});

		const selector = document.querySelector('.selector-img');
		this.myObserver.observe(selector);
	}

	render() {
		const menu = this.constructMenu(this.props.menuItems);
		const { topComponent: TopComponent, topComponentOptions: options } = this.props;

		return (
			<div className='side-menu-section'>
				{TopComponent && <TopComponent {...options} />}
				<div className='menu-items'>{menu}</div>
				<div className='selector'>
					<div ref='selector' id='selector' className='arrow'>
						<div className='crossmark'>
							<img className='crossmark-image' src={`${this.props.menuCrossMark}`} alt='' />
						</div>
						<img src={`${this.props.menuSelector}`} className='selector-img' alt='menu selector' />
					</div>
				</div>
			</div>
		);
	}
}

/**
 * menuTitle - title for your side menu
 * menuItems - Object providing a menu item name (key) and an item index (value); The index
 * is currently used to identity the menu item component to display in a UI slider.
 * callback - Function to call on the parent component once a menu item is clicked.
 */
SideMenu.propTypes = {
	menuTitle: PropTypes.string,
	menuItems: PropTypes.object.isRequired,
	menuSelector: PropTypes.string.isRequired,
	callback: PropTypes.func.isRequired,
};
