import React, { Component } from 'react';

import UserBlock from './UserBlock';
import { UserApi } from '../../../services/user';
import { CompanyProfileApi } from '../../../services/companyProfile';
export default class Portal extends Component {
	constructor(props) {
		super(props);

		this.state = {
			users: '',
		};
		this.companyApi = new CompanyProfileApi();
	}

	componentDidMount() {
		this.getCompanyProfile();
	}

	getCompanyProfile = () => {
		this.companyApi
			.get()
			.then(response => {
				const validResponse = response.status === 200 && response.data;
				if (validResponse) {
					console.log(JSON.stringify(response.data.customer.id));
					this.getUsers(response.data.customer.id);
				} else {
					this.setState({ error: 'Error pulling company details' });
				}
			})
			.catch(error => this.setState({ error }));
	};

	getUsers(id) {
		UserApi.getAllUsers(id)
			.then(response => {
				const validResponse = response.status === 200 && response.data;
				if (validResponse) {
					this.setState({ users: response.data.users });
				} else {
					this.setState({ error: 'Error pulling users' });
				}
			})
			.catch(error => this.setState({ error }));
	}

	render() {
		return (
			<div className='portal-wrapper'>
				<div className='user-block-section'>
					{this.state.users !== '' && <UserBlock users={this.state.users} />}
				</div>
			</div>
		);
	}
}
