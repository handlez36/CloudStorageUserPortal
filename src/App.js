import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { setAxiosDefaults } from './services/config';
import {
	validateAuthState,
	makeJwtValidationRequest,
	requestLoginUsernameReset,
} from './actions/auth';

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

			// this.props.validateAuthState(path);
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

		// Re-route to portal home page if user asks to switch companies
		const {
			currentMembership: incomingCurrentMembership,
			isAuthenticated,
		} = this.props.auth_status;
		const { currentMembership: existingCurrentMembership } = prevProps.auth_status;
		if (isAuthenticated && incomingCurrentMembership !== existingCurrentMembership) {
			setTimeout(() => {
				this.props.history.push('/portal');
			}, 500);
		}
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

// export default App;
function mapStateToProps(state) {
	return {
		auth_status: state.auth_status,
	};
}

export default withRouter(
	connect(
		mapStateToProps,
		{ validateAuthState, requestLoginUsernameReset },
	)(App),
);
