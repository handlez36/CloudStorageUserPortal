import React from 'react';
import moment from 'moment';

// import LocationIcon from '../Components/LocationIcon';
import LocationIcon from '../sub_components/Storage/LocationIcon';

export let NUM_OF_GRAPH_DATA_POINTS = 9;
export const DEFAULT_TIME_FORMAT = 'YYYY-MM-DD HH:MM:SSSS-ZZ';
export const DISPLAY_TIME_FORMAT = 'MM.DD';
export const GRAPH_UNITS = {
	MB: 1,
	GB: 2,
	TB: 3,
};

export const getLocationAbbreviation = location => {
	const parsedLocation = location.split(',')[0];
	switch (parsedLocation) {
		case 'Atlanta':
			return 'ATL';
		case 'Huntsville':
			return 'HSV';
		case 'Birmingham':
		case 'Brimingham':
			return 'BHM';
		case 'Chatanooga':
		case 'Chattanooga':
			return 'CHA';
		default:
			return 'ATL';
	}
};

/** Return LocationIcon components for applicable locations in dataset */
export const getLocationIcons = data => {
	console.log(Object.keys(data));
	const locations = ['ATL', 'BHM', 'CHA', 'HSV'];
	const activeLocations = Object.keys(data);
	const showLocations = [];

	if (data) {
		for (let j = 0; j <= locations.length - 1; j++) {
			if (!activeLocations.includes(locations[j])) {
				const emptyLocation = { location: locations[j], disabled: true };
				showLocations.push(emptyLocation);
			} else {
				const Location = { location: locations[j], disabled: false };
				showLocations.push(Location);
			}
		}
		//data.sort(sortLocations());
	}
	return showLocations.map(location => (
		<LocationIcon
			location={location.location}
			showTopLabel={false}
			showBottomLabel={true}
			disabled={location.disabled}
		/>
	));
};

export const getLocationIconsOneShare = data => {
	return (
		<LocationIcon
			showTopLabel={false}
			location={data.primary_location}
			replication={true}
			share={data}
		/>
	);
};
export const getLocationIcon = location => {
	return (
		<LocationIcon
			location={location}
			showTopLabel={false}
			showBottomLabel={true}
			replication={false}
		/>
	);
};

/** Get the min and max date ranges of a queried storage data set */
export const getRangeMaxAndMin = data => {
	const locations = Object.keys(data);
	if (locations.length === 0) {
		return { rangeMax: null, rangeMin: null };
	}

	const sampleKey = locations[0];
	const momentDateArray = data[sampleKey].map(item => moment(item.actualDate));
	const rangeMax = moment.max(momentDateArray);
	const rangeMin = moment.min(momentDateArray);

	return { rangeMax, rangeMin };
};

/** Get current range based on max date in data set */
export const getCurrentRange = (max, resolution, customNumberGraphDataPoints) => {
	if (!max) {
		return { currMin: null, currMax: null };
	}
	const currMax = moment(max);
	const currMin = moment(currMax);
	if (customNumberGraphDataPoints) {
		NUM_OF_GRAPH_DATA_POINTS = customNumberGraphDataPoints;
	}

	currMin.subtract(NUM_OF_GRAPH_DATA_POINTS - 1, resolution);
	return { currMin, currMax };
};

/** Get max and min values for y axis based on data set */
export const getDataRange = data => {
	const keys = Object.keys(data);
	const maxs = [];
	const mins = [];
	keys.forEach(key => {
		const values = data[key].map(item => item.y);
		maxs.push(Math.max(...values));
		mins.push(Math.min(...values));
	});

	return { minData: Math.min(...mins) * 0.9, maxData: Math.max(...maxs) * 1.1 };
};

/** Format storage data to fit Victory graph data format requirments */
export const formatDataForGraph = (data, format = 'MM.DD', unit) => {
	if (!data || data.length === 0) {
		console.log('No Data');
		return {};
	}

	const formattedData = {};

	data.forEach(item => {
		if (!formattedData[item.location]) {
			formattedData[item.location] = [];
		}
		const date = moment(item.dateTime).format(format);
		formattedData[item.location].push({
			x: date,
			y: item.sizeMB,
			actualDate: item.dateTime,
			unit: unit[item.location],
			rawData: item,
		});
	});
	return formattedData;
};

export const determineDataUnit = (data, existingUnit = null) => {
	if (!data) {
		return null;
	}

	if (data.sizeMB < 1000) {
		return existingUnit !== null ? existingUnit : 'MB';
	} else if (data.sizeGB < 1000) {
		return existingUnit === 'TB' || existingUnit === 'PB' ? existingUnit : 'GB';
	} else if (data.sizeTB < 1000) {
		return existingUnit === 'PB' ? existingUnit : 'TB';
	} else {
		if (data.sizePB) {
			return 'PB';
		}
		return 'MB';
	}
};

