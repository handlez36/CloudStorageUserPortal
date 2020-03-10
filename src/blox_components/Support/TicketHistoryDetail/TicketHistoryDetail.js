import React, { Component, Fragment } from 'react';
import Button from 'sub_components/Common/BloxButton';
import { TicketApi } from 'services/ticket';
import Header from 'components_old/Support/PageHeader';
import CancelModal from 'sub_components/Common/ErrorModal';
import ExpandableSection from 'components_old/Common/ExpandableSection';
import ExpandableContent from 'components_old/Support/ExpandableContentComponent';
import { STATUS } from 'utils/TicketConstants';
import { TICKET_ICONS } from 'utils/TicketConstants';
import TicketLogistics from './Components/TicketHistoryDetailLogistics';
const CDN_URL = process.env.REACT_APP_CDN_URL;
const LowSeverityFlag = `${CDN_URL}support/image-flag-low.svg`;
const MedSeverityFlag = `${CDN_URL}support/image-flag-med.svg`;
const HighSeverityFlag = `${CDN_URL}support/image-flag-high.svg`;
const TopIcon = `${CDN_URL}support/image-what.svg`;

const SEVERITY_IMAGE = {
	Low: LowSeverityFlag,
	Medium: MedSeverityFlag,
	High: HighSeverityFlag,
};

const ConfirmationBody = (onCancel, onConfirm) => (
	<Fragment>
		<div className='ticket-cancel-request'>
			<div className='cancel-message'>
				Your information will be saved but we will no longer work on your request.
			</div>
			<div className='buttons-row'>
				<div className='no-option' onClick={onCancel}>
					NO
				</div>
				<div className='yes-option'>
					<Button title='YES' enabled={true} customClass='blox-button' onClick={onConfirm} />
				</div>
			</div>
		</div>
	</Fragment>
);

const ErrorBody = () => (
	<Fragment>
		<div className='top-message'>Looks like something went wrong on our end. Please try again.</div>
		<div className='bottom-message'>
			If the problem persists please call
			<br />
			877-590-1684.
		</div>
	</Fragment>
);

class StandardTicketDetail extends Component {
	state = {
		ticketDetails: null,
		error: null,
		cancelRequested: false,
		cancelConfirmed: false,
	};
	formatCancelTicketParams = ticket => {
		const { caseid = 0 } = ticket.context;

		return {
			caseid,
			comment: 'Ticket has been cancelled',
			status: STATUS.SOLVED,
		};
	};
	getTicketStatus(details) {
		if (!details || !details.status) {
			return 'OPEN';
		}

		return details.status;
	}

	toggleCancelModal = () => {
		this.setState({ cancelRequested: false, cancelConfirmed: false });
	};

	onCancelRequest = () => {
		this.setState({ cancelRequested: true });
	};

	onCancelRequestCancel = () => {
		this.setState({ cancelRequested: false, cancelConfirmed: false });
	};

	onCancelConfirm = async () => {
		const { ticketDetails } = this.state;
		const params = this.formatCancelTicketParams(ticketDetails);

		try {
			const response = await TicketApi.updateTicket(params);

			if (response.status === 200 && !response.data.error) {
				const { displayTicketHistory } = this.props;
				this.setState({ cancelRequested: false, cancelConfirmed: false });
				displayTicketHistory();
			} else {
				this.setState({
					error: 'Unable to cancel ticket',
					cancelRequested: false,
					cancelConfirmed: false,
				});
			}
		} catch (e) {
			this.setState({
				error: 'Unable to cancel ticket',
				cancelRequested: false,
				cancelConfirmed: false,
			});
		}
	};

	retrieveTicketDetails = async id => {
		try {
			const response = await TicketApi.getTicket(id);
			if (
				response.status === 200 &&
				!response.data.error &&
				response.data.ticketDetails.processid
			) {
				const { ticketDetails = {} } = response.data;
				this.setState({ ticketDetails });
			} else {
				const { error = 'Error retrieving details' } = response.data;
				if (error) {
					this.setState({ error });
				} else {
					this.setState({ error: 'Error retrieving details' });
				}
			}
		} catch (e) {
			this.setState({ error: 'Network error' });
		}
	};

	getIcon = ticket => {
		const {
			supportRequest: { priority = 'Low' },
		} = ticket;

		return SEVERITY_IMAGE[priority];
	};

	parseDescription = (title, description) => {
		const ticketTitle = title ? title + '<br />' : '';
		return ticketTitle + description.split('\n').join('<br />');
	};

	getDescriptionCardParams = ticket => {
		const {
			supportRequest: { description = 'Description unavailable', title = 'Title Unavailable' },
		} = ticket;

		return {
			'1': {
				label: 'Description',
				custom: true,
				type: ExpandableSection,
				params: { name: 'description', content: this.parseDescription(title, description) },
			},
		};
	};
	getTicketTypeIcon = details => {
		if (!details) {
			return;
		}

		const { supportRequest: { type = '' } = {} } = details;
		if (type) {
			switch (type.toUpperCase()) {
				case 'BILLING':
					return TICKET_ICONS.BILLING;
				case 'OUTAGE':
					return TICKET_ICONS.OUTAGE;
				case 'SUPPORT':
					return TICKET_ICONS.SUPPORT;
				case 'STORAGE':
					return TICKET_ICONS.STORAGE;
				case 'REMOTE HANDS':
					return TICKET_ICONS.REMOTEHANDS;
				case 'GUEST ACCESS':
					return TICKET_ICONS.GUESTACCESS;

				default:
					return TICKET_ICONS.BILLING;
			}
		}
	};
	toggleErrorModal = () => {
		const { displayTicketHistory } = this.props;
		this.setState({ error: false }, () => {
			displayTicketHistory();
		});
	};

	toggleErrorModal = () => {
		const { displayTicketHistory } = this.props;
		this.setState({ error: false }, () => {
			displayTicketHistory();
		});
	};

	componentDidMount() {
		const { id } = this.props;
		console.log('TICKET DETAILS', id);
		this.retrieveTicketDetails(id);
	}

	render() {
		const { ticketDetails, cancelRequested, error } = this.state;
		const { id } = this.props;
		const { supportRequest: { type = '' } = {} } = ticketDetails || {};
		const icon = this.getTicketTypeIcon(ticketDetails);

		return (
			<div className='ticket-history-detail'>
				<CancelModal
					isOpen={cancelRequested}
					toggleOpen={this.toggleCancelModal}
					customBody={ConfirmationBody(this.onCancelRequestCancel, this.onCancelConfirm)}
					customTitle='ARE you sure you want to cancel?'
				/>
				<CancelModal isOpen={error} toggleOpen={this.toggleErrorModal} customBody={ErrorBody()} />
				{ticketDetails && !error && (
					<div className='detail-wrapper'>
						<img className='severity-icon' src={this.getIcon(ticketDetails)} alt='' />
						<Header
							icon={icon}
							pageTitle={`TICKET #${id}`}
							moduleTitle={type}
							ticketStatus={this.getTicketStatus(ticketDetails)}
							onClick={this.onCancelRequest}
						/>
						<TicketLogistics ticketDetails={ticketDetails} />
						<div className='detail-cards'>
							<div className='text-expandable-content-single-column what-details'>
								<ExpandableContent
									title='WHAT You Need'
									icon={TopIcon}
									fields={this.getDescriptionCardParams(ticketDetails)}
								/>
							</div>
						</div>
					</div>
				)}
			</div>
		);
	}
}

export default StandardTicketDetail;
