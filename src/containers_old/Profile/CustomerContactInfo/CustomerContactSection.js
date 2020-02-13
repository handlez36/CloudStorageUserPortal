import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CompanyProfileApi } from '../../../services/companyProfile';
import { UserProfileApi } from '../../../services/userProfile';
import CompanyInfo from './CompanyInfo';
import PortalMessage from '../../../components/Common/PortalMessage';
import { PROFILE_COMPANY_MESSAGE_TEXT } from '../ProfileConstants';
import { updatePage } from '../../../actions/siteTracking';
import { SITE_PAGES } from '../../../components/Common/CommonConstants';
import { MENU } from '../../Profile/ProfileConstants';
const CDN_URL = process.env.REACT_APP_CDN_URL;
const CompanyAvatar = `${CDN_URL}profile/Profile_CompanyInfo_COMPANY_190x190.png`;
const PrimaryContactAvatar = `${CDN_URL}profile/Profile_CompanyInfo_CONTACT_190x190.png`;

class CustomerContactPage extends Component {
	constructor(props) {
		super(props);

		this.profileApi = new CompanyProfileApi();
		this.userProfileApi = new UserProfileApi();

		this.state = {
			data: null,
			error: null,
		};
	}

	renderBanner(bannerText) {
		return <div className={`banner`}>{bannerText}</div>;
	}

	requestCompanyData = () => {
		this.profileApi
			.get()
			.then(response => {
				response.status !== 200 || response.data.error
					? this.setState({ error: response.data.error })
					: this.setState({ data: response.data });
			})
			.catch(error => this.setState({ error }));
	};

	componentDidMount() {
		const { updatePage } = this.props;
		updatePage(SITE_PAGES.PROFILE[MENU.CUSTOMER_PROFILE]);
	}

	resetPage = () => {
		this.props.resetPage();
	};

	render() {
		return (
			<div className='outer-wrapper company-page'>
				<PortalMessage
					start={PROFILE_COMPANY_MESSAGE_TEXT.START}
					content={PROFILE_COMPANY_MESSAGE_TEXT.CONTENT}
				/>
				{this.renderBanner('CUSTOMER INFORMATION')}
				<CompanyInfo profile={this.props.company_info} image={CompanyAvatar} type='CompanyInfo' />
				{this.renderBanner('PRIMARY CONTACT')}
				<CompanyInfo
					profile={this.props.company_info}
					image={PrimaryContactAvatar}
					type='PrimaryContact'
				/>
				<div className='read-latest tint' />
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
	{ updatePage },
)(CustomerContactPage);
