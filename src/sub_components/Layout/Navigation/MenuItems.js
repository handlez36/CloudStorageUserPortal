import React, { Component } from 'react';
import { ItemImage } from 'semantic-ui-react';

class MenuItems extends Component {
	constructor(props) {
		super(props);

		this.state = {
			currentModule: null,
			currentPage: null,
			sitePage: null,
		};
	}
	onClick = itemClicked => {
		const { section, history, navigation } = this.props;

		if (navigation === 'secondary') {
			itemClicked = itemClicked.replace(' ', '_');
			itemClicked = itemClicked.replace(' ', '_');
			if (
				itemClicked.toLowerCase() === 'overview' ||
				itemClicked.toLowerCase() === 'storage_overview'
			) {
				history.push(`/portal/${section}`);
			} else {
				history.push(`/portal/${section}/${itemClicked.toLowerCase()}`);
			}
		} else {
			if (itemClicked === 'Home') {
				history.push(`/portal/`);
			} else {
				history.push(`/portal/${itemClicked.toLowerCase()}`);
			}
		}
		this.setActiveClass(itemClicked);
	};

	checkLocation = () => {
		//	console.log(window.location.href);
		const { section } = this.props;
		const pathname = window.location.pathname;
		const matches = pathname.split('/');

		if (matches) {
			const [, , siteModule, sitePage] = matches;

			if (sitePage) {
				return sitePage;
			} else {
				return 'OVERVIEW';
			}
		}
	};
	componentDidMount() {
		const pathname = window.location.pathname;
		const matches = pathname.split('/');

		if (matches) {
			const [, , siteModule, sitePage] = matches;

			if (sitePage) {
				this.setState({ sitePage });
			} else {
				this.setState({ siteModule });
			}
		}
	}
	componentDidUpdate() {
		const { pathname } = this.state;
		const currentPathname = window.location.pathname;
		const matches = currentPathname.split('/');

		if (matches) {
			const [, , siteModule, sitePage] = matches;

			if (pathname !== sitePage) {
				const currentActivePage = this.checkLocation();

				this.setActiveClass(currentActivePage);
				this.setState({ pathname: sitePage });
			}
		}
	}

	setActiveClass(type) {
		const { section, navigation } = this.props;

		const currentActiveElement = document.querySelector(
			`.item.nav-${navigation}.${section}.active`,
		);
		type = type.replace('_', ' ');
		type = type.replace('_', ' ');
		const newActiveElement = this.refs[type.toLowerCase()];

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
		console.log('new active element', newActiveElement);
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
							ref={item.name.toLowerCase()}
							className={
								item.name === 'Overview'
									? `item nav-${navigation} ${section} active`
									: `item nav-${navigation} ${section}`
							}
						>
							{item.name}
						</div>
					))}
			</div>
		);
	}
}

export default MenuItems;
