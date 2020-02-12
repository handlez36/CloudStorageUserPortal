import React from 'react';

const CDN_URL = process.env.REACT_APP_CDN_URL;

const BarTypeIcon = `${CDN_URL}storage/Storage-bar-type-selector.svg`;
const HoverBarTypeIcon = `${CDN_URL}storage/Storage-bar-type-selector-hover.svg`;
const SelectedBarTypeIcon = `${CDN_URL}storage/Storage-bar-type-selector-selected.svg`;
const LineTypeIcon = `${CDN_URL}storage/Storage-line-type-selector.svg`;
const HoverLineTypeIcon = `${CDN_URL}storage/Storage-line-type-selector-hover.svg`;
const SelectedLineTypeIcon = `${CDN_URL}storage/Storage-line-type-selector-selected.svg`;

const GraphTypePicker = ({ selected, selectType, storageType }) => {
	function onMouseOver(id) {
		if (id === 'BAR') {
			document.getElementById(id + storageType).src = HoverBarTypeIcon;
		} else {
			document.getElementById(id + storageType).src = HoverLineTypeIcon;
		}
	}
	function onMouseOut(id) {
		if (selected !== id) {
			if (id === 'BAR') {
				document.getElementById(id + storageType).src = BarTypeIcon;
			} else {
				document.getElementById(id + storageType).src = LineTypeIcon;
			}
		} else {
			if (id === 'BAR') {
				document.getElementById(id + storageType).src = SelectedBarTypeIcon;
			} else {
				document.getElementById(id + storageType).src = SelectedLineTypeIcon;
			}
		}
	}
	return (
		<div className='storage-graph-type-picker'>
			<div
				className={`bar ${selected === 'BAR' ? 'selected' : ''}`}
				onClick={() => selectType('BAR')}
				onMouseOver={() => onMouseOver('BAR')}
				onMouseOut={() => onMouseOut('BAR')}
			>
				<img
					id={`BAR${storageType}`}
					src={selected === 'BAR' ? SelectedBarTypeIcon : BarTypeIcon}
				/>
			</div>
			<div
				className={`line ${selected === 'LINE' ? 'selected' : ''}`}
				onClick={() => selectType('LINE')}
				onMouseOver={() => onMouseOver('LINE')}
				onMouseOut={() => onMouseOut('LINE')}
			>
				<img
					id={`LINE${storageType}`}
					src={selected === 'LINE' ? SelectedLineTypeIcon : LineTypeIcon}
				/>
			</div>
		</div>
	);
};

export default GraphTypePicker;
