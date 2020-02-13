import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom'; //IndexRoute has been removed (never used)

/** v1 imports */
// import Home from './SamplePortalHome/Home';      DELETED
// import LoginPage from '../components/Login/LoginPage';   DELETED
// import Release from './Release/Release';
// import Footer from './../components/Common/Footer';      DELETED
// import ModalPage from './Feedback/ModalPage';      DELETED
// import Error404 from './../components/Common/Error404';    DELETED
// import StorageOverview from '../components/Layoutv3/PortalLayout';   DELETED

/** v3 imports */
import Home from './../pages/Home/Home';
import LoginPage from './../pages/Login/LoginPage';
import StorageOverview from './../sub_components/Layout/PortalLayout';
// import Release from './Release/Release';
import Footer from './../sub_components/Layout/Footer';
import ModalPage from './../sub_components/Misc/ModalPage';
import Error404 from './../pages/Misc/Error404';
import { Permissions } from './../services/permissions';
import { getCompanyInfo } from './../actions/company';

class Portal extends Component {
	state = {
		showLogin: false,
		auth: false,
	};

	componentDidMount() {
		this.props.getCompanyInfo();
		this.checkAuth(this.props.isAuthenticated);
		const reveal = document.getElementById('reveal');
		if (reveal) {
			reveal.classList.add('reveal');

			setTimeout(
				function() {
					this.setState({ showLogin: true });
				}.bind(this),
				2000,
			);
		}
	}

	checkAuth = auth => {
		const { auth: currentAuthStatus } = this.state;
		if (auth && !currentAuthStatus) {
			setTimeout(
				function() {
					this.setState({ auth: true });
				}.bind(this),
				1300,
			);
		}
	};

	render() {
		const { location: { pathname = '' } = {} } = this.props;
		const { memberships } = this.props.auth_status;
		const { access: hasBillingAccess } = Permissions.hasService(memberships, 'Billing');
		const { access: hasStorageAccess } = Permissions.hasService(memberships, 'Storage');
		const { access: hasProfileAccess } = Permissions.hasService(memberships, 'Profile');
		const { access: hasSupportAccess } = Permissions.hasService(memberships, 'Support');

		return (
			<div className='portal'>
				<Switch>
					{/* <Route
						exact
						path='/portal/profile'
						render={props => (hasProfileAccess ? <Profile {...props} /> : <Home {...props} />)}
					/>
					<Route
						exact
						path='/portal/support'
						render={props => (hasSupportAccess ? <Support {...props} /> : <Home {...props} />)}
					/>
					<Route
						exact
						path='/portal/billing'
						render={props => (hasBillingAccess ? <Billing {...props} /> : <Home {...props} />)}
					/> */}
					<Route
						path='/portal/storage/:share'
						// render={props => (hasStorageAccess ? <Storage {...props} /> : <Home {...props} />)}
						render={props => {
							return hasStorageAccess ? <StorageOverview {...props} /> : <Home {...props} />;
						}}
					/>
					<Route exact path='/portal/sandbox' component={Sandbox} /> */}
					<Route exact path='/portal/storagev3' component={StorageOverview} />
					<Route
						exact
						path='/portal/'
						render={() => {
							return (
								<div id='reveal' className='portal-home-page'>
									{this.checkAuth(this.props.isAuthenticated) || !this.state.auth ? (
										<LoginPage isAuthenticated={this.props.isAuthenticated} />
									) : (
										<Home />
									)}
								</div>
							);
						}}
					/>
					<Route component={Error404} />
				</Switch>
				<ModalPage />
				{pathname !== '/portal/storagev3' && <Footer />}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		company_info: state.company_info,
		auth_status: state.auth_status,
	};
}
export default connect(
	mapStateToProps,
	{ getCompanyInfo },
)(Portal);