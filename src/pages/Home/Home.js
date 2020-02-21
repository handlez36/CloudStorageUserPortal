import React, { Component, Fragment } from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import { connect } from 'react-redux';
import { Responsive, WidthProvider } from 'react-grid-layout';

// import Block from './Block';
// import { HOME_LAYOUT_GRID } from './HomePageConstants';
// import Profile from './img/home-profile-module-2019.svg';
// import Billing from './img/home-billing-module-2019.svg';
// import Support from './img/home-support-module-2019.svg';
// import Storage from './img/home-storage-module-2019.svg';
// import { UserApi } from '../../services/user';
// import { Permissions } from '../../services/permissions';
// import { updateModule, updatePage } from '../../actions/siteTracking';
// import HomePortalMessage from './HomePortalMessage';

/** v3 imports */
import Block from './../../sub_components/Home/Block';
import { HOME_LAYOUT_GRID } from './../../utils/Home/HomePageConstants';
import Profile from './../../assets/home-profile-module-2019.svg';
import Billing from './../../assets/home-billing-module-2019.svg';
import Support from './../../assets/home-support-module-2019.svg';
import Storage from './../../assets/home-storage-module-2019.svg';
// import { UserApi } from '../../services/user';
import { Permissions } from './../../services/permissions';
import { updateModule, updatePage } from './../../actions/siteTracking';
import HomePortalMessage from './../../sub_components/Home/HomePortalMessage';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

class Home extends Component {
	constructor(props) {
		super(props);

		this.myObserver = null;
		this.timeout = null;
		this.state = {
			data: {},
			rowHeight: 0,
			margin: [],
			containerPadding: [],
			layout: [],
			includeDebugGridLines: true,
		};
	}

	repositionWhiteOverlay = () => {
		const horizontalRule = document.querySelector('.gray-horizontal-bar');
		const lowerHalfOverlay = document.querySelector('.lower-half-background');
		const portalHeader = document.querySelector('.portal-header');
		if (lowerHalfOverlay) {
			setTimeout(() => {
				const bottomOfHorizontalRule =
					horizontalRule.getBoundingClientRect().bottom -
					portalHeader.getBoundingClientRect().height;
				lowerHalfOverlay.setAttribute('style', `top: ${bottomOfHorizontalRule}px`);
			}, 500);
		}
	};

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

