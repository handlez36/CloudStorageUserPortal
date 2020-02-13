import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import CycleView from '../../../components/Common/BloxCycleView';
import RosterBlock from './RosterBlock';
import RosterModal from './AddToRosterModal';
import { UserApi } from '../../../services/user';

class RosterUserList extends Component {
	state = {
		rosterUsers: null,
		error: null,
		companyId: null,
	};

	getRosterUsers(id) {
		UserApi.getAllRosterUsers(id)
			.then(response => {
				const validResponse = response.status === 200 && response.data;
				if (validResponse) {
					console.log(response.data.rosterUsers);
					this.setState({ rosterUsers: response.data.rosterUsers, companyId: id });
				} else {
					this.setState({ error: 'Error pulling users' });
				}
			})
			.catch(() => this.setState({ error: 'Error pulling users' }));
	}

	componentDidMount() {
		const {
			company_info: { customer: { id } = {} },
		} = this.props;

		this.getRosterUsers(id);
	}

	sortRosterUsers = users => {
		if (!users) return users;

		return users.sort((user1, user2) => {
			if (user1.id && user2.id) {
				return user1.id - user2.id;
			}
			return -1;
		});
	};

	render() {
		const {
			showModal,
			toggleRosterModal,
			auth_status: { user: { id: currentUserId } = {} } = {},
		} = this.props;
		const { rosterUsers, companyId: id, error } = this.state;
		const users = this.sortRosterUsers(rosterUsers);

		return (
			<Fragment>
				<RosterModal
					id={id}
					show={showModal}
					toggleRosterModal={toggleRosterModal}
					refreshRosterUsers={() => this.getRosterUsers(id)}
				/>
				<CycleView
					wrapperClass='.user-management-page'
					listClass='.roster-user-list'
					itemClass='.roster-block-wrapper'
					itemWrapperClass='.roster-user-list'
				>
					<div className='roster-user-list'>
						{users &&
							users.map(user => (
								<RosterBlock key={user.id} user={user} currentUserId={currentUserId} />
							))}
					</div>
				</CycleView>
				{!error && !rosterUsers && <div className='roster-loading'>Loading...</div>}
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
)(RosterUserList);

// export default RosterUserList;
