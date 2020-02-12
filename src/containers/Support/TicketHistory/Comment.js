import React from 'react';
import moment from 'moment';
import { AvatarApi } from '../../../services/avatar';

export const Comment = props => {
	const { user, time, comment, attachments } = props.convo;
	const { avatar } = props;

	function getFormattedMonth(date) {
		let formattedDate = moment(date);

		try {
			if (date.substr(-1)) {
				formattedDate = moment(date + 'Z');
			}
		} catch (error) {
			console.log(error);
		}

		if (formattedDate.isValid()) {
			return formattedDate.format('LL');
		} else {
			return ' -- ';
		}
	}

	const avatarToUse =
		!user || user.toUpperCase() === 'SYSTEM' ? new AvatarApi().getGenericAvatar() : avatar;

	return (
		<div className='comment'>
			<div className='avatar'>
				<img alt='avatar' src={avatarToUse} />
			</div>
			<div className='details'>
				<div className='detail-box'>
					<div className='detail-header'>
						<div className='user'>
							{`${user.toUpperCase()}`}
							<span className='dot'>.</span>
						</div>
						<div className='timestamp'>
							<span>{getFormattedMonth(time)}</span>
						</div>
					</div>
					<div className='detail-text'>
						<span>{comment}</span>
					</div>
					<div className='detail-attachments'>
						Attachments:{' '}
						<span className='attachment-amount'>
							({attachments ? attachments : 0}) {attachments > 0 ? 'View Attachments' : ''}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};
