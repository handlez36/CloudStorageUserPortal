import React from 'react';

import { DIMENSIONS } from 'services/layoutManager';
import MakeAPayment from 'COMPANY_components/Billing/MakeAPayment/MakeAPayment';
import COMPANYPage from 'sub_components/Layout/COMPANYPage';
import ComponentWrapper from 'sub_components/Layout/ComponentWrapper';
import { RESOLUTIONS, BREAKPOINT_COLCOUNT_MAP } from 'services/config';

const LAYOUT_CONFIG = {
	[RESOLUTIONS.LOW]: {
		makeAPayment: { x: 4, y: 0, dim: DIMENSIONS.TWO_BY_TEN, customHeight: 80 },
	},
	[RESOLUTIONS.MED]: {
		makeAPayment: { x: 4, y: 0, dim: DIMENSIONS.TWO_BY_EIGHT },
	},
	[RESOLUTIONS.HIGH]: {
		makeAPayment: { x: 4, y: 0, dim: DIMENSIONS.TWO_BY_SIX },
	},
};

const MakeAPaymentPage = ({ breakpoint, location }) => {
	const columnCount = BREAKPOINT_COLCOUNT_MAP[breakpoint];
	return (
		<COMPANYPage
			name='page make-a-payment'
			layout={LAYOUT_CONFIG[breakpoint]}
			breakpoint={breakpoint}
			location={location}
		>
			<div key={`makeAPayment-${columnCount}`} className='makeAPayment'>
				<ComponentWrapper collapseTitle hideBorder>
					<MakeAPayment />
				</ComponentWrapper>
			</div>
		</COMPANYPage>
	);
};

export default MakeAPaymentPage;
