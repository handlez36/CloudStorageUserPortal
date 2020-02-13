import React, { Component, Fragment } from 'react';
import moment from 'moment';
import DateTime from 'react-datetime';

import DropDownFilter from '../../../components/Common/DropDownFilter';
import Button from '../../../components/Common/BloxButton';
import DateTimeClock from '../../../components/Common/DateTimePicker';
import TextInput from '../../../components/Forms/BloxTextInput';
import { INPUT_TYPES } from '../../../components/Common/CommonConstants';
const CDN_URL = process.env.REACT_APP_CDN_URL;
const CheckmarkIcon = `${CDN_URL}common/icons-forms-check.svg`;
const CalendarIcon = `${CDN_URL}support/icons-calendar-form.svg`;
const FIELDS = {
	DATETIME: 1,
	RECURRING: 2,
	DONE: 3,
};
const OPTIONS = [
	{ value: 'None' },
	{ value: 'Daily' },
	{ value: 'Weekly' },
	{ value: 'Biweekly' },
	{ value: 'Monthly' },
];

class RemoteHandsSchedule extends Component {
	state = {
		datetime: moment(),
		recurring: '',
		completedFields: ['datetime'],
		activeField: FIELDS.RECURRING,
		show: false,
	};

	showDateTimeClock = () => {
		this.setState({ show: !this.state.show });
	};

	onDateChange = () => {
		this.onFieldComplete('datetime', true);
	};

	onChange = recurring => {
		this.setState({ recurring });
		this.onFieldComplete('recurring', true);
	};

	getNextField = () => {
		const { activeField } = this.state;

		if (activeField === FIELDS.DATETIME) {
			return FIELDS.RECURRING;
		} else if (activeField === FIELDS.RECURRING) {
			return FIELDS.DONE;
		}

		return FIELDS.DONE;
	};

	/** For new wizard... */
	formatWizardParams = (component, datetime, recurring) => {
		return {
			component,
			data: {
				datetime,
				recurring,
			},
		};
	};

	sendParams = () => {
		const { nextStep, name: stepName } = this.props;
		const { datetime, recurring } = this.state;
		// const submitBtn = document.querySelector('#submit-button');
		// submitBtn.setAttribute('disabled', 'disabled');

		this.setState({ submitted: true });
		const data = this.formatWizardParams(stepName, datetime, recurring);
		nextStep(data);
	};

	onFieldComplete = (field, isValid) => {
		const { completedFields: fields } = this.state;
		const { id, updateProgress } = this.props;

		if (isValid) {
			if (!fields.includes(field)) {
				fields.push(field);
			}
		} else {
			if (fields.includes(field)) {
				const index = fields.indexOf(field);
				fields.splice(index, 1);
			}
		}
		const nextField = this.getNextField();

		updateProgress(id, fields.length);
		this.setState({ completedFields: fields, activeField: nextField });
	};

	valid = current => {
		const yesterday = DateTime.moment().subtract(1, 'day');
		return current.day() !== 0 && current.day() !== 6 && current.isAfter(yesterday);
	};

	setNewDateTime = value => {
		this.setState({ datetime: value });
	};

	setNewTime = (hour, minutes) => {
		const { datetime } = this.state;
		this.onDateChange();

		if (hour === 9 || hour === 10 || hour === 11) {
			const digitalTime = 12;
			hour = +hour + +digitalTime;
		} else if (hour === 12) {
			hour = '00';
		}
		const value = moment(datetime)
			.add(hour, 'hours')
			.add(minutes, 'minutes');

		this.setState({ datetime: value, show: false });
	};

	onInputChange = () => {};

	componentDidMount() {
		const { id, editParams, updateProgress } = this.props;
		const completedFields = ['datetime', 'recurring'];

		if (editParams) {
			this.setState({
				datetime: editParams.datetime,
				recurring: editParams.recurring,
				completedFields,
				activeField: FIELDS.DONE,
			});
			updateProgress(id, completedFields.length);
		} else {
			updateProgress(id, 1);
		}
	}

	render() {
		const { completedFields, activeField, datetime, recurring } = this.state;

		return (
			<div className='remote-hands-request-schedule'>
				<div className='date-and-time'>
					{!this.state.show && (
						<Fragment>
							<img className='checkmark-icon' src={CheckmarkIcon} alt='' />
							<img className='calendar-icon' src={CalendarIcon} alt='' />{' '}
						</Fragment>
					)}
					<div className='date-field-label'>When do you want service?</div>
					<TextInput
						placeholder=''
						type={INPUT_TYPES.INPUT}
						label=''
						name='date-time'
						value={moment(datetime).format('MMMM Do YYYY, h:mm a')}
						onClick={this.showDateTimeClock}
						active={true}
						onChange={this.onInputChange}
						hideCheckmark
					/>
					{this.state.show && (
						<DateTimeClock
							show={this.state.show}
							displayDate={moment(datetime).format('MMMM Do YYYY')}
							callback={this.setNewDateTime}
							time={moment(datetime).format('h:mm')}
							finishedCallback={this.setNewTime}
						/>
					)}
				</div>
				<div className={`recurring ${activeField > FIELDS.DATETIME ? 'active' : ''}`}>
					<img
						className={`recurring-checkmark-icon ${recurring !== '' ? 'active' : ''}`}
						src={CheckmarkIcon}
						alt=''
					/>
					<div className='drop-down'>
						<DropDownFilter
							title={recurring !== '' ? recurring : 'Recurring?'}
							label='Is this a recurring service?'
							options={OPTIONS}
							callback={this.onChange}
						/>
					</div>
				</div>
				<Button
					title='NEXT'
					enabled={completedFields.length === Object.keys(FIELDS).length - 1}
					customClass='support-button circle-large'
					onClick={this.sendParams}
				/>
			</div>
		);
	}
}

export default RemoteHandsSchedule;
