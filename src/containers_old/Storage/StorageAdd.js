import React, { Component } from 'react';
import { connect } from 'react-redux';

import DataInputsLayout from '../../components/Common/DataInputsLayout';
import PortalMessage from '../../components/Common/PortalMessage';
import { UserProfileApi } from '../../services/userProfile';
import { TYPES, SEVERITIES, STORAGE_MESSAGE, FIELDS, MENU } from './StorageConstants';
import { TicketApi } from '../../services/ticket';
import StorageAddModal from './View/StorageAddModal';
import { updatePage } from '../../actions/siteTracking';
import { SITE_PAGES } from '../../components/Common/CommonConstants';
import Button from '../../components/Common/COMPANYButton';

class StorageAdd extends Component {
	constructor(props) {
		super(props);

		this.userProfileApi = new UserProfileApi();

		this.state = {
			location: ' - ',
			secondaryLocation: ' - ',
			accessibility: '',
			name: '',
			type: '',
			redundant: false,
			subnetWhitelist: '',
			bonitaApi: null,
			enabled: 'disabled',

			nameFilled: false,
			subnetWhitelistFilled: false,
			locationFilled: false,
			secondaryLocationFilled: false,
			accessibilityFilled: false,
			typeFilled: false,
			filled: null,

			accessibilityError: false,
			locationError: false,
			secondaryLocationError: false,
			nameError: false,
			typeError: false,
			subnetWhitelistError: false,
			whitelistHelpMessage: 'Ex : XXX.XXX.XXX.XXX',
			success: false,
			showHelpMessage: false,
			successMessage: `Thanks for filling out our form, we'll get your new storage setup ASAP!`,
		};
	}

	renderBanner(bannerText) {
		return <div className={`banner`}>{bannerText}</div>;
	}

	onChange = event => {
		const { value, dataset, checked } = event.target;
		let stateField = dataset.fieldname;
		let stateValue = value;

		if (stateField === 'redundant') {
			stateValue = checked;
		}

		if (stateField === 'location' && this.state.redundant) {
			this.setState({ [stateField]: stateValue, redundant: false, secondaryLocation: ' - ' });
		} else {
			this.setState({ [stateField]: stateValue });
		}

		if (stateField === 'subnetWhitelist') {
			this.setState({ showHelpMessage: true });
		}

		this.validateInput(stateField, stateValue);
	};

	onBlur = event => {
		const { value, dataset } = event.target;
		let stateField = dataset.fieldname;
		let stateValue = value;
		this.validateInput(stateField, stateValue);
	};