		this.repositionWhiteOverlay();
	};

	onBreakpointChange = breakpoint => {
		let margin;
		let containerPadding;

		switch (breakpoint) {
			case 'xs':
				margin = [0, 0];
				containerPadding = [0, 0];
				// margin = [20, 0];
				// containerPadding = [30, 0];
				break;
			case 'sm':
				margin = [0, 0];
				containerPadding = [0, 0];
				break;
			case 'md':
				margin = [0, 0];
				containerPadding = [0, 0];
				break;
			case 'lg':
				margin = [0, 0];
				containerPadding = [0, 0];
				break;
			default:
				margin = [0, 0];
				containerPadding = [0, 0];
				break;
		}

		const horizontalRule = document.querySelector('.gray-horizontal-bar');
		if (horizontalRule) {
			horizontalRule.setAttribute('style', `margin-left: ${-containerPadding[0]}px`);
		}
		const topNavBar = document.querySelector('.top-nav-bar');
		if (topNavBar) {
			topNavBar.setAttribute('style', `margin-left: ${-containerPadding[0]}px`);
		}

		this.setState({ margin, containerPadding });
	};

	componentDidMount() {
		this.onBreakpointChange();
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
		clearTimeout(this.timeout);
	}

	render() {
		const { containerPadding, margin, rowHeight } = this.state;
		const { memberships } = this.props.auth;

		const { access: hasBillingAccess } = Permissions.hasService(memberships, 'Billing');
		const { access: hasStorageAccess } = Permissions.hasService(memberships, 'Storage');
		const { access: hasProfileAccess } = Permissions.hasService(memberships, 'Profile');
		const { access: hasSupportAccess } = Permissions.hasService(memberships, 'Support');

		return (
			<div id='home-background' className='home-back-ground'>
				<div className='home-page-grid'>
					{/* <CrossGrid showGrid /> */}
					<Fragment>
						<div className='blocks-container-overlay' />
						<HomePortalMessage />
					</Fragment>
					<ResponsiveReactGridLayout
						layouts={{
							lg: HOME_LAYOUT_GRID.lg,
							md: HOME_LAYOUT_GRID.md,
							sm: HOME_LAYOUT_GRID.sm,
							xs: HOME_LAYOUT_GRID.xs,
						}}
						className={`layout home-page-layout `}
						rowHeight={rowHeight}
						isDraggable={true}
						isResizable={false}
						breakpoints={{ lg: 2559, md: 1439, sm: 800, xs: 600 }}
						cols={{ lg: 12, md: 12, sm: 12, xs: 12 }}
						containerPadding={containerPadding}
						onBreakpointChange={this.onBreakpointChange}
						margin={margin}
						onLayoutChange={this.onLayoutChange}
						onWidthChange={this.onWidthChange}
					>
						<div key='block-top-filler-0' className='block left'>
							<Block />
						</div>
						<div key='block-top-filler-1' className='block'>
							<Block />
						</div>
						<div key='block-top-filler-2' className='block'>
							<Block />
						</div>
						<div key='block-top-filler-3' className='block'>
							<Block />
						</div>
						<div key='block-top-filler-4' className='block'>
							<Block />
						</div>
						<div key='block-top-filler-5' className='block'>
							<Block />
						</div>
						<div key='block-top-0' className='block top'>
							<Block />
						</div>
						<div key='block-top-1' className='block top'>
							<Block />
						</div>
						<div key='block-top-2' className='block top'>
							<Block />
						</div>
						<div key='block-top-3' className='block top'>
							<Block />
						</div>
						<div key='block-top-4' className='block top'>
							<Block />
						</div>

						<div key='block-second-0' className='block left'>
							<Block />
						</div>
						<div key='block-second-1' className='block'>
							<Block />
						</div>
						<div key='block-second-2' className='block'>
							<Block />
						</div>
						<div key='block-second-3' className='block'>
							<Block />
						</div>
						<div key='block-second-4' className='block'>
							<Block />
						</div>
						<div key='block-second-5' className='block'>
							<Block />
						</div>

						<div key='block-third-0' className='block '>
							<Block />
						</div>
						<div key='block-third-1' className='block'>
							<Block />
						</div>
						<div key='block-third-2' className='block'>
							<Block
								type='clickable'
								src={Profile}
								url='/portal/profile'
								hasAccess={hasProfileAccess}
							/>
						</div>
						<div key='block-third-3' className='block'>
							<Block />
						</div>
						<div key='block-third-4' className='block'>
							<Block />
						</div>
						{/* <div key='block-third-5' className='block '>
						<Block />
					</div> */}

						<div key='block-fourth-0' className='block left'>
							<Block />
						</div>
						<div key='block-fourth-1' className='block'>
							<Block />
						</div>
						<div key='block-fourth-2' className='block'>
							<Block
								type='clickable'
								src={Billing}
								url='/portal/billing'
								hasAccess={hasBillingAccess}
							/>
						</div>
						<div key='block-fourth-3' className='block'>
							<Block
								type='clickable'
								src={Support}
								url='/portal/support'
								hasAccess={hasSupportAccess}
							/>
						</div>
						<div key='block-fourth-4' className='block'>
							<Block />
						</div>
						<div key='block-fourth-5' className='block'>
							<Block />
						</div>

						<div key='block-fifth-0' className='block '>
							<Block />
						</div>
						<div key='block-fifth-1' className='block'>
							<Block />
						</div>
						<div key='block-fifth-2' className='block'>
							<Block
								type='clickable'
								url='/portal/storage/0'
								src={Storage}
								hasAccess={hasStorageAccess}
							/>
						</div>
						<div key='block-fifth-3' className='block'>
							<Block />
						</div>
						<div key='block-fifth-4' className='block'>
							<Block />
						</div>
						{/* <div key='block-fifth-5' className='block right'>
						<Block />
					</div> */}

						<div key='block-sixth-0' className='block left'>
							<Block />
						</div>
						<div key='block-sixth-1' className='block'>
							<Block />
						</div>
						<div key='block-sixth-2' className='block'>
							<Block />
						</div>
						<div key='block-sixth-3' className='block'>
							<Block />
						</div>
						<div key='block-sixth-4' className='block'>
							<Block />
						</div>
						<div key='block-sixth-5' className='block'>
							<Block />
						</div>

						<div key='block-seventh-0' className='block '>
							<Block />
						</div>
						<div key='block-seventh-1' className='block'>
							<Block />
						</div>
						<div key='block-seventh-2' className='block'>
							<Block />
						</div>
						<div key='block-seventh-3' className='block'>
							<Block />
						</div>
						<div key='block-seventh-4' className='block'>
							<Block />
						</div>
						{/* <div key='block-seventh-5' className='block '>
						<Block />
					</div> */}
						<div key='block-eighth-0' className='block left'>
							<Block />
						</div>
						<div key='block-eighth-1' className='block'>
							<Block />
						</div>
						<div key='block-eighth-2' className='block'>
							<Block />
						</div>
						<div key='block-eighth-3' className='block'>
							<Block />
						</div>
						<div key='block-eighth-4' className='block'>
							<Block />
						</div>

						{/* <div key='test' className='block'>
						<Block />
					</div> */}
					</ResponsiveReactGridLayout>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		auth: state.auth_status,
		company_info: state.company_info,
	};
}

export default connect(mapStateToProps, { updateModule, updatePage })(Home);
