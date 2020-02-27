import React from 'react';
import { string, bool } from 'prop-types';
import BloxButton from 'sub_components/Common/BloxButton';

const ComponentWrapper = ({
	title,
	hideTitle,
	collapseTitle,
	hideBorder,
	children,
	showButton,
	buttonTitle,
}) => {
	let wrapperClass = 'component-wrapper';
	if (hideTitle) wrapperClass += ' component-wrapper--no-title';
	if (hideBorder) wrapperClass += ' component-wrapper--no-border';
	if (collapseTitle) wrapperClass += ' component-wrapper--collapse-title';

	return (
		<div className={wrapperClass}>
			<div className='component-wrapper_title heading60'>
				<span className='title'>{!hideTitle && title}</span>
				<div className='component-wrapper_button'>
					{showButton && (
						<BloxButton
							title={buttonTitle}
							customClass={'support-button blue-gradient'}
							onClick={() => {}}
							enabled={true}
						/>
					)}
				</div>
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
