import React, { Fragment } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

import RemoveIpIcon from './RemoveIpIcon';
import InputField from '../../../components/Forms/COMPANYTextInput';
import DropDownFilter from '../../../components/Common/DropDownFilter';
import { INPUT_TYPES, numberMask } from '../../../components/Common/CommonConstants';
import { Utils } from '../../../services/utils';
import { ClientData } from '../../../services/clientData';

let bypassIpUpdate = false;
let resizeObserver = null;
let currentDropdownTarget = null;

const formatIpString = index => {
	const oct1 = document.querySelector(`.ip_field_quarter_${index}_quad0`).value;
	const oct2 = document.querySelector(`.ip_field_quarter_${index}_quad1`).value;
	const oct3 = document.querySelector(`.ip_field_quarter_${index}_quad2`).value;
	const oct4 = document.querySelector(`.ip_field_quarter_${index}_quad3`).value;
	const subnet = document.querySelector(`.subnet-${index}`).value;
	return `${oct1}.${oct2}.${oct3}.${oct4}/${subnet}`;
};

const onChange = (index, addIp) => event => {
	const { nativeEvent: { data } = {} } = event;

	if (/subnet/.test(event.target.name)) {
		toggleSubnetStatus(event.target.value, index);
	}

	if (parseInt(data) || data === '0' || data === null || !bypassIpUpdate) {
		const { name: elementUpdated } = event.target;
		const ipStr = formatIpString(index);

		if (ipStr) {
			addIp(index, ipStr, elementUpdated);
		}
	}

	if (bypassIpUpdate) {
		bypassIpUpdate = false;
	}
};

const onKeyDown = index => event => {
	const { key } = event;
	const activeEl = document.activeElement;
	let currentInput = 0;

	/** Get the ip input index of the index currently in focus */
	if (activeEl && activeEl.nodeName === 'INPUT' && activeEl.classList[0]) {
		const className = activeEl.classList[0];
		const matches = className.match(/ip_field_quarter_[\d]+_quad([\d]+)/);
		if (matches && matches[1] && parseInt(matches[1])) {
			currentInput = parseInt(matches[1]);
		}
	}

	if (key === '.') {
		const nextInput = document.querySelector(`.ip_field_quarter_${index}_quad${currentInput + 1}`);
		if (currentInput < 4 && nextInput) {
			setTimeout(() => {
				nextInput.focus();
			}, 100);
		}
		bypassIpUpdate = true;
	} else if (key === '/') {
		const subnetInput = document.querySelector(`.subnet-${index}`);
		if (currentInput !== 4 && subnetInput) {
			subnetInput.focus();
		}
		bypassIpUpdate = true;
	}
};

const repositionDropdown = () => {
	if (!currentDropdownTarget) {
		return;
	}

	const isIE = ClientData.getBrowser() === 'IE';
	const whiteListSectionEl = document.querySelector('.whitelist-section');
	const dropDownEl = document.querySelector(`.whitelist-section > ul.dd-list-ul`);
	const rowEl = document.querySelector(`#white-list-row-${currentDropdownTarget}`);
	const subnetInput = document.querySelector(
		`#white-list-row-${currentDropdownTarget} .ip_field_subnet`,
	);

	if (dropDownEl) {
		const sectionBoundingBox = whiteListSectionEl.getBoundingClientRect();
		const rowBoundingBox = rowEl.getBoundingClientRect();
		const subnetInputBox = subnetInput.getBoundingClientRect();
		const yDiff = rowBoundingBox.bottom - sectionBoundingBox.top;
		const xDiff = subnetInputBox.left - sectionBoundingBox.left;

		dropDownEl.setAttribute('style', `position: absolute; top: ${yDiff}px; left: ${xDiff}px`);
	}
};

/**
 * If whitelist modal is open, remove dropdown list from HTML body tag
 * Else, remove dropdown list from whitelist section container and disconnect resize observer
 */
const closeDropdown = () => {
	const modalEl = document.querySelector('.white-list-modal');
	const bodyEl = document.querySelector('body');

	const whiteListSectionEl = document.querySelector('.whitelist-section');
	const clonedDropdownEl = document.querySelector(`.whitelist-section > ul.dd-list-ul`);
	const bodyDropdownEl = document.querySelector(`body > ul.dd-list-ul`);
	if (modalEl && bodyDropdownEl) {
		bodyEl.removeChild(bodyDropdownEl);
	} else if (whiteListSectionEl && clonedDropdownEl) {
		whiteListSectionEl.removeChild(clonedDropdownEl);
	}

	if (resizeObserver) {
		resizeObserver.disconnect();
		resizeObserver = null;
	}
};