export const sortShares = shares => {
	if (!shares || shares.length === 0) {
		return [];
	}

	const sorted = shares.sort((a, b) => {
		if (a.name > b.name) {
			return 1;
		} else if (a.name < b.name) {
			return -1;
		}

		return 0;
	});

	return sorted;
};

export const determineDataUnitShare = (data, existingUnit = null, attribute = 'currentSize') => {
	if (!data) {
		return null;
	}

	// if (data.currentSizeMB < 1000) {
	if (data[`${attribute}MB`] < 1000) {
		return existingUnit !== null ? existingUnit : 'MB';
		// } else if (data.currentSizeGB < 1000) {
	} else if (data[`${attribute}GB`] < 1000) {
		return existingUnit === 'TB' || existingUnit === 'PB' ? existingUnit : 'GB';
		// } else if (data.currentSizeTB < 1000) {
	} else if (data[`${attribute}TB`] < 1000) {
		return existingUnit === 'PB' ? existingUnit : 'TB';
	} else {
		// if (data.currentSizeTB) {
		if (data[`${attribute}TB`]) {
			return 'PB';
		}
		return 'MB';
	}
};

export const getShareUsagePercentage = (share, stats) => {
	const locationAbbreviation = getLocationAbbreviation(share.primary_location);
	const fileData = getFileData(stats, locationAbbreviation);
	const packageData = getPackageData(stats, share.type);

	// Get proper unit for display
	let packageCommitmentAmt;
	let customerUsage;
	let shareSize;

	//unit = determineDataUnit(fileData);
	const unit = determineDataUnitShare(share);
	if (unit) {
		if (packageData) {
			packageCommitmentAmt = packageData[`commitmentAmount${unit}`];
		}
		if (fileData) {
			customerUsage = fileData[`size${unit}`];
		}
		if (share) {
			shareSize = share[`currentSize${unit}`];
		}
	}
	const usage = shareSize || 0;
	return customerUsage > packageCommitmentAmt
		? { usage, total: customerUsage, unit }
		: { usage, total: packageCommitmentAmt, unit };
};

export const getFileData = (share, location) => {
	let fileData;
	if (share === null) {
		return null;
	}
	const { file } = share;

	const data = file.filter(fileItem => fileItem.location === location);
	if (data && data.length > 0) {
		fileData = data[0];
	}

	return fileData;
};

const getPackageData = (share, type) => {
	let packageData;
	if (share === null) {
		return null;
	}
	const { packages: packageDetails } = share;
	const data = packageDetails.filter(fileItem => fileItem.storageType === type);
	//const data = packageDetails.filter(fileItem => fileItem.type === type);
	if (data && data.length > 0) {
		packageData = data[0];
	}

	return packageData;
};

export const validateIpAddress = ip => {
	// const { pieces, subnet } = splitIp(ip);
	let pieces;
	if (typeof ip === 'object') {
		pieces = ip;
	} else {
		const piecesAndSubnet = splitIp(ip);
		pieces = piecesAndSubnet.pieces;
	}

	/** If IP address does not have four pieces, it's not valid */
	if (pieces.length !== 4) {
		return false;
	}

	/** Is each piece a number that is between 0 and 256 */
	let isIpValid = true;
	pieces.forEach(piece => {
		const pieceAsNum = parseInt(piece);
		const isPieceValid = pieceAsNum === 0 || (pieceAsNum && pieceAsNum >= 0 && pieceAsNum < 256);
		isIpValid = isPieceValid && isIpValid ? true : false;
	});

	return isIpValid;
};

const splitIp = ip => {
	const regex = /(\d*)\.?(\d*)\.?(\d*)\.?(\d*)\/(\d*)/;
	// const regex = /(\d*)\.(\d*)\.(\d*)\.(\d*)\/(\d*)/;
	let matches = [];
	if (ip) {
		matches = ip.match(regex);
	}

	return matches && matches[0]
		? { pieces: matches.slice(1, 5), subnet: matches[5] }
		: { pieces: [], subnet: null };
};

