import React from 'react';

import Tooltip from '../Common/ToolTip';

const ExpandableContentField = ({ side, fieldParams, fieldParams: { type: CustomField } }) => {
	const Icon = fieldParams.icon;
	return (
		<div className={`${side} field`}>
			<div className='label'>
				{fieldParams.label} <span className='field-tagline'>{fieldParams.tagline}</span>
			</div>
			<div className='field-content'>
				{!fieldParams.custom ? (
					<div className='content'>{fieldParams.content}</div>
				) : (
					<CustomField {...fieldParams.params} />
				)}
				{fieldParams.icon && typeof fieldParams.icon !== 'function' && (
					<img className='field-icon' src={fieldParams.icon} alt='' />
				)}
				{fieldParams.icon && typeof fieldParams.icon === 'function' && <Icon />}
				{fieldParams.tooltip && <Tooltip message={fieldParams.tooltip} />}
			</div>
		</div>
	);
};

export default ExpandableContentField;
