import React, { Component } from 'react';

import ScrollView from '../../../components/Common/BloxScrollViewNew';
import WhiteListRow from './WhiteListRowNew';
import Button from '../../../components/Common/BloxButton';
import * as StorageUtils from '../Utils/StorageUtils';
import { Utils } from '../../../services/utils';

class WhiteListContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			ips: [],
			dirty: [],
			lastElUpdated: null,
			allIpsValid: true,
		};
	}

	setDirtyAttributes = (index, ip) => {
		const results = Utils.splitIp(ip);
		const { dirty } = this.state;

		if (!dirty[index - 1]) {
			dirty[index - 1] = [];
		}
		dirty[index - 1] = results.pieces.map((piece, i) => {
			return parseInt(piece) || parseInt(piece) === 0 ? true : dirty[index - 1][i] || false;
		});

		return dirty[index - 1];
	};

	clearDirtyAttributes = (index, remove = true) => {
		const { dirty } = this.state;
		// If removing all attributes
		if (remove) {
			dirty.splice(index, 1);
		} else {
			dirty[index] = [false, false, false, false];
		}
		return dirty;
	};

	addIp = (index, ip, lastElUpdated = null) => {
		const { onSelect, update, phase } = this.props;
		const updatedDirtyMap = this.setDirtyAttributes(index, ip);
		this.setState(
			state => {
				state.ips[index - 1] = ip;
				state.lastElUpdated = lastElUpdated;
				state.dirty[index - 1] = updatedDirtyMap;

				return state;
			},
			() => {
				const { ips, dirty } = this.state;
				if (phase !== 'REVIEW') {
					// onSelect('whitelist', { data: ips, noSubmit: true }, true);
					onSelect('whitelist', { data: { ips, dirty }, noSubmit: true }, true);
				} else {
					update('whitelist', { ips, dirty });
				}
			},
		);

		/** Position cursor back on the input being updated in case user hasn't finished typing */
		setTimeout(() => {
			const el = document.querySelector(`.${lastElUpdated}`);
			if (el) {
				el.focus();
				if (el.setSelectionRange) {
					/** Hack to ensure focus is regained at the end of the input */
					const len = el.value.length;
					el.setSelectionRange(len, len);
				}
			}
			this.setState({ lastElUpdated: null });
		}, 50);
	};

	removeIp = index => {
		const { ips: updatedIpList, dirty } = this.state;
		const { removeIpCallback, update } = this.props;
		const arrIndex = index - 1;

		// If trying to remove an entry that is in the list, splice the array
		if (updatedIpList[arrIndex]) {
			// Remove row
			updatedIpList.splice(arrIndex, 1);
			const updatedDirtyAttributes = this.clearDirtyAttributes(true);
			this.setState({ ips: updatedIpList, dirty: updatedDirtyAttributes });
			update('whitelist', { ips: updatedIpList, dirty: updatedDirtyAttributes });
			if (removeIpCallback) {
				removeIpCallback(updatedIpList);
			}
		} else {
			// Clear address
			const updatedDirtyAttributes = this.clearDirtyAttributes(false);
			this.setState({ dirty: updatedDirtyAttributes });
			for (let i = 0; i < 4; i++) {
				const quadrant = document.querySelector(`.ip_field_quarter_${index}_quad${i}`);
				if (quadrant) {
					quadrant.value = '';
				}
			}
		}
	};

	generateNewRow = index => {
		return <WhiteListRow ip={null} index={index} addIp={this.addIp} />;
	};

	allIpsValid = () => {
		const { ips } = this.state;
		return ips.every(ip => StorageUtils.validateIpAddress(ip));
	};

	showNewIpRow = () => {
		const { ips } = this.state;
		return this.allIpsValid() || ips.length === 0;
	};

	componentDidMount() {
		const { ips: { ips: existingIps, dirty } = {} } = this.props;
		if (existingIps) {
			this.setState({ ips: existingIps, dirty: dirty || [] });
		} else {
			this.setState({ ips: [] });
		}
	}

	componentDidUpdate() {
		const { ips: { ips: incomingIps, dirty: incomingDirtyMap } = {} } = this.props;
		const { ips: existingIps, dirty: existingDirtyMap } = this.state;

		if (incomingIps && JSON.stringify(incomingIps) !== JSON.stringify(existingIps)) {
			this.setState({ ips: incomingIps, dirty: incomingDirtyMap || [] });
		}
	}

	render() {
		const { ips, dirty } = this.state;
		const { onSelect, buttonText, useButton } = this.props;
		const buttonTitle = buttonText ? buttonText : 'NEXT';

		console.log('Height: ', Utils.scalePxUsingVh(50, 1024) * ips.length + 1);
		console.log('Height: ', Utils.scalePxUsingVh(50, 1024));
		return (
			<div className='whitelist-section'>
				<div className='white-list-container'>
					<ScrollView height={Utils.scalePxUsingVh(50, 1024) * ips.length + 1}>
						{ips &&
							ips.map((ip, index) => {
								return (
									<WhiteListRow
										key={index + 1}
										ip={ip && ip.includes(-1) ? null : ip}
										dirty={dirty}
										index={index + 1}
										addIp={this.addIp}
										removeIp={this.removeIp}
										active={false}
										reformat
									/>
								);
							})}
						{this.showNewIpRow() && (
							<WhiteListRow
								key='empty-wl-row'
								empty
								active
								ip={null}
								dirty={dirty}
								index={ips.length + 1}
								addIp={this.addIp}
								removeIp={this.removeIp}
							/>
						)}
					</ScrollView>
				</div>
				{useButton && (
					<Button
						title={buttonTitle}
						enabled={ips && ips.length > 0 && this.allIpsValid()}
						onClick={() => onSelect('whitelist', { data: ips }, true)}
						customClass='blox-button whitelist-next-button'
					/>
				)}
			</div>
		);
	}
}

WhiteListContainer.defaultProps = {
	useButton: true,
};

export default WhiteListContainer;
