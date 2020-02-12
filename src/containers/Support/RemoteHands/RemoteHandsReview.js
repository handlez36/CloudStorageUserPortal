import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import ExpandableSection from '../../../components/Common/ExpandableSection';
import ExpandableContent from '../../../components/Support/ExpandableContentComponent';
import AttachmentSection from '../../../components/Common/AttachmentSection.js';
import Button from '../../../components/Common/BloxButton';
import ErrorModal from '../../../components/Common/ErrorModal';
import { TicketApi } from '../../../services/ticket';
import { UserProfileApi } from '../../../services/userProfile';
import { TYPES, SEVERITIES, WIZARD_TITLE_PREFIXES } from '../TicketConstants';
const CDN_URL = process.env.REACT_APP_CDN_URL;
const TopIcon = `${CDN_URL}support/image-what.svg`;

const STEPS = {
	WHAT: 1,
	WHEN: 2,
	WHO: 3,
	REVIEW: 'REVIEW',
};
const PREFERENCES = {
	EMAIL: 'EMAIL',
	PHONE: 'PHONE',
};

class RemoteHandsReview extends Component {
	state = {
		submitted: false,
		error: false,
		submittedViaEmail: false,
		attachmentsOpen: false,
	};

	resetSubmitState = () => {
		this.setState({ error: false });
	};

	toggleAttachmentSection = () => {
		this.setState(state => ({ ...state, attachmentsOpen: !state.attachmentsOpen }));
	};

	getUpcomingDates = when => {
		const { datetime, recurring } = when.data;
		const momentDate = moment(datetime);
		let duration = null;
		const nextThreeDates = [];

		switch (recurring) {
			case 'None':
				return 'No recurrence';
			case 'Daily':
				duration = moment.duration(1, 'days');
				break;
			case 'Weekly':
				duration = moment.duration(1, 'weeks');
				break;
			case 'Biweekly':
				duration = moment.duration(2, 'weeks');
				break;
			case 'Monthly':
				duration = moment.duration(1, 'months');
				break;
			default:
				break;
		}

		if (!duration) {
			return 'No recurrence';
		} else {
			for (let i = 1; i < 4; i++) {
				nextThreeDates.push(moment(momentDate + duration * i).format('MMM D'));
			}
			return nextThreeDates.join(', ');
		}
	};

	formatSendViaEmailParams = (what, when, who) => {
		const title = `${WIZARD_TITLE_PREFIXES.REMOTEHANDS} - ${what.data.title || 'No Custom Title'}`;
		const description = what.data.description;
		const momentDatetime = moment(when.data.datetime);
		const date = momentDatetime.format('MMM D, YYY');
		const time = momentDatetime.format('hh:mm A');

		return {
			title,
			description,
			location: what.data.location || 'Unknown',
			whenDt: `${date} ${time}`,
			repeating: when.data.recurring,
			name: who.data.requestorName,
			email: who.data.requestorEmail,
			phone: who.data.requestorPhone,
			attachments: [],
		};
	};

	submitViaEmail = async () => {
		return null;
		// console.log('Formatting email params...');
		// const params = this.formatSendViaEmailParams(what, when, who);

		// console.log('Sending via email...');
		// try {
		// 	const response = await TicketApi.remoteHandsEmailRequest(params);
		// 	if (response.status === 200 && !response.data.error) {
		// 		this.setState({ submitted: true, submitByEmail: true, ticketNumber: caseId, error: false });
		// 	} else {
		// 		this.setState({ error: true });
		// 	}
		// } catch (e) {
		// 	this.setState({ error: true });
		// }
	};

	formatWhatParams = params => {
		const { description, title, location } = params['1'].data;

		return {
			'1': {
				multiple: true,
				a: { label: 'Title', content: title },
				b: { label: 'Location', content: location, icon: TicketApi.getIcon(params['1']) },
			},
			'2': {
				label: 'Description',
				custom: true,
				type: ExpandableSection,
				params: { name: 'requestDescription', content: description },
			},
		};
	};

	formatWhenParams = params => {
		const { datetime, recurring } = params['2'].data;
		const formattedDate = moment(datetime).format('MMMM D, YYYY, hh:mm A');

		return {
			'1': {
				multiple: true,
				a: { label: 'Date & Time', content: formattedDate },
				b: { label: 'Repeat', content: recurring },
			},
			'2': {
				multiple: true,
				a: { label: '', content: '' },
				b: {
					label: 'Upcoming',
					content: this.getUpcomingDates(params['2']),
					tooltip: 'Support hours are outside of weekends and holidays',
				},
			},
		};
	};

	formatWhoParams = params => {
		const { requestorName, requestorEmail, requestorPhone, requestorPreference } = params['3'].data;
		const preferredContactStr = '(Preferred method of contact)';

		return {
			'1': {
				label: 'Name',
				content: requestorName,
			},
			'2': {
				label: 'Email',
				tagline: requestorPreference === PREFERENCES.EMAIL ? preferredContactStr : '',
				content: requestorEmail,
			},
			'3': {
				label: 'Phone',
				tagline: requestorPreference === PREFERENCES.PHONE ? preferredContactStr : '',
				content: requestorPhone,
			},
		};
	};

	componentDidUpdate() {
		const { confirmationCallback } = this.props;
		const { submitted, submittedViaEmail, ticketNumber } = this.state;

		if (submitted) {
			confirmationCallback(submittedViaEmail, ticketNumber);
		}
	}

	render() {
		const { editSection, data, submitTicket } = this.props;
		const { error, attachmentsOpen } = this.state;
		// const { data: { attachments } = {} } = data;
		const whatParams = this.formatWhatParams(data);
		const whenParams = this.formatWhenParams(data);
		const whoParams = this.formatWhoParams(data);

		return (
			<div className='remote-hands-request-review'>
				<ErrorModal
					header='HEADER TEXT'
					isOpen={error}
					toggleOpen={this.resetSubmitState}
					submitViaEmail={() => {}}
				/>
				<div className='review-message'>Review and edit or submit your request below.</div>
				<div className='text-expandable-content-single-column what-details'>
					<ExpandableContent
						title='WHAT You Need'
						icon={TopIcon}
						ctaCallback={() => editSection(STEPS.WHAT, data['1'].data)}
						fields={whatParams}
					/>
				</div>
				{/* <div className='request-attachments'>
					<AttachmentSection
						isOpen={attachmentsOpen}
						onToggle={this.toggleAttachmentSection}
						attachments={attachments}
					/>
				</div> */}
				<div className='text-expandable-content-single-column when-details'>
					<ExpandableContent
						title='WHEN You Need It'
						icon={TopIcon}
						ctaCallback={() => editSection(STEPS.WHEN, data['2'].data)}
						fields={whenParams}
					/>
				</div>
				<div className='text-expandable-content-single-column who-details'>
					<ExpandableContent
						title='WHO To Contact'
						icon={TopIcon}
						ctaCallback={() => editSection(STEPS.WHO, data['3'].data)}
						fields={whoParams}
					/>
				</div>
				<Button
					title='SUBMIT'
					enabled={true}
					customClass='support-button circle-large'
					onClick={() => submitTicket(data)}
				/>
			</div>
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
)(RemoteHandsReview);