const openDropdown = (id, dropDownMenu) => {
	if (!dropDownMenu) {
		return;
	}

	const parsedId = parseInt(id);
	const isIE = ClientData.getBrowser() === 'IE';

	/** Detect if whitelist modal is open */
	const modalEl = document.querySelector('.white-list-modal');
	const bodyEl = document.querySelector('body');

	/** Get whitelist section elements */
	const whiteListSectionEl = document.querySelector('.whitelist-section');
	const rowEl = document.querySelector(`#white-list-row-${parsedId}`);
	const subnetInput = document.querySelector(`#white-list-row-${parsedId} .ip_field_subnet`);
	const sectionBoundingBox = whiteListSectionEl.getBoundingClientRect();
	const rowBoundingBox = rowEl.getBoundingClientRect();
	const subnetInputBox = subnetInput.getBoundingClientRect();

	/**
	 * If whitelist modal is open, use absolute positioning from the entire screen
	 * Else, use absolute positioning from the whitelist section container
	 */
	const yDiff = modalEl ? rowBoundingBox.bottom : rowBoundingBox.bottom - sectionBoundingBox.top;
	const xDiff = modalEl ? subnetInputBox.left : subnetInputBox.left - sectionBoundingBox.left;

	/**
	 * If whitelist modal is open, append dropdown list to the HTML body tag
	 * Else, append dropdown list to whitelist section container and setup resize observer.
	 */
	if (whiteListSectionEl) {
		dropDownMenu.setAttribute('style', `position: absolute; top: ${yDiff}px; left: ${xDiff}px`);
		if (modalEl) {
			bodyEl.appendChild(dropDownMenu);
		} else {
			whiteListSectionEl.appendChild(dropDownMenu);
		}
		currentDropdownTarget = parsedId;
		resizeObserver = new ResizeObserver(entries => {
			entries.forEach(entry => {
				repositionDropdown();
			});
		});
		resizeObserver.observe(whiteListSectionEl);
	}
};

const toggleSubnetStatus = (subnet, index) => {
	const subnetEl = document.querySelector(`.subnet-${index}`);
	const isValid = Utils.checkSubnetValidity(subnet);
	if (!isValid) {
		subnetEl.classList.remove('valid');
		subnetEl.classList.add('invalid');
	} else {
		subnetEl.classList.remove('invalid');
		subnetEl.classList.add('valid');
	}
};

const onSubnetSelect = (index, addIp) => subnet => {
	const subnetEl = document.querySelector(`.subnet-${index}`);
	if (subnet && subnetEl) {
		subnetEl.value = subnet;
		const ipStr = formatIpString(index);
		if (ipStr) {
			toggleSubnetStatus(subnet, index);
			addIp(index, ipStr);
		}
	}
};

const generateSubnetOptions = () => {
	return [
		{ displayValue: ' / 32', value: 32 },
		{ displayValue: ' / 30', value: 30 },
		{ displayValue: ' / 28', value: 28 },
		{ displayValue: ' / 26', value: 26 },
		{ displayValue: ' / 24', value: 24 },
	];
};

const renderInputFields = (ipPieces, ipIndex, addIp, customClass, dirty, empty) => {
	const inputFields = [];
	const dirtyIndex = ipIndex - 1;
	let validityClass;

	for (let i = 0; i < 4; i++) {
		/** If octect has been touched, determine validity */
		if (dirty[dirtyIndex]) {
			if (dirty[dirtyIndex][i]) {
				validityClass =
					ipPieces[i] === 0 || (ipPieces[i] && ipPieces[i] >= 0 && ipPieces[i] < 256)
						? 'valid'
						: 'invalid';
			} else {
				validityClass = 'unset';
			}
		} else {
			validityClass = 'unset';
		}

		inputFields.push(
			<InputField
				key={`${ipIndex}-${i}`}
				// key={`${ipPieces ? ipPieces.join('.') : 'empty'}`}
				type={INPUT_TYPES.INPUT}
				placeholder='1.'
				label=''
				name={`ip_field_quarter_${ipIndex}_quad${i}`}
				mask={numberMask}
				value={ipPieces[i]}
				onChange={onChange(ipIndex, addIp)}
				onKeyDown={onKeyDown(ipIndex)}
				active
				hideCheckmark
				customClass={`${validityClass} ${customClass}`}
			/>,
		);
	}

	return inputFields;
};

const WhiteListRowNew = ({ index, ip, dirty, addIp, removeIp, empty, customClass }) => {
	const { pieces, subnet } = Utils.splitIp(ip);
	const { validity: isValid, msg } = Utils.checkIpValidity(pieces, subnet, dirty[index - 1]);
	let validity = isValid;
	const errors = [
		<div key={`${ip}-error-${msg}`} className='error'>
			{msg}
		</div>,
	];

	if (ip && pieces.every(piece => parseInt(piece) || piece === 0)) {
		const ipStr = pieces.join('.');
		const cidrStr = `${ipStr}/${subnet || 32}`;
		const { validity: validCidr, msg: cidrErr } = Utils.checkIsValidNetworkId(cidrStr);
		errors.push(
			<div key={`${ip}-cidr-error-${cidrErr}`} className='error'>
				{cidrErr}
			</div>,
		);
		validity = isValid && validCidr;
	}
	const errDiv = <div className='ip-error body-copy-small-regular'>{errors}</div>;

	return (
		<Fragment>
			<div className={`white-list-row ${empty ? 'empty' : ''}`}>
				<RemoveIpIcon
					index={index}
					octetCount={pieces.length}
					removeIp={removeIp}
					valid={validity}
				/>
				<div id={`white-list-row-${index}`} className='ip'>
					{renderInputFields(pieces, index, addIp, customClass, dirty, empty)}
					<div className='slash'>/</div>
					<InputField
						type={INPUT_TYPES.INPUT}
						label=''
						name={`ip_field_subnet subnet-${index}`}
						mask={numberMask}
						onChange={onChange(index, addIp)}
						onKeyDown={onKeyDown}
						value={subnet}
						placeholder={32}
						active={true}
						customClass={subnet ? 'set' : 'not-set'}
						hideCheckmark
					/>
					<DropDownFilter
						id={index}
						title=''
						label=''
						options={generateSubnetOptions()}
						callback={onSubnetSelect(index, addIp)}
						customDropdownOpen={openDropdown}
						customDropdownClose={closeDropdown}
					/>
				</div>
			</div>
			{errDiv}
		</Fragment>
	);
};

export default WhiteListRowNew;
