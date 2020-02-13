import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { setAxiosDefaults } from './services/config';
import {
	validateAuthState,
	makeJwtValidationRequest,
	requestLoginUsernameReset,
} from './actions/auth';
import { switchCompany } from './actions/auth';
import { getCompanyInfo } from './actions/company';

class App extends Component {
	/**
	 * Validate if the user is logged in via call to middleware
	 */
	componentDidMount() {
		setAxiosDefaults();
		const { location } = this.props;

		if (location && !location.pathname.match(/passwordRegistration/)) {
			const path = location.pathname ? location.pathname : '/';
			const search = location.search ? location.search : '';

			this.props.validateAuthState(path, search);
		}

		setInterval(() => {
			if (
				this.props.location.pathname !== '/login' &&
				this.props.location.pathname !== '/' &&
				this.props.location.pathname !== '/sandbox'
			) {
				makeJwtValidationRequest().then(response => {
					if (!response.data.sessionInfo) {
						this.props.requestLoginUsernameReset('', '', 'HELLO. PLEASE ENTER YOUR EMAIL.');
						this.props.history.push('/login');
					}
				});
			}
		}, 60 * 1000);
	}

	/**
	 * If the user successfully switches companies via api call,
	 * ensure session state is updated with the new company/membership
	 */
	updateCachedCompany = prevProps => {
		if (this.props.company_info) {
			const companyInfoType = this.props.company_info.type;
			const prevCompanyInfoType = prevProps.company_info.type;

			if (
				prevCompanyInfoType !== companyInfoType &&
				companyInfoType === 'COMPANY_INFO_REQUEST_SUCCESS'
			) {
				const { addressPreferences: { id } = {} } = this.props.company_info;
				this.props.switchCompany(id);
			}
		}
	};

	/**
	 * Re-route to portal home page if user asks to switch companies
	 */
	handleCompanySwitch = prevProps => {
		const {
			currentMembership: incomingCurrentMembership,
			isAuthenticated,
		} = this.props.auth_status;
		const { currentMembership: existingCurrentMembership } = prevProps.auth_status;

		if (
			incomingCurrentMembership !== undefined &&
			existingCurrentMembership !== undefined &&
			incomingCurrentMembership !== existingCurrentMembership
		) {
			if (isAuthenticated && incomingCurrentMembership !== existingCurrentMembership) {
				setTimeout(() => {
					this.props.history.push('/portal');
				}, 500);
			}
		}
	};

	/**
	 * Blur background if COMPANY_REQUEST api call occurs
	 */
	setScreenToLoading = () => {
		const body = document.querySelector('body');
		if (this.props.company_info.type === 'COMPANY_INFO_REQUEST') {
			body.classList.add('loading');
		} else if (
			this.props.company_info.type === 'COMPANY_INFO_REQUEST_ERROR' ||
			this.props.company_info.type === 'COMPANY_INFO_REQUEST_SUCCESS'
		) {
			body.classList.remove('loading');
		}
	};

	componentDidUpdate(prevProps) {
		if (
			this.props.location.pathname !== prevProps.location.pathname &&
			(this.props.location.pathname !== '/login' && this.props.location.pathname !== '/')
		) {
			makeJwtValidationRequest().then(response => {
				if (!response.data.sessionInfo) {
					this.props.requestLoginUsernameReset('', '', 'HELLO. PLEASE ENTER YOUR EMAIL.');
					this.props.history.push('/login');
				}
			});
		}

		this.setScreenToLoading();
		this.updateCachedCompany(prevProps);
		this.handleCompanySwitch(prevProps);
	}

	UNSAFE_componentWillReceiveProps(newProps) {
		const { isAuthenticated } = this.props.auth_status;
		const { history } = this.props;
		const updated_auth_status = newProps.auth_status;
		const path = updated_auth_status.path;

		if (isAuthenticated !== updated_auth_status.isAuthenticated) {
			if (updated_auth_status.isAuthenticated && path) {
				history.push(path);
			}
		}
	}

	render() {
		return <div className='App'>{this.props.children}</div>;
	}
}

function mapStateToProps(state) {
	return {
		auth_status: state.auth_status,
		company_info: state.company_info,
	};
}

export default withRouter(
	connect(
		mapStateToProps,
		{ validateAuthState, requestLoginUsernameReset, getCompanyInfo, switchCompany }, // NEW
	)(App),
);
