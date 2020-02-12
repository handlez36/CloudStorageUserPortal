import React from 'react';

export const FifthColumn = ({ content: ExtraContent, ...remaining }) => {
	return (
		<div className='extra-content'>
			<div className='portal-header' />
			<div className='content'>{ExtraContent && <ExtraContent {...remaining} />}</div>
		</div>
	);
};
