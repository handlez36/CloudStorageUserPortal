import React from 'react';
const CDN_URL = process.env.REACT_APP_CDN_URL;
const EditIcon = `${CDN_URL}support/icons_edit.svg`;

const ExpandableContentHeading = ({ icon, title, callback, ctaCallbackText }) => {
	return (
		<div className='expandable-component-header'>
			<div className='icon'>
				<img src={icon} alt='' />
			</div>
			<div className='title'>{title}</div>
			{callback && (
				<div className='edit' onClick={callback}>
					<img src={EditIcon} alt='' />
					<span>{ctaCallbackText || 'EDIT'}</span>
				</div>
			)}
		</div>
	);
};

export default ExpandableContentHeading;
