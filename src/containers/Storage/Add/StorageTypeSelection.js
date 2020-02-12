import React from 'react';
const CDN_URL = process.env.REACT_APP_CDN_URL;

const StorageFileIcon = `${CDN_URL}storage/Storage-file-icon-transparent.svg`;
const StorageObjectIcon = `${CDN_URL}storage/Storage-object-icon-transparent.svg`;
const StorageFileSelectedIcon = `${CDN_URL}storage/Storage-file-storage-selection-icon.svg`;
const StorageObjectSelectedIcon = `${CDN_URL}storage/Storage-object-storage-icon-box-selected.svg`;

const StorageTypeSelection = ({ data, onSelect }) => {
	const selected = data.type;

	return (
		<div className='type-selection'>
			<div
				key='storage-type-file-selection'
				className={`type storage-type-file-selection ${selected === 'file' ? 'selected' : ''}`}
			>
				<div className='title form-dropdown-selection'>FILE STORAGE</div>
				<img
					src={selected === 'file' ? StorageFileSelectedIcon : StorageFileIcon}
					onClick={() => onSelect('type', { data: 'file' }, true)}
				/>
			</div>
			<div
				key='storage-type-object-selection'
				className={`type storage-type-object-selection ${selected === 'object' ? 'selected' : ''}`}
			>
				<div className='title form-dropdown-selection'>OBJECT STORAGE</div>
				<img
					src={selected === 'object' ? StorageObjectSelectedIcon : StorageObjectIcon}
					onClick={() => onSelect('type', { data: 'object' }, true)}
				/>
			</div>
		</div>
	);
};

export default StorageTypeSelection;
