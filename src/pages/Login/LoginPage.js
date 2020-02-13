import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Responsive, WidthProvider } from 'react-grid-layout';

// import LoginInput from '../../containers/LoginInput';
// import ForgotPassword from '../../components/Login/ForgotPassword';

/** v3 imports */
import LoginInput from './../../sub_components/Login/LoginInput';
import ForgotPassword from './../../sub_components/Login/ForgotPassword';

const ResponsiveReactGridLayout = WidthProvider(Responsive);
/**
 * Container component for LoginInput and Canvas Components
 * Handles login progress once authenticated
 */

class LoginPage extends Component {
	constructor(props) {
		super(props);

		this.timer = null;
		this.state = { rowHeight: 0, margin: [], containerPadding: [], layout: [], showModal: false };
	}

	/**
	 * Checks to see if the user is authenticated. If so, move to
	 * the next page (HomePage). Waits for 2 seconds before re-routing
	 * to allow animation to finish.
	 */
	checkCompletion = () => {
		const { auth_status } = this.props;
		if (
			auth_status.type === 'LOGIN_SUCCESS_PHASE_ONE_NO_MFA' ||
			(auth_status.context === 'AUTHENTICATED' && auth_status.isAuthenticated)
		) {
			this.timer = setTimeout(() => {
				this.props.history.push('/portal');
			}, 900);
		}
	};

	componentWillUnmount() {
		clearTimeout(this.timer);
	}
	onBreakpointChange = breakpoint => {
		let rowHeight = 0;
		let margin;
		let containerPadding;

		switch (breakpoint) {
			case 'xs':
				rowHeight = 15;
				margin = [21, 0];
				containerPadding = [90, 0];
				break;
			case 'sm':
				rowHeight = 18;
				margin = [21, 0];
				containerPadding = [95, 0];
				break;
			case 'md':
				rowHeight = 21;
				margin = [22, 0];
				containerPadding = [120, 0];
				break;
			case 'lg':
				rowHeight = 24;
				margin = [32, 0];
				containerPadding = [160, 0];
				break;
			default:
				rowHeight = 23;
				margin = [22, 0];
				containerPadding = [30, 0];
				break;
		}

		this.setState({ rowHeight, margin, containerPadding });
	};
	componentDidMount() {
		this.onBreakpointChange();
	}
	showModal = () => {
		const { showModal } = this.state;
		this.setState({ showModal: !showModal });
	};

	render() {
		const { containerPadding, margin, rowHeight, showModal } = this.state;
		const layoutSmall = [
			{ i: 'login-input', x: 0, y: 5, w: 6, h: 7, static: true },
			{ i: 'login-image', x: 0, y: 0, w: 12, h: 65, static: true },
			{ i: 'forgot-password', x: 0, y: 13, w: 12, h: 40, static: true },
		];
		const layoutLarge = [
			{ i: 'login-input', x: 0, y: 5, w: 6, h: 7, static: true },
			{ i: 'login-image', x: 0, y: 0, w: 12, h: 50, static: true },
			{ i: 'forgot-password', x: 0, y: 13, w: 12, h: 40, static: true },
		];

		//	var layoutSmall = [{ i: 'login', x: 0.1, y: 1, w: 2.5, h: 2, static: true }];
		return (
			<Fragment>
				{/* <div key='login-image'>
					<img
						key='login-img'
						alt=''
						src={'/gradient-vector-multiply.png'}
						className='gradient-img'
					/>
				</div> */}
				<ResponsiveReactGridLayout
					layouts={{ lg: layoutLarge, md: layoutSmall, sm: layoutSmall, xs: layoutSmall }}
					//	layout={layoutSmall}
					measureBeforeMount={false}
					className={'login'}
					rowHeight={rowHeight}
					isDraggable={false}
					isResizable={false}
					breakpoints={{ lg: 2559, md: 2000, sm: 1440, xs: 900 }}
					cols={{ lg: 12, md: 12, sm: 12, xs: 6 }}
					containerPadding={containerPadding}
					onBreakpointChange={this.onBreakpointChange}
					margin={margin}
					//onLayoutChange={this.onLayoutChange}
				>
					<div key='login-image' className='purple-background'>
						<img
							key='login-img'
							alt=''
							src={'/gradient-vector-multiply.png'}
							className='gradient-img'
						/>
					</div>
					<div key='login-input' className='login-form grid-item-rh'>
						<LoginInput
							checkCompletionCallback={this.checkCompletion}
							dispatch={this.props.dispatch}
						/>
					</div>
					<div key='forgot-password' className='forgot-password  grid-item-ga'>
						{this.props.auth_status.status !== 'LOGIN_SUCCESS' && (
							<div className='forgot-password-link' onClick={this.showModal}>
								Forgot your Password?
							</div>
						)}
					</div>
				</ResponsiveReactGridLayout>
				<div className='forgot-password-modal'>
					<ForgotPassword isOpen={showModal} toggleOpen={this.showModal} />
				</div>
			</Fragment>
		);
	}
}

function mapStateToProps(state) {
	return {
		auth_status: state.auth_status,
	};
}

export default withRouter(
	connect(
		mapStateToProps,
		null,
	)(LoginPage),
);
