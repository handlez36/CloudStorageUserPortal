import React from 'react';

const PortalMessage = ({ start, content, username, includeBr = true }) => {
	return (
		<div className='portal-message'>
			{username && [<div className='user-name'>{username}</div>, includeBr && <br />]}
			{start && <span className='start'>{start}</span>}
			{content && <span className='content'>{content}</span>}
		</div>
	);
};

export default PortalMessage;
