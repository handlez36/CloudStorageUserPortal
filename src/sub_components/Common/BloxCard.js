import React, { useState } from 'react';

const BloxCard = ({ image, summary }) => {
	const [expanded, setExpanded] = useState(false);

	return (
		<div className='blox-card'>
			<div className='card-top-section'>
				<img src={image} />
			</div>
			<div className='card-bottom-section' onClick={() => setExpanded(!expanded)}>
				{summary}
				{expanded && <div className='expanded-section'>Expanded</div>}
			</div>
		</div>
	);
};

export default BloxCard;
