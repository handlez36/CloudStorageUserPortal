import React, { Component } from 'react';
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
	[RESOLUTIONS.LOW]: 60,
	[RESOLUTIONS.MED]: 80,
	[RESOLUTIONS.HIGH]: 104,
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
	goTo = (url, id) => {
		const { history } = this.props;
		this.breadCrumbClicked(id);

		setTimeout(() => {
			history.push(url);
		}, 3600);
		setTimeout(() => {
			const title = document.querySelector('.title.header21');

			if (title) {
				title.classList.remove('hide');
			}
		}, 5000);
	};

	filterBreadCrumbs = breadCrumbs => {
		const currentBreadCrumbs = [...breadCrumbs];

		//	currentBreadCrumbs = breadCrumbs.slice(0, breadCrumbs.length );
		//insert home at beginning of breadcrumbs.
		currentBreadCrumbs.unshift({ name: 'HOME', url: '/portal/' });

		return currentBreadCrumbs;
	};

	breadCrumbClicked = id => {
		const crumb = document.getElementById(id);
		const allCrumbs = document.getElementsByClassName('crumb');
		const breadcrumbs = document.querySelector('.breadcrumbs');
		const title = document.querySelector('.title.header21');
		const box = document.querySelector('.box');
		const { breadCrumbs } = this.state;

		if (allCrumbs && breadCrumbs.length > 1) {
			for (let i = 0; i <= allCrumbs.length - 1; i++) {
				allCrumbs[i].classList.add('hide-all');
			}
		}
		if (breadcrumbs) {
			breadcrumbs.classList.add('expand');
		}

		if (crumb) {
			crumb.classList.add('clicked');
			crumb.style.fontSize = FONTSIZE_TITLE_GROW[this.props.breakpoint] + 'px';

			setTimeout(() => {
				const pixelsToTranslate = PIXELS_TO_MOVE_UP[this.props.breakpoint] + 'px';
				if (box) {
					box.style.transform = `translate(-50%,-${pixelsToTranslate})`;
				}

				if (title) {
					title.classList.add('hide');
				}
			}, 2000);
			setTimeout(() => {
				if (box) {
					box.style.transform = 'translate(-50%,0)';
				}
				if (crumb) {
					crumb.classList.remove('clicked');
					crumb.style.fontSize = FONTSIZE_TITLE_DEFAULT[this.props.breakpoint] + 'px';
				}

				const allCrumbs = document.getElementsByClassName('crumb');

				if (allCrumbs && breadCrumbs.length > 1) {
					for (let i = 0; i <= allCrumbs.length - 1; i++) {
						allCrumbs[i].classList.remove('hide-all');
					}
				}
				if (breadcrumbs) {
					breadcrumbs.classList.remove('expand');
				}
			}, 3500);
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
							onClick={() => this.goTo(breadcrumb.url, `${breadcrumb.name}-${i}`)}
							id={`${breadcrumb.name}-${i}`}
						>
							{breadcrumb.name}
						</div>
					))}
				</div>
			);
		}
	};
	updateBreadCrumbComponentWidth = () => {
		const { breadCrumbs } = this.state;
		const reactGridBreadCrumbComponent = document.querySelector(
			'.react-grid-item.breadcrumb-component',
		);
		console.log('hello niamh here');
		if (reactGridBreadCrumbComponent && breadCrumbs.length >= 6) {
			console.log('bread crumb component', reactGridBreadCrumbComponent);
			//update width

			//	reactGridBreadCrumbComponent.style.width = '500px';
			//	reactGridBreadCrumbComponent.style.transform = 'translate(410px,0)';
		}
	};
	onMouseOver = () => {
		const { breadCrumbs } = this.state;
		const dropdownbox = document.querySelector('.box');
		const breadCrumbWrapper = document.querySelector('.breadcrumb-component-wrapper');

		if (breadCrumbWrapper) {
			breadCrumbWrapper.classList.add('hover');
			breadCrumbWrapper.classList.add(`length-${breadCrumbs.length}`);
		}
		if (dropdownbox) {
			dropdownbox.classList.add('expand');
		}
		this.updateBreadCrumbComponentWidth();
	};
	onMouseOut = () => {
		const dropdownbox = document.querySelector('.box');
		const breadCrumbWrapper = document.querySelector('.breadcrumb-component-wrapper');

		if (breadCrumbWrapper) {
			breadCrumbWrapper.classList.remove('hover');
			breadCrumbWrapper.classList.remove('five');
			breadCrumbWrapper.classList.remove('four');
		}
		if (dropdownbox) {
			dropdownbox.classList.remove('expand');
		}
	};

	render() {
		const { currentPage, breadCrumbs } = this.state;
		return (
			<div
				className='breadcrumb-component-wrapper'
				onMouseOver={this.onMouseOver}
				onMouseOut={this.onMouseOut}
			>
				<div className='box'>
					<div className='title sub'></div>
					<div className='breadcrumb-dropdown'>{this.getBreadCrumbs(breadCrumbs)}</div>
				</div>
				<div className='title header21'>{currentPage}</div>
				{/* <div className='breadcrumb-dropdown'>{this.getBreadCrumbs(breadCrumbs)}</div> */}
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
