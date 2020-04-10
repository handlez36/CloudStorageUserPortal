import React from 'react';
import { string, bool, func, any } from 'prop-types';

const COMPANYButton = ({
	id,
	title,
	enabled,
	onClick,
	customClass,
	icon,
	imageId,
	COMPANYModule,
}) => {
	const enable = enabled ? '' : ' disabled';
	// const buttonClass = customClass ? customClass : 'submit-button';
	const buttonClass = customClass
		? `COMPANY-button ${COMPANYModule} ${customClass}`
		: `COMPANY-button ${COMPANYModule} submit-button`;
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
			<span className='title'>{title}</span>
			{customClass === 'COMPANY-button circle-large' && (
				<div className='down-arrow'>
					<img src={DownArrow} />
				</div>
			)}
		</button>
	);
};

COMPANYButton.propTypes = {
	title: any,
	enabled: bool,
	onClick: func,
	customProps: string,
};

COMPANYButton.defaultProps = {
	title: 'SUBMIT',
};

export default COMPANYButton;
