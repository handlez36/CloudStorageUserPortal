import React from 'react';

const desc = {
	'customer ip':
		'This IP address should be assigned to your router interface connecting to COMPANY.',
	'subnet mask': 'This is the subnet mask for your router interface connecting to COMPANY.',
	'vlan tag':
		'This VLAN Tag is required to route traffic to the CloudStorage Platform and should be configured on your router.',
	share: 'This is the name of your storage share.',
	'share path': 'The network path for mapping to the share.',
	'share ip':
		'This IP address is used to access this specific share. It should be mapped in your DNS or local hosts file to hidden.',
	type: 'Your storage is either File (SMB) or Object (S3), based upon the service you requested.',
	accessibility:
		'Your storage is accessible via Public (secure Internet connection) or Private (a direct connection to COMPANY colocation or other private network).',
	username: 'This is the login required to map to this share.',
	'access key': 'This is the login required to map to this share.',
	url: 'This is the required S3 URL for your storage account.',
	'Secret Key':
		'Key required to access the storage platform when using the S3 API for object storage users.',
	'primary location': 'This is the primary location of where your data is being stored.',
	'secondary location':
		'If you’ve chosen to have your data replicated, this is the location of the secondary copy.',
};

const Field = ({ name, value, hidden, toggle }) => {
	return (
		<div className={`share-detail-field ${name}`}>
			<span className='field-name form-label-float' data-tip={desc[name]}>
				{name}:
			</span>
			{hidden && (
				<span className='field-value body-copy-small-regular click-to-show' onClick={toggle}>
					Click To Show
				</span>
			)}
			{!hidden && toggle && (
				<span className='field-value body-copy-small-regular' onClick={toggle}>
					{value}
				</span>
			)}
			{!hidden && !toggle && <span className='field-value body-copy-small-regular'>{value}</span>}
		</div>
	);
};

export default Field;
