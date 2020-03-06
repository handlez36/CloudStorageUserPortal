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
			currentSelectedCompany: '',
			companyName: '',
			role: '',
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
							className={`company-link${isSelectedCompany ? ' selected header10 ' : ' header10'}`}
							style={{ cursor: 'pointer' }}
							onClick={() => this.companySwitch(company.organizationId)}
						>
							{company.organizationName}
						</div>
						<div className='company-image'></div>
					</Fragment>
				);
			});
		}
	};

	checkNameLength = companyName => {
		const { breakpoint } = this.props;
		const currentName = document.querySelector('.company-name');
		if (
			currentName &&
			currentName.innerHTML.length >= MAX_COMPANY_NAME_WIDTH[breakpoint] &&
			!currentName.classList.contains('hovered')
		) {
			companyName = companyName.substring(0, MAX_COMPANY_NAME_WIDTH[breakpoint]) + '...';
		}

		this.setState({ companyName });
	};
	getCompanyName = () => {
		const { company_info } = this.props;
		let companyName = '';

		if (company_info && company_info.customer && company_info.customer.companyName) {
			companyName = company_info.customer.companyName;
			this.getUsersRole(company_info.fuseBillId);
		}

		this.setState({ companyName }, () => {
			this.checkNameLength(companyName);
		});
	};

	componentDidMount() {
		this.getCompanyName();
	}
	getUserName = user => {
		const username = this.userProfileApi.getFirstAndLastName(user);

		if (username.length >= 16) {
			return username.slice(0, 16) + '...';
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

	componentDidUpdate(prevProps) {
		const { company_info } = this.props;

		if (company_info !== prevProps.company_info) {
			this.getCompanyName();
		}
	}
	getUsersRole = id => {
		const { memberships = {} } = this.props.auth_status;
		const currentMembershipSelected = memberships.filter(
			membership => Number(membership.organizationId) === Number(id),
		);

		this.setState({ role: currentMembershipSelected[0].role });
	};

	render() {
		const { memberships = {} } = this.props.auth_status;
		const { auth_status } = this.props;
		const { companyName, role } = this.state;

		return (
			<div
				className='accounts-component-wrapper'
				onMouseOver={this.setExpandedClass}
				onMouseOut={this.removeExpandedClass}
			>
				<div className='company-name header10'>{companyName}</div>
				<div className='image'></div>
				<div className='accounts-dropdown'>
					<div className='single-user'>
						<div className='title header30'>{role}</div>
						<div className='user-wrapper'>
							<div className='user-name header10'>{this.getUserName(auth_status)}</div>
							<div className='avatar'>
								<img src={this.avatarApi.getUserAvatar(auth_status)} />
							</div>
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
