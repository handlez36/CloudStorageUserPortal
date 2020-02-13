import React, { Fragment } from 'react';
import { string, bool } from 'prop-types';

// import ToolTip from '../Components/LocationLabel';
import ToolTip from './LocationLabel';
const CDN_URL = process.env.REACT_APP_CDN_URL;

const MirrorArrows = `${CDN_URL}storage/mirror-arrows.svg`;
const BirminghamGrayIcon = `${CDN_URL}storage/Storage-birmingham-gray.svg`;
const ChatanoogaGrayIcon = `${CDN_URL}storage/Storage-chattanooga-gray.svg`;
const HuntsvilleGrayIcon = `${CDN_URL}storage/Storage-huntsville-gray.svg`;
const AtlantaGrayIcon = `${CDN_URL}storage/Storage-atlanta-gray.svg`;
const AtlantaIcon = `${CDN_URL}common/atlanta-orange.svg`;
const HuntsvilleIcon = `${CDN_URL}common/huntsville-circle.svg`;
const BirminghamIcon = `${CDN_URL}common/birmingham-circle.svg`;
const ChatanoogaIcon = `${CDN_URL}common/chattanooga-circle.svg`;

function getLocationImage(location, selected = true) {
	switch (location) {
		case 'ATLANTA':
		case 'Atlanta':
		case 'ATL':
			return selected ? AtlantaIcon : AtlantaGrayIcon;
		case 'HUNTSVILLE':
		case 'Huntsville':
		case 'HSV':
			return selected ? HuntsvilleIcon : HuntsvilleGrayIcon;
		case 'BIRMINGHAM':
		case 'Birmingham':
		case 'Brimingham':
		case 'BHM':
			return selected ? BirminghamIcon : BirminghamGrayIcon;
		case 'CHATTANOOGA':
		case 'Chatanooga':
		case 'Chattanooga':
		case 'CHA':
			return selected ? ChatanoogaIcon : ChatanoogaGrayIcon;
		default:
			return null;
	}
}

function getLocationToolTip(location) {
	switch (location) {
		case 'Atlanta':
		case 'ATL':
			return 'ATLANTA';
		case 'Huntsville':
		case 'HSV':
			return 'HUNTSVILLE';
		case 'Birmingham':
		case 'Brimingham':
		case 'BHM':
			return 'BIRMINGHAM';
		case 'Chatanooga':
		case 'Chattanooga':
		case 'CHA':
			return 'CHATTANOOGA';
		default:
			return null;
	}
}

function parseLocation(location) {
	let city = '';
	let locationComponents;
	if (location) {
		locationComponents = location.split(',');
		if (locationComponents && locationComponents[0]) {
			city = locationComponents[0];
		}
	}
	switch (city) {
		case 'ATL':
			return 'ATLANTA';
		case 'HSV':
			return 'HUNTSVILLE';
		case 'CHA':
			return 'CHATTANOOGA';
		case 'BHM':
			return 'BIRMINGHAM';
		default:
			return city;
	}

	// return city;
}

const LocationIcon = ({
	location,
	replication = false,
	share,
	selected,
	disabled,
	formStyle = false,
	showTopLabel = true,
	showBottomLabel = false,
}) => {
	if (replication) {
		const parsedLocationPrimary = parseLocation(share.primary_location);
		const parsedLocationSecondary = parseLocation(share.secondary_location);
		return (
			<div className='storage-location-icon-redundant'>
				<div className='primary-location-image'>
					<img src={getLocationImage(parsedLocationPrimary)} />
					<span id='primary-location'>
						<ToolTip location={getLocationToolTip(parsedLocationPrimary)} />
					</span>
				</div>
				{share.replication && (
					<Fragment>
						<div className='mirror-arrows'>
							<img src={MirrorArrows} />
						</div>
						<div className='secondary-location-image'>
							<img src={getLocationImage(parsedLocationSecondary)} />
							<span id='secondary-location'>
								<ToolTip location={getLocationToolTip(parsedLocationSecondary)} />
							</span>
						</div>
					</Fragment>
				)}
			</div>
		);
	} else {
		const parsedLocation = parseLocation(location);
		return (
			<div className={disabled ? 'storage-location-icon disabled' : 'storage-location-icon'}>
				{showTopLabel && (
					<span
						className={formStyle ? `name ${location} form-dropdown-selection ` : `name ${location}`}
					>
						{parsedLocation.toUpperCase()}
					</span>
				)}
				<div className='location-image'>
					<img src={getLocationImage(parsedLocation, selected)} />
				</div>
				{showBottomLabel && (
					<span
						className={formStyle ? `name ${location} form-dropdown-selection ` : `name ${location}`}
					>
						{parsedLocation.toUpperCase()}
					</span>
				)}
			</div>
		);
	}
};

LocationIcon.propTypes = {
	location: string,
	selected: bool,
};

LocationIcon.defaultProps = {
	selected: true,
};

export default LocationIcon;
