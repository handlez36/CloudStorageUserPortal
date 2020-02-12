import React, { Component } from 'react';
import { connect } from 'react-redux';
import merge from 'lodash/merge';

import TicketSeverity from './TicketSeverity';
import TicketDescription from './TicketDescription';
import TicketSummary from './TicketSummary';
import { TicketApi } from '../../../services/ticket';
import { STEPS, TYPES, SEVERITIES, MENU } from '../TicketConstants';
import { updatePage } from '../../../actions/siteTracking';
import { SITE_PAGES } from '../../../components/Common/CommonConstants';

/**
 * Allows ticket creation and ticket history viewing
 */
class TicketCreate extends Component {
	constructor(props) {
		super(props);

		this.state = {
			currentStep: STEPS.TICKET_DESCRIPTION,
			ticketType: '',
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
		const { ticketType, ticketSeverity } = this.state;

		const ticket = {
			type: ticketType || TYPES.SUPPORT,
			priority: ticketSeverity || SEVERITIES.LOW,
		};

		return ticket;
	}

	resetTicketCreationProcess = () => {
		// this.setState({ currentStep: STEPS.TICKET_TYPE });
		const { onCompletion, backToOverview } = this.props;
		onCompletion();
		console.log('CALLING');
		backToOverview();
	};

	/**
	 * JSX rendered to step through ticket creation process
	 */
	showTicketSteps() {
		const { currentStep, ticketType, ticketFinalized } = this.state;
		const { auth_status, onCompletion, backToOverview } = this.props;
		// if (currentStep === STEPS.TICKET_SUBMITTED) {
		// 	this.props.updateTicketCount();
		// }
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
						type={ticketType}
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
					/>
				)}
				{currentStep === STEPS.TICKET_SUBMITTED && (
					<TicketSummary
						auth_status={auth_status}
						resetTicketCreation={this.resetTicketCreationProcess}
						onCompletion={onCompletion}
						ticket={TicketApi.constructTicket(ticketFinalized, auth_status)}
						backToOverview={backToOverview}
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

	componentDidMount() {
		const { updatePage } = this.props;
		updatePage(SITE_PAGES.SUPPORT[MENU.CREATETICKET]);

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

export default connect(
	mapStateToProps,
	{ updatePage },
)(TicketCreate);
