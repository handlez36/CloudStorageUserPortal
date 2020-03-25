import React, { Component } from 'react';
import { connect } from 'react-redux';
import merge from 'lodash/merge';

import { TicketApi } from 'services/ticket';
import { STEPS, TYPES, SEVERITIES, MENU } from 'utils/TicketConstants';
import { updateModule, updatePage, addPageToBreadCrumbs } from 'actions/siteTracking';
import { SITE_PAGES, SITE_MODULES } from 'utils/CommonConstants';
import TicketSeverity from './Components/TicketSeverity';
import TicketDescription from './Components/TicketDescription';
import TicketSummary from './Components/TicketSummary';

/**
 * Allows ticket creation and ticket history viewing
 */
class TicketCreate extends Component {
	constructor(props) {
		super(props);

		this.state = {
			currentStep: STEPS.TICKET_SEVERITY,
			type: '',
			ticketSeverity: '',
			ticketFinalized: null,
		};
	}

	/**
	 * Set ticket severity (used for auto severity setting)
	 * @param severity
	 */
	setTicketSeverity(severity) {
		this.setState({ ticketSeverity: severity });
	}

	/**
	 * Determine if ticket needs to have severity auto selected
	 * based on ticket type chosen
	 * @param attribute
	 */
	checkTicketSeverityAutoSelection(attribute) {
		let nextStep = STEPS.TICKET_SEVERITY;

		if (!!attribute[STEPS.TICKET_TYPE]) {
			const ticketType = attribute[STEPS.TICKET_TYPE];

			if (ticketType === TYPES.OUTAGE) {
				this.setTicketSeverity(SEVERITIES.URGENT);
				nextStep = STEPS.TICKET_DESCRIPTION;
			} else if (ticketType === TYPES.BILLING) {
				this.setTicketSeverity(SEVERITIES.MEDIUM);
				nextStep = STEPS.TICKET_DESCRIPTION;
			}
		}

		return nextStep;
	}

	/**
	 * Determine next phase of ticket creation process
	 * @param currentStep
	 * @param attribute
	 */
	findNextStep(currentStep, attribute) {
		switch (currentStep) {
			case STEPS.TICKET_TYPE:
				return this.checkTicketSeverityAutoSelection(attribute);
			case STEPS.TICKET_SEVERITY:
				return STEPS.TICKET_DESCRIPTION;
			case STEPS.TICKET_DESCRIPTION:
				return STEPS.TICKET_SUBMITTED;
			default:
				return STEPS.TICKET_TYPE;
		}
	}

	/**
	 * Callback method to receive ticket attribute set via
	 * Ticket Type, Severity and Description sub-components
	 */
	setTicketAttribute = attribute => {
		const nextStep = this.findNextStep(this.state.currentStep, attribute);
		const newState = merge(attribute, { currentStep: nextStep });

		this.setState(newState);
	};

	/**
	 * Construct params object with ticket details
	 * @param ticket
	 */
	getTicketParams() {
		const { type, ticketSeverity } = this.state;
		console.log('type', type);
		const ticket = {
			type: type || TYPES.SUPPORT,
			priority: ticketSeverity || SEVERITIES.LOW,
		};

		return ticket;
	}

	resetTicketCreationProcess = () => {
		const { onCompletion, backToOverview } = this.props;
		onCompletion();

		backToOverview();
	};
	getType = () => {
		const matches = window.location.pathname.split('/');

		if (matches) {
			const [, , siteModule, sitePage] = matches;

			if (sitePage) {
				const type = sitePage.split('_')[0];
				this.updateCurrentPage(type.toUpperCase());
				this.setState({ type: type.toUpperCase() });
			}
		}
	};

	/**
	 * JSX rendered to step through ticket creation process
	 */
	showTicketSteps() {
		const { currentStep, type, ticketFinalized } = this.state;
		const { auth_status, onCompletion, backToOverview, history } = this.props;
		console.log('TYPE', type);
		return (
			<div className='outer-wrapper ticket-creation'>
				{/* {(currentStep === STEPS.TICKET_TYPE || this.props.resetTicketCreation) && (
					<TicketType
						auth_status={auth_status}
						resetTicketCreation={this.resetTicketCreationProcess}
						setTicketAttribute={this.setTicketAttribute}
					/>
				)} */}
				{currentStep === STEPS.TICKET_SEVERITY && (
					<TicketSeverity
						auth_status={auth_status}
						resetTicketCreation={this.resetTicketCreationProcess}
						type={type}
						setTicketAttribute={this.setTicketAttribute}
					/>
				)}
				{currentStep === STEPS.TICKET_DESCRIPTION && (
					<TicketDescription
						auth_status={auth_status}
						resetTicketCreation={this.resetTicketCreationProcess}
						ticket={this.getTicketParams()}
						setTicketAttribute={this.setTicketAttribute}
						authStatus={auth_status}
						history={history}
					/>
				)}
				{currentStep === STEPS.TICKET_SUBMITTED && (
					<TicketSummary
						auth_status={auth_status}
						resetTicketCreation={this.resetTicketCreationProcess}
						onCompletion={onCompletion}
						ticket={TicketApi.constructTicket(ticketFinalized, auth_status)}
						backToOverview={backToOverview}
						type={type}
					/>
				)}
			</div>
		);
	}

	componentDidUpdate() {
		if (this.props.resetTicketCreation && this.state.currentStep !== STEPS.TICKET_TYPE) {
			this.setState({ currentStep: STEPS.TICKET_TYPE });
		}
	}

	updateCurrentPage = type => {
		const { updateModule, updatePage, addPageToBreadCrumbs } = this.props;

		switch (type) {
			case TYPES.BILLING:
				updatePage(SITE_PAGES.SUPPORT[MENU.CREATETICKETBILLING]);
				addPageToBreadCrumbs(SITE_PAGES.SUPPORT[MENU.CREATETICKETBILLING], SITE_MODULES.SUPPORT);
				break;

			case TYPES.SUPPORT:
				updatePage(SITE_PAGES.SUPPORT[MENU.CREATETICKETSUPPORT]);
				addPageToBreadCrumbs(SITE_PAGES.SUPPORT[MENU.CREATETICKETSUPPORT], SITE_MODULES.SUPPORT);
				break;
			case TYPES.OUTAGE:
				updatePage(SITE_PAGES.SUPPORT[MENU.CREATETICKETOUTAGE]);
				addPageToBreadCrumbs(SITE_PAGES.SUPPORT[MENU.CREATETICKETOUTAGE], SITE_MODULES.SUPPORT);
				break;
			default:
				updatePage(SITE_PAGES.SUPPORT[MENU.CREATETICKETSUPPORT]);
				addPageToBreadCrumbs(SITE_PAGES.SUPPORT[MENU.CREATETICKETSUPPORT], SITE_MODULES.SUPPORT);
				break;
		}
		updateModule(SITE_MODULES.SUPPORT);
	};

	componentDidMount() {
		this.getType();

		const { ticketType } = this.props;
		const attribute = { [STEPS.TICKET_TYPE]: ticketType };
		const nextStep = this.findNextStep(STEPS.TICKET_TYPE, attribute);
		const newState = merge(attribute, { currentStep: nextStep });
		this.setState(newState);
	}

	render() {
		return <div className='support-page'>{this.showTicketSteps()}</div>;
	}
}

function mapStateToProps(state) {
	return {
		auth_status: state.auth_status,
	};
}

export default connect(mapStateToProps, { updateModule, updatePage, addPageToBreadCrumbs })(
	TicketCreate,
);
