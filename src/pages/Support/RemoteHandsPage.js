import React, { Component } from 'react';

import { DIMENSIONS } from 'services/layoutManager';
import BloxPage from 'sub_components/Layout/BloxPage';
import ComponentWrapper from 'sub_components/Layout/ComponentWrapper';
import { RESOLUTIONS, BREAKPOINT_COLCOUNT_MAP } from 'services/config';
import RemoteHands from '../../blox_components/Support/RemoteHands/RemoteHandsRequest';

const LAYOUT_CONFIG = {
	[RESOLUTIONS.LOW]: {
		remoteHands: { x: 3, y: 0, dim: DIMENSIONS.TWO_BY_TEN, customHeight: 50 },
	},
	[RESOLUTIONS.MED]: {
		remoteHands: { x: 4, y: 0, dim: DIMENSIONS.TWO_BY_EIGHT, customHeight: 50 },
	},
	[RESOLUTIONS.HIGH]: {
		remoteHands: { x: 5, y: 0, dim: DIMENSIONS.TWO_BY_SIX, customHeight: 50 },
	},
};

class RemoteHandsPage extends Component {
	render() {
		const { breakpoint, location, match, history } = this.props;
		const columnCount = BREAKPOINT_COLCOUNT_MAP[breakpoint];
		return (
			<BloxPage
				name='page support-remote-hands-page'
				layout={LAYOUT_CONFIG[breakpoint]}
				breakpoint={breakpoint}
				location={location}
			>
				<div key={`remoteHands-${columnCount}`} className='remoteHands'>
					<ComponentWrapper hideTitle hideBorder>
						<RemoteHands match={match} history={history} />
					</ComponentWrapper>
				</div>
			</BloxPage>
		);
	}
}

export default RemoteHandsPage;
