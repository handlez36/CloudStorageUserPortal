import React, { Component } from 'react';
import { InfoTable } from './InfoTable';
const CDN_URL = process.env.REACT_APP_CDN_URL;
const PrimaryContactAvatar = `${CDN_URL}profile/Profile_CompanyInfo_CONTACT_190x190.png`;

export default class PrimaryContact extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: null,
			dataFields: null,
			error: null,
			isLoading: false,
			// allowDataDisplayAfterLoading: false
		};
	}

	onChange = event => {
		console.log('Changing with ', event);
	};

	showContactAvatar = () => {
		return (
			<div className='avatar'>
				<img src={PrimaryContactAvatar} alt='avatar' />
			</div>
		);
	};

	displayPrimaryContactName() {
		const { data } = this.state;

		const firstName = data.firstName.toUpperCase();
		const middleName = data.middleName.toUpperCase();
		const lastName = data.lastName.toUpperCase();

		if (firstName !== ' ' && lastName !== ' ') {
			if (middleName !== ' ') {
				return `${firstName} ${middleName} ${lastName}`;
			} else {
				return `${firstName} ${lastName}`;
			}
		} else {
			return '';
		}
	}

	sanitizeResponse(response) {
		let addressLine1 = '';
		let addressLine2 = '';
		let city = '';
		let state = '';
		let zip = '';
		let primaryEmail = '';
		let workPhone = '';
		let firstName = ' ';
		let middleName = ' ';
		let lastName = ' ';

		if (response.addressPreferences) {
			let address = response.addressPreferences;

			if (address.billingAddress) {
				let billingAddress = address.billingAddress;

				addressLine1 = billingAddress.line1 || '';
				addressLine2 = billingAddress.line2 || '';
				city = billingAddress.city || '';
				state = billingAddress.state || '';
				zip = billingAddress.postalZip || '';
			}
		}

		if (response.customer) {
			let customer = response.customer;

			primaryEmail = customer.primaryEmail || '';
			workPhone = customer.primaryPhone || '';
			firstName = customer.firstName || ' ';
			middleName = customer.middleName || ' ';
			lastName = customer.lastName || ' ';
		}

		return {
			addressLine1,
			addressLine2,
			city,
			state,
			zip,
			primaryEmail,
			workPhone,
			firstName,
			middleName,
			lastName,
		};
	}

	generatePrimaryContactData = data => {
		// format address
		let streetLine1 = data.addressLine1;
		let streetLine2 = data.addressLine2;
		let city = data.city;
		let state = data.state;
		let zip = data.zip;

		let cityStateZip = `${city}, ${state}, ${zip}`;

		let addressFields = [];
		addressFields.push({ value: streetLine1, propName: 'primaryContactStreetLine1' });
		if (streetLine2 !== '') {
			addressFields.push({ value: streetLine2, propName: 'primaryContactStreetLine2' });
		}
		addressFields.push({ value: cityStateZip, propName: 'primaryContactCityStateZip' });

		let dataFields = [
			{
				name: 'PRIMARY EMAIL',
				value: data.primaryEmail,
				propName: 'primaryContactEmail',
				isDisabled: true,
			},
			{ name: 'PHONE - WORK', value: data.workPhone, propName: 'primaryContactWorkPhone' },
			{
				multiple: true,
				name: 'MAILING ADDRESS',
				propName: 'primaryContactMailingAddress',
				fields: addressFields,
			},
		];
		this.setState({ dataFields, data });
	};

	UNSAFE_componentWillReceiveProps(newProps) {
		const company_info = this.props.profile;
		const incoming_company_info = newProps.profile;

		if (company_info && company_info.fuseBillId !== incoming_company_info.fuseBillId) {
			/* Overwrite any existing state */
			let sanitizedInputs = this.sanitizeResponse(newProps.profile);

			this.generatePrimaryContactData(sanitizedInputs);
		}
	}

	componentDidMount() {
		const { profile } = this.props;
		const { dataFields } = this.state;

		if (!dataFields) {
			if (profile.fuseBillId) {
				let sanitizedInputs = this.sanitizeResponse(profile);

				this.generatePrimaryContactData(sanitizedInputs);
			}
		}
	}

	checkLoading() {
		const { isLoading, allowDataDisplayAfterLoading } = this.state;
		const wrapper = this.refs.primaryContactInfoWrapper;

		if (this.dataUnavailable() && !isLoading) {
			wrapper.classList.add('tint');
			this.setState(state => (state.isLoading = true));
		} else if (isLoading && allowDataDisplayAfterLoading) {
			wrapper.classList.remove('tint');
			this.setState(state => (state.isLoading = false));
		}
	}

	dataUnavailable() {
		const { error, data } = this.state;

		return !error && !data;
	}

	renderLoader() {}

	render() {
		return (
			<div className='primary-contact-info-wrapper'>
				{/* <Loader customloadingAnimation={profileLoaderAnimation} visible={this.state.isLoading} onAnimationMinRunTimeComplete={this.onAnimationMinRunTimeComplete} /> */}
				<div ref='primaryContactInfoWrapper' className='icon-table-layout'>
					<div className='icon'>{this.showContactAvatar()}</div>
					<div className='info'>
						{!this.state.error && this.state.data && (
							<div className='table-title'>{this.displayPrimaryContactName()}</div>
						)}
						{!this.state.error && !this.state.dataFields && (
							<div className='table-title'>Loading...</div>
						)}
						<table className='table table-borderless table-sm borderless'>
							<tbody>
								{this.state.error && (
									<div className='loading-error'>
										There was an error loading your company's primary contact information. Please
										refresh the screen and try again.
									</div>
								)}
								{!this.state.error && this.state.dataFields && (
									<InfoTable
										isDisabled={true}
										onChange={this.onChange}
										profile={this.state.dataFields}
									/>
								)}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		);
	}
}
