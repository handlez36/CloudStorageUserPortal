import React from 'react';
import { string, bool, func, any } from 'prop-types';

const BloxButton = ({ id, title, enabled, onClick, customClass, icon, imageId, bloxModule }) => {
	const enable = enabled ? '' : ' disabled';
	// const buttonClass = customClass ? customClass : 'submit-button';
	const buttonClass = customClass
		? `blox-button ${bloxModule} ${customClass}`
		: `blox-button ${bloxModule} submit-button`;
	const CDN_URL = process.env.REACT_APP_CDN_URL;

	const DownArrow = `${CDN_URL}support/Common_DownArrowTail.svg`;
	return (
		<button
			id={id || 'formButton'}
			onClick={enabled ? onClick : undefined}
			className={`${buttonClass} ${enable}`}
		>
			{icon && (
				<div className='icon'>
					<img id={imageId || 'formButtonImage'} src={icon} />
				</div>
			)}
			<span className='title heading90'>{title}</span>
			{customClass === 'support-button circle-large' && (
				<div className='down-arrow'>
					<img src={DownArrow} />
				</div>
			)}
		</button>
	);
};

BloxButton.propTypes = {
	title: any,
	enabled: bool,
	onClick: func,
	customProps: string,
};

BloxButton.defaultProps = {
	title: 'SUBMIT',
};

export default BloxButton;
