import React, { Fragment } from 'react';
import { string } from 'prop-types';

const ConversationHeader = ({ id }) => {
	return (
		<Fragment>
			<div key='convo-header-background' className='conversation-header' />
			<div key='convo-header-text' className='conversation-header-text'>
				<div className='title'>TICKET Conversations</div>
				<div className='id'>
					TICKET# <span>{id}</span>
				</div>
			</div>
		</Fragment>
	);
};

ConversationHeader.propTypes = {
	id: string.isRequired,
};

export default ConversationHeader;
