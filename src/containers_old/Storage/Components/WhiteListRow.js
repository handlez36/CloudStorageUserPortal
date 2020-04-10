import React, { Component } from 'react';

import InputField from '../../../components/Forms/COMPANYTextInput';
import DropDownFilter from '../../../components/Common/DropDownFilter';
import { INPUT_TYPES, numberMask } from '../../../components/Common/CommonConstants';
import * as StorageUtils from '../Utils/StorageUtils';

class WhiteListRow extends Component {
	state = {
		ip: null,
		pieces: [],
		valid: false,
		subnet: 32,
		index: null,
		editMode: false,
	};

	validateIpAddress = pieces => {
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

	onChange = ({ target, nativeEvent }) => {
		const { index: containerIndex, addIp, removeIp } = this.props;
		const { pieces, subnet } = this.state;
		const { name, value } = target;
		const { data } = nativeEvent;
		const indexMatch = name.match(/quad(\d)/);

		if (indexMatch) {
			const index = indexMatch[1];
			pieces[index] = value;
			const valid = StorageUtils.validateIpAddress(pieces);

			const ip = `${pieces.join('.')}/${subnet}`;
			if (parseInt(data) || !data) {
				addIp(containerIndex - 1, ip, name);
			}
			this.setState({ pieces, valid });
		}
	};

	onKeyUp = event => {
		const { key } = event;
		const { current, index } = this.state;
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
			const nextInput = document.querySelector(
				`.ip_field_quarter_${index}_quad${currentInput + 1}`,
			);
			if (currentInput < 4 && nextInput) {
				nextInput.focus();
			}
		} else if (key === '/') {
			const subnetInput = document.querySelector(`.subnet-${index}`);
			if (current !== 4 && subnetInput) {
				subnetInput.focus();
			}
		}
	};

	updateSubnet = subnet => {
		const { addIp, index } = this.props;

		this.setState({ subnet }, () => {
			const { pieces, subnet } = this.state;
			const ip = `${pieces.join('.')}/${subnet}`;
			const valid = StorageUtils.validateIpAddress(pieces);
			if (valid) {
				addIp(index - 1, ip);
			}
		});
	};

	getInputFields = () => {
		const { pieces } = this.state;
		const fields = [];

		for (let i = 0; i < 4; i++) {
			fields.push(!pieces[i] || pieces[i] === undefined || pieces[i] === '' ? '' : pieces[i]);
		}
		return fields;
	};

	splitFields = ipPieces => {};

	renderInputFields = (ipPieces, ipIndex) => {
		const parts = ipPieces.length === 4 ? ipPieces : ['', '', '', ''];
		const inputFields = this.getInputFields();

		return parts.map((field, index) => {
			const validityClass =
				inputFields[index] === 0 ||
				(inputFields[index] && inputFields[index] >= 0 && inputFields[index] < 256)
					? 'valid'
					: 'invalid';

			return (
				<InputField
					key={`${field}-${index}`}
					type={INPUT_TYPES.INPUT}
					placeholder='1.'
					label=''
					name={`ip_field_quarter_${ipIndex}_quad${index}`}
					mask={numberMask}
					value={inputFields[index]}
					onChange={this.onChange}
					onKeyUp={this.onKeyUp}
					active={true}
					hideCheckmark
					customClass={`${validityClass} ${this.props.customClass}`}
				/>
			);
		});
	};

	splitIp = ip => {
		const regex = /(\d*)\.?(\d*)\.?(\d*)\.?(\d*)\/(\d*)/;
		let matches = [];
		if (ip) {
			matches = ip.match(regex);
		}

		return matches && matches[0]
			? { pieces: matches.slice(1, 5), subnet: matches[5] }
			: { pieces: [], subnet: null };
	};

	componentDidUpdate() {
		const { index: existingIndex, ip: existingIp } = this.state;
		const { index: incomingIndex, ip: incomingIp } = this.props;

		if (existingIndex && incomingIndex !== existingIndex) {
			this.setState({
				ip: null,
				pieces: [],
				valid: false,
				subnet: 32,
				index: incomingIndex,
			});
		}

		if (incomingIp !== existingIp) {
			const { pieces, subnet } = this.splitIp(incomingIp);
			const valid = this.validateIpAddress(pieces);
			this.setState({ ip: incomingIp, pieces, subnet, index: incomingIndex, valid });
		}

		/** Hack to ensure the input causing the re-render regains its focus */
		const el = document.querySelector(`.${this.props.setFocusEl}`);
		if (this.props.setFocusEl && el) {
			el.focus();
			if (el.setSelectionRange) {
				/** Hack to ensure focus is regained at the end of the input */
				const len = el.value.length;
				el.setSelectionRange(len, len);
			}
		}
	}

	componentDidMount() {
		const { ip, index } = this.props;
		if (ip) {
			const { pieces, subnet } = this.splitIp(ip);
			this.setState({ index, ip, pieces, subnet });
		} else {
			this.setState({ index, reformat: false });
		}
	}

	generateSubnetOptions = () => {
		return [
			{ displayValue: ' / 32', value: 32 },
			{ displayValue: ' / 30', value: 30 },
			{ displayValue: ' / 28', value: 28 },
			{ displayValue: ' / 26', value: 26 },
			{ displayValue: ' / 24', value: 24 },
		];
	};

	render() {
		const { index, removeIp, empty } = this.props;
		const { pieces, subnet } = this.state;

		return (
			<div className={`white-list-row ${empty ? 'empty' : ''}`}>
				<div className='delete-option' onClick={() => removeIp(index)}>
					<div className='icon form-hint-text'>
						<span>-</span>
					</div>
					<div className='label callout-sm'>DELETE</div>
				</div>
				<div
					className={`count form-character-count-text counter-${index} ${
						pieces.length > 0 ? 'green' : 'gray'
					}`}
				>
					{index}
				</div>
				<div
					className='ip'
					onClick={() => {
						this.setState(state => {
							state.reformat = true;
							return state;
						});
					}}
				>
					{this.renderInputFields(pieces, index)}
					<div className='slash'>/</div>
					<InputField
						type={INPUT_TYPES.INPUT}
						label=''
						name={`ip_field_subnet subnet-${index}`}
						mask={numberMask}
						onChange={event =>
							this.updateSubnet(event.target && event.target.value ? event.target.value : null)
						}
						value={subnet}
						active={true}
						hideCheckmark
					/>
					<DropDownFilter
						title=''
						label=''
						options={this.generateSubnetOptions()}
						callback={this.updateSubnet}
					/>
				</div>
			</div>
		);
	}
}

export default WhiteListRow;
