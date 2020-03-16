import React, { Fragment } from 'react';
import map from 'lodash/map';

import Field from './ExpandableContentField';

function generateFields(fields) {
	if (!fields) {
		return;
	}

	return map(fields, val => {
		return (
			<div key={val.label || val.a.label} className='expandable-row'>
				{val.multiple ? (
					<Fragment>
						<Field side='left-side' fieldParams={val.a} />
						<Field side='right-side' fieldParams={val.b} />
					</Fragment>
				) : (
					<Field side='full' fieldParams={val} />
				)}
			</div>
		);
	});
	// return map(fields, val => (
	// 	<div key={val.label || val.a.label} className='expandable-row'>
	// 		{val.multiple ? (
	// 			<Fragment>
	// 				<Field side='left-side' fieldParams={val.a} />
	// 				<Field side='right-side' fieldParams={val.b} />
	// 			</Fragment>
	// 		) : (
	// 			<Field side='full' fieldParams={val} />
	// 		)}
	// 	</div>
	// ));
}

const ExpandableContentBody = ({ fields }) => {
	return <div className='expandable-component-body'>{generateFields(fields)}</div>;
};

export default ExpandableContentBody;
