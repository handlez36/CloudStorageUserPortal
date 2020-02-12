import React, { Component, Fragment } from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import TicketCountRow from '../Support/TicketCountRow';
import TicketType from '../Support/TicketCreate/NewTicketType';
import LargeCard from '../../components/Common/LargeCard';
import Button from '../../components/Common/BloxButton';
import { Responsive, WidthProvider } from 'react-grid-layout';
const CDN_URL = process.env.REACT_APP_CDN_URL;
const remoteHands = `${CDN_URL}common/remote-hands-icon-test.svg`;
const guestAccess = `${CDN_URL}common/guest-access-icon.svg`;

const ResponsiveReactGridLayout = WidthProvider(Responsive);
class SelectionScreen extends Component {
	constructor(props) {
		super(props);
		this.myObserver = null;
		this.state = { rowHeight: 0, margin: [], containerPadding: [], layout: [] };
	}

	setTicketAttribute = ticketType => {
		const { makeScreenSelection } = this.props;
		makeScreenSelection('CUSTOM TICKET', { ticketType });
	};

	startTicketWizard = type => {
		const { makeScreenSelection } = this.props;
		makeScreenSelection(type);
	};
	onBreakpointChange = breakpoint => {
		let margin;
		let containerPadding;
		console.log(breakpoint);
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
	componentDidMount() {
		this.onBreakpointChange();
		this.myObserver = new ResizeObserver((entries, observer) => {
			entries.forEach(entry => {
				this.onChange();
			});
		});

		const wrapperElement = document.querySelector('.layout');

		this.myObserver.observe(wrapperElement);
	}

	componentWillUnmount() {
		this.myObserver.disconnect();
	}

	onLayoutChange = layout => {
		// console.log(layout);
		// let layout2 = JSON.stringify(layout);
		// console.log(layout2);
	};
	onChange = () => {
		let height = window.innerHeight / 53;

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

	render() {
		const layoutLarge = [
			{ i: 'open-count', x: 1, y: 4, w: 2, h: 6, static: true },
			{ i: 'close-count', x: 3, y: 4, w: 2, h: 6, static: true },
			{ i: 'ticket-status', x: 1, y: 1, w: 3, h: 1.2, static: true },
			{ i: 'remote-hands', x: 6, y: 14, w: 3, h: 12, maxW: 3, minH: 10, static: true },
			{ i: 'guest-access', x: 6, y: 27, w: 3, h: 12, maxW: 3, static: true },
			{ i: 'issue-request', x: 1, y: 12, w: 3, h: 1, static: true },
			{ i: 'billing', x: 1, y: 14, w: 2, h: 8, static: true },
			{ i: 'outage', x: 3, y: 14, w: 2, h: 8, static: true },
			{ i: 'support', x: 1, y: 23, w: 2, h: 8, static: true },
			{ i: 'horizontal-bar', x: 0, y: 10, w: 10, h: 1, static: true },
			{ i: 'service-request', x: 6, y: 12, w: 3, h: 1.2, static: true },
		];

		const layoutSmall = [
			{ i: 'open-count', x: 1, y: 4, w: 2, h: 7, static: true },
			{ i: 'close-count', x: 3, y: 4, w: 2, h: 7, static: true },
			{ i: 'ticket-status', x: 1, y: 1.2, w: 3, h: 1.2, static: true },
			{ i: 'remote-hands', x: 6, y: 15, w: 3, h: 12, maxW: 3, minH: 10, static: true },
			{ i: 'guest-access', x: 6, y: 28, w: 3, h: 12, maxW: 3, static: true },
			{ i: 'issue-request', x: 1, y: 13, w: 3, h: 1, static: true },
			{ i: 'billing', x: 1, y: 15, w: 2, h: 8, static: true },
			{ i: 'outage', x: 3, y: 15, w: 2, h: 8, static: true },
			{ i: 'support', x: 1, y: 24, w: 2, h: 8, static: true },
			{ i: 'horizontal-bar', x: 0, y: 11, w: 10, h: 1, static: true },
			{ i: 'service-request', x: 6, y: 13, w: 3, h: 1.2, static: true },
		];
		const layoutExtraSmall = [
			{ i: 'open-count', x: 1, y: 3, w: 2, h: 6, static: true },
			{ i: 'close-count', x: 3, y: 3, w: 2, h: 6, static: true },
			{ i: 'ticket-status', x: 1, y: 0.5, w: 3, h: 1.2, static: true },
			{ i: 'remote-hands', x: 7, y: 15, w: 3, h: 7, static: true, minH: 22, maxH: 12 },
			{ i: 'guest-access', x: 7, y: 26, w: 3, h: 7, static: true },
			{ i: 'issue-request', x: 1, y: 13, w: 5, h: 1, static: true },
			{ i: 'billing', x: 1, y: 15, w: 2, h: 6, static: true },
			{ i: 'outage', x: 4, y: 15, w: 2, h: 6, static: true },
			{ i: 'support', x: 1, y: 26, w: 2, h: 6, static: true },
			{ i: 'horizontal-bar', x: 0, y: 11, w: 10, h: 1, static: true },
			{ i: 'service-request', x: 7, y: 13, w: 5, h: 1.2, static: true },
		];
		const layoutMedium = [
			{ i: 'open-count', x: 1, y: 4, w: 2, h: 6, static: true },
			{ i: 'close-count', x: 3, y: 4, w: 2, h: 6, static: true },
			{ i: 'ticket-status', x: 1, y: 1, w: 3, h: 1.2, static: true },
			{ i: 'remote-hands', x: 6, y: 14, w: 3, h: 12, maxH: 12, static: true },
			{ i: 'guest-access', x: 6, y: 27, w: 3, h: 12, maxH: 12, static: true },
			{ i: 'issue-request', x: 1, y: 12, w: 3, h: 1, static: true },
			{ i: 'billing', x: 1, y: 14, w: 2, h: 8, static: true },
			{ i: 'outage', x: 3, y: 14, w: 2, h: 8, static: true },
			{ i: 'horizontal-bar', x: 0, y: 10, w: 10, h: 1, static: true },
			{ i: 'support', x: 1, y: 23, w: 2, h: 8, static: true },
			{ i: 'service-request', x: 6, y: 12, w: 3, h: 1.2, static: true },
		];

		const { ticketCounts, goToTicketHistory } = this.props;

		const { containerPadding, margin, rowHeight } = this.state;
		console.log(ticketCounts);
		return (
			<ResponsiveReactGridLayout
				layouts={{ lg: layoutLarge, md: layoutMedium, sm: layoutSmall, xs: layoutExtraSmall }}
				measureBeforeMount={false}
				className='layout'
				rowHeight={rowHeight}
				isDraggable={false}
				breakpoints={{ lg: 1450, md: 1000, sm: 640, xs: 400 }}
				cols={{ lg: 12, md: 12, sm: 12, xs: 12 }}
				containerPadding={containerPadding}
				onBreakpointChange={this.onBreakpointChange}
				margin={margin}
				onLayoutChange={this.onLayoutChange}
				onWidthChange={this.onWidthChange}
			>
				<span key='open-count'>
					<TicketCountRow {...ticketCounts} goToTicketHistory={goToTicketHistory} type='open' />
				</span>
				<span key='close-count'>
					<TicketCountRow {...ticketCounts} goToTicketHistory={goToTicketHistory} type='closed' />
				</span>
				<span key='ticket-status' className='ticket-type-selection '>
					<span className='title'>TICKET Status</span>
				</span>
				<span key='service-request' className='ticket-type-selection'>
					<span className='title grid-item'>SERVICE Request</span>
				</span>
				<div key='remote-hands' className='grid-item-rh'>
					<LargeCard
						title='REMOTE HANDS'
						button={
							<Button
								title='NEW REQUEST'
								customClass='support-button'
								onClick={() => this.startTicketWizard('REMOTE HANDS')}
								enabled
							/>
						}
						description='Need us to do something for you in the Data Center?'
						image={remoteHands}
						customClass='guest-access'
						onClick={() => this.startTicketWizard('REMOTE HANDS')}
					/>
				</div>
				<div key='horizontal-bar' className='gray-horizontal-bar' />
				<div key='guest-access' className='grid-item-ga'>
					<LargeCard
						title='GUEST ACCESS'
						button={
							<Button
								title='NEW REQUEST'
								customClass='support-button'
								onClick={() => this.startTicketWizard('GUEST ACCESS')}
								enabled
							/>
						}
						description="Let us know who's coming to work on your equipment."
						image={guestAccess}
					/>
				</div>
				<span key='issue-request' className='ticket-type-selection '>
					<span className='title grid-item'>ISSUE Request</span>
				</span>
				<div key='billing' className='overflow'>
					<TicketType
						className='title grid-item '
						setTicketAttribute={this.setTicketAttribute}
						type='BILLING'
					/>{' '}
				</div>
				<div key='outage' className='overflow'>
					<TicketType setTicketAttribute={this.setTicketAttribute} type='OUTAGE' />
				</div>
				<div key='support' className='grid-item overflow'>
					<TicketType setTicketAttribute={this.setTicketAttribute} type='SUPPORT' />
				</div>
				{/* <div
					key='13'
					data-grid={{ x: 9, y: 6, w: 1, h: 1, static: true }}
					className='grid-example'
				/> */}
			</ResponsiveReactGridLayout>
		);
	}
}

export default SelectionScreen;
