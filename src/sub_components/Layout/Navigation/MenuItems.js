import React, { Component } from 'react';

class MenuItems extends Component {
	constructor(props) {
		super(props);

		this.state = {
			currentModule: null,
			currentPage: null,
		};
	}
	onClick = itemClicked => {
		const { section, history, navigation } = this.props;
		if (navigation === 'secondary') {
			itemClicked = itemClicked.replace(' ', '_');
			itemClicked = itemClicked.replace(' ', '_');
			if (itemClicked.toLowerCase() === 'overview') {
				history.push(`/portal/${section}`);
			} else {
				history.push(`/portal/${section}/${itemClicked.toLowerCase()}`);
			}
		} else {
			console.log('ITEMclicked', itemClicked);
			if (itemClicked === 'Home') {
				history.push(`/portal/`);
			} else {
				history.push(`/portal/${itemClicked.toLowerCase()}`);
			}
		}
		this.setActiveClass(itemClicked);
	};

	setActiveClass(type) {
		const { section, navigation } = this.props;

		const currentActiveElement = document.querySelector(
			`.item.nav-${navigation}.${section}.active`,
		);
		type = type.replace('_', ' ');
		type = type.replace('_', ' ');
		const newActiveElement = this.refs[type];

		if (currentActiveElement) {
			currentActiveElement.classList.remove('active');
			currentActiveElement.classList.add('animate');

			setTimeout(() => {
				const currentInActiveElement = document.querySelector(`.item.nav-${navigation}.animate`);
				if (currentInActiveElement) {
					currentInActiveElement.classList.remove('animate');
				}
			}, 1000);
		}
		if (newActiveElement) {
			newActiveElement.classList.remove('animate');
			newActiveElement.classList.add('active');
		}
	}

	render() {
		const { section, navigation, menu } = this.props;

		return (
			<div className='menu-items ' id={`menu-${navigation}`}>
				{menu &&
					menu.map(item => (
						<div
							onClick={() => this.onClick(item.name)}
							ref={item.name}
							className={`item nav-${navigation} ${section}`}
						>
							{item.name}
						</div>
					))}
			</div>
		);
	}
}

export default MenuItems;
