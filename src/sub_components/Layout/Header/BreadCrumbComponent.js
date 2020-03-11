import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AvatarApi } from 'services/avatar';
import { UserProfileApi } from 'services/userProfile';
import { UserApi } from 'services/user';
import BloxButton from 'sub_components/Common/BloxButton';
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
		console.log('heyooo SITEEEE', site);
		this.setState({
			currentModule: site.module,
			currentPage: site.page,
			breadCrumbs: site.breadCrumbs,
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

	getBreadCrumbs = () => {
		let lastFourBreadCrumbs = [];
		const { breadCrumbs } = this.state;
		lastFourBreadCrumbs = breadCrumbs.slice(breadCrumbs.length - 5, breadCrumbs.length - 1);
		//console.log('NIAMHHHH', niamh);
		return (
			<div className='breadcrumbs '>
				{lastFourBreadCrumbs.map(breadcrumb => (
					<div
						key={`${breadcrumb.name}`}
						className='crumb header50'
						onClick={this.goTo(breadcrumb.name)}
					>
						{breadcrumb.name}
					</div>
				))}
			</div>
		);
	};

	render() {
		const { currentPage } = this.state;
		return (
			<div className='breadcrumb-component-wrapper'>
				<div className='title header21'>{currentPage}</div>
				<div className='breadcrumb-dropdown'>{this.getBreadCrumbs()}</div>
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
