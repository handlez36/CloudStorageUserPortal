import React, { Component } from 'react';
import { InfoTable } from './InfoTable';

export default class CompanyInfo extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: null,
			dataFields: null,
			error: null,
			isLoading: false,
		};
	}

	onChange = event => {
		console.log('Changing with ', event);
	};

	sanitizeResponse(response) {
		let addressLine1 = '';
		let addressLine2 = '';
		let city = '';
		let state = '';
		let zip = '';
		let primaryEmail = '';
		let companyName = '';

		let workPhone = '';
		let firstName = ' ';
		let middleName = ' ';
		let lastName = ' ';

		if (response.addressPreferences) {
			const address = response.addressPreferences;

			if (address.billingAddress) {
				const billingAddress = address.billingAddress;

				addressLine1 = billingAddress.line1 || '';
				addressLine2 = billingAddress.line2 || '';
				city = billingAddress.city || '';
				state = billingAddress.state || '';
				zip = billingAddress.postalZip || '';
			}
		}

		if (response.customer) {
			const customer = response.customer;

			primaryEmail = customer.primaryEmail || '';
			companyName = customer.companyName || '';
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
			companyName,
			workPhone,
			firstName,
			middleName,
			lastName,
		};
	}

	generateCompanyData = data => {
		// format address
		let streetLine1 = data.addressLine1;
		let streetLine2 = data.addressLine2;
		let city = data.city;
		let state = data.state;
		let zip = data.zip;

		let cityStateZip = `${city}, ${state}, ${zip}`;

		let addressFields = [];
		addressFields.push({ value: streetLine1, propName: 'companyStreetLine1' });
		if (streetLine2 !== '') {
			addressFields.push({ value: streetLine2, propName: 'companyStreetLine2' });
		}
		addressFields.push({ value: cityStateZip, propName: 'companyCityStateZip' });

		let dataFields;
		if (this.props.type === 'CompanyInfo') {
			dataFields = [
				{ name: 'PRIMARY EMAIL', value: data.primaryEmail, propName: 'companyPrimaryEmail' },
				{
					multiple: true,
					name: 'BILLING ADDRESS',
					propName: 'companyBillingAddress',
					fields: addressFields,
				},
			];
		} else if (this.props.type === 'PrimaryContact') {
			dataFields = [
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
		} else {
			dataFields = this.props.dataFields;
		}
		this.setState({ dataFields, data });
	};

	UNSAFE_componentWillReceiveProps(newProps) {
		const company_info = this.props.profile;
		const incoming_company_info = newProps.profile;

		if (company_info && company_info.fuseBillId !== incoming_company_info.fuseBillId) {
			/* Overwrite any existing state */
			let sanitizedInputs = this.sanitizeResponse(newProps.profile);

			this.generateCompanyData(sanitizedInputs);
		}
	}

	componentDidMount() {
		const { profile } = this.props;
		const { dataFields } = this.state;

		if (!dataFields) {
			if (profile.fuseBillId) {
				let sanitizedInputs = this.sanitizeResponse(profile);

				this.generateCompanyData(sanitizedInputs);
			}
		}
	}

	displayPrimaryContactName(data) {
		const { firstName, middleName, lastName } = data;

		if (firstName !== ' ' && lastName !== ' ') {
			if (middleName !== ' ') {
				return `${firstName.toUpperCase()} ${middleName.toUpperCase()} ${lastName.toUpperCase()}`;
			} else {
				return `${firstName.toUpperCase()} ${lastName.toUpperCase()}`;
			}
		} else {
			return '';
		}
	}

	displayCompanyName({ error, data }) {
		if (!error && data) {
			const { companyName } = data;
			if (this.props.type === 'CompanyInfo') {
				return <div className='table-title'>{companyName.toUpperCase()}</div>;
			} else if (this.props.type === 'PrimaryContact') {
				return <div className='table-title'>{this.displayPrimaryContactName(data)}</div>;
			}
		}
	}

	displayCompanyIcon() {
		return <img src={this.props.image} alt='company_avatar' />;
	}

	displayErrorText() {
		if (this.state.error) {
			return (
				<div className='error'>
					There was an error loading your company's profile. Please refresh the screen and try
					again.
				</div>
			);
		}
	}

	checkLoading() {
		const { allowDataDisplayAfterLoading, isLoading } = this.state;
		const iconElement = this.refs.companyInfoIcon;
		const detailsElement = this.refs.companyInfoDetails;

		if (this.dataUnavailable() && !isLoading) {
			iconElement.classList.add('tint');
			detailsElement.classList.add('tint');
			this.setState(state => (state.isLoading = true));
		} else if (isLoading && allowDataDisplayAfterLoading) {
			iconElement.classList.remove('tint');
			detailsElement.classList.remove('tint');
			this.setState(state => (state.isLoading = false));
		}
	}

	dataUnavailable() {
		const { error, dataFields } = this.state;

		return !error && !dataFields;
	}

	render() {
		return (
			<div ref='companyInfoWrapper' className='company-info-wrapper wrapper'>
				{/* <Loader customloadingAnimation={profileLoaderAnimation} visible={this.state.isLoading} onAnimationMinRunTimeComplete={this.onAnimationMinRunTimeComplete} /> */}
				<div ref='companyInfoIcon' className='icon'>
					{this.displayCompanyIcon()}
				</div>
				<div ref='companyInfoDetails' className='info'>
					{this.state.data && this.displayCompanyName(this.state)}
					{!this.state.error && !this.state.dataFields && (
						<div className='table-title'>Loading...</div>
					)}
					<table className='table table-borderless table-sm borderless'>
						<tbody>
							{this.displayErrorText()}
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
		);
	}
}
