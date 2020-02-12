import React from 'react';
const CDN_URL = process.env.REACT_APP_CDN_URL;

const RedundantDefault = `${CDN_URL}storage/Storage-redundancy-default.svg`;
const RedundantSelected = `${CDN_URL}storage/Storage-redundancy-selected.svg`;
const NoRedundantDefault = `${CDN_URL}storage/Storage-no-redundancy-default.svg`;
const NoRedundantSelected = `${CDN_URL}storage/Storage-no-redundancy-selected.svg`;

function isRedundant(selected) {
	return selected;
}

function isNotRedundant(selected) {
	return selected !== undefined && !selected;
}

const StorageRedundancySelection = ({ data, onSelect }) => {
	const selected = data.redundant;

	const redundantIcon = isRedundant(selected) ? RedundantSelected : RedundantDefault;
	const notRedundantIcon = isNotRedundant(selected) ? NoRedundantSelected : NoRedundantDefault;

	return (
		<div className='redundant-selection-stage'>
			<div className={`redundant-selection redundant ${selected ? 'selected' : ''}`}>
				<div className='title redundant'>REDUNDANT</div>
				<img src={redundantIcon} onClick={() => onSelect('redundant', { data: true }, true)} />
			</div>
			<div
				className={`redundant-selection not-redundant ${
					!selected && selected !== undefined ? 'selected' : ''
				}`}
			>
				<div className='title non-redundant'>NON-REDUNDANT</div>
				<img src={notRedundantIcon} onClick={() => onSelect('redundant', { data: false }, true)} />
			</div>
		</div>
	);
};

export default StorageRedundancySelection;
