import React from 'react';

export const ExitButton = props => {
	return (
		<div onClick={props.redirectTo} className='exit-button'>
			X
		</div>
	);
};
