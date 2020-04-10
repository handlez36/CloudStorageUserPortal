import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import CycleView from 'sub_components/Common/COMPANYCycleView';
import { UserApi } from 'services/user';
import UserAddModal from './UserAddModal';
import UserBlock from './UserBlock';

class PortalUserList extends Component {
	state = {
		users: null,
		showModal: false,
	};

	getUsers(id) {
		if (!id) {
			return;
		}

		UserApi.getAllUsers(id)
			.then(response => {
				const validResponse = response.status === 200 && response.data;
				if (validResponse) {
					this.setState({ users: response.data.users, companyId: id });
				} else {
					this.setState({ error: 'Error pulling users' });
				}
			})
			.catch(() => this.setState({ error: 'Error pulling users' }));
	}

	componentDidUpdate() {
		const { showModal: incomingModalStatus } = this.props;
		const { showModal: existingModalStatus } = this.state;

		if (existingModalStatus !== incomingModalStatus) {
			this.setState({ showModal: incomingModalStatus });
		}
	}

	componentDidMount() {
		const {
			company_info: { customer: { id } = {} },
		} = this.props;

		this.getUsers(id);
	}

	render() {
		const { showModal, auth_status: { user: { id: currentUserId } = {} } = {} } = this.props;
		const { users, id, error, companyId } = this.state;

		return (
			// <div className='portal-user-list-component'>
			<Fragment>
				<UserAddModal
					id={id}
					show={showModal}
					toggleShowAddUserModal={this.props.toggleShowAddUserModal}
					refreshUsers={() => this.getUsers(companyId)}
				/>
				<CycleView
					wrapperClass='.user-management-page'
					listClass='.portal-user-list'
					itemClass='.user-block'
					itemWrapperClass='.portal-user-list'
				>
					<div className='portal-user-list'>
						{users &&
							users.map(user => (
								<UserBlock
									key={user.id || user.contactDetails.email}
									user={user}
									currentUserId={currentUserId}
								/>
							))}
					</div>
				</CycleView>
				{!error && !users && <div className='user-loading'>Loading...</div>}
			</Fragment>
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
)(PortalUserList);

// export default PortalUserList;
