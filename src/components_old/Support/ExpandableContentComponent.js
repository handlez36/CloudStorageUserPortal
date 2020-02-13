import React from 'react';

import ExpandableContentHeading from './ExpandableContentHeading';
import ExpandableContentBody from './ExpandableContentBody';

const ExpandableContent = ({
	icon,
	title,
	ctaCallback,
	ctaCallbackText,
	fields,
	secondaryArea,
}) => {
	return (
		<div className='expandable-content'>
			<ExpandableContentHeading
				icon={icon}
				title={title}
				callback={ctaCallback}
				ctaCallbackText={ctaCallbackText}
			/>
			<ExpandableContentBody fields={fields} />
			{secondaryArea && <div className='secondary-area' />}
		</div>
	);
};

export default ExpandableContent;
