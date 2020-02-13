import React, { Component, Fragment } from 'react';

import Button from 'sub_components/Common/BloxButton';
import { STORAGE_AVATAR_URL_PREFIX } from 'utils/Misc/CommonConstants';

const CDN_URL = process.env.REACT_APP_CDN_URL;
const FileStorageIcon = `${CDN_URL}storage/Storage-file-icon-transparent.svg`;
const ObjectStorageIcon = `${CDN_URL}storage/Storage-object-icon-transparent.svg`;
const RedundancyIcon = `${CDN_URL}storage/Storage-mirror-arrows.svg`;
const LadyBugIcon = `${CDN_URL}storage/Storage-ladybug-white-thinline.svg`;
const objectPending = `${CDN_URL}storage/object-storage-icon-inactive.svg`;
const filePending = `${CDN_URL}storage/file-storage-icon-inactive.svg`;
const SmallPublicIcon = `${CDN_URL}storage/Storage-public-icon-gray.svg`;
const SmallPrivateIcon = `${CDN_URL}storage/Storage-private-icon-default.svg`;

function cardThemeDetails(share) {
	const pending = share.status === 'pending' ? true : false;
	switch (share.type) {
		case 'file':
			if (pending) {
				return filePending;
			} else {
				return FileStorageIcon;
			}
		case 'object':
			if (pending) {
				return objectPending;
			} else {
				return ObjectStorageIcon;
			}
		default:
			return FileStorageIcon;
	}
}

function truncateName(name) {
	if (name.includes('TPX_')) {
		return name.length > 8 ? `${name.slice(4, 8)}...` : name;
	} else {
		return name.length > 8 ? `${name.slice(0, 8)}...` : name;
	}
}

class SmallShareCard extends Component {
	state = {
		hover: false,
	};

	onMouseEnter = () => {
		this.setState({ hover: true });
	};

	onMouseLeave = () => {
		this.setState({ hover: false });
	};
	getUniqueShareIcon = icon => {
		const defaultIcon = LadyBugIcon;
		if (!icon) {
			return defaultIcon;
		}

		return `${STORAGE_AVATAR_URL_PREFIX}/${icon}.svg`;
	};

	getShareSize = share => {
		let shareSize = null;
		if (share.currentSizeMB && share.currentSizeMB < 1000) {
			shareSize = `${share.currentSizeMB.toFixed(1)} MB`;
		} else if (share.currentSizeGB && share.currentSizeGB < 1000) {
			shareSize = `${share.currentSizeGB.toFixed(1)} GB`;
		} else if (share.currentSizeTB && share.currentSizeTB < 1000) {
			shareSize = `${share.currentSizeTB.toFixed(1)} TB`;
		} else {
			if (share.currentSizePB) {
				shareSize = `${share.currentSizePB.toFixed(1)} PB`;
			} else {
				shareSize = '';
			}
		}
		return shareSize;
	};

	parseLocation = location => {
		let city = '';
		let locationComponents;
		if (location) {
			locationComponents = location.split(',');
			if (locationComponents && locationComponents[0]) {
				city = locationComponents[0];
			}
		}
		return city;
	};
	checkShareSize = share => {
		if (share.currentSizeTB || share.currentSizeGB || share.currentSizeMB || share.currentSizePB) {
			return false;
		} else {
			return true;
		}
	};
	render() {
		const { share, id, onClick, index } = this.props;
		const { hover } = this.state;
		const icon = cardThemeDetails(share);
		const uniqueIcon = this.getUniqueShareIcon(share.icon);
		const pending = share.status === 'pending' ? ' pending' : '';
		const isPublic = share.publicAccess ? true : false;
		return (
			<div
				className={`small-share-card card-${index}${pending}`}
				onMouseEnter={this.onMouseEnter}
				onMouseLeave={this.onMouseLeave}
			>
				{pending && <span className='provisioning'>PROVISIONING</span>}
				{share.status !== 'pending' && (
					<Fragment>
						<div className='overlay' />
						<Button
							id={id}
							title='QUICK VIEW'
							enabled={hover}
							customClass='support-button quick-view'
							onClick={onClick}
						/>
					</Fragment>
				)}
				<div
					className={`top-card-section ${this.parseLocation(share.primary_location)} ${pending}`}
				>
					{share.replication && <img src={RedundancyIcon} className='redundancy-icon' />}
					{isPublic && isPublic !== undefined && (
						<img src={SmallPublicIcon} className='small-accessibility' />
					)}
					{!isPublic && isPublic !== undefined && (
						<img src={SmallPrivateIcon} className='small-accessibility' />
					)}
					<img src={icon} className='icon' />
				</div>
				<div className={`bottom-card-section ${pending}`}>
					<div className='share-icon'>
						<img src={uniqueIcon ? uniqueIcon : LadyBugIcon} className='image' />
					</div>
					<div className='share-details'>
						<div className='name form-hint-text'>{truncateName(share.name)}</div>
						{!this.checkShareSize(share) && (
							<div className='usage callout-sm'>{this.getShareSize(share)}</div>
						)}
						{share.status === 'active' && this.checkShareSize(share) && (
							<div className='new callout-sm'>{'NEW!'}</div>
						)}
						{pending === 'pending' && <div className='new callout-sm'>{'NEW!'}</div>}
					</div>
				</div>
			</div>
		);
	}
}

export default SmallShareCard;