	validateInput(stateField, stateValue) {
		let updateStatus;

		switch (stateField) {
			case 'location':
				updateStatus = stateValue === '-' ? 'STORAGE_ADD_ERROR' : 'STORAGE_ADD_SUCCESS';
				if (updateStatus === 'STORAGE_ADD_SUCCESS') {
					this.setState({ locationFilled: true }, () => this.generateDataFields());
				}
				break;
			case 'name':
				updateStatus =
					stateValue.length >= 2 && stateValue.length !== 0
						? 'STORAGE_ADD_SUCCESS'
						: 'STORAGE_ADD_ERROR';
				if (updateStatus === 'STORAGE_ADD_SUCCESS') {
					this.setState({ nameFilled: true }, () => this.generateDataFields());
				}
				break;
			case 'type':
				updateStatus =
					stateValue === 'File Access' || stateValue === 'Object Access'
						? 'STORAGE_ADD_SUCCESS'
						: 'STORAGE_ADD_ERROR';
				if (updateStatus === 'STORAGE_ADD_SUCCESS') {
					this.setState({ typeFilled: true }, () => this.generateDataFields());
				}
				break;
			case 'accessibility':
				updateStatus =
					stateValue === 'public' || stateValue === 'private' || stateValue === 'both'
						? 'STORAGE_ADD_SUCCESS'
						: 'STORAGE_ADD_ERROR';
				if (updateStatus === 'STORAGE_ADD_SUCCESS') {
					this.setState({ accessibilityFilled: true }, () => this.generateDataFields());
				}
				break;
			case 'subnetWhitelist':
				updateStatus = stateValue.match(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/)
					? 'STORAGE_ADD_SUCCESS'
					: 'STORAGE_ADD_ERROR';
				if (updateStatus === 'STORAGE_ADD_SUCCESS') {
					this.setState({ subnetWhitelistFilled: true, showHelpMessage: false }, () =>
						this.generateDataFields(),
					);
				}
				this.setState({ subnetWhitelistActive: true });
				break;
			case 'secondaryLocation':
				updateStatus =
					this.state.redundant && stateValue === '-' ? 'STORAGE_ADD_ERROR' : 'STORAGE_ADD_SUCCESS';
				if (updateStatus === 'STORAGE_ADD_SUCCESS') {
					this.setState({ secondaryLocationFilled: true }, () => this.generateDataFields());
				}
				break;
			default:
				break;
		}

		if (updateStatus === 'STORAGE_ADD_SUCCESS') {
			this.clearErrorField(stateField);

			if (
				this.state.locationFilled === true &&
				this.state.accessibilityFilled === true &&
				this.state.typeFilled === true &&
				this.state.nameFilled === true &&
				this.state.subnetWhitelistFilled === true
			) {
				if (this.state.redundant && this.state.secondaryLocation === ' - ') {
					this.setState({ filled: false }, () => this.generateDataFields());
				} else {
					this.setState(
						{
							filled: true,
							enabled: 'enabled',
						},
						() => this.generateDataFields(),
					);
				}
			}
		} else {
			this.setState({ [`${stateField}Error`]: true, filled: false }, () =>
				this.generateDataFields(),
			);
		}

		return updateStatus;
	}

	clearErrorField(stateField) {
		this.setState({ [`${stateField}Error`]: false }, () => this.generateDataFields());
	}

	stopBlueAnimation(stateField) {
		setTimeout(() => {
			this.setState({ [`${stateField}_active`]: false }, () => this.generateDataFields());
		}, 2000);
	}

	updateState = () => {
		const accessibility = document.getElementsByName('Accessibility');
		for (let a = 0; a < accessibility.length; a++) {
			accessibility[a].checked = false;
		}
		const type = document.getElementsByName('Type');
		for (let t = 0; t < type.length; t++) {
			type[t].checked = false;
		}
		const btn = document.querySelector('.COMPANY-button').classList;
		btn.remove('enabled');
		btn.add('disabled');
		this.setState({
			location: ' - ',
			accessibility: '',
			name: '',
			type: '',
			redundant: false,
			subnetWhitelist: '',
			success: false,
			enabled: 'disabled',
			filled: false,
			nameFilled: false,
			subnetWhitelistFilled: false,
			locationFilled: false,
			secondaryLocationFilled: false,
			accessibilityFilled: false,
			typeFilled: false,
		});
	};

	onSubmit = event => {
		const ticket = {
			title: 'Storage Add Request',
			priority: SEVERITIES.MEDIUM,
			type: TYPES.SUPPORT,
			description: this.formTicketDescription(this.state),
		};

		TicketApi.createTicket(ticket)
			.then(response => {
				if (response.status === 200 && response.data.caseId !== null) {
					this.setState({ success: true });
				} else {
					this.setState({
						successMessage: response.data.error,
					});
				}
			})
			.catch(error => console.log(error));
	};

	formTicketDescription(details) {
		let str = '';
		str += `Location: ${details.location}\n`;
		str += `Accessibility: ${details.accessibility}\n`;
		str += `Name: ${details.name}\n`;
		str += `Storage Type: ${details.type}\n`;
		str += `Redundant: ${details.redundant ? 'Yes' : 'No'}\n`;
		str += `Whitelist Subnet: ${details.subnetWhitelist}\n`;

		return str;
	}

	getSecondaryLocationOptions() {
		const { location } = this.state;

		let options = [
			{ value: 'ATL', displayValue: 'Atlanta, GA' },
			{ value: 'CHA', displayValue: 'Chattanooga, TN' },
			{ value: 'HSV', displayValue: 'Huntsville, AL' },
		];

		if (!location) return options;

		return options.filter(option => option.value !== location);
	}

