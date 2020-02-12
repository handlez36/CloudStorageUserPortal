import React, { Component } from 'react';
const CDN_URL = process.env.REACT_APP_CDN_URL;
const AddStorageIcon = `${CDN_URL}storage/icon-add-storage-overview.svg`;
const SelectedAddStorageIcon = `${CDN_URL}storage/icon-add-storage-selected.svg`;

class AddStorage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			display: 'true',
		};
	}
	goToAddStorage = () => {
		this.props.selectMenuItem('ADD STORAGE');
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
				className='add-storage-container'
				onMouseOver={this.onMouseOver}
				onMouseOut={this.onMouseOut}
				onClick={this.goToAddStorage}
			>
				<div className='storage-image'>
					<img id='add-storage' src={AddStorageIcon} />
				</div>
			</div>
		);
	}
}
export default AddStorage;
