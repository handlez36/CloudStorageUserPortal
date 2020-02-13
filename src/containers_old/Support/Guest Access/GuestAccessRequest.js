import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import Wizard from '../../../components/Forms/BloxWizard';
import TicketDescription from './GuestAccessDescription';
import TicketDocuSign from './GuestAccessDocuSign';
import TicketSchedule from './GuestAccessSchedule';
import TicketContacts from './GuestAccessContacts';
import TicketReview from './GuestAccessReview';
import TicketConfirmation from './GuestAccessConfirmation';
import ErrorModal from '../../../components/Common/ErrorModal';
import { MENU } from '../TicketConstants';
import { updatePage } from '../../../actions/siteTracking';
import { SITE_PAGES } from '../../../components/Common/CommonConstants';
import { TicketApi } from '../../../services/ticket';
import { formatSupportTicket } from '../Utils/SupportUtils';
import { Utils } from '../../../services/utils';

const CDN_URL = process.env.REACT_APP_CDN_URL;
const GuestAccess = `${CDN_URL}common/tickets/icon-guest-access.svg`;
const BoxIcon = `${CDN_URL}support/icons-box-on.svg`;
const CalenderIcon = `${CDN_URL}support/icons-calendar-off.svg`;
const UserIcon = `${CDN_URL}support/icons-user-off.svg`;
const SignIcon = `${CDN_URL}support/icons-sign-off.svg`;
const STAGES = {
	POPULATE: 'POPULATE',
	REVIEW: 'REVIEW',
	COMPLETE: 'COMPLETE',
};

const HEADER_TITLE = {
	[STAGES.POPULATE]: 'NEW Service Request',
	[STAGES.REVIEW]: 'REVIEW & Submit',
	[STAGES.COMPLETE]: 'CONFIRMATION',
};

class GuestAccessRequest extends Component {
	constructor(props) {
		super(props);
		this.state = this.initializeWizard();
	}

	initializeWizard = () => {
		const { goToTicketHistory, onComplete, tickets } = this.props;

		return {
			active: null,
			error: null,
			showModal: false,
			errorBody: null,
			ip: null,
			resetWizard: false,
			steps: {
				'1': {
					component: TicketDescription,
					name: 'TicketDescription',
					params: { data: {}, tickets },
				},
				'2': {
					component: TicketContacts,
					name: 'TicketContacts',
					params: { data: {} },
				},
				'3': {
					component: TicketSchedule,
					name: 'TicketSchedule',
					params: { data: {} },
				},
				'4': {
					component: TicketDocuSign,
					name: 'TicketDocuSign',
					params: { data: {} },
				},
				REVIEW: {
					component: TicketReview,
					name: 'TicketReview',
					params: {
						phase: 'REVIEW',
						submitted: false,
						submitTicket: this.handleSubmit,
					},
				},
				COMPLETE: {
					component: TicketConfirmation,
					name: 'TicketConfirmation',
					params: {
						phase: 'CONFIRMATION',
						startNewRequest: this.resetWizard,
						goToTicketHistory,
						onComplete,
					},
				},
			},
		};
	};
	handleSubmit = async data => {
		try {
			const response = await Utils.retrieveIPParams();
			if (response && response.data) {
				this.submitTicket(data, response.data);
			} else {
				this.submitTicket(data, 'Error finding Ip');
			}
		} catch (e) {
			this.submitTicket(data, 'Network error finding Ip');
		}
	};

	resetSubmitState = () => {
		this.setState({ error: false });
	};

	resetWizard = () => {
		this.setState(state => {
			return { ...this.initializeWizard(), active: 1, resetWizard: true };
		});
		setTimeout(() => {
			this.setState({ active: null, resetWizard: false });
		}, 1000);
	};

	formDescription = (what, when, who) => {
		const momentDatetime = moment(when.data.datetime);
		const date = momentDatetime.format('MMM D, YYYY');
		const time = momentDatetime.format('hh:mm A');
		let desc = '';

		desc += `Description: ${what.data.description}\n`;
		desc += `Location: ${what.data.location}\n`;
		desc += `Date: ${date}\n`;
		desc += `Time: ${time}\n`;
		desc += `Duration: ${when.data.duration}\n`;
		desc += `Pod Number: ${what.data.podNumber}\n`;
		desc += `Cabinet ID: ${what.data.cabinetID}\n`;
		desc += `Guest: ${who.data.requestorName}\n`;
		desc += `Guest Email: ${who.data.requestorEmail}\n`;
		desc += `Guest Phone number: ${who.data.requestorPhone}\n`;

		return desc === '' ? 'No Information Included' : desc;
	};

	submitTicket = async (data, ip) => {
		const { auth_status, onComplete, site, company_info } = this.props;
		const { steps } = this.state;
		const browser_info = Utils.getClientParams(ip, site);
		const ticket = formatSupportTicket(
			data,
			'Guest Access',
			auth_status,
			this.formDescription,
			company_info,
			browser_info,
		);

		try {
			const response = await TicketApi.createTicket(ticket);

			if (response.status === 200 && !response.data.error) {
				// Trigger ticket refresh...
				onComplete();

				const { caseId = '0' } = response.data;
				const stepsCopy = { ...steps };
				stepsCopy['COMPLETE'].params.ticketNumber = caseId;

				this.setState({
					submitted: true,
					submitByEmail: false,
					ticketNumber: caseId,
					error: false,
					active: 'COMPLETE',
					stepsCopy,
				});
			} else {
				this.setState({ error: true });
			}
		} catch (e) {
			this.setState({ error: true });
		}
	};

	componentDidMount() {
		const { updatePage } = this.props;
		updatePage(SITE_PAGES.SUPPORT[MENU.GUESTACCESS]);
	}

	render() {
		const { steps, active, stage, error } = this.state;

		const progressAttributes = [
			{
				key: 1,
				icon: BoxIcon,
				total: 5,
				completed: 0,
			},
			{
				key: 2,
				icon: UserIcon,
				total: 4,
				completed: 0,
			},
			{
				key: 3,
				icon: CalenderIcon,
				total: 2,
				completed: 0,
			},
			{
				key: 4,
				icon: SignIcon,
				total: 1,
				completed: 0,
			},
		];
		const pageTitle = HEADER_TITLE[stage];
		const headerAttributes = {
			icon: GuestAccess,
			moduleTitle: 'GUEST ACCESS',
			pageTitle,
			pageTitles: {
				POPULATE: 'NEW Service Request',
				REVIEW: 'REVIEW & Submit',
				COMPLETE: 'CONFIRMATION',
			},
			progressAttributes,
		};

		return (
			<div className='remote-hands-request-page'>
				<ErrorModal
					header='HEADER TEXT'
					isOpen={error}
					toggleOpen={this.resetSubmitState}
					submitViaEmail={() => {}}
				/>
				<Wizard
					headerAttributes={headerAttributes}
					steps={steps}
					active={active}
					resetWizard={this.resetWizard}
					shouldWizardReset={this.state.resetWizard}
				/>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		site: state.site_tracking,
		auth_status: state.auth_status,
		company_info: state.company_info,
	};
}

export default connect(
	mapStateToProps,
	{ updatePage },
)(GuestAccessRequest);
