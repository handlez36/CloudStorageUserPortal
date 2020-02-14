import axios from 'axios';
import moment from 'moment';
import { Netmask } from 'netmask';

// import { TICKET_LIST_CYCLE_DIRECTION } from '../containers/Support/TicketConstants';
// import { TICKET_LIST_CYCLE_DIRECTION } from './../utils/TicketConstants';
import { TICKET_LIST_CYCLE_DIRECTION } from '../utils/TicketConstants';
const CDN_URL = process.env.REACT_APP_CDN_URL;
const Atlanta = `${CDN_URL}profile/image-building-atlanta.svg`;
const Huntsville = `${CDN_URL}profile/image-building-huntsville.svg`;
const Chattanooga = `${CDN_URL}profile/images-building-chattanooga.svg`;
const Birmingham = `${CDN_URL}profile/image-building-birmingham.svg`;
const MultiLocations = `${CDN_URL}profile/Multi-Location.svg`;
const NavTopAccount = `${CDN_URL}navigation/nav-top-triangle-account.svg`;
const NavTopAccountmd = `${CDN_URL}navigation/nav-top-triangle-account-md.svg`;
const NavBottomAccount = `${CDN_URL}navigation/nav-bottom-triangle-account.svg`;
const NavTopBilling = `${CDN_URL}navigation/nav-top-triangle-billing.svg`;
const NavTopBillingmd = `${CDN_URL}navigation/nav-top-triangle-billing-md.svg`;
const NavBottomBilling = `${CDN_URL}navigation/nav-bottom-triangle-billling.svg`;
const NavTopSupport = `${CDN_URL}navigation/nav-top-triangle-support.svg`;
const NavTopSupportmd = `${CDN_URL}navigation/nav-top-triangle-support-md.svg`;
const NavBottomSupport = `${CDN_URL}navigation/nav-bottom-triangle-support.svg`;
const NavTopStorage = `${CDN_URL}navigation/nav-top-triangle-storage.svg`;
const NavTopStoragemd = `${CDN_URL}navigation/nav-top-triangle-storage-md.svg`;
const NavBottomStorage = `${CDN_URL}navigation/nav-bottom-triangle-storage.svg`;

export const SIDES = {
	LEFT: 'left',
	RIGHT: 'right',
};

export class Utils {
	static getClientParams(ip, site) {
		const clientJs = new ClientJS();

		const browser = `Browser Type: ${clientJs.getBrowser() || 'Unknown'}\n`;
		const browserVersion = `Browser Version: ${clientJs.getBrowserVersion() || 'Unknown'}\n`;
		const currentResolution = `Current Resolution: ${clientJs.getCurrentResolution() ||
			'Unknown'}\n`;
		const screenPrint = `Screen Print: ${clientJs.getScreenPrint() || 'Unknown'}\n`;
		const windowSize = `Window size: ${window.innerWidth || '??'} x ${window.innerHeight ||
			'??'}\n`;
		const OS = `OS: ${clientJs.getOS() || 'Unknown'}\n`;
		const OsVersion = `OS Version: ${clientJs.getOSVersion() || 'Unknown'}\n`;
		const timeZone = `Time Zone: ${clientJs.getTimeZone() || 'Unknown'}\n`;
		const language = `Language: ${clientJs.getLanguage() || 'Unknown'}\n`;
		const publicIp = `Public Ip Address: ${ip || 'Unknown'}\n`;
		const siteModule = `On Service: ${site.module || 'Unknown'}\n`;
		const sitePage = `On Module: ${site.page || 'Unknown'}`;

		return (
			browser +
			browserVersion +
			currentResolution +
			screenPrint +
			windowSize +
			OS +
			OsVersion +
			timeZone +
			language +
			publicIp +
			siteModule +
			sitePage
		);
	}
	static getBuildingImage = locations => {
		if (locations.length === 1) {
			const location = locations[0].datacenterCity;
			if (location === 'Atlanta') {
				return Atlanta;
			} else if (location === 'Chattanooga') {
				return Chattanooga;
			} else if (location === 'Huntsville') {
				return Huntsville;
			} else {
				return Birmingham;
			}
		} else {
			return MultiLocations;
		}
	};

	static setBuildingImageByName = locationName => {
		if (locationName === 'Atlanta') {
			return Atlanta;
		} else if (locationName === 'Chattanooga') {
			return Chattanooga;
		} else if (locationName === 'Huntsville') {
			return Huntsville;
		} else if (locationName === 'Birmingham') {
			return Birmingham;
		} else {
			return MultiLocations;
		}
	};

