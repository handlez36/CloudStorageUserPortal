import React, { Component } from 'react';

import Map from 'components_old/Common/Map';
import TextInput from 'sub_components/Common/COMPANYTextInput';
import Button from 'sub_components/Common/COMPANYButton';
import { INPUT_TYPES } from 'utils/CommonConstants';
import { WIZARD_TITLE_PREFIXES } from 'utils/TicketConstants';
import { getTitlePlaceholder, getGuestAccessTickets } from 'utils/SupportUtils';
const CDN_URL = process.env.REACT_APP_CDN_URL;
const Checkmark = `${CDN_URL}common/icons-forms-check.svg`;

const FIELDS = {
	DESCRIPTION: 1,
	TITLE: 2,
	LOCATION: 3,
	PODNUMBER: 4,
	CABINETID: 5,
	DONE: 6,
};

class GuestAccessDescription extends Component {
	state = {
		description: '',
		podNumber: '',
		location: '',
		cabinetID: '',
		title: '',
		completedFields: [],
		activeField: FIELDS.DESCRIPTION,
	};

	checkUnique = value => {
		const { tickets: { tickets = [] } = {} } = this.props;
		let matchingTitle = null;

		const guestAccessTickets = getGuestAccessTickets(tickets);
		guestAccessTickets.forEach(ticket => {
			let title = null;
			const matches = ticket.name.match(/Guest Access Request - (.*)/);
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
	formatWizardParams = (
		component,
		description,
		userProvidedTitle,
		location,
		podNumber,
		cabinetID,
	) => {
		const { tickets: { tickets = [] } = {} } = this.props;
		const title =
			userProvidedTitle !== ''
				? userProvidedTitle
				: getTitlePlaceholder(WIZARD_TITLE_PREFIXES.GUESTACCESS, tickets);

		return {
			component,
			data: {
				description,
				title,
				location,
				podNumber,
				cabinetID,
			},
		};
	};

	sendParams = () => {
		const { nextStep, name: stepName } = this.props;
		const { description, title, location, podNumber, cabinetID } = this.state;
		// const submitBtn = document.querySelector('#submit-button');
		// submitBtn.setAttribute('disabled', 'disabled');

		this.setState({ submitted: true });
		const data = this.formatWizardParams(
			stepName,
			description,
			title,
			location,
			podNumber,
			cabinetID,
		);
		nextStep(data);
	};

	getNextField = () => {
		const { activeField } = this.state;

		if (activeField === FIELDS.DESCRIPTION) {
			this.onFieldComplete('title', true);
			return FIELDS.LOCATION;
		} else if (activeField === FIELDS.TITLE) {
			return FIELDS.LOCATION;
		} else if (activeField === FIELDS.LOCATION) {
			return FIELDS.PODNUMBER;
		} else if (activeField === FIELDS.PODNUMBER) {
			return FIELDS.CABINETID;
		} else if (activeField === FIELDS.CABINETID) {
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

	onLocationChange = location => {
		if (!this.state.location) {
			this.onFieldComplete('location', true);
		}
		this.setState({ location });
	};

	componentDidMount() {
		const { editParams, updateProgress, id } = this.props;
		const completedFields = ['description', 'title', 'location', 'podNumber', 'cabinetID'];

		if (editParams) {
			this.setState({
				description: editParams.description,
				title: editParams.title,
				location: editParams.location,
				podNumber: editParams.podNumber,
				cabinetID: editParams.cabinetID,
				completedFields,
				activeField: FIELDS.DONE,
			});
			updateProgress(id, completedFields.length);
		}
	}

	render() {
		const { completedFields, activeField } = this.state;
		const { tickets: { tickets = [] } = {} } = this.props;

		return (
			<div className='ticket-request-description-ga'>
				<div className='description'>
					<TextInput
						placeholder='Please be as descriptive as possible.'
						type={INPUT_TYPES.TEXTAREA}
						label='What do you need help with?'
						name='description'
						value={this.state.description}
						onChange={this.onChange}
						markComplete={this.onFieldComplete}
						characterMinLength={10}
						active={true}
						showCharacterCount={true}
					/>
				</div>
				<div className={`title ${activeField > FIELDS.DESCRIPTION ? 'active' : ''}`}>
					<TextInput
						placeholder={getTitlePlaceholder(WIZARD_TITLE_PREFIXES.GUESTACCESS, tickets)}
						label='Give your request a title.'
						name='title'
						value={this.state.title}
						validations={[]}
						unique={this.checkUnique}
						onChange={this.onChange}
						markComplete={this.onFieldComplete}
						active={true}
						setPlaceholderAsValue
					/>
				</div>
				<div
					className={`title location-selection ${activeField > FIELDS.DESCRIPTION ? 'active' : ''}`}
				>
					<div className='radio-button-label'>
						{this.state.location && <img className={'checkmark '} src={Checkmark} alt='' />}
					</div>
					<label className='map-title'>Select your location.</label>
					<Map onChange={this.onLocationChange} location={this.state.location} />
				</div>
				<div className={`title-2  ${activeField >= FIELDS.PODNUMBER ? 'active' : ''}`}>
					<TextInput
						placeholder=''
						label='Pod Number'
						name='podNumber'
						value={this.state.podNumber}
						validations={[
							{ message: "That's not a valid Pod Number", pattern: /^([0-9]){3}[0-9]*$/ },
						]}
						onChange={this.onChange}
						markComplete={this.onFieldComplete}
						active={true}
						maxlength={3}
					/>
				</div>
				<div className={`title-2 ${activeField >= FIELDS.CABINETID ? 'active' : ''}`}>
					<TextInput
						placeholder=''
						label='Cabinet ID'
						name='cabinetID'
						value={this.state.cabinetID}
						validations={[
							{ message: "That's not a valid Cabinet ID", pattern: /^([0-9]){3}[0-9]*$/ },
						]}
						onChange={this.onChange}
						markComplete={this.onFieldComplete}
						active={true}
						maxlength={3}
					/>
				</div>
				<Button
					title='NEXT'
					enabled={completedFields.length > 4}
					customClass='COMPANY-button circle-large'
					onClick={this.sendParams}
				/>
			</div>
		);
	}
}

export default GuestAccessDescription;
