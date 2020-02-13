import React, { Component } from 'react';

import DataInputsLayout from './../../../components/Common/DataInputsLayout';
import { AvatarApi } from '../../../services/avatar';
import { USER_UPDATE_SUCCESS, USER_UPDATE_ERROR } from '../../../actions';
import { PHONEMASK } from '../../../components/Common/CommonConstants';
import { Utils } from '../../../services/utils';

const WHICH_AVATAR = {
	NORMAL: 'NORMAL',
	SUCCESS: 'SUCCESS',
	FAIL: 'FAIL',
};
export default class UserInfo extends Component {
	constructor(props) {
		super(props);

		this.avatarApi = new AvatarApi();
		this.state = {
			dataFields: null,
			data: null,
			turnOnBlueFill: false,
			className: '',
			addressError: false,
			addressErrorMessage:
				'Something went wrong. Please ensure you have entered at least 7 characters',
			job_titleError: false,
			job_titleErrorMessage:
				'Something went wrong. Please ensure you have entered at least 2 characters.',
			errorMessage: '',
			phone_numberError: false,
			phone_numberErrorMessage:
				'Something went wrong. Please ensure you have entered at least 10 numbers.',
			mobile_numberError: false,
			mobile_numberErrorMessage:
				'Something went wrong. Please ensure you have entered at least 10 numbers.',
			zipcodeError: false,
			zipcodeErrorMessage:
				'Something went wrong. Please ensure you have entered a 5 or 9 digit zipcode.',
			stateError: false,
			stateErrorMessage:
				'Something went wrong. Please ensure you have entered at least 2 characters.',
			cityError: false,
			cityErrorMessage:
				'Something went wrong. Please ensure you have entered at least 3 characters.',
			// buildingError: false,
			// buildingErrorMessage: "Something went wrong. Please ensure this field is not empty (at least 2 characters)." ,
			job_title_active: false,
			work_number_active: false,
			mobile_number_active: false,
			zipcode_active: false,
			state_active: false,
			city_active: false,
			address_active: false,
			building_active: false,
			showError: false,
			showMask: false,
		};
	}

	getUserFullName() {
		const { data } = this.state;

		if (data && data.firstname) {
			const firstname = data.firstname.replace('', '');
			const lastname = data.lastname.replace('', '');

			return `${firstname} ${lastname}`;
		}

		return '- No First Name -';
	}

	sanitizeResponse(response) {
		let firstname = '',
			lastname = '',
			job_title = '';
		let phone_number = '',
			mobile_number = '',
			email = '';
		let address = '',
			building = '',
			city = '',
			state = '',
			zipcode = '';
		let avatar = null;

		if (response) {
			firstname = response.firstname || '';
			lastname = response.lastname || '';
			job_title = response.job_title || '';
		}

		if (response && response.userProfile) {
			const profile = response.userProfile;

			avatar = profile.profileImage;
		}

		if (response && response.contactDetails) {
			const details = response.contactDetails;
			phone_number = details.phone_number || '';
			(mobile_number = details.mobile_number || ''), (email = details.email || '');
			address = details.address || '';
			city = details.city || '';
			building = details.building || '';
			state = details.state || '';
			zipcode = details.zipcode || '';
		}

		return {
			firstname,
			lastname,
			job_title,
			phone_number,
			mobile_number,
			email,
			address,
			building,
			city,
			state,
			zipcode,
			avatar,
		};
	}

	generateUserFields() {
		if (!this.state.data) return;

		const dataFields = {};
		const {
			firstname,
			lastname,
			job_title,
			phone_number,
			mobile_number,
			email,
			address,
			building,
			city,
			state,
			zipcode,
		} = this.state.data;

		dataFields['contactInfoData'] = [
			{ name: 'FIRST NAME', value: firstname, readonly: true, propName: 'firstname' },
			{ name: 'LAST NAME', value: lastname, readonly: true, propName: 'lastname' },
			{
				name: 'TITLE / JOB ROLE',
				value: job_title,
				propName: 'job_title',
				active: this.state.job_title_active,
				error: this.state.job_titleError,
			},
		];
		dataFields['phoneData'] = [
			{
				name: 'WORK',
				value: phone_number,
				propName: 'phone_number',
				active: this.state.phone_number_active,
				error: this.state.phone_numberError,
			},
			{
				name: 'MOBILE',
				value: mobile_number,
				propName: 'mobile_number',
				active: this.state.mobile_number_active,
				error: this.state.mobile_numberError,
			},
		];
		dataFields['emailData'] = [{ name: 'EMAIL', value: email, readonly: true, propName: 'email' }];
		dataFields['addressData'] = [
			{
				name: 'STREET',
				value: address,
				propName: 'address',
				active: this.state.address_active,
				error: this.state.addressError,
			},
			{
				name: 'FLOOR/SUITE',
				value: building,
				propName: 'building',
				active: this.state.building_active,
				error: this.state.buildingError,
			},
			{
				name: 'CITY',
				value: city,
				propName: 'city',
				active: this.state.city_active,
				error: this.state.cityError,
			},
			{
				double: true,
				fields: [
					{
						name: 'STATE',
						value: state,
						propName: 'state',
						active: this.state.state_active,
						error: this.state.stateError,
					},
					{
						name: 'ZIP CODE',
						value: zipcode,
						propName: 'zipcode',
						active: this.state.zipcode_active,
						error: this.state.zipcodeError,
					},
				],
			},
		];

		this.setState({ dataFields });
	}

