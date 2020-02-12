import React, { Component, Fragment } from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import { withRouter } from 'react-router-dom';
import { Responsive, WidthProvider } from 'react-grid-layout';

import { LAYOUT_GRID } from '../BillingConstants';
import HorizontalGrid from '../../../components/Layout/HorizontalGrid';
import VerticalGrid from '../../../components/Layout/VerticalGrid';
import RecentPayment from './RecentPayment';
import RecentInvoices from './RecentInvoices';
import TicketCountRow from '../../Support/TicketCountRow';
import { TicketApi } from '../../../services/ticket';
import { BillingApi } from '../../../services/billing';
import { Utils } from '../../../services/utils';
import InvoiceAmountDueOverview from '../../../components/Billing/InvoiceAmountDueOverview';
const CDN_URL = process.env.REACT_APP_CDN_URL;
const BillingTicketBackground = `${CDN_URL}billing/open-donut.svg`;
/** TODO: Apply BloxGrid */
const ResponsiveReactGridLayout = WidthProvider(Responsive);

class Overview extends Component {
	constructor(props) {
		super(props);
		this.myObserver = null;
		this.billingApi = new BillingApi();
		this.state = {
			rowHeight: 0,
			margin: [],
			containerPadding: [],
			layout: [],
			storageDetails: null,
			storageErr: null,
			includeDebugGridLines: false,
			payments: null,
			dollarAmount: null,
			centAmount: null,
			date: null,
			showRecentPayment: false,
			screenSize: window.innerWidth,
		};
	}

	onBreakpointChange = breakpoint => {
		let margin;
		let containerPadding;
		switch (breakpoint) {
			case 'xs':
				margin = [20, 0];
				containerPadding = [30, 0];
				break;
			case 'sm':
				margin = [20, 0];
				containerPadding = [30, 0];
				break;
			case 'md':
				margin = [22, 0];
				containerPadding = [30, 0];
				break;
			case 'lg':
				margin = [32, 0];
				containerPadding = [66, 0];
				break;
			default:
				margin = [22, 0];
				containerPadding = [30, 0];
				break;
		}

		const horizontalRule = document.querySelector('.gray-horizontal-bar');
		horizontalRule.setAttribute('style', `margin-left: ${-containerPadding[0]}px`);

		this.setState({ margin, containerPadding });
	};

	filterTickets(response) {
		const {
			data: { tickets },
		} = response;

		const open = tickets.filter(ticket => ticket.status !== 'Solved' && ticket.type === 'Billing');

		const closed = tickets.filter(
			ticket => ticket.status === 'Solved' && ticket.type === 'Billing',
		);

		return { open, closed };
	}

	getTickets = () => {
		TicketApi.getAll()
			.then(response => {
				const validResponse = response.status === 200 && response.data && response.data.tickets;

				if (validResponse) {
					const { open, closed } = this.filterTickets(response);
					this.setState({
						openCount: open.length,
						closeCount: closed.length,
						totalCount: open.length + closed.length,
					});
				} else {
					this.setState({ error: 'Error pulling billing ticket details' });
				}
			})
			.catch(error => this.setState({ error }));
	};

	getRecentPayment = () => {
		this.billingApi
			.getPayments(3)
			.then(response => {
				const validResponse =
					response.status === 200 && response.data && response.data.transactions.length > 0;
				if (validResponse) {
					const priceArray = Utils.formatCurrency(response.data.transactions[0].arDebit).split('.');
					this.setState({
						payments: response.data.transactions,
						dollarAmount: priceArray[0],
						centAmount: priceArray[1],
						date: Utils.formatDate(response.data.transactions[0].effectiveTimestamp),
						showRecentPayment: true,
					});
				} else {
					this.setState({ showRecentPayment: false });
				}
			})
			.catch(error => this.setState({ error }));
	};

	componentDidMount() {
		this.onBreakpointChange();
		this.getTickets();
		this.getRecentPayment();
		this.myObserver = new ResizeObserver(entries => {
			entries.forEach(() => {
				this.onChange();
			});
		});

		const wrapperElement = document.querySelector('.layout');
		this.myObserver.observe(wrapperElement);
	}

