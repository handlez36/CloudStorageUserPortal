import React from 'react';

import { DIMENSIONS } from 'services/layoutManager';
import BloxPage from 'sub_components/Layout/BloxPage';
import ComponentWrapper from 'sub_components/Layout/ComponentWrapper';
import { RESOLUTIONS, BREAKPOINT_COLCOUNT_MAP } from 'services/config';
import BillingHistory from 'blox_components/Billing/InvoiceHistory/InvoiceHistory';

const LAYOUT_CONFIG = {
	[RESOLUTIONS.LOW]: {
		invoiceHistory: { x: 0, y: 0, dim: DIMENSIONS.TWO_BY_TEN, customHeight: 100 },
	},
	[RESOLUTIONS.MED]: {
		invoiceHistory: { x: 2.5, y: 0, dim: DIMENSIONS.TWO_BY_EIGHT, customHeight: 112 },
	},
	[RESOLUTIONS.HIGH]: {
		invoiceHistory: { x: 4, y: 0, dim: DIMENSIONS.TWO_BY_SIX, customHeight: 160 },
	},
};

const InvoiceHistoryPage = ({ breakpoint, location }) => {
	const columnCount = BREAKPOINT_COLCOUNT_MAP[breakpoint];

	return (
		<BloxPage
			name='page invoice-history-page'
			layout={LAYOUT_CONFIG[breakpoint]}
			breakpoint={breakpoint}
			location={location}
		>
			<div key={`invoiceHistory-${columnCount}`} className='invoiceHistory'>
				<ComponentWrapper collapseTitle hideBorder>
					<BillingHistory />
				</ComponentWrapper>
			</div>
		</BloxPage>
	);
};

export default InvoiceHistoryPage;
