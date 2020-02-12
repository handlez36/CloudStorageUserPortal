import React from 'react';
import { string, bool, any, element } from 'prop-types';
const CDN_URL = process.env.REACT_APP_CDN_URL;
const AlertIcon = `${CDN_URL}common/Common_Alert_Icon.png`;

const AccordianField = ({ header, value, alert, alertIcon, custom, component: Component }) => {
	let fieldClass;
	if (header) {
		fieldClass = header
			.toLowerCase()
			.replace(/\s/g, '')
			.replace(/#/g, 'num');
	}

	return (
		<div className={`accordian-field ${fieldClass}`}>
			<div className={`header ${alert ? 'has-alert' : ''}`}>
				{header}
				{alertIcon && <img className='alert-icon' src={AlertIcon} />}
			</div>
			<div className={`value ${alert ? 'has-alert' : ''}`}>
				{custom && header && Component}
				{!custom && header && value}
				{/* {value} */}
			</div>
		</div>
	);
};

AccordianField.propTypes = {
	header: string,
	value: any,
	alert: bool,
	component: element,
};

export default AccordianField;
