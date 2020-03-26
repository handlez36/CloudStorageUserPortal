import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { AvatarApi } from 'services/avatar';
import { UserProfileApi } from 'services/userProfile';
import { RESOLUTIONS } from 'services/config';

const FONTSIZE_TITLE_DEFAULT = {
	[RESOLUTIONS.LOW]: 14,
	[RESOLUTIONS.MED]: 18,
	[RESOLUTIONS.HIGH]: 24,
};
const FONTSIZE_TITLE_GROW = {
	[RESOLUTIONS.LOW]: 20,
	[RESOLUTIONS.MED]: 24,
	[RESOLUTIONS.HIGH]: 30,
};
const PIXELS_TO_MOVE_UP = {
	[RESOLUTIONS.LOW]: 50,
	[RESOLUTIONS.MED]: 70,
	[RESOLUTIONS.HIGH]: 94,
};

class BreadCrumbComponent extends Component {
	constructor(props) {
		super(props);

		this.avatarApi = new AvatarApi();
		this.userProfileApi = new UserProfileApi();
		this.state = {
			currentModule: null,
			currentPage: null,
			breadCrumbs: [],
		};
	}
	setCurrentModuleAndPage = () => {
		const { site } = this.props;

		this.setState({
			currentModule: site.module,
			currentPage: site.page,
			breadCrumbs: this.filterBreadCrumbs(site.breadCrumbs),
		});
	};
	componentDidMount() {
		this.setCurrentModuleAndPage();
	}
	componentDidUpdate(prevProps) {
		const { site } = this.props;
		if (prevProps.site !== site) {
			this.setCurrentModuleAndPage();
		}
	}
	goTo = (url, id, name) => {
		const { history } = this.props;
		this.breadCrumbClicked(id);
		console.log('NAME', name);
		if (
			name === 'profile overview' ||
			name === 'billing overview' ||
			name === 'support overview' ||
			name === 'storage overview' ||
			name === 'home'
		) {
			setTimeout(() => {
				history.push(url);
			}, 3000);
		} else {
			setTimeout(() => {
				history.push(url);
			}, 2000);
		}
	};

	filterBreadCrumbs = breadCrumbs => {
		const currentBreadCrumbs = [...breadCrumbs];

		//	currentBreadCrumbs = breadCrumbs.slice(0, breadCrumbs.length );
		//insert home at beginning of breadcrumbs.
		currentBreadCrumbs.unshift({ name: 'home', url: '/portal/' });

		return currentBreadCrumbs;
	};

	breadCrumbClicked = id => {
		const crumb = document.getElementById(id);
		const allCrumbs = document.getElementsByClassName('crumb');
		const breadcrumbs = document.querySelector('.breadcrumbs');
		const title = document.querySelector('.title.header21');
		const box = document.querySelector('.breadcrumb-component-wrapper');
		const breadCrumbContainer = document.querySelector('.breadcrumb-container');
		const { breadCrumbs } = this.state;

		if (allCrumbs && breadCrumbs.length > 1) {
			for (let i = 0; i <= allCrumbs.length - 1; i++) {
				allCrumbs[i].classList.add('hide-all');
			}
		}
		if (breadcrumbs) {
			breadcrumbs.classList.add('expand');
		}
		const pixelsToTranslate = PIXELS_TO_MOVE_UP[this.props.breakpoint] + 'px';
		if (crumb) {
			crumb.classList.add('clicked');
			crumb.style.fontSize = FONTSIZE_TITLE_GROW[this.props.breakpoint] + 'px';
			setTimeout(() => {
				crumb.style.transform = `translate(0%,-${pixelsToTranslate})`;
			}, 800);
			setTimeout(() => {
				if (title) {
					title.classList.add('hide');
					box.classList.add('minimize');
				}
				if (breadCrumbContainer) {
					breadCrumbContainer.classList.add('minimize');
				}
			}, 2100);

			setTimeout(() => {
				if (box) {
					box.classList.remove('minimize');
				}
				if (breadCrumbContainer) {
					breadCrumbContainer.classList.remove('minimize');
				}
				if (title) {
					title.classList.remove('hide');
				}
				if (crumb) {
					crumb.classList.remove('clicked');
					crumb.style.fontSize = FONTSIZE_TITLE_DEFAULT[this.props.breakpoint] + 'px';
					crumb.style.transform = `translate(0%,0)`;
				}

				const allCrumbs = document.getElementsByClassName('crumb');

				if (allCrumbs && breadCrumbs.length > 1) {
					for (let i = 0; i <= allCrumbs.length - 1; i++) {
						allCrumbs[i].classList.remove('hide-all');
					}
				}
			}, 4500);
		}
	};

	getBreadCrumbs = breadCrumbs => {
		if (breadCrumbs.length >= 1) {
			return (
				<div className='breadcrumbs '>
					{breadCrumbs.map((breadcrumb, i) => (
						<div
							key={`${breadcrumb.name}-${i}`}
							className='crumb header50'
							onClick={() => this.goTo(breadcrumb.url, `${breadcrumb.name}-${i}`, breadcrumb.name)}
							id={`${breadcrumb.name}-${i}`}
						>
							{breadcrumb.name}
						</div>
					))}
				</div>
			);
		}
	};

	onMouseOver = () => {
		const { breadCrumbs } = this.state;
		const dropdownbox = document.querySelector('.box');
		const breadCrumbWrapper = document.querySelector('.breadcrumb-component-wrapper');
		const breadCrumbContainer = document.querySelector('.breadcrumb-container');
		if (breadCrumbWrapper) {
			breadCrumbWrapper.classList.add('hover');
			breadCrumbWrapper.classList.add(`length-${breadCrumbs.length}`);
		}
		if (breadCrumbContainer) {
			breadCrumbContainer.classList.add('hover');
		}
		if (dropdownbox) {
			dropdownbox.classList.add('hover');
			dropdownbox.classList.add(`length-${breadCrumbs.length}`);
		}
	};
	onMouseOut = () => {
		const breadCrumbContainer = document.querySelector('.breadcrumb-container');
		const { breadCrumbs } = this.state;
		const dropdownbox = document.querySelector('.box');
		const breadCrumbWrapper = document.querySelector('.breadcrumb-component-wrapper');

		if (breadCrumbWrapper) {
			breadCrumbWrapper.classList.remove('hover');
			breadCrumbWrapper.classList.remove(`length-${breadCrumbs.length}`);
		}
		if (breadCrumbContainer) {
			breadCrumbContainer.classList.remove('hover');
		}
		if (dropdownbox) {
			// dropdownbox.classList.remove('hover');
			// dropdownbox.classList.remove(`length-${breadCrumbs.length}`);
		}
	};

	render() {
		const { currentPage, breadCrumbs } = this.state;
		return (
			<div
				className='breadcrumb-container'
				onMouseOver={this.onMouseOver}
				onMouseOut={this.onMouseOut}
			>
				<div className='current-title header21'>{currentPage}</div>
				<div className='breadcrumb-component-wrapper'>
					<div className='box'>
						<div className='title sub'></div>
						<div className='breadcrumb-dropdown'>{this.getBreadCrumbs(breadCrumbs)}</div>
					</div>
					<div className='title header21'>{currentPage}</div>
					{/* <div className='breadcrumb-dropdown'>{this.getBreadCrumbs(breadCrumbs)}</div> */}
				</div>
			</div>
		);
	}
}
function mapStateToProps(state) {
	return {
		site: state.site_tracking,
		auth_status: state.auth_status,
	};
}

export default connect(mapStateToProps, null)(BreadCrumbComponent);