	static getNavigationAssets = (module, size) => {
		let assets;
		// console.log(module);
		switch (module) {
			case 'account':
				const topAssetAccount = size && size === 'md' ? NavTopAccountmd : NavTopAccount;
				// console.log(topAssetAccount);
				assets = {
					top: topAssetAccount,
					bottom: NavBottomAccount,
				};
				break;
			case 'billing':
				const topAssetBilling = size && size === 'md' ? NavTopBillingmd : NavTopBilling;
				assets = {
					top: topAssetBilling,
					bottom: NavBottomBilling,
				};
				break;
			case 'support':
				const topAssetSupport = size && size === 'md' ? NavTopSupportmd : NavTopSupport;
				assets = {
					top: topAssetSupport,
					bottom: NavBottomSupport,
				};
				break;
			case 'storage':
				const topAssetStorage = size && size === 'md' ? NavTopStoragemd : NavTopStorage;
				assets = {
					top: topAssetStorage,
					bottom: NavBottomStorage,
				};
				break;
			default:
				assets = {
					top: NavTopStoragemd,
					bottom: NavBottomStorage,
				};

				return assets;
		}
		return assets;
	};

	/**
	 * getNextSetFromList
	 * This method is used to select the next set of items from the list of Billing invoices
	 */
	static getNextSetFromList = (
		list,
		currentIndex,
		amtToReturn,
		initialLoad = false,
		stepSize = 1,
	) => {
		let index = initialLoad ? 0 : (currentIndex + stepSize) % list.length;
		const nextFour = [list[index]];
		const numToInclude = Math.min(list.length - 1, amtToReturn - 1);

		for (let i = 0; i < numToInclude; i++) {
			index = (index + 1) % list.length;

			nextFour.push(list[index]);
		}

		return nextFour;
	};

	/**
	 * getPrevSetFromList
	 * This method is used to select the previous set of items from the list of Billing invoices
	 */
	static getPrevSetFromList = (list, currentIndex, amtToReturn, stepSize = 1) => {
		let index = currentIndex - stepSize >= 0 ? currentIndex - stepSize : list.length - stepSize;
		const prevFour = [list[index]];
		const numToInclude = Math.min(list.length - 1, amtToReturn - 1);

		for (let i = 0; i < numToInclude; i++) {
			index = (index + 1) % list.length;

			prevFour.push(list[index]);
		}

		return prevFour;
	};

	static sort(list) {
		return list.sort((a, b) => {
			const a_date = moment(a.startDate, 'MM.DD.YY');
			const b_date = moment(b.startDate, 'MM.DD.YY');

			if (moment(a_date) < moment(b_date)) {
				return 1;
			}

			if (moment(a_date) > moment(b_date)) {
				return -1;
			}

			return 0;
		});
	}
	/**
	 * getNextRowFromList
	 * This method is used to select the next of set rows from the list of Ticket History list
	 */
	static getNextRowFromList = (
		list,
		currentIndex,
		amtToReturn,
		initialLoad = false,
		stepSize = 1,
		direction = TICKET_LIST_CYCLE_DIRECTION.NEXT,
		rows = 3,
		selected,
		selectTicketStatus,
		filterArrow,
	) => {
		const nextSet = [];
		let currIndex = currentIndex;
		let initial = initialLoad;
		list = Utils.filterList(selected, selectTicketStatus, filterArrow, list);

		let rowsToPopulate = list.length > amtToReturn ? rows : rows - 1;
		if (list.length <= 6) {
			rowsToPopulate = rows - 1;
		}
		if (list.length <= 3) {
			rowsToPopulate = rows - 2;
		}

		for (let i = 0; i < rowsToPopulate; i++) {
			let startingIndex = Utils.getNextIndex(direction, list, currIndex, initial, stepSize);
			if (!startingIndex) {
				startingIndex = 0;
			}
			const itemsToInclude = Math.min(
				list.slice(startingIndex, startingIndex + amtToReturn).length,
				amtToReturn,
			);
			nextSet.push(list.slice(startingIndex, startingIndex + itemsToInclude));

			currIndex = startingIndex;
			direction = TICKET_LIST_CYCLE_DIRECTION.NEXT;
			initial = false;
		}
		return nextSet;
	};

	/**
	 * getNextIndex
	 * Helper method for the getNextRowFromList method
	 */
	static getNextIndex(direction, list, currentIndex, initialLoad, stepSize) {
		if (direction === TICKET_LIST_CYCLE_DIRECTION.NEXT) {
			return initialLoad || currentIndex + stepSize >= list.length ? 0 : currentIndex + stepSize;
		} else {
			const amtToGet = list.length % stepSize || stepSize;

			return initialLoad || currentIndex - stepSize < 0
				? list.length - amtToGet
				: currentIndex - stepSize;
		}
	}

