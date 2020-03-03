import React, { Component } from 'react';
import { connect } from 'react-redux';

import Card from 'sub_components/Common/BloxCard';
import { PROFILE_OVERVIEW_CARDS as CARDS } from 'utils/ProfileConstants';
import { COMPANY_INFO_REQUEST_SUCCESS } from 'actions/company';

const CDN_URL = process.env.REACT_APP_CDN_URL;
const companyImage = `${CDN_URL}profile/company-avatar.png`;

class CompanyProfile extends Component {
	getSummaryContent = company => {
		if (!company || company.type !== COMPANY_INFO_REQUEST_SUCCESS) {
			return null;
		}

		const { customer: { companyName = '' } = {} } = company;

		return (
			<div className='summary-content'>
				<div className='name heading70'>{`${companyName.toUpperCase()}`}</div>
			</div>
		);
	};

	getDetailContent = company => {
		if (!company || company.type !== COMPANY_INFO_REQUEST_SUCCESS) {
			return null;
		}

		const attributes = {
			primaryEmail: 'Email',
			billingAddress: 'Address',
			contactName: 'Contact',
			primaryPhone: 'Phone',
		};
		const {
			customer,
			customer: { primaryEmail = '', primaryPhone = '', first_name = '', last_name = '' } = {},
			addressPreferences,
			addressPreferences: {
				billingAddress: { line1 = '', city = '', state = '', postalZip = '' } = {},
			},
		} = company;
		const fullAddress = `${line1}<br />${city}, ${state} ${postalZip}`;
		const contactName = `${first_name} ${last_name}`;
		const keys = Object.keys(attributes);

		return (
			<div className='detail-content'>
				{customer &&
					addressPreferences &&
					keys.map(key => {
						return (
							<div key={`key-${attributes[key]}`} className='content-row'>
								<div className='label profile-card-label'>{attributes[key]}</div>
								<div className='value profile-card-field'>
									{(key === 'primaryEmail' || key === 'primaryPhone') && customer[key]}
									{key === 'billingAddress' && fullAddress}
									{key === 'contactName' && contactName}
								</div>
							</div>
						);
					})}
			</div>
		);
	};

	render() {
		const { expanded, expandCard, company_info } = this.props;

		return (
			<div className='company-profile'>
				<Card
					type={CARDS.COMPANY_PROFILE}
					image={companyImage}
					summary={this.getSummaryContent(company_info)}
					detail={this.getDetailContent(company_info)}
					isExpanded={expanded}
					expandCardCallback={expandCard}
				/>
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
	null,
)(CompanyProfile);
