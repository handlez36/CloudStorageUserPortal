import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AvatarApi } from 'services/avatar';
import { UserProfileApi } from 'services/userProfile';
import { UserApi } from 'services/user';
import BloxButton from 'sub_components/Common/BloxButton';
import { RESOLUTIONS } from 'services/config';

const MAX_NAME_LENGTH = {
	[RESOLUTIONS.LOW]: 10,
	[RESOLUTIONS.MED]: 9,
	[RESOLUTIONS.HIGH]: 8,
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
	goTo = url => {
		const { history } = this.props;

		history.push(url);
	};
	getName = name => {
		console.log('Name', name);
		const { breakpoint } = this.props;
		const { breadCrumbs } = this.state;

		if (name.length > MAX_NAME_LENGTH[breakpoint] && breadCrumbs.length >= 4) {
			return name.slice(0, MAX_NAME_LENGTH[breakpoint]) + '..';
		} else {
			return name;
		}
	};
	filterBreadCrumbs = breadCrumbs => {
		let currentBreadCrumbs = [];

		if (breadCrumbs.length >= 5) {
			currentBreadCrumbs = breadCrumbs.slice(breadCrumbs.length - 5, breadCrumbs.length - 1);
		} else {
			currentBreadCrumbs = breadCrumbs.slice(0, breadCrumbs.length - 1);
		}
		return currentBreadCrumbs;
	};

	getBreadCrumbs = breadCrumbs => {
		console.log('breadCrumbs', breadCrumbs);
		console.log('breadCrumbs', breadCrumbs.length);
		if (breadCrumbs.length >= 1 && breadCrumbs.length <= 4) {
			return (
				<div className='breadcrumbs '>
					{breadCrumbs.map((breadcrumb, i) => (
						<div
							key={`${breadcrumb.name}-${i}`}
							className='crumb header50'
							onClick={() => this.goTo(breadcrumb.url)}
						>
							{this.getName(breadcrumb.name)}
						</div>
					))}
				</div>
			);
		}
	};

	render() {
		const { currentPage, breadCrumbs } = this.state;
		//const breadCrumbsToDisplay = this.filterBreadCrumbs(breadCrumbs);
		console.log('bread', breadCrumbs);
		return (
			<div className='breadcrumb-component-wrapper'>
				<div className='title header21'>{currentPage}</div>
				<div className='breadcrumb-dropdown'>{this.getBreadCrumbs(breadCrumbs)}</div>
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
