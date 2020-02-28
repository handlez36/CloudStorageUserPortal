import React from 'react';
import Field from './Field';
import Button from '../../../components/Common/BloxButton';

const manageWhitelistTooltip =
	'Click on this button to manage the IP addresses/subnets that have been whitelisted for this share.';

function renderAccessibilityString(share) {
	return (
		<div>
			{share.publicAccess && (
				<div>
					<span className='public-accessibility'>Public</span>
					<i className='check'>&#10004;</i>
				</div>
			)}
			{share.publicAccess && share.privateAccess && <span> | </span>}
			{share.privateAccess && (
				<div>
					<span className='private-accessibility'>Private</span>
					<i className='check'>&#10004;</i>
				</div>
			)}
		</div>
	);
}

function renderApiKey(share, hideApiKey, toggleApiKey) {
	return (
		<Field
			key='datatable-api-key'
			name='Secret Key'
			value={share.api_key}
			hidden={hideApiKey}
			toggle={toggleApiKey}
		/>
	);
}

const DataTable = ({
	share,
	hideApiKey,
	toggleApiKey,
	toggleWhiteListOpen,
	changeStoragePassword,
}) => {
	return (
		<div className='data-table'>
			<h6>{`SHARE ${share.name}:`}</h6>
			<hr />
			{share.private_access && (
				<React.Fragment>
					<div className='heading-section-head'>NETWORK Configuration</div>
					<div key='info-section' className='info-section'>
						<Field name='customer ip' value={share.customer_ip} />
						<Field name='subnet mask' value={share.subnet_mask} />
						<Field name='vlan tag' value={share.vlan} />
					</div>
				</React.Fragment>
			)}
			<div key='manage-whitelist-section' className='manage-whitelist-section'>
				<div className='manage-whitelist'>
					<Button
						customClass='blox-button'
						title='MANAGE WHITELIST'
						enabled={true}
						onClick={toggleWhiteListOpen}
					/>
				</div>
			</div>
			<div className='info-section'>
				<div className='heading-section-head'>SHARE Configuration</div>
				<Field name='share' value={share.name} />
				<Field name='share ip' value={share.ip_address} />
				<Field name='type' value={share.type} />
				<Field name='accessibility' value={renderAccessibilityString(share)} />
			</div>
			{share.type === 'file' && [
				<Field key='datatable-username' name='username' value={share.username} />,
				<Field key='datatable-share-path' name='share path' value={share.share_path} />,
			]}
			{share.type === 'object' && [
				<Field key='datatable-username' name='access key' value={share.username} />,
				<Field key='datatable-auth-url' name='url' value={share.share_path} />,
				renderApiKey(share, hideApiKey, toggleApiKey),
			]}
			<div className='buttonSpace' />
			<div key='manage-password-section' className='manage-password-section'>
				<Button
					customClass='blox-button'
					title={share.storage_type === 'file' ? 'GET A NEW PASSWORD' : 'GET A NEW SECRET KEY'}
					enabled={true}
					onClick={changeStoragePassword}
				/>
			</div>
			<Field name='primary location' value={share.primary_location} />
			{share.replication && <Field name='secondary location' value={share.secondary_location} />}
		</div>
	);
};

export default DataTable;
