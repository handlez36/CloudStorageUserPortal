import React from 'react';
const CDN_URL = process.env.REACT_APP_CDN_URL;
const checkmark = `${CDN_URL}profile/Profile_CheckCircle_Icon.svg`;

export const CheckMark = () => {
	return (
		<div className='checkmark'>
			<img src={checkmark} />
		</div>
	);
};
