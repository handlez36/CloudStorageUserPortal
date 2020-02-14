import React, { Component } from 'react';
import each from 'lodash/each';
import BillingOverview from '../Billing/OverviewBilling';
import { DIMENSIONS } from '../../services/layoutManager';
import BloxPage from '../../sub_components/Layout/BloxPage';
import ComponentWrapper from '../../sub_components/Layout/ComponentWrapper';
import TicketCount from '../../blox_components/Common/TicketCountRow';
import PortalLayout from '../../sub_components/Layout/PortalLayout';
// import RecentPayment from './RecentPayment';
// import TotalAmountDue from './TotalAmountDue';
// import RecentInvoices from './RecentInvoices';
import { TicketUtils } from './../../services/ticket';
import { RESOLUTIONS } from './../../services/config';

class Overview extends Component {
	render() {
		return <PortalLayout content={BillingOverview} module={'billing'} />;
	}
}

export default Overview;
