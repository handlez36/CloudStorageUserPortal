import React, { Fragment } from 'react';

import LocationIcon from '../Components/LocationIcon';
import { STORAGE_AVATAR_URL_PREFIX } from '../../../components/Common/CommonConstants';
import { Utils } from '../../../services/utils';
const CDN_URL = process.env.REACT_APP_CDN_URL;

const GenericLocation = `${CDN_URL}common/generic-city.svg`;
const GenericLocationIcon = `${CDN_URL}storage/Storage-generic-location.svg`;
const RedundancyIcon = `${CDN_URL}storage/Storage-mirror-arrows-inactive.svg`;
const RedundancyGreenIcon = `${CDN_URL}storage/Storage-mirror-arrows-green.svg`;
const UserIcon = `${CDN_URL}storage/Storage-add-storage-user-icon.svg`;

function getUserAvatar(avatar) {
	const defaultAvatar = UserIcon;
	if (!avatar) {
		return defaultAvatar;
	}

	return `${STORAGE_AVATAR_URL_PREFIX}/${avatar}.svg`;
}
const TopRightSection = ({ screen, params }) => {
	const { primary, redundant, secondary, name, avatar } = params;

	return (
		<div className='top-right-section'>
			{(screen.toUpperCase() === 'TYPE' || screen.toUpperCase() === 'PRIMARY') && primary && (
				<div className='primary-location-screen'>
					<LocationIcon location={primary} selected showBottomLabel={true} showTopLabel={false} />
				</div>
			)}
			{(screen.toUpperCase() === 'TYPE' || screen.toUpperCase() === 'PRIMARY') && !primary && (
				<div className='primary-location-screen'>
					<div className='generic-location'>
						<img src={GenericLocation} />
					</div>
				</div>
			)}
			{screen.toUpperCase() !== 'TYPE' && screen.toUpperCase() !== 'PRIMARY' && primary && (
				<Fragment>
					<div className={`name-avatar-section ${name && avatar ? 'show' : ''}`}>
						<div className='share-avatar'>
							<img src={getUserAvatar(avatar)} />
						</div>
						<div className='share-name heading-section-head'>{Utils.truncateString(name, 16)}</div>
					</div>
					<div className='redundancy-screen'>
						<LocationIcon location={primary} selected showTopLabel={false} showBottomLabel={true} />
						<div className='redundancy-icon-wrapper'>
							<img
								className='redundancy-icon'
								src={redundant ? RedundancyGreenIcon : RedundancyIcon}
							/>
						</div>
						{!secondary && (
							<div className='generic-icon-wrapper'>
								<img className='generic-icon' src={GenericLocationIcon} />
							</div>
						)}
						{secondary && (
							<LocationIcon
								location={secondary}
								selected
								showTopLabel={false}
								showBottomLabel={true}
							/>
						)}
					</div>
				</Fragment>
			)}
		</div>
	);
};

export default TopRightSection;
