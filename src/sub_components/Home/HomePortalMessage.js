import React, { Component } from 'react';
import { connect } from 'react-redux';

import { switchCompany } from 'actions/auth';
import { getCompanyInfo } from 'actions/company';

class HomePortalMessage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			active: '',
		};
	}

	getCompanyName = () => {
		const { company_info } = this.props;
		let companyName = '';

		if (company_info && company_info.customer && company_info.customer.companyName) {
			companyName = company_info.customer.companyName;
		}

		return companyName;
	};

	getUserName() {
		const { user } = this.props.auth_status;
		let name = 'User';

		if (user && user.firstname) {
			name = user.firstname;
		}

		return name;
	}

	companySwitch = id => {
		this.props.getCompanyInfo(id);
	};

	renderCompanyList = memberships => {
		const shouldRenderList = memberships && memberships.length > 1;

		if (shouldRenderList) {
			return memberships.map(company => {
				const { fuseBillId: currentCompanyId } = this.props.company_info;
				const isSelectedCompany = company.organizationId === parseInt(currentCompanyId);
				return (
					<div
						className={`company-link${isSelectedCompany ? ' selected' : ''}`}
						style={{ cursor: 'pointer' }}
						onClick={() => this.companySwitch(company.organizationId)}
					>
						{company.organizationName}
					</div>
				);
			});
		}
	};

	render() {
		const { memberships = {} } = this.props.auth_status;

		return (
			<div className='message-home-portal'>
				<div className='home-welcome'>
					WELCOME
					{/* <span className="home-welcome text-style-2 ">TO</span> */}
				</div>
				<div className='home-name'>{this.getUserName()}. </div>
				<div className='home-subtext'>What would you like to do today?</div>
				<br />
				{this.renderCompanyList(memberships)}
				{/* <span className=" home-welcome text-style-5">
          Explanation text for first timeusers? Hover instructional text over the BLOX Modules?
          </span> */}
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

export default connect(
	mapStateToProps,
	{ switchCompany, getCompanyInfo },
)(HomePortalMessage);
