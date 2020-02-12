import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Portal from './../../containers/Portal';

class ProtectedRoute extends Component {
	isUserAuthenticated(isAuthenticated, user) {
		const status = isAuthenticated === true && user;

		return status;
	}

	render() {
		const { component, ...rest } = this.props;
		const { isAuthenticated, user } = this.props.auth_status;

		return (
			<Route
				{...rest}
				render={props => {
					return this.isUserAuthenticated(isAuthenticated, user) ? (
						<Portal isAuthenticated={isAuthenticated} {...props} />
					) : (
						<Redirect to='/login' />
					);
				}}
			/>
		);
	}
}

function mapStateToProps(state) {
	return {
		auth_status: state.auth_status,
	};
}

export default connect(
	mapStateToProps,
	null,
)(ProtectedRoute);
