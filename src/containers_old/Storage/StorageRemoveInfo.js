import React from 'react';
import StorageInfo from './StorageInfo';

function StorageRemoveInfo({ storage }) {
	return <div>{storage && <StorageInfo storage={storage} />}</div>;
}
export default StorageRemoveInfo;
