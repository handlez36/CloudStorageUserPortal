import React, { Component } from 'react';

import { DIMENSIONS } from 'services/layoutManager';
import BloxPage from 'sub_components/Layout/BloxPage';
import ComponentWrapper from 'sub_components/Layout/ComponentWrapper';
import { RESOLUTIONS } from 'services/config';
import RemoteHands from '../../blox_components/Support/RemoteHands/RemoteHandsRequest';

const LAYOUT_CONFIG = {
	[RESOLUTIONS.LOW]: {
		remoteHands: { x: 0, y: 0, dim: DIMENSIONS.TWO_BY_TEN, customHeight: 50 },
	},
	[RESOLUTIONS.MED]: {
		remoteHands: { x: 0, y: 0, dim: DIMENSIONS.TWO_BY_EIGHT, customHeight: 50 },
	},
	[RESOLUTIONS.HIGH]: {
		remoteHands: { x: 0, y: 0, dim: DIMENSIONS.TWO_BY_SIX, customHeight: 50 },
	},
};

class RemoteHandsPage extends Component {
	render() {
		const { breakpoint, location, match, history } = this.props;

		return (
			<BloxPage
				name='page support-remote-hands-page'
				layout={LAYOUT_CONFIG[breakpoint]}
				breakpoint={breakpoint}
				location={location}
			>
				<div key='remoteHands' className='remoteHands'>
					<ComponentWrapper hideTitle hideBorder>
						<RemoteHands match={match} history={history} />
					</ComponentWrapper>
				</div>
			</BloxPage>
		);
	}
}

export default RemoteHandsPage;
