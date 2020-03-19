import React, { Component } from 'react';

import TextInput from 'sub_components/Common/BloxTextInput';
import Map from 'components_old/Common/Map';
import Button from 'sub_components/Common/BloxButton';
import { INPUT_TYPES } from 'utils/CommonConstants';
import { WIZARD_TITLE_PREFIXES } from 'utils/TicketConstants';
import { getTitlePlaceholder, getRemoteHandsTickets } from 'utils/SupportUtils';
const CDN_URL = process.env.REACT_APP_CDN_URL;
const Checkmark = `${CDN_URL}common/icons-forms-check.svg`;
const FIELDS = {
	DESCRIPTION: 1,
	TITLE: 2,
	LOCATION: 3,
	// ATTACHMENTS: 4,
	DONE: 4,
	// ATTACHMENTS: 4,
	// DONE: 5,
};
const REQUIRED_FIELDS = ['description', 'location'];

class RemoteHandsDescription extends Component {
	state = {
		description: '',
		title: '',
		location: '',
		attachments: [],
		completedFields: [],
		activeField: FIELDS.DESCRIPTION,
	};

	checkUnique = value => {
		const { tickets: { tickets = [] } = {} } = this.props;
		let matchingTitle = null;

		const remoteHandsTickets = getRemoteHandsTickets(tickets);
		remoteHandsTickets.forEach(ticket => {
			let title = null;
			const matches = ticket.name.match(/Remote Hands Request - (.*)/);
			if (matches && matches[1]) {
				title = matches[1];
			}
			if (title === value) {
				matchingTitle = title;
			}
		});

		return matchingTitle;
	};

	onChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	/** For new wizard... */
	formatWizardParams = (component, description, userProvidedTitle, location) => {
		const { tickets: { tickets = [] } = {} } = this.props;
		const title =
			userProvidedTitle !== ''
				? userProvidedTitle
				: getTitlePlaceholder(WIZARD_TITLE_PREFIXES.REMOTEHANDS, tickets);

		return {
			component,
			data: {
				description,
				title,
				location,
			},
		};
	};

	sendParams = () => {
		const { nextStep, name: stepName } = this.props;
		const { description, title, location } = this.state;
		// const submitBtn = document.querySelector('#submit-button');
		// submitBtn.setAttribute('disabled', 'disabled');

		this.setState({ submitted: true });
		const data = this.formatWizardParams(stepName, description, title, location);
		nextStep(data);
	};

	onLocationChange = location => {
		this.setState({ location });
		this.onFieldComplete('location', true);
	};

	onAttachmentChange = attachments => {
		this.setState({ attachments });
		this.onFieldComplete('attachments', true);
	};

	getNextField = () => {
		const { activeField } = this.state;

		if (activeField === FIELDS.DESCRIPTION) {
			this.onFieldComplete('title', true);
			return FIELDS.LOCATION;
		} else if (activeField === FIELDS.TITLE) {
			return FIELDS.LOCATION;
		} else if (activeField === FIELDS.LOCATION) {
			// return FIELDS.ATTACHMENTS;
			return FIELDS.DONE;
		} else if (activeField === FIELDS.ATTACHMENTS) {
			return FIELDS.DONE;
		}

		return FIELDS.DONE;
	};

	onFieldComplete = (field, isValid) => {
		const { activeField, completedFields: fields } = this.state;
		const { id, updateProgress } = this.props;
		let nextField = activeField;

		if (isValid) {
			if (!fields.includes(field)) {
				fields.push(field);
				nextField = FIELDS[field.toUpperCase()] === activeField ? this.getNextField() : activeField;
			}
		} else {
			if (fields.includes(field)) {
				const index = fields.indexOf(field);
				fields.splice(index, 1);
			}
		}

		updateProgress(id, fields.length);
		this.setState({ completedFields: fields, activeField: nextField });
	};

	shouldEnableButton = () => {
		const { completedFields } = this.state;

		return REQUIRED_FIELDS.reduce(
			(enable, field) => enable && completedFields.includes(field),
			true,
		);
	};

	componentDidMount() {
		const { id, editParams, updateProgress } = this.props;
		const completedFields = ['description', 'title', 'location'];

		if (editParams) {
			this.setState({
				description: editParams.description,
				title: editParams.title,
				location: editParams.location,
				attachments: editParams.attachments,
				completedFields,
				activeField: FIELDS.DONE,
			});
			updateProgress(id, completedFields.length);
		}
	}

	render() {
		const { activeField } = this.state;
		const { tickets: { tickets = [] } = {} } = this.props;

		return (
			<div className='remote-hands-request-description'>
				<div className='description'>
					<TextInput
						placeholder='Please be as descriptive as possible.'
						type={INPUT_TYPES.TEXTAREA}
						label='What do you need help with?'
						name='description'
						value={this.state.description || ''}
						onChange={this.onChange}
						markComplete={this.onFieldComplete}
						characterMinLength={10}
						active={true}
						setDefaultValueAsPlaceholder
					/>
				</div>
				<div className={`title ${activeField > FIELDS.DESCRIPTION ? 'active' : ''}`}>
					<TextInput
						placeholder={getTitlePlaceholder(WIZARD_TITLE_PREFIXES.REMOTEHANDS, tickets)}
						label='Give your request a title.'
						name='title'
						value={this.state.title}
						onChange={this.onChange}
						validations={[]}
						unique={this.checkUnique}
						markComplete={this.onFieldComplete}
						active={true}
						setPlaceholderAsValue
					/>
				</div>
				<div className={`location ${activeField > FIELDS.DESCRIPTION ? 'active' : ''}`}>
					{this.state.location !== '' && (
						<img className='location-checkmark' src={Checkmark} alt='' />
					)}
					<label className='location-label'>Select your location.</label>
					<Map location={this.state.location} onChange={this.onLocationChange} />
				</div>
				{/* <div className={`files ${activeField > FIELDS.LOCATION ? 'active' : ''}`}>
					<UploadSection attachments={this.state.attachments} onUpdate={this.onAttachmentChange} />
				</div> */}
				<Button
					title='NEXT'
					enabled={this.shouldEnableButton()}
					customClass='blox-button circle-large'
					onClick={this.sendParams}
				/>
			</div>
		);
	}
}

export default RemoteHandsDescription;
