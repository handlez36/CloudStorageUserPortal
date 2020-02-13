import React, { Component } from 'react';
import { connect } from 'react-redux';

import ShareDetails from './View/ShareDetails';
import { MENU } from './StorageConstants';
import { updatePage } from '../../actions/siteTracking';
import { SITE_PAGES } from '../../components/Common/CommonConstants';
const CDN_URL = process.env.REACT_APP_CDN_URL;
const FileStorageIcon = `${CDN_URL}storage/FileStorageIcon_Default.svg`;
const ObjectStorageIcon = `${CDN_URL}storage/ObjectStorageIcon_default.svg`;

class StorageView extends Component {
	onClick = share => {
		const { loadSupportColumn } = this.props;
		const params = { id: share.ml_id };
		loadSupportColumn(ShareDetails, params);
	};

	renderShares = () => {
		const shares = this.props.storages;
		return shares.map(share => {
			return (
				<div key={share.ml_id} className='share'>
					<div className='share-box' onClick={() => this.onClick(share)}>
						<img
							src={share.storageType === 'file' ? FileStorageIcon : ObjectStorageIcon}
							alt='share'
						/>
					</div>
					<div className='share-title callout-sm'>{share.name}</div>
				</div>
			);
		});
	};

	isLoading() {
		const { error, storages } = this.props;
		return !error && !storages;
	}

	componentDidMount() {
		const { updatePage } = this.props;
		updatePage(SITE_PAGES.STORAGE[MENU.VIEW_STORAGE]);
	}

	render() {
		return (
			<div className='outer-wrapper storage-view'>
				{this.props.error && <div className='storage-error'>Error loading storage details</div>}
				{this.isLoading() && <div className='storage-loading'>Loading...</div>}
				{this.props.storages && this.renderShares()}
			</div>
		);
	}
}

export default connect(
	null,
	{ updatePage },
)(StorageView);
