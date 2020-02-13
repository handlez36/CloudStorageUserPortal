import React from 'react';

// import HOURIcon from '../../assets/storage/Storage-hourly-graph-selector.svg';
// import HOURHoverIcon from '../../assets/storage/Storage-hourly-graph-selector-hover.svg';
// import selectedHourlyIcon from '../../assets/storage/Storage-hourly-graph-selector-selected.svg';
// import DailyIcon from '../../assets/storage/Storage-daily-graph-selector.svg';
// import selectedDailyIcon from '../../assets/storage/Storage-daily-graph-selector-selected.svg';
// import DailyHoverIcon from '../../assets/storage/Storage-daily-graph-selector-hover.svg';
// import MonthlyIcon from '../../assets/storage/Storage-monthly-graph-selector.svg';
// import MonthlyHoverIcon from '../../assets/storage/Storage-monthly-graph-selector-hover.svg';
// import selectedMonthlyIcon from '../../assets/storage/Storage-monthly-graph-selector-selected.svg';

const CDN_URL = process.env.REACT_APP_CDN_URL;
const HOURIcon = `${CDN_URL}storage/Storage-hourly-graph-selector.svg`;
const HOURHoverIcon = `${CDN_URL}storage/Storage-hourly-graph-selector-hover.svg`;
const selectedHourlyIcon = `${CDN_URL}storage/Storage-hourly-graph-selector-selected.svg`;
const DailyIcon = `${CDN_URL}storage/Storage-daily-graph-selector.svg`;
const selectedDailyIcon = `${CDN_URL}storage/Storage-daily-graph-selector-selected.svg`;
const DailyHoverIcon = `${CDN_URL}storage/Storage-daily-graph-selector-hover.svg`;
const MonthlyIcon = `${CDN_URL}storage/Storage-monthly-graph-selector.svg`;
const MonthlyHoverIcon = `${CDN_URL}storage/Storage-monthly-graph-selector-hover.svg`;
const selectedMonthlyIcon = `${CDN_URL}storage/Storage-monthly-graph-selector-selected.svg`;

const ResolutionPicker = ({ selected, selectResolution }) => {
	function onMouseOver(id) {
		if (id === 'HOUR') {
			document.getElementById(id).src = HOURHoverIcon;
		} else if (id === 'DAY') {
			document.getElementById(id).src = DailyHoverIcon;
		} else {
			document.getElementById(id).src = MonthlyHoverIcon;
		}
	}
	function onMouseOut(id) {
		if (selected !== id) {
			if (id === 'HOUR') {
				document.getElementById(id).src = HOURIcon;
			} else if (id === 'DAY') {
				document.getElementById(id).src = DailyIcon;
			} else {
				document.getElementById(id).src = MonthlyIcon;
			}
		} else {
			if (id === 'HOUR') {
				document.getElementById(id).src = selectedHourlyIcon;
			} else if (id === 'DAY') {
				document.getElementById(id).src = selectedDailyIcon;
			} else {
				document.getElementById(id).src = selectedMonthlyIcon;
			}
		}
	}

	return (
		<div className='storage-graph-resolution-picker'>
			<div />
			<div
				className={`hourly ${selected === 'HOUR' ? 'selected' : ''}`}
				onClick={() => selectResolution('HOUR')}
				onMouseOver={() => onMouseOver('HOUR')}
				onMouseOut={() => onMouseOut('HOUR')}
			>
				<img id='HOUR' src={selected === 'HOUR' ? HOURHoverIcon : HOURIcon} />
				<div className='label status-status-head'>Hourly</div>
			</div>
			<div
				className={`daily ${selected === 'DAY' ? 'selected' : ''}`}
				onClick={() => selectResolution('DAY')}
				onMouseOver={() => onMouseOver('DAY')}
				onMouseOut={() => onMouseOut('DAY')}
			>
				<img id='DAY' src={selected === 'DAY' ? selectedDailyIcon : DailyIcon} />
				<div className='label status-status-head'>Daily</div>
			</div>
			<div
				className={`monthly ${selected === 'MONTH' ? 'selected' : ''}`}
				onClick={() => selectResolution('MONTH')}
				onMouseOver={() => onMouseOver('MONTH')}
				onMouseOut={() => onMouseOut('MONTH')}
			>
				<img id='MONTH' src={selected === 'MONTH' ? selectedMonthlyIcon : MonthlyIcon} />
				<div className='label status-status-head'>Monthly</div>
			</div>
		</div>
	);
};

export default ResolutionPicker;