export const ADD_STORAGE_LAYOUT_GRID = {
	xs: [
		{ i: 'top-nav-bar', x: 0, y: 0, w: 12, h: 3, static: true },
		{ i: 'left-nav-arrow-key', x: 3, y: 8, w: 1, h: 1, static: true },
		{ i: 'right-nav-arrow-key-hidden', x: 9, y: 8, w: 1, h: 1, static: true },
		{ i: 'right-nav-arrow-key', x: 8, y: 8, w: 1, h: 1, static: true },
		{ i: 'horizontal-bar', x: 0, y: 16.5, w: 10, h: 1, static: true },
	],
	sm: [
		{ i: 'top-nav-bar', x: 0, y: 0, w: 12, h: 3, static: true },
		{ i: 'left-nav-arrow-key', x: 3, y: 8, w: 1, h: 1, static: true },
		{ i: 'right-nav-arrow-key-hidden', x: 9, y: 8, w: 1, h: 1, static: true },
		{ i: 'right-nav-arrow-key', x: 8, y: 8, w: 1, h: 1, static: true },
		{ i: 'horizontal-bar', x: 0, y: 16, w: 10, h: 1, static: true },
	],
	md: [
		{ i: 'top-nav-bar', x: 0, y: 0, w: 12, h: 3, static: true },
		{ i: 'left-nav-arrow-key', x: 3, y: 8, w: 1, h: 1, static: true },
		{ i: 'right-nav-arrow-key-hidden', x: 9, y: 8, w: 1, h: 1, static: true },
		{ i: 'right-nav-arrow-key', x: 8, y: 8, w: 1, h: 1, static: true },
		{ i: 'horizontal-bar', x: 0, y: 16, w: 10, h: 1, static: true },
	],
	lg: [
		{ i: 'top-nav-bar', x: 0, y: 0, w: 12, h: 3, static: true },
		{ i: 'left-nav-arrow-key', x: 3, y: 8, w: 1, h: 1, static: true },
		{ i: 'right-nav-arrow-key-hidden', x: 9, y: 8, w: 1, h: 1, static: true },
		{ i: 'right-nav-arrow-key', x: 8, y: 8, w: 1, h: 1, static: true },
		{ i: 'horizontal-bar', x: 0, y: 16, w: 10, h: 1, static: true },
	],
};

export const formatStorageAddParams = params => {
	if (!params) {
		return null;
	}

	const name = params.name || 'Name not found';
	const type = (params.type && params.type.toLowerCase()) || 'object';
	const access = params.public ? 'public' : 'private';
	const primary_location = params.primary
		? getLocationAbbreviation(params.primary)
		: 'Primary location not found';
	const secondary_location = params.secondary ? getLocationAbbreviation(params.secondary) : null;
	const replication = params.redundant;
	const icon = params.avatar;
	const whitelist = formatWhitelist(params.whitelist);

	return {
		addStorageRequestInput: {
			name,
			type,
			access,
			primary_location,
			secondary_location,
			replication,
			icon,
			whitelist,
		},
	};
};

const formatWhitelist = ({ ips: whitelist }) => {
	const regex = /(\d+\.\d+\.\d+\.\d+)\/(\d*)/;
	return whitelist.map(ip => {
		const matches = ip.match(regex);
		if (matches && matches[1]) {
			return {
				ip_address: matches[1],
				subnet_mask: matches[2] || '32',
			};
		} else {
			return {
				ip_address: null,
				subnet_mask: null,
			};
		}
	});
};

/**
 * Sample /stats network request
 */
export const sampleNetworkRequest = {
	packages: [
		{
			id: 1,
			customerId: 346361,
			storageType: 'object',
			packageType: 'month',
			commitmentAmountPB: 0.01,
			commitmentAmountTB: 9.0,
			commitmentAmountGB: 9000.0,
			commitmentAmountMB: 9000000.0,
		},
		{
			id: 2,
			customerId: 346361,
			storageType: 'file',
			packageType: 'prepaid',
			commitmentAmountPB: 2.0,
			commitmentAmountTB: 2000.0,
			commitmentAmountGB: 2000000.0,
			commitmentAmountMB: 2000000000.0,
		},
	],
	file: [
		{
			location: 'ATL',
			sizeMB: 36.0,
			sizeGB: 0.04,
			sizeTB: 0.0,
			sizePB: 0.0,
			storageType: 'file',
			dateTime: '2020-02-03 07:30:00.000-0500',
		},
		{
			location: 'BHM',
			sizeMB: 14940.0,
			sizeGB: 14.94,
			sizeTB: 0.01,
			sizePB: 0.0,
			storageType: 'file',
			dateTime: '2020-02-03 07:30:00.000-0500',
		},
		{
			location: 'CHA',
			sizeMB: 14940.0,
			sizeGB: 14.94,
			sizeTB: 0.01,
			sizePB: 0.0,
			storageType: 'file',
			dateTime: '2020-02-03 07:30:00.000-0500',
		},
		{
			location: 'HSV',
			sizeMB: 36.0,
			sizeGB: 0.04,
			sizeTB: 0.0,
			sizePB: 0.0,
			storageType: 'file',
			dateTime: '2020-02-03 07:30:00.000-0500',
		},
	],
	object: [
		{
			location: 'ATL',
			sizeMB: 14940.0,
			sizeGB: 14.94,
			sizeTB: 0.01,
			sizePB: 0.0,
			storageType: 'object',
			dateTime: '2020-02-03 07:30:00.000-0500',
		},
		{
			location: 'CHA',
			sizeMB: 14940.0,
			sizeGB: 14.94,
			sizeTB: 0.01,
			sizePB: 0.0,
			storageType: 'object',
			dateTime: '2020-02-03 07:30:00.000-0500',
		},
	],
	error: null,
};
