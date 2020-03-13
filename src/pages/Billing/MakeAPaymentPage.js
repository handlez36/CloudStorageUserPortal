import React from 'react';

import { DIMENSIONS } from 'services/layoutManager';
import MakeAPayment from 'blox_components/Billing/MakeAPayment/MakeAPayment';
import BloxPage from 'sub_components/Layout/BloxPage';
import ComponentWrapper from 'sub_components/Layout/ComponentWrapper';
import { RESOLUTIONS } from 'services/config';

const LAYOUT_CONFIG = {
	[RESOLUTIONS.LOW]: {
		makeAPayment: { x: 2, y: 1, dim: DIMENSIONS.TWO_BY_TEN, customHeight: 100 },
	},
	[RESOLUTIONS.MED]: {
		makeAPayment: { x: 2, y: 0, dim: DIMENSIONS.TWO_BY_EIGHT, customHeight: 112 },
	},
	[RESOLUTIONS.HIGH]: {
		makeAPayment: { x: 2, y: 0, dim: DIMENSIONS.TWO_BY_SIX, customHeight: 160 },
	},
};

const MakeAPaymentPage = ({ breakpoint, location }) => {
	console.log('LAYOUT: ', LAYOUT_CONFIG[breakpoint]);

	return (
		<BloxPage
			name='page make-a-payment'
			layout={LAYOUT_CONFIG[breakpoint]}
			breakpoint={breakpoint}
			location={location}
		>
			<div key='makeAPayment' className='makeAPayment'>
				<ComponentWrapper collapseTitle hideBorder>
					<MakeAPayment />
				</ComponentWrapper>
			</div>
		</BloxPage>
	);
};

export default MakeAPaymentPage;