	/**
	 * downloadInstructionPdf
	 * This method is used to download the Windows and/or Mac Storage Pdf instructions
	 */
	static downloadInstructionPdf(name, data) {
		const urlObject = window.URL || window.webkitURL || window;
		const export_blob = new Blob([data]);

		if ('msSaveBlob' in navigator) {
			navigator.msSaveBlob(export_blob, name);
		} else if ('download' in HTMLAnchorElement.prototype) {
			const save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
			save_link.href = urlObject.createObjectURL(export_blob);
			save_link.download = name;
			Utils.fake_click(save_link);
		} else {
			throw new Error('Neither a[download] nor msSaveBlob is available');
		}
	}

	/**
	 * Helper method for the Windows / MAC Pdf download method
	 */
	static fake_click(obj) {
		const ev = document.createEvent('MouseEvents');
		ev.initMouseEvent(
			'click',
			true,
			false,
			window,
			0,
			0,
			0,
			0,
			0,
			false,
			false,
			false,
			false,
			0,
			null,
		);
		obj.dispatchEvent(ev);
	}

	/**
	 * Method to format a Date string
	 */
	static formatDate(date) {
		// Strip all dashes from the date
		let formattedDate = '-';
		const rawDate = date.replace(/-/g, '');
		const incomingDateFormat = /([\d]{2})([\d]{2})([\d]{4})/;
		const dateMatch = incomingDateFormat.exec(rawDate);

		if (dateMatch) {
			/* Only represent two digit year */
			const year = dateMatch[3].substr(2);
			formattedDate = `${dateMatch[1]}.${dateMatch[2]}.${year}`;
		}

		return formattedDate;
	}

	static formatInvoiceDate(date) {
		try {
			return moment(date).format('MM.DD.YY');
		} catch (e) {
			return date;
		}
	}

	static formatAmount = amount => {
		amount = amount.replace('$', '');
		amount = amount.replace(',', '');
		amount = parseFloat(amount);
		if (isNaN(amount)) {
			return 0;
		}

		return amount;
	};

