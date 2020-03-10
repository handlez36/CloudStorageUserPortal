import React, { Component, Fragment } from 'react';
import { VALIDATIONS } from 'utils/CommonConstants';
import ErrorModal from 'components_old/Common/ErrorModal';
import ModalWizard from 'components_old/Common/ModalWizard';
import ModalHeader from 'containers_old/Profile/UserManagement/ModalHeader';
import { UserProfileApi } from 'services/userProfile';
import { Utils } from 'services/utils';
import UserFirstnameScreen from './UserFirstnameScreen';
import UserLastnameScreen from './UserLastnameScreen';
import UserEmailScreen from './UserEmailScreen';
import UserConfirmationScreen from './UserConfirmationScreen';

class UserAddModal extends Component {
	constructor(props) {
		super(props);

		this.userProfileApi = new UserProfileApi();
		this.commonParams = { onChange: this.onChange, markComplete: this.checkForErrors };
		this.state = this.initializeState();
	}

	initializeState = () => {
		return {
			active: 1,
			error: null,
			show: false,
			showErrorModal: false,
			showConfirmationStep: false,
			invalid: true,
			dirty: {
				firstname: false,
				lastname: false,
				email: false,
			},
			steps: {
				1: {
					component: UserFirstnameScreen,
					fieldname: 'firstname',
					params: {
						...this.commonParams,
						firstname: '',
						validations: [VALIDATIONS.AT_LEAST_ONE_CHAR],
					},
				},
				2: {
					component: UserLastnameScreen,
					fieldname: 'lastname',
					params: {
						...this.commonParams,
						lastname: '',
						validations: [VALIDATIONS.AT_LEAST_ONE_CHAR],
					},
				},
				3: {
					component: UserEmailScreen,
					fieldname: 'email',
					params: {
						...this.commonParams,
						email: '',
						validations: [VALIDATIONS.VALID_EMAIL],
					},
				},
				CONFIRMATION: {
					component: UserConfirmationScreen,
				},
			},
		};
	};

	getErrorBody = err => {
		return (
			<Fragment>
				<div className='top-message'>Sorry, there was an error while adding the portal user.</div>
				<div className='bottom-message'>
					Error: {err} <br />
					If the problem persists please call
					<br />
					877-590-1684.
				</div>
			</Fragment>
		);
	};

	enableErrorModal = error => {
		this.setState({ error });
		setTimeout(() => {
			this.setState({ show: false, showErrorModal: true });
		}, 1000);
	};

	submitWizard = async () => {
		const { steps } = this.state;
		const { id, refreshUsers } = this.props;

		const firstname = steps['1'].params.firstname;
		const lastname = steps['2'].params.lastname;
		const emailAddress = steps['3'].params.email;
		const params = { userDetails: { companyId: id, firstname, lastname, emailAddress } };

		try {
			const response = await this.userProfileApi.addNewPortalUser(params);

			if (Utils.isValidResponse(response)) {
				this.setState({ showConfirmationStep: true, active: 'CONFIRMATION' });
				refreshUsers();
			} else {
				this.enableErrorModal(response.data.error || 'Error adding portal user');
			}
		} catch (e) {
			this.enableErrorModal('Network error adding portal user');
		}
	};

	onStepChange = (field = null, nextStep) => {
		const { dirty } = this.state;
		if (field) {
			this.setState({ invalid: !dirty[field], active: nextStep });
		}
	};

	onChange = (id, event) => {
		const { steps, dirty } = this.state;
		const fieldname = event.target.name;

		const stepsCopy = { ...steps };
		stepsCopy[id].params[fieldname] = event.target.value;
		dirty[fieldname] = true;

		this.setState({ steps: stepsCopy, dirty });
	};

	toggleOpen = () => {
		const { steps } = this.state;
		const initialState = this.initializeState();
		const stepsCopy = { ...steps };

		stepsCopy['1'].params.firstname = '';
		stepsCopy['2'].params.lastname = '';
		stepsCopy['3'].params.email = '';
		this.setState({ ...initialState, steps: stepsCopy });
		this.props.toggleShowAddUserModal(false);
	};

	toggleErrorModalOpen = () => {
		this.toggleOpen();
	};

	checkForErrors = (field, valid) => {
		this.setState({ invalid: !valid });
	};

	componentDidUpdate() {
		const { show: incomingShowStatus } = this.props;
		const { show: existinShowStatus } = this.state;

		if (existinShowStatus !== incomingShowStatus) {
			this.setState({ show: incomingShowStatus });
		}
	}

	render() {
		const {
			active,
			steps,
			invalid,
			show,
			error,
			showConfirmationStep,
			showErrorModal,
		} = this.state;

		return (
			<Fragment>
				<ErrorModal
					header='HEADER TEXT'
					isOpen={showErrorModal}
					customTitle='Error adding portal user'
					customBody={this.getErrorBody(error)}
					toggleOpen={this.toggleErrorModalOpen}
					submitViaEmail={() => {}}
				/>
				<ModalWizard
					header={ModalHeader}
					toggleOpen={this.toggleOpen}
					show={show && !error}
					enableNav={!invalid}
					onStepChange={this.onStepChange}
					steps={steps}
					submitWizard={this.submitWizard}
					active={active}
					showConfirmationStep={showConfirmationStep}
					buttonText={{ lastStep: 'SEND INVITE', confirmation: 'DONE' }}
					additionalClass={`user-add-modal ${showConfirmationStep ? 'confirmation' : ''}`}
				/>
			</Fragment>
		);
	}
}

export default UserAddModal;