	switchUserAvatar(status) {
		const { profile } = this.props;
		const { avatar } = this.refs;
		let switchTo = WHICH_AVATAR.NORMAL;
		let originalImage;
		if (avatar.src) {
			originalImage = avatar.src;
		}

		switchTo = status === USER_UPDATE_SUCCESS ? WHICH_AVATAR.SUCCESS : WHICH_AVATAR.FAIL;

		if (switchTo === WHICH_AVATAR.SUCCESS) {
			avatar.src = this.avatarApi.getUserAvatar(profile, switchTo);
			setTimeout(() => {
				switchTo = WHICH_AVATAR.NORMAL;
				avatar.src = originalImage;
				this.props.resetStatus();
				avatar.src = this.avatarApi.getUserAvatar(profile, switchTo);
			}, 2000);
		} else {
			avatar.src = originalImage;
			this.props.resetStatus();
			avatar.src = this.avatarApi.getUserAvatar(profile, switchTo);
		}
	}

	componentDidMount() {
		if (this.props.profile && !this.state.dataFields) {
			const sanitizedInputs = this.sanitizeResponse(this.props.profile);

			this.setState({
				data: sanitizedInputs,
				originalData: sanitizedInputs,
			});

			this.generateUserFields(sanitizedInputs);
		}
	}

	componentDidUpdate() {
		const { data, dataFields } = this.state;

		if (data && !dataFields) {
			this.generateUserFields();
			if (data.zipcode) {
				data.zipcode.length > 5 ? this.setState({ showMask: true }) : '';
			}
		}
	}

	onChange = event => {
		const {
			dataset: { fieldname },
			value,
		} = event.target;

		if (fieldname === 'zipcode' && value.length > 5) {
			let newValue = value;
			if (!value.includes('-')) {
				newValue = newValue.slice(0, 5) + '-' + newValue.slice(5, 9);
			}
			const data = { ...this.state.data, [fieldname]: newValue };
			this.setState({ data }, () => this.generateUserFields());
		} else {
			const data = { ...this.state.data, [fieldname]: value };
			this.setState({ data }, () => this.generateUserFields());
		}
	};

	triggerBlueAnimation(fieldname) {
		this.setState({ [`${fieldname}_active`]: true }, () => this.generateUserFields());
	}

	validateUserInput(fieldname, newValue, changeParams) {
		let updateStatus;
		switch (fieldname) {
			case 'phone_number':
				newValue = newValue.replace(/[^0-9]/g, '');
				updateStatus =
					(newValue.length >= 10 && newValue.length !== 0 && newValue.match(/^[0-9\-]+$/)) ||
					newValue.length === 0
						? USER_UPDATE_SUCCESS
						: USER_UPDATE_ERROR;
				break;
			case 'mobile_number':
				newValue = newValue.replace(/[^0-9]/g, '');
				updateStatus =
					(newValue.length >= 10 && newValue.length !== 0 && newValue.match(/^[0-9\-]+$/)) ||
					newValue.length === 0
						? USER_UPDATE_SUCCESS
						: USER_UPDATE_ERROR;
				break;
			case 'building':
				updateStatus = USER_UPDATE_SUCCESS;
				break;
			case 'address':
				updateStatus = USER_UPDATE_SUCCESS;
				break;
			case 'zipcode':
				newValue = newValue.replace('-', '');
				updateStatus =
					(newValue.length === 5 && newValue.length !== 0 && newValue.match(/^[a-zA-Z0-9]*$/)) ||
					newValue.length === 0 ||
					(newValue.length === 9 && newValue.length !== 0 && newValue.match(/^[a-zA-Z0-9]*$/))
						? USER_UPDATE_SUCCESS
						: USER_UPDATE_ERROR;

				break;
			case 'job_title':
				updateStatus =
					(newValue.length >= 2 && newValue.length !== 0) || newValue.length === 0
						? USER_UPDATE_SUCCESS
						: USER_UPDATE_ERROR;
				break;
			case 'state':
				updateStatus =
					(newValue.length >= 2 && newValue.length !== 0) || newValue.length === 0
						? USER_UPDATE_SUCCESS
						: USER_UPDATE_ERROR;
				break;
			case 'city':
				updateStatus =
					(newValue.length >= 3 && newValue.length !== 0) || newValue.length === 0
						? USER_UPDATE_SUCCESS
						: USER_UPDATE_ERROR;
				break;
			default:
				break;
		}
		if (updateStatus === USER_UPDATE_SUCCESS) {
			const promise = this.props.updateUser(changeParams);

			promise.then(response => {
				if (response) {
					if (response.status === 200 && response.data.error === null) {
						this.clearErrorField(fieldname);
						this.switchUserAvatar(updateStatus);
					} else {
						this.setState(
							{
								[`${fieldname}Error`]: true,
								showError: true,
								errorMessage:
									'Looks like something went wrong on our end.Please try again. If the problem persists please call 877-590-1684',
							},
							() => this.generateUserFields(),
						);
						this.switchUserAvatar(USER_UPDATE_ERROR);
					}
				} else {
					this.setState(
						{
							[`${fieldname}Error`]: true,
							showError: true,
							errorMessage:
								'Looks like something went wrong on our end.Please try again. If the problem persists please call 877-590-1684',
						},
						() => this.generateUserFields(),
					);
					this.switchUserAvatar(USER_UPDATE_ERROR);
				}
			});
		} else if (updateStatus === USER_UPDATE_ERROR) {
			const fieldErrorMessage = fieldname + 'ErrorMessage';
			this.setState(
				{
					[`${fieldname}Error`]: true,
					showError: true,
					errorMessage: this.state[fieldErrorMessage],
				},
				() => this.generateUserFields(),
			);
			this.switchUserAvatar(updateStatus);
		}
	}

