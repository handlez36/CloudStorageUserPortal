import React, { Component } from 'react';

const CDN_URL = process.env.REACT_APP_CDN_URL;
const AddStorageIcon = `${CDN_URL}storage/icon-add-storage-overview.svg`;
const SelectedAddStorageIcon = `${CDN_URL}storage/icon-add-storage-selected.svg`;

class AddStorage extends Component {
	state = {
		display: 'true',
	};

	goToAddStorage = () => {
		const { history } = this.props;
		history.push('/portal/storage/add_storage');
	};

	onMouseOver = () => {
		document.getElementById('add-storage').src = SelectedAddStorageIcon;
	};

	onMouseOut = () => {
		document.getElementById('add-storage').src = AddStorageIcon;
	};

	render() {
		return (
			<div
				className='add-storage'
				onMouseOver={this.onMouseOver}
				onMouseOut={this.onMouseOut}
				onClick={this.goToAddStorage}
			>
				<div className='storage-image'>
					<img id='add-storage' src={AddStorageIcon} />
				</div>
				<div className='storage-label header50'>ADD STORAGE</div>
			</div>
		);
	}
}
export default AddStorage;
