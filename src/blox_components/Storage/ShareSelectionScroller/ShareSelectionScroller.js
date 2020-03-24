import React, { Component, Fragment } from 'react';

import AddStorage from 'blox_components/Storage/AddStorage/Components/AddStorage';
import Carousel from 'sub_components/Storage/Carousel';
import { StorageApi } from 'services/storage';

class ShareSelectionScroller extends Component {
	state = {
		shares: null,
		// selectedShare: null,
		error: null,
	};

	getSelectedShareDetails = id => {
		if (!id) {
			return null;
		}
		const { shares } = this.props;
		if (shares) {
			const filteredShares = shares.filter(share => share.ml_id === id);
			if (filteredShares && filteredShares[0]) {
				if (this.props.selectedShareCallback) {
					this.props.selectedShareCallback(filteredShares[0]);
				}
				this.setState({ selectedShare: filteredShares[0] });
				window.history.replaceState(
					filteredShares[0],
					'share',
					`/portal/storage/${filteredShares[0].ml_id}`,
				);
			} else {
				return null;
			}
		}

		return null;
	};

	getAllStorages = async () => {
		const { storages: shares, error } = await StorageApi.getAll();
		this.setState({ shares, error });
	};

	componentDidMount() {
		this.getAllStorages();
	}

	render() {
		const { onStorageSelect } = this.props;
		const { shares } = this.state;

		return shares ? (
			<div className='share-selection-scroller'>
				<div className='shares-label'>
					<span className='title grid-item'>SHARES</span>
					{shares && <span className='active-shares'>{`Active Shares: ${shares.length}`}</span>}
				</div>
				<div className='share-options-section'>
					<Carousel data={shares} getSelectedShareDetails={onStorageSelect} />
					<AddStorage history={this.props.history} />
				</div>
			</div>
		) : (
			<div className='loading'>Loading</div>
		);
	}
}

export default ShareSelectionScroller;