	clearErrorField(fieldname) {
		this.setState({ [`${fieldname}Error`]: false, showError: false }, () =>
			this.generateUserFields(),
		);
	}

	stopBlueAnimation(fieldname) {
		setTimeout(() => {
			this.setState({ [`${fieldname}_active`]: false }, () => this.generateUserFields());
		}, 2000);
	}

	onFocusPhone = event => {
		//This hack resets the cursor back to the beginning of the input
		const valueScrub = Utils.scrubPhoneNumber(event.target.value);

		if (
			valueScrub === '' ||
			valueScrub === undefined ||
			valueScrub === null ||
			valueScrub === 'undefined'
		) {
			event.target.value = '';
		}
	};

	onBlur = event => {
		const {
			dataset: { fieldname },
		} = event.target;
		const { data } = this.state;
		const newValue = data[fieldname];

		if (data[fieldname] || newValue === '') {
			const changeParams = {
				[fieldname]: newValue,
			};

			this.triggerBlueAnimation(fieldname);
			this.validateUserInput(fieldname, newValue, changeParams);

			this.stopBlueAnimation(fieldname);
		}
	};

	renderProfileCard() {
		const errorBubble = (
			<div className='bubble'>
				<div className='speech-box sb1'>
					<strong>!</strong>
					{this.state.errorMessage}
				</div>
			</div>
		);

		if (this.state.zipcode) {
			zipCodeLength = this.state.zipcode.length;
		}
		return (
			<div className='user-profile-card'>
				<div className='contact-card1'>
					<div className='profile-pic-wrapper'>
						<div className='profile-pic'>
							<img
								className='bubble'
								ref='avatar'
								src={this.avatarApi.getUserAvatar(this.props.profile)}
								alt='avatar'
							/>
						</div>

						<div className='user-name'>{this.getUserFullName()}</div>
						{this.state.showError ? errorBubble : ''}
					</div>
					<div className='profile-info'>
						<div className='title'>CONTACT INFORMATION</div>
						<DataInputsLayout
							className={this.state.className}
							data={this.state.dataFields['contactInfoData']}
							onBlurHandler={this.onBlur}
							isChangedHandler={this.onChange}
						/>
					</div>
				</div>
				<div className='contact-card2'>
					<div className='left-side'>
						<div className='title'>PHONE</div>
						<DataInputsLayout
							className={this.state.className}
							data={this.state.dataFields['phoneData']}
							onBlurHandler={this.onBlur}
							isChangedHandler={this.onChange}
							onFocusHandler={this.onFocusPhone}
							mask={PHONEMASK}
						/>
					</div>
					<div className='right-side'>
						<div className='title'>EMAIL INFORMATION</div>
						<DataInputsLayout
							className={this.state.className}
							data={this.state.dataFields['emailData']}
							onBlurHandler={this.onBlur}
							isChangedHandler={this.onChange}
						/>
						<div className='title push-down'>MAILING INFORMATION</div>
						<DataInputsLayout
							className={this.state.className}
							data={this.state.dataFields['addressData']}
							onBlurHandler={this.onBlur}
							isChangedHandler={this.onChange}
							maxLength={10}
						/>
					</div>
				</div>
			</div>
		);
	}

	renderLoadingCard() {
		return <div className='profile-card'>Loading user profile...</div>;
	}

	render() {
		return (
			<div className='user-information'>
				{this.state.dataFields && this.renderProfileCard()}
				{!this.state.dataFields && this.renderLoadingCard()}
			</div>
		);
	}
}
