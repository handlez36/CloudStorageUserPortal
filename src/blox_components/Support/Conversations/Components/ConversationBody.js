import React from 'react';
import { object, array } from 'prop-types';

import { Comment } from '../Comment';
import { AvatarApi } from '../../../../services/avatar';
import COMPANYCycleView from '../../../../components/Common/COMPANYCycleView';

const ConversationBody = ({ auth_status, convos }) => {
	const avatarApi = new AvatarApi();

	return (
		<COMPANYCycleView itemClass='.comment' itemWrapperClass='.conversation-body'>
			<div className='conversation-body'>
				{convos.map((convo, index) => (
					<Comment
						key={`convo-${index}`}
						convo={convo}
						avatar={avatarApi.getUserAvatar(auth_status)}
					/>
				))}
			</div>
		</COMPANYCycleView>
	);
	// return (
	// 	<div className='conversation-body'>
	// 		{convos.map((convo, index) => (
	// 			<Comment
	// 				key={`convo-${index}`}
	// 				convo={convo}
	// 				avatar={avatarApi.getUserAvatar(auth_status)}
	// 			/>
	// 		))}
	// 	</div>
	// );
};

ConversationBody.propTypes = {
	auth_status: object.isRequired,
	convos: array,
};

ConversationBody.defaultProps = {
	convos: [],
};

export default ConversationBody;