	componentWillUnmount() {
		this.myObserver.disconnect();
	}

	onChange = () => {
		let height = window.innerHeight / 56;

		if (window.innerHeight >= 1010 && window.innerHeight <= 1030) {
			height = 18;
		} else if (window.innerHeight >= 1400 && window.innerHeight <= 1500) {
			height = 27;
		}

		if (window.innerHeight <= 660) {
			height = 11;
		}

		this.setState({
			rowHeight: height,
		});
	};

	goToTicketHistory = ticketType => {
		this.props.history.push({
			pathname: '/portal/support',
			state: { ticketType, selected: 'Billing' },
		});
	};

	render() {
		const {
			containerPadding,
			margin,
			rowHeight,
			includeDebugGridLines,
			openCount,
			totalCount,
			closeCount,
			date,
			dollarAmount,
			centAmount,
			showRecentPayment,
		} = this.state;
		const { data, callback, eligibleForOnlinePayment } = this.props;

		return (
			<div className='billing-overview-page'>
				{includeDebugGridLines && (
					<Fragment>
						<HorizontalGrid />
						<VerticalGrid />
					</Fragment>
				)}
				<ResponsiveReactGridLayout
					layouts={{
						lg: LAYOUT_GRID.lg,
						md: LAYOUT_GRID.md,
						sm: LAYOUT_GRID.sm,
						xs: LAYOUT_GRID.xs,
					}}
					measureBeforeMount={false}
					className='layout'
					rowHeight={rowHeight}
					isDraggable={false}
					breakpoints={{ lg: 1450, md: 930, sm: 640, xs: 400 }}
					cols={{ lg: 12, md: 12, sm: 12, xs: 12 }}
					containerPadding={containerPadding}
					onBreakpointChange={this.onBreakpointChange}
					margin={margin}
					onLayoutChange={this.onLayoutChange}
					onWidthChange={this.onWidthChange}
				>
					<span key='total-amount-due-label' className='total-amount-due-label'>
						<span className='title grid-item'>TOTAL Amount Due</span>
					</span>
					<span key='ticket-status-label' className='ticket-status-label'>
						{totalCount !== 0 && <span className='title grid-item'>TICKET Status</span>}
					</span>
					<div key='total-amount-due' className='total-amount-due'>
						<InvoiceAmountDueOverview
							page={'overview'}
							callback={callback}
							eligibleForOnlinePayment={eligibleForOnlinePayment}
						/>
					</div>
					<div key='open-ticket' className='ticket-status'>
						<div className='billing-ticket'>
							{totalCount !== 0 && (
								<TicketCountRow
									openCount={openCount}
									closeCount={closeCount}
									totalCount={totalCount}
									type='open'
									customImage={BillingTicketBackground}
									strokeColor={'#a8ad00'}
									goToTicketHistory={this.goToTicketHistory}
								/>
							)}
						</div>
					</div>
					<div key='close-ticket' className='ticket-status'>
						<div className='billing-ticket'>
							{totalCount !== 0 && (
								<TicketCountRow
									openCount={openCount}
									closeCount={closeCount}
									totalCount={totalCount}
									type='closed'
									customImage={BillingTicketBackground}
									strokeColor={'#a8ad00'}
									goToTicketHistory={this.goToTicketHistory}
								/>
							)}
						</div>
					</div>
					<div key='recent-invoices' className='recent-invoices'>
						<RecentInvoices data={data} callback={callback} />
					</div>
					<div key='horizontal-bar' className='gray-horizontal-bar' />
					<span key='recent-invoice-label' className='recent-invoice-label'>
						<span className='title grid-item'>RECENT Invoices</span>
					</span>
					<div key='recent-payment' className='recent-payment'>
						{showRecentPayment && (
							<RecentPayment dollarAmount={dollarAmount} centAmount={centAmount} date={date} />
						)}
					</div>
					<span key='recent-payment-label' className='recent-payment-label'>
						{showRecentPayment && <span className='title grid-item'>RECENT Payment</span>}
					</span>
				</ResponsiveReactGridLayout>
			</div>
		);
	}
}

export default withRouter(Overview);
