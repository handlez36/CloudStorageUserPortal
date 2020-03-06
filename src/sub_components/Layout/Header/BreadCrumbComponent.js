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
		};
	}

	getBreadCrumbs = () => {
		const breadcrumbs = [
			{ name: 'Home', link: '/portal/module' },
			{ name: 'Support Overview', link: '/portal/module' },
			{ name: 'Ticket History', link: '/portal/module' },
			{ name: 'Ticket #12345', link: '/portal/module' },
		];
		return (
			<div className='breadcrumbs '>
				{breadcrumbs.map(breadcrumb => (
					<div key={`${breadcrumb.name}`} className='crumb header50'>
						{breadcrumb.name}
					</div>
				))}
			</div>
		);
	};

	render() {
		const { auth_status } = this.props;
		return (
			<div className='breadcrumb-component-wrapper'>
				<div className='title header21'>{'OVERVIEW'}</div>
				<div className='breadcrumb-dropdown'>{this.getBreadCrumbs()}</div>
			</div>
		);
	}
}
function mapStateToProps(state) {
	return {
		auth_status: state.auth_status,
	};
}

export default connect(mapStateToProps, null)(BreadCrumbComponent);
