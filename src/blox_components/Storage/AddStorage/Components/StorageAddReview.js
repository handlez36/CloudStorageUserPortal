import React from 'react';

import Radio from 'components_old/Common/Radio';
import Button from 'sub_components/Common/COMPANYButton';
import { StorageApi } from 'services/storage';
import { Utils } from 'services/utils';
import * as StorageUtils from 'utils/StorageUtils';
import WhiteListContainer from './WhiteListContainer';

let REQUEST_SUBMITTED = false;

function disableSubmitButton() {
	REQUEST_SUBMITTED = true;
	const submitButton = document.querySelector('.COMPANY-button');
	if (submitButton) {
		submitButton.classList.add('disabled');
	}
}

function enableSubmitButton() {
	REQUEST_SUBMITTED = false;
	const submitButton = document.querySelector('.COMPANY-button');
	if (submitButton) {
		submitButton.classList.remove('disabled');
	}
}

async function submitStorageRequest(data, completeAdd, refreshStorageInfo) {
	if (!REQUEST_SUBMITTED) {
		disableSubmitButton();
		const params = StorageUtils.formatStorageAddParams(data);
		try {
			const response = await StorageApi.addStorage(params);
			console.log('RESPONSE', response);
			console.log('valid', Utils.isValidResponse(response));
			if (Utils.isValidResponse(response)) {
				completeAdd(true, false);
			} else if (response.data.hasNamingError) {
				console.log('Storage has naming error');
				completeAdd(false, true, data.name);
			} else {
				console.log('Error creating storage');
				completeAdd(false, false);
			}
			enableSubmitButton();
		} catch (e) {
			console.log('Network error creating storage');
			completeAdd(false);
			enableSubmitButton();
		}
	}
}

function checkValid(data) {
	let allDataValid = true;

	/** Ensure primary, secondary and redundant settings are valid */
	if (data.redundant) {
		if (data.secondary) {
			allDataValid = true;
		} else {
			allDataValid = false;
		}
	}

	const formattedWhitelist = data.whitelist.ips
		? data.whitelist.ips.map(wl => {
				return /\/$/.test(wl) ? `${wl}32` : wl;
		  })
		: [];
	console.log('All IPs valid: ', Utils.checkListOfIps(formattedWhitelist));
	/** Ensure whitelist is populated with at least one entry */
	allDataValid =
		allDataValid && data.whitelist.ips.length > 0 && Utils.checkListOfIps(formattedWhitelist);

	return allDataValid;
}

const StorageAddReview = ({ data, update, completeAdd, refreshStorageInfo }) => {
	const { type, public: isPublic, primary, redundant, secondary, whitelist } = data;
	const typeOptions = [{ value: 'file', name: 'File' }, { value: 'object', name: 'Object' }];
	const accessibilityOptions = [
		{ value: 'Private', name: 'Private' },
		{ value: 'Public', name: 'Public' },
	];
	const primaryLocationOptions = [
		{ value: 'Atlanta', name: 'Atlanta' },
		//{ value: 'Birmingham', name: 'Birmingham' },
		{ value: 'Chattanooga', name: 'Chattanooga' },
		{ value: 'Huntsville', name: 'Huntsville' },
	];
	const redundancyOptions = [{ value: 'Yes', name: 'Yes' }, { value: 'No', name: 'No' }];
	const secondaryLocationOptions = primaryLocationOptions.filter(
		option => primary && option.name !== primary,
	);

	return (
		<div className='storage-add-review'>
			<div className='review-data-section'>
				<div className='share-details-pane'>
					<div className='label heading-section-head'>SHARE Details</div>
					<div className='data-section'>
						<div className='left-side'>
							{/* <div className='storage-settings-pane storage-type'>
								<div className='label status-status-head'>STORAGE TYPE</div>
								<div className='storage-type-review'>
									<Radio
										callback={e => update('type', e)}
										name='type'
										value={type}
										hidden={false}
										toggle={true}
										options={typeOptions}
									/>
								</div>
							</div> */}
							<div className='storage-settings-pane storage-accessiblility'>
								<div className='label status-status-head'>ACCESS TYPE</div>
								<div className='storage-accessibility-review'>
									<Radio
										callback={e => update('public', e === 'Public')}
										name='accessibility'
										value={isPublic !== undefined && !isPublic ? 'Private' : 'Public'}
										hidden={false}
										toggle={true}
										options={accessibilityOptions}
									/>
								</div>
							</div>
						</div>
						<div className='right-side'>
							<div className='storage-settings-pane storage-primary-location'>
								<div className='label status-status-head'>PRIMARY LOCATION</div>
								<div className='storage-primary-location-review'>
									<Radio
										callback={e => update('primary', e)}
										name='primary'
										value={primary}
										hidden={false}
										toggle={true}
										options={primaryLocationOptions}
									/>
								</div>
							</div>
							<div className='storage-settings-pane storage-redundancy'>
								<div className='label status-status-head'>REDUNDANCY</div>
								<div className='storage-redundancy-review'>
									<Radio
										callback={e => update('redundant', e === 'Yes' ? true : false)}
										name='redundant'
										value={redundant !== undefined && !redundant ? 'No' : 'Yes'}
										hidden={false}
										toggle={true}
										options={redundancyOptions}
									/>
								</div>
							</div>
							<div className='storage-settings-pane storage-secondary-location'>
								<div className='label status-status-head'>SECONDARY LOCATION</div>
								<div className='storage-secondary-location-review'>
									<Radio
										callback={e => update('secondary', e)}
										name='secondary'
										value={secondary}
										hidden={false}
										toggle={true}
										options={secondaryLocationOptions}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className='share-whitelist-pane'>
					<div className='label heading-section-head'>WHITELIST Details</div>
					<div className='storage-whitelist-review'>
						<div className='white-list-scroll-container'>
							<WhiteListContainer ips={whitelist} update={update} phase='REVIEW' />
						</div>
					</div>
				</div>
			</div>
			<Button
				title='SUBMIT'
				onClick={() => submitStorageRequest(data, completeAdd, refreshStorageInfo)}
				enabled={checkValid(data)}
				customClass={`COMPANY-button ${
					REQUEST_SUBMITTED ? 'disabled' : ''
				} bright-emerald-gradient`}
			/>
		</div>
	);
};

export default StorageAddReview;
