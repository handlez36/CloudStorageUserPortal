import React, { Component, Fragment } from 'react';

import ModalWizard from '../../../components/Common/ModalWizard';
import RosterModalHeader from './RosterModal/RosterModalHeader';
import RosterFirstnameScreen from './RosterModal/RosterFirstnameScreen';
import RosterLastnameScreen from './RosterModal/RosterLastnameScreen';
import RosterEmailScreen from './RosterModal/RosterEmailScreen';
import RosterModalLocations from './RosterModal/RosterModalLocations';
import RosterModalBadgeScreen from './RosterModal/RosterModalBadgeScreen';
import ErrorModal from '../../../components/Common/ErrorModal';
import RosterConfirmationScreen from './RosterModal/RosterConfirmationScreen';
import { VALIDATIONS } from '../../../components/Common/CommonConstants';
import { UserProfileApi } from '../../../services/userProfile';

class AddToRosterModal extends Component {
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
				locations: false,
			},
			steps: {
				1: {
					component: RosterFirstnameScreen,
					fieldname: 'firstname',
					params: {
						...this.commonParams,
						firstname: '',
						validations: [VALIDATIONS.AT_LEAST_ONE_CHAR],
					},
				},
				2: {
					component: RosterLastnameScreen,
					fieldname: 'lastname',
					params: {
						...this.commonParams,
						lastname: '',
						validations: [VALIDATIONS.AT_LEAST_ONE_CHAR],
					},
				},
				3: {
					component: RosterEmailScreen,
					fieldname: 'email',
					params: {
						...this.commonParams,
						email: '',
						validations: [VALIDATIONS.VALID_EMAIL],
					},
				},
				4: {
					component: RosterModalLocations,
					fieldname: 'locations',
					params: {
						...this.commonParams,
						locations: [],
						validations: [VALIDATIONS.VALID_LOCATION],
					},
				},
				5: {
					component: RosterModalBadgeScreen,
					fieldname: 'badgeAccess',
					params: {
						...this.commonParams,
						badgeAccess: '',
						//validations: [VALIDATIONS.VALID_LOCATION],
					},
				},
				CONFIRMATION: {
					component: RosterConfirmationScreen,
				},
			},
		};
	};

	getErrorBody = err => {
		return (
			<Fragment>
				<div className='top-message'>Sorry, there was an error while adding the roster user.</div>
				<div className='bottom-message'>
					Error: {err} <br />
					If the problem persists please call
					<br />
					877-590-1684.
				</div>
			</Fragment>
		);
	};

	formatBadgeAccess = () => {
		const { steps } = this.state;
		if (steps['5'].params.badgeAccess === 'Yes') {
			return true;
		} else {
			return false;
		}
	};

	formatLocations = () => {
		const { steps } = this.state;
		const locations = steps['4'].params.locations;
		const convertedLocations = [];
		if (locations.includes('Chattanooga')) {
			convertedLocations.push('2');
		}
		if (locations.includes('Birmingham')) {
			convertedLocations.push('1');
		}
		if (locations.includes('Atlanta')) {
			convertedLocations.push('3');
		}
		if (locations.includes('Huntsville')) {
			convertedLocations.push('4');
		}
		return convertedLocations;
	};

	enableErrorModal = error => {
		this.setState({ error });
		setTimeout(() => {
			this.setState({ show: false, showErrorModal: true }, () =>
				this.props.toggleRosterModal(false),
			);
		}, 1000);
	};

	submitWizard = async () => {
		const { steps } = this.state;
		const { id, refreshRosterUsers } = this.props;

		const badge = this.formatBadgeAccess();
		const locationIds = this.formatLocations();
		const params = {
			firstname: steps['1'].params.firstname,
			lastname: steps['2'].params.lastname,
			emailAddress: steps['3'].params.email,
			companyId: id,
			badgeRequired: badge,
			locationIds,
		};
		try {
			const response = await this.userProfileApi.addNewRosterUser(params);
			if (response.status === 200 && !response.data.error) {
				this.setState({ showConfirmationStep: true, active: 'CONFIRMATION' });
				refreshRosterUsers();
			} else {
				this.enableErrorModal(response.data.error || 'Error adding roster user');
			}
		} catch (e) {
			this.setState({ error: 'Network error adding roster user' });
		}
	};

	onStepChange = (field = NULL, nextStep) => {
		const { dirty } = this.state;
		if (field) {
			this.setState({ invalid: !dirty[field], active: nextStep });
		}
	};

	onChange = (id, event, data, fieldname) => {
		const { steps, dirty } = this.state;
		if (event) {
			const fieldname = event.target.name;

			const stepsCopy = { ...steps };
			stepsCopy[id].params[fieldname] = event.target.value;
			dirty[fieldname] = true;
			this.setState({ steps: stepsCopy, dirty });
		} else {
			const stepsCopy = { ...steps };
			stepsCopy[id].params[fieldname] = data;

			dirty[fieldname] = true;
			this.setState({ steps: stepsCopy, dirty });
		}
	};

	toggleOpen = () => {
		const { steps } = this.state;
		const initialState = this.initializeState();
		const stepsCopy = { ...steps };

		stepsCopy['1'].params.firstname = '';
		stepsCopy['2'].params.lastname = '';
		stepsCopy['3'].params.email = '';
		stepsCopy['4'].params.locations = [];
		stepsCopy['5'].params.badgeAccess = '';
		this.setState({ ...initialState, steps: stepsCopy });
		this.props.toggleRosterModal(false);
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
		const { active, steps, invalid, error, showConfirmationStep, showErrorModal } = this.state;

		return (
			<Fragment>
				<ErrorModal
					header='HEADER TEXT'
					isOpen={showErrorModal}
					customTitle='Error adding roster user'
					customBody={this.getErrorBody(error)}
					toggleOpen={this.toggleErrorModalOpen}
					submitViaEmail={() => {}}
				/>
				<ModalWizard
					header={RosterModalHeader}
					toggleOpen={this.toggleOpen}
					show={this.props.show}
					enableNav={!invalid}
					onStepChange={this.onStepChange}
					steps={steps}
					submitWizard={this.submitWizard}
					active={active}
					showConfirmationStep={showConfirmationStep}
					buttonText={{ lastStep: 'ADD TO ROSTER', confirmation: 'DONE' }}
					additionalClass={`roster-add-modal ${showConfirmationStep ? 'confirmation' : ''}`}
				/>
			</Fragment>
		);
	}
}

export default AddToRosterModal;