	generateDataFields() {
		const {
			location,
			secondaryLocation,
			accessibility,
			name,
			type,
			redundant,
			subnetWhitelist,
			filled,
		} = this.state;
		if (filled) {
			const btn = document.querySelector('.COMPANY-button');
			btn.classList.remove('disabled');
			btn.classList.add('enabled');
		}

		return [
			{
				type: 'dropdown',
				name: FIELDS.LOCATION,
				propName: 'location',
				options: [
					{ value: 'ATL', displayValue: 'Atlanta, GA' },
					{ value: 'CHA', displayValue: 'Chattanooga, TN' },
					{ value: 'HSV', displayValue: 'Huntsville, AL' },
				],
				value: location,
				active: this.state.locationActive,
				error: this.state.locationError,
				errorMessage: 'Something went wrong. Please choose a location.',
			},
			{
				type: 'radio',
				name: FIELDS.ACCESSIBILITY,
				propName: 'accessibility',
				value: accessibility,
				options: [{ value: 'public' }, { value: 'private' }],
				error: this.state.accessibilityError,
				errorMessage: 'Something went wrong. Please fill in all fields.',
			},
			{
				name: FIELDS.NAME,
				value: name,
				propName: 'name',
				active: this.state.nameActive,
				error: this.state.nameError,
				errorMessage: 'Something went wrong. Please enter a name at least 2 characters long.',
			},
			{
				type: 'radio',
				name: FIELDS.TYPE,
				propName: 'type',
				value: type,
				options: [{ value: 'File Access' }, { value: 'Object Access' }],
				id: 'radio-buttons',
				error: this.typeError,
				errorMessage: 'Something went wrong. Please choose either File Access or Object Access.',
			},
			{ type: 'checkbox', name: FIELDS.REDUNDANT, value: redundant, propName: 'redundant' },
			{
				type: 'dropdown',
				hidden: !this.state.redundant,
				name: FIELDS.SECONDARY_LOCATION,
				propName: 'secondaryLocation',
				options: this.getSecondaryLocationOptions(),
				value: secondaryLocation,
				active: this.state.secondaryLocationActive,
				error: this.state.secondaryLocationError,
				errorMessage: 'Something went wrong. Please choose a secondary location.',
			},
			{
				name: FIELDS.WHITELIST,
				value: subnetWhitelist,
				propName: 'subnetWhitelist',
				active: this.state.subnetWhitelistActive,
				error: this.state.subnetWhitelistError,
				errorMessage: 'Something went wrong. Please ensure IP address is complete.',
				helpMessage: this.state.helpMessage,
			},
		];
	}

	renderInputs() {
		const dataFields = this.generateDataFields();
		return (
			<div className='form-section'>
				<div className='form'>
					<div className='title heading-section-head'>STORAGE Details</div>
					<DataInputsLayout
						data={dataFields}
						onBlurHandler={this.onBlur}
						className={`${this.state.className} body-copy-small-regular`}
						labelClass='form-label-float'
						isChangedHandler={this.onChange}
					/>
					{this.state.showHelpMessage && (
						<div className='field ipwhitelist'>{this.state.whitelistHelpMessage}</div>
					)}
					<div className='field'>
						<Button
							customClass='COMPANY-button disabled'
							title='Add Storage'
							enabled={this.state.enabled !== 'disabled'}
							onClick={this.state.enabled !== 'disabled' ? this.onSubmit : undefined}
						/>
					</div>
					{this.state.success && (
						<StorageAddModal
							body={this.state.successMessage}
							updateState={this.updateState}
							modal={true}
						/>
					)}
				</div>
			</div>
		);
	}

	componentDidMount() {
		const { updatePage } = this.props;
		updatePage(SITE_PAGES.STORAGE[MENU.ADD_STORAGE]);
	}

	render() {
		return (
			<div className='outer-wrapper storage-add'>
				<PortalMessage start={STORAGE_MESSAGE.START} content={STORAGE_MESSAGE.CONTENT} />
				{this.renderBanner('ADD STORAGE')}
				{this.renderInputs()}
			</div>
		);
	}
}

export default connect(
	null,
	{ updatePage },
)(StorageAdd);
