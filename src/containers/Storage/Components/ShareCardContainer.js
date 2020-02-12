import React, { Component } from 'react';
import { Decimal } from 'decimal.js';
import FrontSide from './FrontSide';
import BackSide from './BackSide';

const SIDES = {
	FRONT: 'front',
	BACK: 'back',
};

class ShareCardContainer extends Component {
	state = {
		side: SIDES.FRONT,
		shares: null,
		selectedShare: null,
		error: null,
		scrollTop: 0,
		total: 0,
		size: '',
	};

	flipCard = (shareId = null) => {
		const { side: flippingFrom } = this.state;
		const { stats } = this.props;
		const share = this.getSelectedShareDetails(shareId);

		if (stats && share) {
			this.getTotalUsedStorage(stats, share.type);
		}

		this.setState({
			side: flippingFrom === SIDES.FRONT ? SIDES.BACK : SIDES.FRONT,
			selectedShare: share,
		});
	};

	onScroll = scrollTop => {
		this.setState({ scrollTop });
	};

	getSelectedShareDetails = id => {
		if (!id) {
			return null;
		}
		const { shares } = this.props;
		if (shares) {
			const filteredShares = shares.filter(share => share.ml_id === id);
			if (filteredShares && filteredShares[0]) {
				return filteredShares[0];
			} else {
				return null;
			}
		}

		return null;
	};
	getTotalUsedStorage = (stats, storageType) => {
		let data;
		if (storageType === 'file') {
			data = stats.file;
		} else {
			data = stats.object;
		}

		const rawTotalUsed = data.reduce((sum, bar) => (sum += bar.sizeMB), 0);
		let totalUsed = new Decimal(rawTotalUsed);
		let size;
		if (rawTotalUsed < 1000) {
			size = 'MB';
		} else if (rawTotalUsed < 1000000) {
			totalUsed = totalUsed.dividedBy(1000);
			size = 'GB';
		} else if (rawTotalUsed < 1000000000) {
			totalUsed = totalUsed.dividedBy(1000000);
			size = 'TB';
		} else {
			totalUsed = totalUsed.dividedBy(1000000000);
			size = 'PB';
		}
		console.log('total used', totalUsed.toNumber());

		this.setState({ total: totalUsed.toNumber(), size });
	};

	componentDidMount() {
		/** Needed for Firefox. For some reason it retains scrollTop values after a browser refresh */
		const isFirefox = typeof InstallTrigger !== 'undefined';
		if (isFirefox) {
			setTimeout(() => {
				this.setState({ scrollTop: 0 });
			}, 200);
		}
	}

	render() {
		const { side, selectedShare, scrollTop, total, size } = this.state;
		const {
			stats,
			shares,
			viewShare,
			objectCommitment,
			fileCommitment,
			selectMenuItem,
		} = this.props;

		return (
			<div className={`shares-card-container ${side}`}>
				{side === SIDES.FRONT && (
					<FrontSide
						onFlip={this.flipCard}
						shares={shares}
						selectMenuItem={selectMenuItem}
						scrollTop={scrollTop}
						onScroll={this.onScroll}
					/>
				)}
				{side === SIDES.BACK && selectedShare && (
					<BackSide
						total={total}
						onFlip={this.flipCard}
						share={selectedShare}
						stats={stats}
						viewShare={viewShare}
						size={size}
						changeToManageStorage={this.props.changeToManageStorage}
					/>
				)}
			</div>
		);
	}
}

export default ShareCardContainer;
