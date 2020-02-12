import React from 'react';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import { Decimal } from 'decimal.js';
import Button from '../../../components/Common/BloxButton';
import LocationIcon from './LocationIcon';
import SmallProgressCircle from '../SmallProgressCircle';
import * as StorageUtils from '../Utils/StorageUtils';
import { STORAGE_AVATAR_URL_PREFIX } from '../../../components/Common/CommonConstants';

const CDN_URL = process.env.REACT_APP_CDN_URL;

const CloseIcon = `${CDN_URL}common/Common-close-icon.svg`;
const LadyBugIcon = `${CDN_URL}storage/Storage-ladybug-white-thinline.svg`;
const RedundancyIcon = `${CDN_URL}storage/Storage-mirror-arrows-green.svg`;
const RedundancyIconInactive = `${CDN_URL}storage/Storage-mirror-arrows-inactive.svg`;
const GenericLocationIcon = `${CDN_URL}storage/Storage-generic-location.svg`;

function getUniqueShareIcon(icon) {
	const defaultIcon = LadyBugIcon;
	if (!icon) {
		return defaultIcon;
	}

	return `${STORAGE_AVATAR_URL_PREFIX}/${icon}.svg`;
}

function calculatePercentage(usage, usageUnit, total, totalUnit) {
	let convertedUsage = new Decimal(usage);

	if (usageUnit === totalUnit && usage) {
		convertedUsage = usage;
	} else if (usageUnit !== totalUnit) {
		if (totalUnit === 'PB') {
			switch (usageUnit) {
				case 'MB':
					convertedUsage = convertedUsage.dividedBy(1000000000);
					break;
				case 'GB':
					convertedUsage = convertedUsage.dividedBy(1000000);
					break;
				case 'TB':
					convertedUsage = convertedUsage.dividedBy(1000);
					break;

				default:
					convertedUsage = usage;
					return;
			}
		} else if (totalUnit === 'TB') {
			switch (usageUnit) {
				case 'MB':
					convertedUsage = convertedUsage.dividedBy(1000000);
					break;
				case 'GB':
					convertedUsage = convertedUsage.dividedBy(1000);
					break;
				case 'PB':
					convertedUsage = convertedUsage.multiplyBy(1000);
					break;

				default:
					convertedUsage = usage;
					return;
			}
		} else if (totalUnit === 'GB') {
			switch (usageUnit) {
				case 'MB':
					convertedUsage = convertedUsage.divideBy(1000);
					break;
				case 'TB':
					convertedUsage = convertedUsage.multiplyBy(1000);
					break;
				case 'PB':
					convertedUsage = convertedUsage.multiplyBy(1000000);
					break;

				default:
					convertedUsage = usage;
					return;
			}
		} else if (totalUnit === 'MB') {
			switch (usageUnit) {
				case 'GB':
					convertedUsage = convertedUsage.multiplyBy(1000);
					break;
				case 'TB':
					convertedUsage = convertedUsage.multiplyBy(1000000);
					break;
				case 'PB':
					convertedUsage = convertedUsage.multiplyBy(1000000000);
					break;

				default:
					convertedUsage = usage;
					return;
			}
		}
	}
	const percentage = ((convertedUsage / total) * 100) / 1;

	return { percentage };
}

const BackSide = ({ share, onFlip, stats, changeToManageStorage, total, size }) => {
	const { usage, unit } = StorageUtils.getShareUsagePercentage(share, stats);
	const uniqueIcon = getUniqueShareIcon(share.icon);
	const { percentage } = calculatePercentage(usage, unit, total, size);
	return (
		<div className='share-quick-view'>
			<div className='flip-card-button'>
				<img src={CloseIcon} onClick={() => onFlip()} />
			</div>
			<div className='total-usage'>
				<CircularProgressbarWithChildren
					value={percentage}
					background={true}
					styles={buildStyles({
						strokeLinecap: 'butt',
					})}
				>
					<div className='count' style={{}}>
						{usage ? usage.toFixed(1) : 0}
					</div>
					<div className='new-title' style={{ marginTop: -5 }}>
						{unit}
					</div>
				</CircularProgressbarWithChildren>
			</div>
			<div className='name-icon-section'>
				<img src={uniqueIcon ? uniqueIcon : LadyBugIcon} className='icon' />
				<div className='name heading-section-head'>{share.name}</div>
			</div>
			<div className='ip callout-sm'>{`IP Address ${share.ip_address}`}</div>
			{share.replication && (
				<div className='redundancy'>
					<div className='primaryLocation'>
						<LocationIcon share={share} location={share.primary_location} />
					</div>
					<img src={RedundancyIcon} className='redundancy-icon' />
					<div className='secondaryLocation'>
						<LocationIcon share={share} location={share.secondary_location} />
					</div>
				</div>
			)}
			{!share.replication && (
				<div className='redundancy'>
					<div className='primaryLocation'>
						<LocationIcon share={share} location={share.primary_location} />
					</div>
					<img src={RedundancyIconInactive} className='redundancy-icon' />
					<div className='generic-location'>
						<img src={GenericLocationIcon} />
					</div>
				</div>
			)}
			<div className='view-more'>
				<Button
					title='VIEW MORE'
					enabled={true}
					customClass='support-button gradient'
					onClick={() => {
						changeToManageStorage(share);
					}}
				/>
			</div>
		</div>
	);
};

export default BackSide;
