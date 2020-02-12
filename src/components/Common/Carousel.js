import React, { Component, Fragment } from 'react';
import { CarouselCycle } from '../../containers/Storage/CarouselCycle';
import Share from '../../containers/Storage/Share';
const CDN_URL = process.env.REACT_APP_CDN_URL;
const Arrow = `${CDN_URL}common/left-arrow-active.png`;

class Carousel extends Component {
	constructor(props) {
		super(props);

		this.myObserver = null;
		this.state = {
			active: [],
			topItem: 0,
			currentItem: 0,
			disabled: false,
		};
	}

	componentDidMount() {
		this.setState({ topItem: 0, currentItem: 0 });
	}

	componentDidUpdate(prevProps) {
		if (prevProps.data !== this.props.data) {
			this.setState({ currentItem: 0 });
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
	};

	allowNextClick = () => {
		this.setState({ disabled: false });
	};

	cycleItems = (direction = 'next') => {
		this.setState({ disabled: true });
		const reverseDirection = direction === 'next' ? 'prev' : 'next';
		const { currentItem } = this.state;
		const { data } = this.props;
		const nextItem = direction === 'next' ? parseInt(currentItem) - 1 : parseInt(currentItem) + 1;
		if (
			(currentItem === 0 && direction === 'next') ||
			(currentItem === data.length && direction === 'prev')
		) {
		} else {
			this.setState({ currentItem: nextItem }, () =>
				CarouselCycle(
					[],
					{},
					reverseDirection,
					'.small-share-card',
					'.large-share-card-container',
					this.allowNextClick,
				),
			);
		}
	};

	onClick = () => {};

	render() {
		const emptyShare = {
			name: '',
			usage: '10 TB',
			replication: true,
			primaryLocation: 'Atlanta, GA',
			secondaryLocation: 'Huntsville, TN',
			type: 'object',
			ip_address: '192.168.255.255',
		};
		const { data } = this.props;
		const { currentItem, disabled } = this.state;

		if (data) {
			return (
				<div className='carousel-container'>
					<Fragment>
						<div className='nav-container-right'>
							{currentItem !== data.length - 4 && data.length > 4 && (
								<div
									className='nav-arrow-right'
									onClick={disabled ? function() {} : () => this.cycleItems('prev')}
								>
									<div className='arrow-image'>
										<img src={Arrow} />
									</div>
								</div>
							)}
						</div>
					</Fragment>

					<div className='list-container' id='invoice-container'>
						<div className='large-share-card-container'>
							{data &&
								data.map(share => (
									<Share
										key={share.ml_id}
										share={share}
										id={share.ml_id}
										onClick={this.props.getSelectedShareDetails}
									/>
								))}
							{data.length <= 1 && (
								<Share disabled={true} share={emptyShare} onClick={this.onClick} />
							)}
							{data.length <= 0 && (
								<Share disabled={true} share={emptyShare} onClick={this.onClick} />
							)}
							{data.length <= 2 && (
								<Share disabled={true} share={emptyShare} onClick={this.onClick} />
							)}
							{data.length <= 3 && (
								<Share disabled={true} share={emptyShare} onClick={this.onClick} />
							)}
						</div>
					</div>

					<Fragment>
						<div className='nav-container-left'>
							{currentItem !== 0 && data.length > 4 && (
								<div
									className='nav-arrow-left'
									onClick={disabled ? '' : () => this.cycleItems('next')}
								>
									<div className='arrow-image'>
										<img src={Arrow} />
									</div>
								</div>
							)}
						</div>
					</Fragment>
				</div>
			);
		} else {
			return <div />;
		}
	}
}

export default Carousel;
