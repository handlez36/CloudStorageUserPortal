import React, { Component } from 'react';
import { string, object } from 'prop-types';
import Button from './BloxButton';

class MenuHeader extends Component {
	constructor(props) {
		super(props);

		this.state = {
			active: Object.keys(this.props.menuItems)[0],
		};
	}
	onClick = (menuItemName, itemIndex) => {
		const { onMenuSelect } = this.props;

		this.setState({ active: menuItemName }, () => this.swapActiveClass(itemIndex));

		if (onMenuSelect) {
			onMenuSelect(menuItemName);
		}
	};

	swapActiveClass = active => {
		const selectedMenuItem = document.getElementById(active);
		if (active === 1) {
			const currentlySelectedMenuItem = document.getElementById(2);
			currentlySelectedMenuItem.classList.remove('active');
		}

		if (active === 2) {
			const currentlySelectedMenuItem = document.getElementById(1);
			const changeGradient = document.querySelector('.menu-header');
			changeGradient.classList.add('active');
			currentlySelectedMenuItem.classList.remove('active');
		} else {
			const changeGradient = document.querySelector('.menu-header.active');
			if (changeGradient) {
				changeGradient.classList.remove('active');
			}
		}
		selectedMenuItem.classList.add('active');
	};
	componentDidMount() {
		const selectedMenuItem = document.getElementById(1);

		if (selectedMenuItem) {
			selectedMenuItem.classList.add('active');
		}
	}

	constructMenu(menuItems) {
		if (!menuItems) {
			return <div>No Menu</div>;
		}

		const menu = [];
		let index = 0;

		for (const [menuItemName] of Object.entries(menuItems)) {
			menu.push(
				<div
					key={menuItemName}
					className={`menu-item-name menu-item-box`}
					// onClick={() => this.onClick(menuItemName, component)}
					data-item={menuItemName}
					id={index + 1}
				>
					{menuItemName}
				</div>,
			);
			index++;
		}
		return <div className='menu-items'>{menu}</div>;
	}

	getButton = () => {
		const { onInviteUser, addToRoster } = this.props;
		if (this.state.active === 'PORTAL') {
			return (
				<Button
					title='INVITE NEW USER'
					enabled={true}
					customClass='support-button'
					onClick={onInviteUser}
				/>
			);
		} else {
			return (
				<Button
					title='ADD TO ROSTER'
					enabled={true}
					customClass='support-button'
					onClick={addToRoster}
				/>
			);
		}
	};

	render() {
		const { page, menuItems } = this.props;
		return (
			<div className={`menu-header ${page}`}>
				<div className='wrapper'>
					<div className='menu-items'>{menuItems ? this.constructMenu(menuItems) : ''}</div>
					<div className='menu-header-button'>{this.getButton()}</div>
				</div>
			</div>
		);
	}
}

MenuHeader.propTypes = {
	page: string,
	menuItems: object.isRequired,
};

export default MenuHeader;
