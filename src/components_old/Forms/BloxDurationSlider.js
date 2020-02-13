import React, { Component } from 'react';
import { string, bool, func } from 'prop-types';
import moment from 'moment';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import { Utils } from '../../services/utils';
const CDN_URL = process.env.REACT_APP_CDN_URL;
const UserImg = `${CDN_URL}common/icons-user-on.svg`;
const ClockIcon = `${CDN_URL}common/icons-forms-time.svg`;

const SCALE_FACTOR = 5;
const DEFAULT_DURATION = moment.duration(30, 'minutes');
const Handle = Slider.Handle;
let pointLabels;

const setPointLabels = labels => {
	pointLabels = labels;
};

const getPointLabel = (value, usePointLabels = true, useShortUnit = true) => {
	if (!pointLabels) {
		return value;
	}

	const hrUnit = useShortUnit ? 'Hr' : 'hour';
	const minUnit = useShortUnit ? 'Min' : 'minutes';

	const ms = usePointLabels ? pointLabels[value] : value;
	const hours = Math.floor(ms / 3600000);
	const minutes = Math.floor((ms % 3600000) / 60000);

	let hrStr = hours > 0 ? `${hours} ${hrUnit}` : '';
	if (hours > 1) {
		hrStr += 's';
	}
	const minStr = minutes > 0 ? `${minutes} ${minUnit}` : '';
	const str = `${hrStr} ${minStr}`;

	return str.trim();
};

const handle = props => {
	return (
		<div className='custom-handle'>
			<Handle value={props.value} {...props}>
				<div
					className='slider-img'
					ref='slider'
					style={{ width: `${Utils.scalePxUsingVw(85) + props.value * SCALE_FACTOR}px` }}
				>
					<span className='icon'>
						<img src={UserImg} alt='' />
					</span>
					<span className='time'>{getPointLabel(props.value)}</span>
				</div>
			</Handle>
		</div>
	);
};

class DurationSlider extends Component {
	state = {
		min: 0,
		max: 0,
		steps: 0,
		value: 0, // Value from 0 to number_of_intermediary_points
		valueLabel: '',
		pointLabels: null,
		flipPoint: 1000,
	};

	onChange = value => {
		const { onChange } = this.props;
		const timeInMs = pointLabels[value];
		onChange(getPointLabel(timeInMs, false));
		this.setState({ value });
	};

	checkSliderFlipStatus = () => {
		const { name } = this.props;
		const { flipPoint } = this.state;

		const slider = document.querySelector(`.duration-slider-component.${name} .slider-img`);
		const track = document.querySelector(`.duration-slider-component.${name} .rc-slider`);
		const trackRightPos = track.getBoundingClientRect().left + track.getBoundingClientRect().width;
		const sliderRightPos =
			slider.getBoundingClientRect().left + slider.getBoundingClientRect().width;

		if (sliderRightPos > trackRightPos || slider.getBoundingClientRect().right >= flipPoint) {
			if (!slider.classList.contains('flipped')) {
				slider.classList.add('flipped');
				this.setState({ flipPoint: slider.getBoundingClientRect().left });
			}
		} else {
			slider.classList.remove('flipped');
			if (flipPoint !== 1000) {
				this.setState({ flipPoint: 1000 });
			}
		}
	};

	parseTime(time) {
		const parts = time.split(/(\d+)/).filter(part => part !== '');

		return parts;
	}

	createDuration(duration) {
		if (!duration) {
			return DEFAULT_DURATION;
		}

		const [value, unit] = this.parseTime(duration);
		const parsedVal = parseInt(value);

		if (parsedVal && unit) {
			return moment.duration(parsedVal, unit);
		}

		return DEFAULT_DURATION;
	}

	getPointCount = (min, max, steps) => {
		const minDuration = this.createDuration(min);
		const maxDuration = this.createDuration(max);
		const stepDuration = this.createDuration(steps);
		maxDuration.subtract(minDuration);

		return maxDuration / stepDuration;
	};

	getPointLabels = (min, num, steps) => {
		const minDuration = this.createDuration(min);
		const stepDuration = this.createDuration(steps);
		const labels = [];

		labels[0] = minDuration._milliseconds;
		for (let i = 1; i <= num; i++) {
			labels[i] = minDuration.add(stepDuration)._milliseconds;
		}

		return labels;
	};

	setPresetValue = () => {
		const { value: presetLabel } = this.props;
		let preselectedValue = 0;
		let preselectedLabel = '';

		if (presetLabel && presetLabel !== '') {
			for (let i = 0; i < pointLabels.length; i++) {
				const label = getPointLabel(i);
				if (label === presetLabel) {
					preselectedValue = i;
					preselectedLabel = label;
					break;
				}
			}
			if (preselectedLabel !== 0 && preselectedLabel !== '') {
				this.setState({ value: preselectedValue, valueLabel: preselectedLabel });
			}
		}
	};

	componentDidUpdate() {
		const { valueLabel: existingLabel } = this.state;
		const { value: incomingLabel } = this.props;

		this.checkSliderFlipStatus();

		if (existingLabel !== incomingLabel) {
			this.setPresetValue();
		}
	}

	componentDidMount() {
		const { min, max, steps } = this.props;
		const numPoints = this.getPointCount(min, max, steps);
		const pointLabels = this.getPointLabels(min, numPoints, steps);
		setPointLabels(pointLabels);

		this.setState({
			min: 0,
			max: numPoints,
			steps: this.createDuration(steps)._milliseconds,
			pointLabels,
			value: this.props.min,
		});
	}

	render() {
		const { additionalClass, max, min, value } = this.state;
		const { name, min: incomingMin, max: incomingMax, dots } = this.props;

		const minDuration = this.createDuration(incomingMin)._milliseconds;
		const maxDuration = this.createDuration(incomingMax)._milliseconds;
		return (
			<div className={`duration-slider-component ${name}`}>
				<Slider
					dots={dots}
					className={additionalClass}
					onChange={this.onChange}
					min={min}
					max={max}
					step={1}
					value={value}
					handle={handle}
				/>
				<div className='slider-info-row'>
					<div className='icon'>
						<img src={ClockIcon} alt='' />
					</div>
					<div className='min-label'>{getPointLabel(minDuration, false, false)}</div>
					<div className='max-label'>{getPointLabel(maxDuration, false, false)}</div>
				</div>
			</div>
		);
	}
}

DurationSlider.propTypes = {
	name: string.isRequired,
	min: string.isRequired, // Format: [number][unit], ex: 1h, 30m; h - hours, m - minutes
	max: string.isRequired, // Format: [number][unit], ex: 1h, 30m; h - hours, m - minutes
	steps: string, // Format: [number][unit], ex: 1h, 30m; h - hours, m - minutes
	value: string, // Preselected value, ex: 1 Hr, 2 Hrs, 4 Hrs 30 Min (3 separate examples)
	additionalClass: string,
	dots: bool,
	onChange: func.isRequired,
};

DurationSlider.defaultProps = {
	steps: '30m',
	dots: true,
};

export default DurationSlider;
