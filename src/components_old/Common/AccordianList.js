import React, { Component, Fragment } from 'react';

import {
	updateArrowVisibility,
	animateConvoCycle,
} from 'containers_old/Support/TicketHistory/Conversations/ConvoCycleAnimations';

import CycleView from './COMPANYCycleView';
import AccordianItem from './AccordianItem';
const CDN_URL = process.env.REACT_APP_CDN_URL;

const billingHistoryDownArrow = `${CDN_URL}billing/Billing-Scroll-Indicator-DOWN-Default.png`;
const billingHistoryUpArrow = `${CDN_URL}billing/Billing-Scroll-Indicator-UP-Default.png`;

class AccordianList extends Component {
	constructor(props) {
		super(props);

		this.myObserver = null;
		this.state = {
			active: [],
			topItem: 0,
			currentItem: 0,
			showTopArrow: false,
			showBottomArrow: false,
			scroll,
		};
	}

	setShowTopArrow = showTopArrow => {
		this.setState({ showTopArrow });
	};

	setShowBottomArrow = showBottomArrow => {
		this.setState({ showBottomArrow });
	};

	componentDidMount() {
		this.setState({ topItem: 0, currentItem: 0 });

		updateArrowVisibility(
			this.setShowTopArrow,
			this.setShowBottomArrow,
			'.accordian-item',
			'.list-container',
		);
	}

	componentDidUpdate(prevProps) {
		// console.log('Bottom:' + this.state.showBottomArrow);
		// console.log('Top:' + this.state.showTopArrow);
		if (prevProps.data !== this.props.data) {
			this.setState({ currentItem: 0 });
		}
	}

	componentWillUnmount() {
		if (this.myObserver) {
			this.myObserver.disconnect();
		}
	}

	selectListItem = itemId => {
		const { active } = this.state;
		const index = active.indexOf(itemId);

		if (index !== -1) {
			this.setState(state => state.active.splice(index, 1));
		} else {
			this.setState(state => state.active.push(itemId));
		}
		updateArrowVisibility(
			this.setShowTopArrow,
			this.setShowBottomArrow,
			'.accordian-item',
			'.list-container',
		);
	};

	cycleItems = (data, params, direction = 'next') => {
		const reverseDirection = direction === 'next' ? 'prev' : 'next';
		animateConvoCycle(
			[],
			{},
			reverseDirection,
			'.accordian-item',
			'.list-container',
			this.setShowTopArrow,
			this.setShowBottomArrow,
		);

		const { currentItem } = this.state;

		if (direction === 'next') {
			this.setState({ currentItem: currentItem > 0 ? currentItem - 1 : 0 });
		}
		if (direction === 'prev') {
			this.setState({
				currentItem:
					currentItem + 1 <= this.props.data.length ? currentItem + 1 : this.props.data.length,
			});
		}

		updateArrowVisibility(
			this.setShowTopArrow,
			this.setShowBottomArrow,
			'.accordian-item',
			'.list-container',
		);
	};

	render() {
		const { data, enableNav, loadSupportColumn, lowerFilterAnchor, downloadPdf } = this.props;
		const { active, showTopArrow, showBottomArrow } = this.state;
		const arrows = {
			up: billingHistoryDownArrow,
			down: billingHistoryUpArrow,
		};

		if (data) {
			return (
				<div className='accordian-list'>
					<CycleView
						wrapperClass='.list-container'
						listClass='.accordian-item'
						itemClass='.accordian-item'
						itemWrapperClass='.list-container'
						lowerFilterAnchor={lowerFilterAnchor}
					>
						<div className='list-container' id='invoice-container'>
							{data &&
								data.map((record, index) => (
									<AccordianItem
										id={index}
										key={record.invoiceNumber}
										headers={record.summaryHeaders}
										detailHeaders={record.detailHeaders}
										data={record}
										onClick={this.selectListItem}
										classes={index === 0 ? 'alert' : ''}
										loadSupportColumn={loadSupportColumn}
										downloadPdf={downloadPdf}
										expanded={active && active.includes(record.invoiceNumber)}
									/>
								))}
						</div>
					</CycleView>
				</div>
			);
		} else {
			return <div />;
		}
	}
}

export default AccordianList;
