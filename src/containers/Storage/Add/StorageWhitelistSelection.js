import React from 'react';

import Button from '../../../components/Common/BloxButton';
import WhiteListContainer from '../Components/WhiteListContainer';
import { Utils } from '../../../services/utils';

const attachSubnetToIps = ips => {
	return ips
		? ips.map(ip => {
				return /\/$/.test(ip) ? `${ip}32` : ip;
		  })
		: [];
};

const StorageWhitelistSelection = ({ data, onSelect, update }) => {
	const { whitelist, whitelist: { ips, dirty } = {} } = data;
	const formattedWhitelist = { ...whitelist, ips: attachSubnetToIps(ips) };

	return (
		<div className='whitelist-selection-stage'>
			<WhiteListContainer
				ips={formattedWhitelist}
				dirty={dirty}
				onSelect={onSelect}
				update={update}
				useButton={false}
			/>
			<Button
				title='NEXT'
				enabled={
					formattedWhitelist.ips &&
					formattedWhitelist.ips.length > 0 &&
					Utils.checkListOfIps(formattedWhitelist.ips)
				}
				onClick={() => onSelect('whitelist', { data: formattedWhitelist }, true)}
				customClass='support-button whitelist-next-button bright-emerald-gradient'
			/>
		</div>
	);
};

export default StorageWhitelistSelection;
