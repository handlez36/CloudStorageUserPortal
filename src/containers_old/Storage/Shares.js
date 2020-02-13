import React, { Component, Fragment } from 'react';

import Carousel from '../../components/Common/Carousel';

class Shares extends Component {
	state = {
		shares: null,
		selectedShare: null,
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

	render() {
		const { shares } = this.props;

		return (
			<Fragment>
				<Carousel data={shares} getSelectedShareDetails={this.getSelectedShareDetails} />
			</Fragment>
		);
	}
}

export default Shares;
