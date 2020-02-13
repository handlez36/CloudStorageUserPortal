import React from 'react';
import { string, func, any } from 'prop-types';

import { STORAGE_AVATAR_URL_PREFIX } from '../../../components/Common/CommonConstants';
import { Utils } from '../../../services/utils';
const CDN_URL = process.env.REACT_APP_CDN_URL;

const StorageFileIcon = `${CDN_URL}storage/Storage-file-icon-transparent.svg`;
const StorageObjectIcon = `${CDN_URL}storage/Storage-object-icon-transparent.svg`;
const UserIcon = `${CDN_URL}storage/Storage-add-storage-user-icon.svg`;
const AddIcon = `${CDN_URL}storage/Storage-add-storage-icon.svg`;
const RedundancyIcon = `${CDN_URL}storage/Storage-mirror-arrows.svg`;
const SmallPublicIcon = `${CDN_URL}storage/Storage-public-icon-gray.svg`;
const PrivateIconDefault = `${CDN_URL}storage/Storage-private-icon-default.svg`;

function getTypeIcon(type) {
	if (!type) {
		return AddIcon;
	}

	return type === 'file' ? StorageFileIcon : StorageObjectIcon;
}

function getUserAvatar(avatar) {
	const defaultAvatar = UserIcon;
	if (!avatar) {
		return defaultAvatar;
	}

	return `${STORAGE_AVATAR_URL_PREFIX}/${avatar}.svg`;
}

const TopSection = ({ params, toggleAvatarModal, phase }) => {
	const { type, redundant, public: isPublic, name, avatar, primary } = params;
	return (
		<div className='add-storage-top-section'>
			<div className='left-side new-storage-container'>
				<div className={`icon-section ${primary}`}>
					{redundant && <img src={RedundancyIcon} className='small-redundancy' />}
					{isPublic && isPublic !== undefined && (
						<img src={SmallPublicIcon} className='small-accessibility' />
					)}
					{!isPublic && isPublic !== undefined && (
						<img src={PrivateIconDefault} className='small-accessibility' />
					)}
					<img src={getTypeIcon('object')} />
				</div>
				<div className='details-section'>
					<div className='user-icon' onClick={phase === 'REVIEW' ? toggleAvatarModal : () => {}}>
						<img src={getUserAvatar(avatar)} />
					</div>
					<div className='details'>
						<span className='name callout-lg'>
							{Utils.truncateString(name, 16) || 'New Storage Share'}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};
TopSection.propTypes = {
	params: any,
	toggleAvatarModal: func,
	phase: string,
};

TopSection.defaultProps = {
	phase: 'POPULATE',
};

export default TopSection;
