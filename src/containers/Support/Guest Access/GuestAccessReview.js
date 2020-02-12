import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import ExpandableSection from '../../../components/Common/ExpandableSection';
import ExpandableContent from '../../../components/Support/ExpandableContentComponent';
import Button from '../../../components/Common/BloxButton';
import ErrorModal from '../../../components/Common/ErrorModal';
import { TicketApi } from '../../../services/ticket';
import { WIZARD_TITLE_PREFIXES } from '../TicketConstants';
const CDN_URL = process.env.REACT_APP_CDN_URL;
const TopIcon = `${CDN_URL}support/image-what.svg`;

const STEPS = {
	WHAT: 1,
	WHO: 2,
	WHEN: 3,
	REVIEW: 'REVIEW',
};
const PREFERENCES = {
	EMAIL: 'Email',
	PHONE: 'Phone',
};

class GuestAccessReview extends Component {
	state = {
		submitted: false,
		error: false,
		submittedViaEmail: false,
	};

	submitViaEmail = async (what, when, who) => {
		const params = this.formatSendViaEmailParams(what, when, who);

		try {
			const response = await TicketApi.remoteHandsEmailRequest(params);
			if (response.status === 200 && !response.data.error) {
				this.setState({ submitted: true, submitByEmail: true, ticketNumber: caseId, error: false });
			} else {
				this.setState({ error: true });
			}
		} catch (e) {
			this.setState({ error: true });
		}
	};

	formatSendViaEmailParams = (what, when, who) => {
		const title = `${WIZARD_TITLE_PREFIXES.GUESTACCESS} - ${what.data.title || 'No Custom Title'}`;
		const description = what.data.description;
		const momentDatetime = moment(when.data.datetime);
		const date = momentDatetime.format('MMM D, YYY');
		const time = momentDatetime.format('hh:mm A');

		return {
			title,
			description,
			location: 'NA',
			whenDt: `${date} ${time}`,
			repeating: when.data.recurring,
			name: who.data.requestorName,
			email: who.data.requestorEmail,
			phone: who.data.requestorPhone,
			attachments: [],
		};
	};

	formatWhatParams = params => {
		const { title, podNumber, location, cabinetID, description } = params['1'].data;

		return {
			'1': {
				multiple: true,
				a: { label: 'Title', content: title },
				b: { label: 'Pod Number', content: podNumber },
			},
			'2': {
				multiple: true,
				a: { label: 'Location', content: location, icon: TicketApi.getIcon(params['1']) },
				b: { label: 'Cabinet ID', content: cabinetID },
			},
			'3': {
				label: 'Description',
				custom: true,
				type: ExpandableSection,
				params: { name: 'description1', content: description },
			},
		};
	};

	formatWhenParams = params => {
		const { datetime, duration } = params['3'].data;
		const formattedDate = moment(datetime).format('MMMM D, YYYY, hh:mm A');

		return {
			'1': {
				multiple: true,
				a: { label: 'Time of Service', content: formattedDate },
				b: { label: 'Duration of Visit', content: duration },
			},
		};
	};

	formatWhoParams = params => {
		const { requestorName, requestorEmail, requestorPhone, requestorPreference } = params['2'].data;
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
				content: this.autoFormatPhoneNumber(requestorPhone),
			},
		};
	};

	autoFormatPhoneNumber = number => {
		const onlyDigitsRegex = /(\d+)/g;
		const matches = number.match(onlyDigitsRegex);

		if (matches && matches.join('').length === 10) {
			const numbersOnly = matches.join('');
			const areacode = numbersOnly.slice(0, 3);
			const firstThree = numbersOnly.slice(3, 6);
			const separator = lastFour !== '' ? '-' : '';
			const lastFour = numbersOnly.slice(6, 10);
			const formattedPhoneNumber = `(${areacode}) ${firstThree} ${separator} ${lastFour}`;

			return formattedPhoneNumber.trim();
		} else {
			return number;
		}
	};

	componentDidUpdate() {
		const { confirmationCallback } = this.props;
		const { submitted, submittedViaEmail, ticketNumber } = this.state;

		if (submitted) {
			confirmationCallback(submittedViaEmail, ticketNumber);
		}
	}

	render() {
		const { data, editSection, submitTicket } = this.props;
		const { error } = this.state;

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
				<div className='text-expandable-content-single-column who-details'>
					<ExpandableContent
						title='WHO To Contact'
						icon={TopIcon}
						ctaCallback={() => editSection(STEPS.WHO, data['2'].data)}
						fields={whoParams}
					/>
				</div>
				<div className='text-expandable-content-single-column when-details'>
					<ExpandableContent
						title='WHEN You Need It'
						icon={TopIcon}
						ctaCallback={() => editSection(STEPS.WHEN, data['3'].data)}
						fields={whenParams}
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
)(GuestAccessReview);
