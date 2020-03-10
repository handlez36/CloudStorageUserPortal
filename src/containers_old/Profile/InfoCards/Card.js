import React, { Component } from 'react';
import BloxButton from 'sub_components/Common/BloxButton';
import { InfoTableNew } from './InfoTableNew';

const CDN_URL = process.env.REACT_APP_CDN_URL;

const profileArrow = `${CDN_URL}profile/profile-arrow.svg`;
const upIcon = `${CDN_URL}common/icons-arrow-circle@3x.png`;
class Card extends Component {
	constructor(props) {
		super(props);

		this.state = {
			expanded: false,
			dataFields: null,
			data: null,
			admin: false,
		};
	}
	sanitizeResponse(response) {
		let addressLine1 = '';
		let addressLine2 = '';
		let city = '';
		let state = '';
		let zip = '';
		let primaryEmail = '';
		let companyName = '';

		let workPhone = '';
		let mobilePhone = '';
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
			mobilePhone = customer.secondaryPhone || '';
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
			mobilePhone,
			firstName,
			middleName,
			lastName,
		};
	}

	generateCompanyData = data => {
		// format address

		const streetLine1 = data.addressLine1;
		const streetLine2 = data.addressLine2;
		const city = data.city;
		const state = data.state;
		const zip = data.zip;

		const cityStateZip = `${city}, ${state}, ${zip}`;

		const addressFields = [];

		let dataFields;
		if (this.props.type === 'CompanyInfo') {
			addressFields.push({ value: streetLine1, propName: 'companyStreetLine1' });
			if (streetLine2 !== '') {
				addressFields.push({ value: streetLine2, propName: 'companyStreetLine2' });
			}
			addressFields.push({ value: cityStateZip, propName: 'companyCityStateZip' });

			dataFields = [
				{ name: 'Primary Email', value: data.primaryEmail, propName: 'companyPrimaryEmail' },
				{
					multiple: true,
					name: 'Billing Address',
					propName: 'companyBillingAddress',
					fields: addressFields,
				},
				{
					name: 'Primary Contact',
					value: this.displayPrimaryContactName(data),
					propName: 'companyPrimaryContact',
				},
				{ name: 'Contact Phone', value: data.workPhone, propName: 'primaryContactPhone' },
			];
		} else if (this.props.type === 'userProfile') {
			const { user } = this.props;

			const address = `${user.contactDetails.address}${' '}${user.contactDetails.city} ${' '}${
				user.contactDetails.state
			}${' '}${user.contactDetails.zipcode}`;
			addressFields.push({ value: address, propName: 'userAddress' });

			dataFields = [
				{
					name: 'Email',
					value: user.contactDetails.email,
					propName: 'primaryContactEmail',
					isDisabled: true,
				},
				{
					name: 'Work ',
					value: user.contactDetails.phone_number,
					propName: 'primaryContactWorkPhone',
				},
				{
					name: 'Mobile',
					value: user.contactDetails.mobile_number,
					propName: 'primaryContactmobilePhone',
				},
				{
					multiple: true,
					name: 'Address',
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
			const sanitizedInputs = this.sanitizeResponse(newProps.profile);

			this.generateCompanyData(sanitizedInputs);
		}
	}
	componentDidMount() {
		const { profile } = this.props;
		const { dataFields } = this.state;

		if (!dataFields) {
			if (profile.fuseBillId) {
				const sanitizedInputs = this.sanitizeResponse(profile);

				this.generateCompanyData(sanitizedInputs);
			}
		}
	}

	expand = () => {
		const { id } = this.props;

		const element = document.getElementById(id);

		const currentlyExpanded = document.querySelector('.card-bottom-section.expanded');
		if (currentlyExpanded) {
			currentlyExpanded.classList.remove('expanded');
			this.props.expandCallBack(id, 'close');
		}
		element.classList.add('expanded');

		this.props.expandCallBack(id, 'open');
	};

	displayPrimaryContactName(data) {
		if (data.firstName !== ' ' && data.lastName !== ' ') {
			return `${data.firstName} ${data.lastName}`;
		} else {
			return '';
		}
	}

	displayCurrentUserName() {
		const { user } = this.props;
		if (user.firstname !== ' ' && user.lastname !== ' ') {
			return `${user.firstname} ${user.lastname}`;
		} else {
			return '';
		}
	}
	checkAdmin = () => {
		const user = this.props.user;
		if (user.userGroups) {
			for (let i = 0; i <= user.userGroups.length - 1; i++) {
				const role = user.userGroups[i].role.name;
				if (role === 'admin') {
					if (!this.state.admin) {
						this.props.changeAvatar(role);
						this.setState({ admin: true });
					}
					return 'Admin';
				} else {
					return;
				}
			}
		}
	};

	formatCompanyName = name => {
		if (name) {
			if (name.length >= 21) {
				return name.substring(0, 21) + '...';
			} else {
				return name;
			}
		}
	};

	displayCompanyName({ error, data }) {
		if (!error && data) {
			const { companyName } = data;

			if (this.props.type === 'CompanyInfo') {
				return (
					<div className='card-title-container'>
						<div className='card-title'>{this.formatCompanyName(companyName.toUpperCase())}</div>
						<div className='card-image'>
							<img src={this.props.expanded ? upIcon : profileArrow} />
						</div>
					</div>
				);
			} else if (this.props.type === 'userProfile') {
				return (
					<div className='card-title-container'>
						<div className='card-title'>
							{this.displayCurrentUserName()}
							<span className='admin'>{this.checkAdmin()}</span>
						</div>
						<div className='card-image'>
							<img src={this.props.expanded ? upIcon : profileArrow} />
						</div>
					</div>
				);
			}
		}
	}
	goToContactInfo = () => {
		const { goToContactInfo } = this.props;
		if (goToContactInfo) {
			goToContactInfo();
		}
	};
	onChange = () => {};
	render() {
		const { id, image, type } = this.props;
		const { data } = this.state;

		return (
			<div className='card-wrapper'>
				<div className='card-container'>
					<div className='card-top-section'>
						<img src={image} />
					</div>
					<div id={id} className='card-bottom-section' onClick={this.expand}>
						{data && this.displayCompanyName(this.state)}
						{this.props.expanded && (
							<div className='expanded'>
								{this.state.dataFields && (
									<InfoTableNew
										id={id}
										isDisabled={true}
										onChange={this.onChange}
										profile={this.state.dataFields}
									/>
								)}

								{type === 'userProfile' && (
									<div className='card-button'>
										<BloxButton
											title='EDIT CONTACT INFO'
											enabled={true}
											customClass='blox-button gradient'
											onClick={this.goToContactInfo}
										/>
									</div>
								)}
							</div>
						)}
					</div>
				</div>
			</div>
		);
	}
}

export default Card;
