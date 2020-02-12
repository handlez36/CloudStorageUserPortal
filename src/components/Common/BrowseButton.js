import React from 'react';
import { string, bool, func, any } from 'prop-types';

const BrowseButton = ({ enabled, onClick, customClass }) => {
	const enable = enabled ? '' : ' disabled';
	const buttonClass = customClass ? customClass : 'button browsebutton w-button';
	return (
		<button
			id='formButton'
			onClick={enabled ? onClick : undefined}
			className={`${buttonClass} ${enable}`}
		/>
	);
};

BrowseButton.propTypes = {
	title: any,
	enabled: bool,
	onClick: func.isRequired,
	customProps: string,
};

BrowseButton.defaultProps = {
	title: 'SUBMIT',
};

export default BrowseButton;
