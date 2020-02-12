import React, { Component } from 'react';

import StorageModal from './StorageModal';

export default class StorageInfoPanel extends Component {
	render() {
		return (
			<div>
				<h6>{this.props.storage.name}</h6>
				<div className='storage-field'>
					<span className='storage-name form-label-float'>Primary Location: </span>
					<span className='storage-value body-copy-small-regular'>
						{this.props.storage.secondary_location}
					</span>
				</div>
				{this.props.storage.replication && (
					<div className='storage-field'>
						<span className='storage-name form-label-float'>Secondary Location: </span>
						<span className='storage-value body-copy-small-regular'>
							{this.props.storage.secondary_location}
						</span>
					</div>
				)}
				<div className='storage-field'>
					<span className='storage-name form-label-float'>Type: </span>
					<span className='storage-value body-copy-small-regular'>
						{this.props.storage.type}
					</span>
				</div>
				<div className='storage-field'>
					<span className='storage-name form-label-float'>Share IP : </span>
					<span className='storage-value body-copy-small-regular'>
						{this.props.storage.ip_address}
					</span>
				</div>
				<div className='storage-field'>
					<span className='storage-name form-label-float'>Status: </span>
					<span className='storage-value body-copy-small-regular'>{this.props.storage.status}</span>
				</div>
				<div className='storage-field'>
					<span className='storage-name form-label-float'>Username: </span>
					<span className='storage-value body-copy-small-regular'>
						{this.props.storage.username}
					</span>
				</div>
				<div className='storage-field'>
					<span className='storage-name form-label-float'>Path: </span>
					<span className='storage-value body-copy-small-regular'>{this.props.storage.share_path}</span>
				</div>
				<div className='btn storage-delete-btn'>
					<StorageModal
						unloadSupportColumn={this.props.unloadSupportColumn}
						grabStorageInfo={this.props.grabStorageInfo}
						id={this.props.id}
						storage={this.props.storage}
					/>
				</div>
			</div>
		);
	}
}
