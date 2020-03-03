import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { AvatarApi } from 'services/avatar';
import { UserProfileApi } from 'services/userProfile';
import { UserApi } from 'services/user';
import BloxButton from 'sub_components/Common/BloxButton';
class AccountsComponent extends Component {
	constructor(props) {
		super(props);

		this.avatarApi = new AvatarApi();
		this.userProfileApi = new UserProfileApi();
		this.state = {
			currentModule: null,
		};
	}

	getUserName = user => {
		const username = this.userProfileApi.getFirstAndLastName(user);
		//const username = 'ASDASDSDASDASDASDSADSADASDASDASDAS';
		if (username.length >= 16) {
			return username.slice(0, 16) + '...';
		} else {
			return username;
		}
	};
	setExpandedClass = () => {
		const header = document.querySelector('.company-name');
		header.classList.add('move-background');
	};

	removeExpandedClass = () => {
		const header = document.querySelector('.company-name');
		header.classList.remove('move-background');
	};

	renderMultiUserList = memberships => {
		const shouldRenderList = memberships && memberships.length > 1;

		if (shouldRenderList) {
			return memberships.map(company => {
				const { fuseBillId: currentCompanyId } = this.props.company_info;
				const isSelectedCompany = company.organizationId === parseInt(currentCompanyId);
				return (
					<Fragment>
						<div
							className={`company-link${isSelectedCompany ? ' selected' : ''}`}
							style={{ cursor: 'pointer' }}
							onClick={() => this.companySwitch(company.organizationId)}
						>
							{company.organizationName}
						</div>
						<div className='company-image'></div>
					</Fragment>
				);
			});
		} else {
			return (
				<Fragment>
					<div className={`company-link`} style={{ cursor: 'pointer' }}>
						'Tropix'
					</div>
					<div className='company-image'></div>
				</Fragment>
			);
		}
	};

	render() {
		const { memberships = {} } = this.props.auth_status;
		const { auth_status } = this.props;
		return (
			<div
				className='accounts-component-wrapper'
				onMouseOver={this.setExpandedClass}
				onMouseOut={this.removeExpandedClass}
			>
				<div className='company-name body10'>{'Current cOMPA '}</div>
				<div className='image'></div>
				<div className='accounts-dropdown'>
					<div className='single-user'>
						<div className='title'>{'ADMINISTRATOR'}</div>
						<div className='user-wrapper'>
							<div className='user-name'>'NIamh gilligan'</div>
							<div className='avatar'>'IMAGE'</div>
						</div>
					</div>
					<div className='multi-user'>{this.renderMultiUserList(memberships)}</div>
				</div>
			</div>
		);
	}
}
function mapStateToProps(state) {
	return {
		auth_status: state.auth_status,
		company_info: state.company_info,
	};
}

export default connect(mapStateToProps, null)(AccountsComponent);
