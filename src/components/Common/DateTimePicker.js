import React, { Component, Fragment } from 'react';
import moment from 'moment';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import 'react-timepicker/timepicker.css';
import { Timepicker } from 'react-timepicker';
import ResizeObserver from 'resize-observer-polyfill';
import BloxButton from '../Common/BloxButton';
import { ClientData } from '../../services/clientData';
const CDN_URL = process.env.REACT_APP_CDN_URL;
const Arrow = `${CDN_URL}common/icons-arrow-circle.svg`;
const Shadow = `${CDN_URL}common/images-clock-face-no-padding.svg`;

class DateTimePicker extends Component {
	constructor(props) {
		super(props);

		this.myObserver = null;
		this.state = {
			selectedDay: null,
			selectedTimeValid: false,
			daySelected: false,
			time: '5:00',
			isOpen: true,
			error: false,
			clockRadius: 70,
			clockSize: 160,
		};
		this.onChange = this.onChange.bind(this);
	}

	componentDidMount = () => {
		const { time } = this.props;
		if (time) {
			//this.checkValidTime(time);
			this.setState({ time });
		}
	};

	repositionTimepickerBackground = () => {
		const wrapper = document.querySelector('.dcblox-date-time-picker-wrapper.time');
		const svg = document.querySelector('.timepicker svg');
		const el = document.querySelector('.shadow-img');

		if (svg && wrapper && el) {
			// Re-position element...
			const xOffset = svg.getBoundingClientRect().left - wrapper.getBoundingClientRect().left - 10;
			const yOffset = svg.getBoundingClientRect().top - wrapper.getBoundingClientRect().top - 10;
			const width = svg.getBoundingClientRect().width;
			const height = ClientData.getBrowser() === 'IE' ? width : svg.getBoundingClientRect().height;

			el.setAttribute(
				'style',
				`top: ${yOffset}px; left: ${xOffset}px; width: ${width + 20}px; height: ${height + 20}px`,
			);
		}
	};

	componentDidUpdate() {
		const { daySelected } = this.state;

		if (daySelected) {
			this.repositionTimepickerBackground();
			if (!this.myObserver) {
				this.myObserver = new ResizeObserver(entries => {
					entries.forEach(entry => {
						this.repositionTimepickerBackground();
					});
				});

				setTimeout(() => {
					const wrapper = document.querySelector(`.dcblox-date-time-picker-wrapper .timepicker`);
					if (wrapper) {
						this.myObserver.observe(wrapper);
					}
				}, 300);
			}
		}
	}

	FindByAttributeValue(attribute, value, element_type) {
		element_type = element_type || '*';
		const All = document.getElementsByTagName(element_type);
		for (let i = 0; i < All.length; i++) {
			if (All[i].getAttribute(attribute) === value) {
				return All[i];
			}
		}
	}
	checkDate = day => {
		const date = moment(day);
		const today = moment();

		if (today > date) {
			return true;
		} else {
			return false;
		}
	};
	handleDayClick = day => {
		const previouslySelected = document.querySelector('.selected');
		let date = day.toString();
		date = date.substring(0, 15);
		const selected = this.FindByAttributeValue('aria-label', date);
		if (date.includes('Sun') || date.includes('Sat') || this.checkDate(day)) {
		} else {
			selected.classList.add('selected');
			if (this.props.callback) {
				this.props.callback(day);
			}
			this.setState({ selectedDay: day });
		}

		if (previouslySelected) {
			try {
				previouslySelected.classList.remove('selected');
			} catch (e) {}
		}
	};

	daySelected = () => {
		this.setState({ daySelected: true });
	};
	timeSelected = (hours, minutes) => {
		const { finishedCallback } = this.props;

		if (finishedCallback) {
			finishedCallback(hours, minutes);
		}
	};
	checkValidTime = hour => {
		if (
			hour === 9 ||
			hour === 10 ||
			hour === 11 ||
			hour === 12 ||
			hour === 1 ||
			hour === 2 ||
			hour === 3 ||
			hour === 4
		) {
			this.setState({ error: false });
		} else {
			this.setState({ error: true });
		}
	};

	backToDatePicker = () => {
		this.setState({ daySelected: '' });
	};

	onChange(hours, minutes) {
		this.checkValidTime(hours, minutes);
		this.setState({ hours, minutes });
	}

	render() {
		const { show, displayDate } = this.props;
		const { selectedDay, daySelected, hours, minutes, error } = this.state;

		const weekends = {
			daysOfWeek: [0, 6],
		};
		const past = {
			before: new Date(),
		};

		return (
			<Fragment>
				{show && !daySelected && (
					<div className='dcblox-date-time-picker-wrapper'>
						<DayPicker
							modifiers={[weekends, past]}
							weekdaysShort={['S', 'M', 'T', 'W', 'T', 'F', 'S']}
							numberOfMonths={2}
							onDayClick={this.handleDayClick}
						/>
						<div className='select-button'>
							<BloxButton
								title='SELECT DATE'
								enabled={selectedDay}
								customClass='support-button'
								onClick={this.daySelected}
							/>
						</div>
						{/* <div className='shadow-image-two'>
							<img src={Shadow} />
						</div> */}
					</div>
				)}
				{show && daySelected && (
					<div className='dcblox-date-time-picker-wrapper time'>
						<div className='top-row'>
							<div className='back-arrow' onClick={this.backToDatePicker}>
								<img src={Arrow} />
							</div>
							<div className='display-date'>{displayDate}</div>
						</div>
						<div className='time-picker'>
							<Timepicker militaryTime={false} onChange={this.onChange} size={160} radius={70} />
						</div>
						{error && <div className='error'>Please select a time between 9:00AM and 5:00PM</div>}
						<div className='done-button'>
							<BloxButton
								title='DONE'
								enabled={!error}
								customClass='support-button'
								onClick={() => this.timeSelected(hours, minutes)}
							/>
						</div>
						<div className='shadow-img'>
							<img src={Shadow} className='shadow-img-asset' />
						</div>
					</div>
				)}
			</Fragment>
		);
	}
}

export default DateTimePicker;
