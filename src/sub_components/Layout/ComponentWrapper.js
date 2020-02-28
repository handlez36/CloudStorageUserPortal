import React from 'react';
import { string, bool } from 'prop-types';

const ComponentWrapper = ({ title, hideTitle, collapseTitle, hideBorder, children }) => {
	let wrapperClass = 'component-wrapper';
	if (hideTitle) wrapperClass += ' component-wrapper--no-title';
	if (hideBorder) wrapperClass += ' component-wrapper--no-border';
	if (collapseTitle) wrapperClass += ' component-wrapper--collapse-title';

	return (
		<div className={wrapperClass}>
			<div className='component-wrapper_title heading60'>
				<span className='title'>{!hideTitle && title}</span>
			</div>

			<div className='component-wrapper_content'>{children}</div>
		</div>
	);
};

ComponentWrapper.propTypes = {
	title: string,
	hideTitle: bool,
	collapseTitle: bool,
	hideBorder: bool,
};

ComponentWrapper.defaultProps = {
	title: 'Default Title',
	hideTitle: false,
	collapseTitle: false,
	hideBorder: false,
};

export default ComponentWrapper;