	static formatCurrency(amount) {
		let amountWithoutCommas = amount;
		if (typeof amountWithoutCommas === 'string') {
			amountWithoutCommas = amountWithoutCommas.replace(',', '');
		}

		return Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
		})
			.format(amountWithoutCommas)
			.replace('$', '');
	}

	static scalePxUsingVh(px, screenHeightMax = 1440) {
		// const screenHeightMax = 1440;
		const currentScreenHeight = window.innerHeight;

		return (px / screenHeightMax) * currentScreenHeight;
	}

	static scalePxUsingVw(px, screenWidthMax = 2560) {
		// const screenWidthMax = 2560;
		const currentScreenWidth = window.innerWidth;

		return (px / screenWidthMax) * currentScreenWidth;
	}

	static scalePxUsingRatio() {
		return window.innerHeight / 57;
		/**
     * Supported ratios
     * 2560x1440 - 1.77 - row height should be 27px
     * 144071024 - 1.41 - row height should be 18px
     * 1024x800 - 1.28 - row height should be 16px ???
     *  - Extreme examples
     *    - 2560x800 - 3.2 - Very wide, but row height should be much smaller
     *    - If resolution is NOT between 1.28 and 1.77...
     *        - > 1.77 - maybe cap row height on 16px
     *        - < 1.28 - maybe cap row height on 27px
     * @return calc(
		#{$minFontSize} + #{strip-unit($maxFontSize - $minFontSize)} * (100vw - #{$minScreenSize}) / #{strip-unit(
				$maxScreenSize - $minScreenSize
			)}
	);
     */

		const currentRatio = window.innerWidth / window.innerHeight;
		let ratioPercentage = 0;

		if (currentRatio >= this.SUPPORTED_RATIOS.sm && currentRatio <= this.SUPPORTED_RATIOS.md) {
			ratioPercentage = (currentRatio / 1.41) * 100;
			const newHeight = 16 + ((18 - 16) * (currentRatio - 1.28)) / (1.41 - 1.28);
			return newHeight;
		} else if (
			currentRatio >= this.SUPPORTED_RATIOS.md &&
			currentRatio <= this.SUPPORTED_RATIOS.lg
		) {
			ratioPercentage = (currentRatio / 1.77) * 100;
			const newHeight = 18 + ((27 - 18) * (currentRatio - 1.41)) / (1.77 - 1.41);
			console.log('Supported ratio md: ', this.SUPPORTED_RATIOS.md);
			console.log('Supported ratio lg: ', this.SUPPORTED_RATIOS.lg);
			console.log('Current ratio is : ', currentRatio);
			console.log('Current ratio percentage: ', ratioPercentage);
			console.log('New Height between md and lg is ', newHeight);
			return newHeight;
		} else if (currentRatio > this.SUPPORTED_RATIOS.lg) {
			return 27;
		} else {
			return 16;
		}
	}

	static getElementAttribute(el, attr, asNum = true) {
		if (!el || !attr) {
			return null;
		}

		const element = document.querySelector(`.${el}`);
		if (element) {
			const style = window.getComputedStyle(element);
			let value = style.getPropertyValue(attr);

			if (asNum) {
				value = value.replace(/[^\d\.]/g, '');
				return parseFloat(value);
			} else {
				return value;
			}
		} else {
			return null;
		}
	}

	static SUPPORTED_RATIOS = {
		lg: 2560 / 1440,
		md: 1440 / 1024,
		sm: 1024 / 800,
	};

	static scrubPhoneNumber(number) {
		return number
			.replace('(', '')
			.replace(')', '')
			.replace(/\s+/g, '')
			.replace('-', '')
			.replace(/_/g, '');
	}

	static isValidResponse(response) {
		return response.status === 200 && !response.data.error;
	}

	static retrieveIPParams() {
		const url = 'https://api.ipify.org';
		return axios.get(url);
	}

	static truncateString(text, characters = 8) {
		if (!text) {
			return null;
		}

		// Save space for 3 ellipsis, if needed
		const numOfCharacters = characters - 3;
		const shouldAddEllipsis = text.length > numOfCharacters;

		return `${text.slice(0, numOfCharacters)}${shouldAddEllipsis ? '...' : ''}`;
	}

	static splitIp = ip => {
		const regex = /(\d*)\.(\d*)\.(\d*)\.(\d*)\/(\d*)/;
		let matches = [];
		if (ip) {
			matches = ip.match(regex);
		}

		return matches && matches[0]
			? { pieces: matches.slice(1, 5), subnet: matches[5] }
			: { pieces: [], subnet: null };
	};

	static convertIpToInt = ip => {
		return ip.split('.').reduce((int, oct) => (int << 8) + parseInt(oct, 10), 0) >>> 0;
	};

	static isIp4InCidr = (ip, cidr) => {
		const [range, bits = 32] = cidr.split('/');
		const mask = ~(2 ** (32 - bits) - 1);
		const validity = (Utils.convertIpToInt(ip) & mask) === (Utils.convertIpToInt(range) & mask);
		return { validity, msg: validity ? '' : 'Invalid address' };
	};

	static checkIsValidNetworkId = ip => {
		// console.log('Working with ', ip);
		try {
			const cidr = new Netmask(ip);
			const ipPortion = ip.replace(/\/\d+/, '');
			const networkId = cidr.base;

			// console.log(`IP Portion: ${ipPortion}`);
			// console.log(`Network ID: ${networkId}`);
			const msg = ipPortion === networkId ? '' : 'Invalid network ID';

			return { validity: ipPortion === networkId, msg };
		} catch (err) {
			return { validity: false, msg: '' };
		}
	};

	static checkSubnetValidity = subnet => {
		return (
			typeof subnet === 'undefined' ||
			subnet === '' ||
			subnet === null ||
			(parseInt(subnet) && parseInt(subnet) <= 32 && parseInt(subnet) >= 24)
		);
	};

	static checkIpValidity = (pieces, subnet, dirty) => {
		if (dirty === undefined || dirty === null) {
			return { validity: true, msg: '' };
		}

		let msg = '';
		const everyOctetIsNum = pieces.every(
			(piece, index) =>
				!dirty[index] || (dirty[index] && parseInt(piece) >= 0 && parseInt(piece) < 256),
		);
		const firstOctetValid =
			!dirty[0] || (dirty[0] && pieces[0] && parseInt(pieces[0]) && parseInt(pieces[0]) > 0);
		const subnetValid = Utils.checkSubnetValidity(subnet);

		if (!everyOctetIsNum) {
			msg = 'Octects can only be numbers between 0 and 256';
		} else if (!firstOctetValid) {
			msg = 'First octect should be a number above 0';
		} else if (!subnetValid) {
			msg = 'Invalid subnet';
		}

		return { validity: everyOctetIsNum && firstOctetValid && subnetValid, msg };
	};

	static checkListOfIps = ips => {
		const dirtyMapping = new Array(ips.length).fill(true);
		/** Are all Ips valid based on valid octets? */
		return ips.reduce((valid, ip) => {
			const { pieces, subnet } = Utils.splitIp(ip);
			const { validity: octectsValid } = Utils.checkIpValidity(pieces, subnet, dirtyMapping);
			const { validity: networkIdValid } = Utils.checkIsValidNetworkId(ip);
			const allValid = octectsValid && networkIdValid;

			// console.log('Checking ', ip);
			// console.log(' -- All valid: ', allValid);
			// console.log(' -- Octets valid:', octectsValid);
			// console.log(' -- Net ID valid: ', networkIdValid);
			return valid && allValid;
		}, true);
	};

	static attachSubnetToIps = ips => {
		return ips
			? ips.map(ip => {
					return /\/$/.test(ip) ? `${ip}32` : ip;
			  })
			: [];
	};

	/**
	 * **************************************************
	 * Calculations used to find menu gradient percentage
	 * **************************************************
	 */
	static createLine = (pointOne, pointTwo) => {
		if (!pointOne || !pointTwo) {
			return null;
		}

		// Calculate line slope
		const yDiff = pointTwo.y - pointOne.y;
		const xDiff = pointTwo.x - pointOne.x;
		const slope = yDiff / xDiff;

		// Calculate y intercept
		const yIntercept = pointOne.y - slope * pointOne.x;

		return { line: { slope, yIntercept } };
	};

	static findCrossPoint = (line1, line2) => {
		if (!line1 || !line2) {
			return null;
		}

		const yInterceptDiff = line1.yIntercept - line2.yIntercept;
		const slopeDiff = line2.slope - line1.slope;
		const x = yInterceptDiff / slopeDiff;
		const y = line1.slope * x + line1.yIntercept;

		return {
			crossPoint: {
				point: { x, y },
			},
		};
	};

	static findCrossPointPercentage = (fromPoint, toPoint, { point: crossPoint }) => {
		if (!fromPoint || !toPoint || !crossPoint) {
			return null;
		}

		const xRange = toPoint.x - fromPoint.x;
		const crossPointRange = crossPoint.x - fromPoint.x;
		// console.log('X Range: ', xRange);
		// console.log('Cross Point Range: ', crossPointRange);

		return crossPointRange / xRange;
	};

	static getElementPoints = element => {
		const el = document.querySelector(`.${element}`);

		if (el) {
			const boundingRect = el.getBoundingClientRect();
			return {
				points: {
					left: {
						x: boundingRect.left,
						y: boundingRect.top + boundingRect.height / 2,
					},
					right: {
						x: boundingRect.left + boundingRect.width,
						y: boundingRect.top + boundingRect.height / 2,
					},
					top: {
						x: boundingRect.left + boundingRect.width / 2,
						y: boundingRect.top,
					},
					bottom: {
						x: boundingRect.left + boundingRect.width / 2,
						y: boundingRect.top + boundingRect.height,
					},
				},
			};
		}

		// return null;
		return { points: null };
	};

	static calculateGradientPath = (topEl, bottomEl, side) => {
		if (!topEl || !bottomEl) {
			return null;
		}

		// Get DOM elements and relative points of the element
		const { points: topDiamondPoints } = Utils.getElementPoints(topEl);
		const { points: bottomDiamondPoints } = Utils.getElementPoints(bottomEl);
		// console.log('Top Diamond Points: ', topDiamondPoints);
		// console.log('Bottom Diamond Points: ', bottomDiamondPoints);

		// Get line1 and line2 points based on sides being analyzed
		const lineOneFromPoint = side === SIDES.LEFT ? topDiamondPoints.left : topDiamondPoints.right;
		const lineOneToPoint = bottomDiamondPoints.bottom;
		const lineTwoFromPoint =
			side === SIDES.LEFT ? bottomDiamondPoints.left : bottomDiamondPoints.right;
		const lineTwoToPoint = bottomDiamondPoints.top;

		// Create line objects for menu and bottom diamond elements
		const { line: lineOne } = Utils.createLine(lineOneFromPoint, lineOneToPoint);
		const { line: lineTwo } = Utils.createLine(lineTwoFromPoint, lineTwoToPoint);
		// console.log('Line One: ', lineOne);
		// console.log('Line Two: ', lineTwo);

		// Find cross point between both lines and calcuate cross point percentage
		const { crossPoint } = Utils.findCrossPoint(lineOne, lineTwo);
		const crossPointPercentage = Utils.findCrossPointPercentage(
			lineOneFromPoint,
			lineOneToPoint,
			crossPoint,
		);
		// console.log('Cross Point: ', crossPoint);
		// console.log('Cross Point Percentage: ', crossPointPercentage);

		return {
			gradientLine: lineOne,
			percentage: crossPointPercentage,
			crossPoint: crossPoint.point,
		};
	};
}
