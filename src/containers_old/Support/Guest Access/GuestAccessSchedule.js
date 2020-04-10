import React, { Component, Fragment } from 'react';
import moment from 'moment';
import DateTime from 'react-datetime';

import TextInput from '../../../components/Forms/COMPANYTextInput';
import COMPANYDurationSlider from '../../../components/Forms/COMPANYDurationSlider';
import Button from '../../../components/Common/COMPANYButton';
import { INPUT_TYPES } from '../../../components/Common/CommonConstants';
import DateTimeClock from '../../../components/Common/DateTimePicker';
const CDN_URL = process.env.REACT_APP_CDN_URL;
const CheckmarkIcon = `${CDN_URL}common/icons-forms-check.svg`;
const CalendarIcon = `${CDN_URL}support/icons-calendar-form.svg`;

const FIELDS = {
	DATETIME: 1,
	DURATION: 2,
	DONE: 3,
};

class GuestAccessSchedule extends Component {
	state = {
		datetime: moment(),
		duration: '',
		clicked: true,
		completedFields: ['datetime'],
		activeField: FIELDS.DURATION,
		show: false,
	};

	showDateTimeClock = () => {
		this.setState({ show: !this.state.show });
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

	onDateChange = dateObj => {
		const valid = true;

		this.onFieldComplete('datetime', true);
		this.setState({ clicked: valid });
	};

	/** For new wizard... */
	formatWizardParams = (component, datetime, duration) => {
		return {
			component,
			data: {
				datetime,
				duration,
			},
		};
	};

	sendParams = () => {
		const { nextStep, name: stepName } = this.props;
		const { datetime, duration } = this.state;
		// const submitBtn = document.querySelector('#submit-button');
		// submitBtn.setAttribute('disabled', 'disabled');

		this.setState({ submitted: true });
		const data = this.formatWizardParams(stepName, datetime, duration);
		nextStep(data);
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
		return current.day() != 0 && current.day() != 6 && current.isAfter(yesterday);
	};

	componentDidMount() {
		const { editParams, id, updateProgress } = this.props;
		const { datetime } = this.state;
		const completedFields = ['datetime', 'duration'];

		if (editParams) {
			this.setState({
				datetime: editParams.datetime,
				duration: editParams.duration,
				clicked: true,
				completedFields,
				activeField: FIELDS.DONE,
			});
			updateProgress(id, completedFields.length);
		} else {
			updateProgress(id, completedFields.length - 1);
		}
	}
	setDuration = value => {
		this.onFieldComplete('duration', true);
		this.setState({ duration: value });
	};

	render() {
		const { completedFields, activeField, datetime, duration } = this.state;
		const { editParams } = this.props;

		return (
			<div className='ticket-request-schedule-ga'>
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
					{this.state.duration && (
						<img
							className={`recurring-checkmark-icon ${duration !== '' ? 'active' : ''}`}
							src={CheckmarkIcon}
							alt=''
						/>
					)}
					<div className='date-field-label'>How long will they need?</div>
					<div className='slider'>
						<COMPANYDurationSlider
							name='testslider'
							additionalClass='sample-duration'
							min='30m'
							max='8h'
							steps='30m'
							value={duration}
							dots={false}
							onChange={this.setDuration}
						/>
					</div>
				</div>
				<Button
					title='NEXT'
					enabled={completedFields.length >= 2}
					customClass='COMPANY-button circle-large'
					onClick={this.sendParams}
				/>
			</div>
		);
	}
}

export default GuestAccessSchedule;
