import React, { Component } from 'react';
import StorageInfoPanel from './StorageInfoPanel';

export default class StorageInfo extends Component {
	constructor(props) {
		super(props);

		this.state = {
			display: 'true',
		};
	}

	/**
	 * Display storage information based on storage selected
	 */
	displayStorage() {
		let storage = this.props.supportParams.storage;
		return (
			<div>
				{this.state.display === 'true' && (
					<StorageInfoPanel
						grabStorageInfo={this.props.grabStorageInfo}
						unloadSupportColumn={this.props.unloadSupportColumn}
						id={storage.id}
						storage={storage}
					/>
				)}
			</div>
		);
	}

	render() {
		return <div className='storage-outer-wrapper'>{this.displayStorage()}</div>;
	}
}
