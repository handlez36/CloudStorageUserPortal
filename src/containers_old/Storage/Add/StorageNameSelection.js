import React from 'react';

import InputField from '../../../components/Forms/BloxTextInput';
import Button from '../../../components/Common/BloxButton';
import { INPUT_TYPES, storageNameMask } from '../../../components/Common/CommonConstants';

const StorageNameSelection = ({ data: { name }, onSelect }) => {
	return (
		<div className='name-selection-stage'>
			<InputField
				key='share-name-input'
				type={INPUT_TYPES.INPUT}
				label=''
				name={`share_name`}
				value={name}
				onChange={e => onSelect('name', { data: e.target.value, noSubmit: true }, true)}
				active={true}
				mask={storageNameMask}
				hideCheckmark
			/>
			<Button
				title='NEXT'
				enabled={name && name.length > 3}
				onClick={() => onSelect('name', { data: name }, true)}
				customClass='blox-button bright-emerald-gradient'
			/>
		</div>
	);
};

export default StorageNameSelection;
