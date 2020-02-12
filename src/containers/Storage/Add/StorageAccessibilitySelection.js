import React from 'react';

const CDN_URL = process.env.REACT_APP_CDN_URL;

const PublicIconDefault = `${CDN_URL}storage/Storage-public-icon-default.svg`;
const PublicIconHover = `${CDN_URL}storage/Storage-public-icon-hover.svg`;
const PublicIconSelected = `${CDN_URL}storage/Storage-public-icon-selected.svg`;
const PrivateIconDefault = `${CDN_URL}storage/Storage-private-icon-default.svg`;
const PrivateIconHover = `${CDN_URL}storage/Storage-private-icon-hover.svg`;
const PrivateIconSelected = `${CDN_URL}storage/Storage-private-icon-selected.svg`;

function isPublicSelected(selected) {
	return selected;
}

function isPrivateSelected(selected) {
	return selected !== undefined && !selected;
}

const StoragePublicPrivateSelection = ({ data, onSelect }) => {
	const selected = data.public;
	const publicIcon = isPublicSelected(selected) ? PublicIconSelected : PublicIconDefault;
	const privateIcon = isPrivateSelected(selected) ? PrivateIconSelected : PrivateIconDefault;

	return (
		<div className='accessibility-selection-stage'>
			<div className={`accessibility-selection private`}>
				<div className='form-dropdown-selection'>PRIVATE</div>
				<img
					src={privateIcon}
					onMouseEnter={e =>
						(e.currentTarget.src = isPrivateSelected(selected) ? privateIcon : PrivateIconHover)
					}
					onMouseLeave={e => (e.currentTarget.src = privateIcon)}
					onClick={() => onSelect('public', { data: false }, true)}
				/>
			</div>
			<div className={`accessibility-selection public`}>
				<div className='form-dropdown-selection'>PUBLIC</div>
				<img
					src={publicIcon}
					onMouseEnter={e =>
						(e.currentTarget.src = isPublicSelected(selected) ? publicIcon : PublicIconHover)
					}
					onMouseLeave={e => (e.currentTarget.src = publicIcon)}
					onClick={() => onSelect('public', { data: true }, true)}
				/>
			</div>
		</div>
	);
};

export default StoragePublicPrivateSelection;
