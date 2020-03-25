import React, { Fragment } from 'react';

const RemoveIpIcon = ({ index, octetCount, removeIp, valid }) => {
	let counterClass;

	if (octetCount > 0) {
		counterClass = valid ? 'green' : 'red';
	} else {
		counterClass = 'gray';
	}

	return (
		<Fragment>
			<div className='delete-option' onClick={() => removeIp(index)}>
				<div className='icon form-hint-text'>
					<span>-</span>
				</div>
				<div className='label callout-sm'>DELETE</div>
			</div>
			<div className={`count form-character-count-text counter-${index} ${counterClass}`}>
				{index}
			</div>
		</Fragment>
	);
};

export default RemoveIpIcon;
