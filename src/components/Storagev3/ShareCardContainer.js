import React, { Component } from 'react';

import FrontSide from '../../containers/Storage/Components/FrontSide';
import BackSide from '../../containers/Storage/Components/BackSide';

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
	};

	flipCard = (shareId = null) => {
		const { side: flippingFrom } = this.state;
		const share = this.getSelectedShareDetails(shareId);

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
		const { side, selectedShare, scrollTop } = this.state;
		const {
			stats,
			shares,
			viewShare,
			objectCommitment,
			fileCommitment,
			selectMenuItem,
		} = this.props;
		let total = 0;
		if (selectedShare) {
			total = selectedShare.type === 'file' ? fileCommitment : objectCommitment;
		}
		return (
			<div className={`shares-card-container v3 ${side}`}>
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
						changeToManageStorage={this.props.changeToManageStorage}
					/>
				)}
			</div>
		);
	}
}

export default ShareCardContainer;
