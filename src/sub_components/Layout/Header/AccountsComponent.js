import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { AvatarApi } from 'services/avatar';
import { UserProfileApi } from 'services/userProfile';
import { switchCompany } from 'actions/auth';
import { getCompanyInfo } from 'actions/company';
import { RESOLUTIONS } from 'services/config';
import { CompanyProfileApi } from 'services/companyProfile';
const MAX_COMPANY_NAME_WIDTH = {
	[RESOLUTIONS.LOW]: 14,
	[RESOLUTIONS.MED]: 20,
	[RESOLUTIONS.HIGH]: 20,
};

class AccountsComponent extends Component {
	constructor(props) {
		super(props);

		this.avatarApi = new AvatarApi();
		this.userProfileApi = new UserProfileApi();
		this.companyApi = new CompanyProfileApi();
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
		header.classList.add('hovered');
		header.classList.add('move-background');
		this.getCompanyName();
	};

	removeExpandedClass = () => {
		const header = document.querySelector('.company-name');
		header.classList.remove('hovered');
		header.classList.remove('move-background');
		this.getCompanyName();
	};
	setCurrentCompany = name => {
		this.setState({ currentSelectedCompany: name });
	};
	companySwitch = id => {
		this.props.getCompanyInfo(id);
	};

	renderMultiUserList = memberships => {
		const shouldRenderList = memberships && memberships.length > 1;
		const { module } = this.props;
		if (shouldRenderList) {
			return memberships.map(company => {
				const { fuseBillId: currentCompanyId } = this.props.company_info;
				const isSelectedCompany = company.organizationId === parseInt(currentCompanyId);

				return (
					<div className='multi-user' id={company.organizationId}>
						<div
							className={`company-link ${module} ${
								isSelectedCompany ? ' selected header10 ' : ' header10'
							}`}
							style={{ cursor: 'pointer' }}
							onClick={() => this.changeCompany(company.organizationId)}
						>
							{company.organizationName}
						</div>
						<div className='company-image'>
							<img src={this.companyApi.getCompanyAvatar('dropdown', 'energy')} />
						</div>
					</div>
				);
			});
		}
	};

	changeCompany = id => {
		const { module } = this.props;
		const selectedCompany = document.getElementById(id);
		const previousSelectedCompany = document.querySelector('.trigger-animation-swipe');
		if (previousSelectedCompany) {
			previousSelectedCompany.classList.remove('trigger-animation-swipe');
			previousSelectedCompany.classList.remove(module);
		}
		if (selectedCompany) {
			selectedCompany.classList.add('trigger-animation-swipe');
			selectedCompany.classList.add(module);
		}
		setTimeout(() => {
			this.companySwitch(id);
		}, 1000);
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
			return username;
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
				<div className='image'>
					<img src={this.companyApi.getCompanyAvatar()} />
				</div>
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
					{this.renderMultiUserList(memberships)}
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

export default connect(mapStateToProps, { switchCompany, getCompanyInfo })(AccountsComponent);
