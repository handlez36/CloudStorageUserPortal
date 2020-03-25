import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { updateModule, updatePage, addPageToBreadCrumbs } from 'actions/siteTracking';
import { MENU as STORAGE_MENU } from 'utils/StorageConstants';
import { SITE_PAGES, SITE_MODULES } from 'utils/CommonConstants';
import Modal from 'sub_components/Common/PortalModal';
import ErrorModal from 'sub_components/Common/ErrorModal';
import { ADD_STORAGE_LAYOUT_GRID } from 'utils/StorageUtils';
import { MENU } from 'utils/StorageConstants';
import BloxGrid from 'components_old/Layout/BloxGrid';
import Button from 'sub_components/Common/BloxButton';
import TopNavBar from './Components/TopNavBar';
import TopSection from './Components/TopSection';
import TopRightSection from './Components/TopRightSection';
import AvatarGrid from './Components/AvatarGrid';

/** WIZARD SCREENS */

import StoragePrimaryLocationSelection from './Components/StoragePrimaryLocationSelection';
import StorageAddReview from './Components/StorageAddReview';
import StorageRedundancySelection from './Components/StorageRedundancySelection';
import StorageSecondaryLocationSelection from './Components/StorageSecondaryLocationSelection';
import StorageAccessibilitySelection from './Components/StorageAccessibilitySelection';
import StorageNameSelection from './Components/StorageNameSelection';
import StorageAvatarSelection from './Components/StorageAvatarSelection';
import StorageWhitelistSelection from './Components/StorageWhitelistSelection';
import StorageAddConfirmation from './Components/StorageAddConfirmation';

const NavArrow = ({ className, enabled, onClick }) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width='24.127'
		height='23.349'
		viewBox='0 0 24.127 23.349'
		className={`${className}`}
		onClick={onClick}
	>
		<path
			id='Triangle-Active'
			fill={enabled ? '#00b0b9' : '#c1c5c8'}
			d='M9.221 0l9.221 16.314H0z'
			className='cls-1'
			transform='rotate(30 4.078 15.221)'
		/>
	</svg>
);

const SCREENS = {
	TYPE: 'type',
	PRIMARY: 'primary',
	REDUNDANT: 'redundant',
	SECONDARY: 'secondary',
	PUBLIC: 'public',
	NAME: 'name',
	AVATAR: 'avatar',
	WHITELIST: 'whitelist',
	REVIEW: 'review',
	CONFIRMATION: 'confirmation',
};
const WIZARD_SCREEN = {
	POPULATE: [
		//{ component: StorageTypeSelection, screen: SCREENS.TYPE },
		{ component: StoragePrimaryLocationSelection, screen: SCREENS.PRIMARY },
		{ component: StorageRedundancySelection, screen: SCREENS.REDUNDANT },
		{ component: StorageSecondaryLocationSelection, screen: SCREENS.SECONDARY },
		{ component: StorageAccessibilitySelection, screen: SCREENS.PUBLIC },
		{ component: StorageNameSelection, screen: SCREENS.NAME },
		{ component: StorageAvatarSelection, screen: SCREENS.AVATAR },
		{ component: StorageWhitelistSelection, screen: SCREENS.WHITELIST },
	],
	REVIEW: [{ component: StorageAddReview, screen: SCREENS.REVIEW }],
	CONFIRMATION: [{ component: StorageAddConfirmation, screen: SCREENS.CONFIRMATION }],
};
const WIZARD_DEFAULT_TITLES = [
	//{ screen: 'type', title: 'Whats your storage type?' },
	{ screen: 'primary', title: 'Whats your primary location?' },
	{ screen: 'redundant', title: 'Do you want redundancy for your storage?' },
	{ screen: 'secondary', title: 'Great. Now, choose your secondary location.' },
	{ screen: 'public', title: 'Now, choose Private or Public Access.' },
	{ screen: 'name', title: "Now. Let's name your Share." },
	{ screen: 'avatar', title: 'Now, let’s personalize your Share with a unique icon.' },
	{ screen: 'whitelist', title: 'Now, let’s set your IP address.' },
];

const DIRECTION = {
	NEXT: 'next',
	PREV: 'prev',
};

const PHASES = {
	POPULATE: 'POPULATE',
	REVIEW: 'REVIEW',
	CONFIRMATION: 'CONFIRMATION',
};

const NamingErrorBody = (toggleOpen, storageName) => (
	<Fragment>
		<div className='top-message'>
			{storageName} has already been used. Please choose a different name and try again.
		</div>
		<div className='bottom-message'>
			If the problem persists please call
			<br />
			877-590-1684.
		</div>
		<div className='buttons-row'>
			<div className='try-again-option'>
				<Button title='TRY AGAIN' enabled={true} customClass='blox-button' onClick={toggleOpen} />
			</div>
		</div>
	</Fragment>
);

class StorageAddWizard extends Component {
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
			screen: 0,
			phase: PHASES.POPULATE,
			wizardTitle: WIZARD_DEFAULT_TITLES[0].title,
			furthestIndex: 0,
			showAvatarModal: false,
			createError: false,
			hasNamingError: false,
			storageName: null,
		};
	}
	componentDidMount() {
		const { updateModule, updatePage, addPageToBreadCrumbs } = this.props;

		updatePage(SITE_PAGES.STORAGE[STORAGE_MENU.ADD_STORAGE]);
		addPageToBreadCrumbs(SITE_PAGES.STORAGE[STORAGE_MENU.ADD_STORAGE], SITE_MODULES.STORAGE);
		updateModule(SITE_MODULES.STORAGE);
	}

	resetWizard = () => {
		this.setState({
			data: {},
			screen: 0,
			phase: PHASES.POPULATE,
			wizardTitle: WIZARD_DEFAULT_TITLES[0].title,
			furthestIndex: 0,
		});
	};

	toggleAvatarModal = () => {
		this.setState(state => ({ ...state, showAvatarModal: !this.state.showAvatarModal }));
	};

	gotoOverview = () => {
		const { history } = this.props;
		history.push('/portal/storage');
	};

	completeAdd = (isSuccess, hasNamingError, storageName) => {
		const { selectMenuItem, history } = this.props;
		if (isSuccess) {
			this.setState({ phase: PHASES.CONFIRMATION });

			setTimeout(() => {
				history.push('/portal/storage');
			}, 3000);
		} else if (hasNamingError) {
			this.setState({ createError: true, hasNamingError: true, storageName });
		} else {
			this.setState({ createError: true });
		}
	};

	toggleErrorModal = () => {
		this.setState({ createError: false, phase: PHASES.POPULATE, screen: 0 });
	};

	update = (screen, value) => {
		const { data } = this.state;

		data[screen] = value;
		if (screen === 'primary' && data.secondary === value) {
			data.redundant = false;
			data.secondary = '';
		}
		if (screen === 'redundant' && !value && data.secondary) {
			data.secondary = '';
		}
		if (screen === 'secondary' && !data.redundant) {
			data.redundant = true;
		}
		this.setState({ data, showAvatarModal: false });
	};

	findNextScreen = (direction = DIRECTION.NEXT, stepCount = 1) => {
		const { phase, screen: currentScreenIndex } = this.state;

		if (phase === PHASES.POPULATE) {
			if (direction === DIRECTION.NEXT) {
				const nextScreen = currentScreenIndex + stepCount;
				if (nextScreen >= WIZARD_SCREEN.POPULATE.length) {
					return { phase: PHASES.REVIEW, nextScreen: 0 };
				} else {
					return { phase: PHASES.POPULATE, nextScreen };
				}
			} else {
				const nextScreen = Math.max(currentScreenIndex - stepCount, 0);
				return { phase: PHASES.POPULATE, nextScreen };
			}
		}
	};

	updateTitle = title => {
		this.setState({ wizardTitle: title });
	};

	navigateWizard = (direction = DIRECTION.NEXT) => {
		const { data, screen: currentScreen } = this.state;
		let stepCount = 1;
		// Skip secondary location step if redundancy is false
		if (currentScreen === 2 && direction === DIRECTION.NEXT && !data.redundant) {
			stepCount = 2;
		} else if (currentScreen === 3 && direction === DIRECTION.PREV && !data.redundant) {
			stepCount = 2;
		}
		const { phase, nextScreen } = this.findNextScreen(direction, stepCount);
		this.setState({
			phase,
			screen: nextScreen,
			wizardTitle: WIZARD_DEFAULT_TITLES[nextScreen].title,
		});
	};

	onSelect = (step, params, newData = false) => {
		const { furthestIndex: furthestRecordedIndex } = this.state;
		const stepCount = step === 'redundant' && !params.data ? 2 : 1;
		const { phase, nextScreen } =
			!params.noSubmit || params.noSubmit === undefined
				? this.findNextScreen(DIRECTION.NEXT, stepCount)
				: { phase: this.state.phase, nextScreen: this.state.screen };

		if (newData || !nextScreen) {
			let title;
			let redundant = step === 'redundant' ? params.data : this.state.data.redundant;
			let secondary = step === 'secondary' ? params.data : this.state.data.secondary;

			if (step === 'primary') {
				title = params.data;
				redundant = this.state.data.secondary === params.data ? false : this.state.data.redundant;
				secondary = this.state.data.secondary === params.data ? null : this.state.data.secondary;
			} else if (step === 'secondary') {
				title = params.data;
			} else if (step === 'name' && !params.noSubmit) {
				title = 'OK!';
			} else if (step === 'redundant') {
				redundant = params.data;
				secondary = !redundant ? null : this.state.data.secondary;
			} else {
				title = this.state.wizardTitle;
			}

			this.setState(state => {
				state.data[step] = params.data;
				state.data.redundant = redundant;
				state.data.secondary = secondary;
				state.wizardTitle = title;

				return state;
			});

			if (!params.noSubmit) {
				this.timeout = setTimeout(() => {
					const title =
						phase === PHASES.POPULATE ? WIZARD_DEFAULT_TITLES[nextScreen].title : 'REVIEW';
					const furthestIndex =
						phase === PHASES.POPULATE
							? Math.max(nextScreen, furthestRecordedIndex)
							: WIZARD_SCREEN.POPULATE.length;
					this.setState({ screen: nextScreen, wizardTitle: title, phase, furthestIndex });
				}, 1000);
			}
		}
	};

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
			}, 300);
		}
	};
	shouldDisableNav = (direction = DIRECTION.NEXT) => {
		const { screen, phase, furthestIndex } = this.state;
		if (direction === DIRECTION.NEXT) {
			return screen >= furthestIndex || phase === PHASES.REVIEW;
		} else {
			return phase === PHASES.REVIEW || screen === 0;
		}
	};

	getScreen = () => {
		const { phase, screen, data } = this.state;
		const { refreshStorageInfo } = this.props;
		let Screen;

		if (phase === PHASES.POPULATE) {
			Screen = WIZARD_SCREEN.POPULATE[screen].component;
		} else if (phase === PHASES.REVIEW) {
			Screen = WIZARD_SCREEN.REVIEW[0].component;
		} else if (phase === PHASES.CONFIRMATION) {
			Screen = WIZARD_SCREEN.CONFIRMATION[0].component;
		}

		return (
			<Screen
				data={data}
				onSelect={this.onSelect}
				updateTitle={this.updateTitle}
				update={this.update}
				completeAdd={this.completeAdd}
				toggleAvatarModal={this.toggleAvatarModal}
				refreshStorageInfo={refreshStorageInfo}
			/>
		);
	};

	getGridLayout = () => {
		const { phase, screen } = this.state;
		let topLeftPaneGrid = { x: 4, y: 4, w: 2, h: 11, static: true };
		let topRightPaneGrid = { x: 6, y: 4, w: 2, h: 11, static: true };
		let labelGrid = { x: 4, y: 21, w: 12, h: 1, static: true };
		let contentGrid;

		switch (screen) {
			// Storage Type Selection or Review
			case 0:
				if (phase === PHASES.POPULATE) {
					topLeftPaneGrid = { x: 5, y: 4, w: 2, h: 11, static: true };
					topRightPaneGrid = { x: 0, y: 30, w: 2, h: 11, static: true };
					contentGrid = { x: 4, y: 24, w: 4, h: 7, static: true };
					// contentGrid = { x: 4, y: 24, w: 8, h: 7, static: true };
				} else {
					labelGrid = { x: 4, y: 20, w: 12, h: 1, static: true };
					contentGrid = { x: 0, y: 23, w: 12, h: 21, static: true };
				}
				break;
			// Primary location selection
			case 1:
				contentGrid = { x: 4, y: 24, w: 4, h: 7, static: true };
				break;
			// Redundancy selection
			case 2:
				contentGrid = { x: 5, y: 24, w: 2, h: 7, static: true };
				break;
			// Secondary location selection
			case 3:
				contentGrid = { x: 4, y: 24, w: 4, h: 7, static: true };
				break;
			// Public or private selection
			case 4:
				contentGrid = { x: 5, y: 24, w: 2, h: 7, static: true };
				break;
			// Share name
			case 5:
				contentGrid = { x: 3, y: 24, w: 6, h: 7, static: true };
				break;
			// Avatar selection
			case 6:
				contentGrid = { x: 3, y: 24, w: 6, h: 13, static: true };
				labelGrid = { x: 3, y: 21, w: 12, h: 1, static: true };
				break;
			// Whitelist input
			case 7:
				contentGrid = { x: 3, y: 24, w: 12, h: 13, static: true };
				break;
			// ?? May not be needed
			case 8:
				labelGrid = { x: 4, y: 20, w: 4, h: 1, static: true };
				contentGrid = { x: 0, y: 23, w: 16, h: 21, static: true };
				// contentGrid = { x: 0, y: 24, w: 12, h: 19, static: true };
				break;
			default:
				contentGrid = { x: 0, y: 24, w: 16, h: 19, static: true };
				break;
		}

		return {
			topLeftPaneGrid,
			topRightPaneGrid,
			labelGrid,
			contentGrid,
		};
	};

	render() {
		const {
			data,
			containerPadding,
			margin,
			rowHeight,
			screen: currentScreenIndex,
			phase,
			wizardTitle,
			showAvatarModal,
			createError,
			furthestIndex,
			hasNamingError,
			storageName,
		} = this.state;
		const showTopRightSection = !(phase === PHASES.POPULATE && currentScreenIndex === 0);
		const layoutClassname =
			phase === PHASES.POPULATE ? WIZARD_SCREEN.POPULATE[currentScreenIndex].screen : 'review';
		const { topLeftPaneGrid, topRightPaneGrid, labelGrid, contentGrid } = this.getGridLayout();

		return (
			<div className='storage-add-page'>
				<Modal isOpen={showAvatarModal} submitEnabled={false}>
					<div className='heading-ticket-modal'>Change your Unique Share Icon</div>
					<AvatarGrid
						selected={data.avatar}
						onSelect={this.onSelect}
						onUpdate={this.update}
						phase={phase}
					/>
				</Modal>
				<ErrorModal
					header='Error adding storage'
					isOpen={createError}
					toggleOpen={this.toggleErrorModal}
					submitViaEmail={() => {}}
					customBody={hasNamingError ? NamingErrorBody(this.toggleErrorModal, storageName) : null}
				/>
				{phase && phase === PHASES.CONFIRMATION && (
					<StorageAddConfirmation
						data={data}
						onLayoutChange={this.onLayoutChange}
						onWidthChange={this.onWidthChange}
						margin={margin}
						rowHeight={rowHeight}
						containerPadding={containerPadding}
						onBreakpointChange={this.onBreakpointChange}
					/>
				)}
				{phase && phase !== PHASES.CONFIRMATION && (
					<BloxGrid
						namespace='storage-add-wizard'
						layouts={ADD_STORAGE_LAYOUT_GRID}
						layoutClassname={`storage-add-layout ${layoutClassname}`}
						onChange={this.repositionWhiteOverlay}
					>
						<div key='top-nav-bar' className='top-nav-bar'>
							<TopNavBar gotoOverview={this.gotoOverview} resetWizard={this.resetWizard} />
						</div>
						<div key='horizontal-bar' className='gray-horizontal-bar' />
						<div key='left-nav-arrow-key' className='left-nav-arrow-key'>
							<NavArrow
								className={`left-arrow wizard-nav ${
									this.shouldDisableNav(DIRECTION.PREV) ? 'disabled' : ''
								}`}
								onClick={
									this.shouldDisableNav(DIRECTION.PREV)
										? () => {}
										: () => this.navigateWizard(DIRECTION.PREV)
								}
								enabled={!this.shouldDisableNav(DIRECTION.PREV)}
							/>
						</div>
						<div
							key={`right-nav-arrow-key${screen === 0 ? '-hidden' : ''}`}
							className='right-nav-arrow-key'
						>
							<NavArrow
								className={`right-arrow wizard-nav ${
									this.shouldDisableNav(DIRECTION.NEXT) ? 'disabled' : ''
								} ${
									currentScreenIndex === 0 && phase === PHASES.POPULATE && furthestIndex > 0
										? 'allow'
										: ''
								}`}
								onClick={
									this.shouldDisableNav(DIRECTION.NEXT)
										? () => {}
										: () => this.navigateWizard(DIRECTION.NEXT)
								}
								enabled={!this.shouldDisableNav(DIRECTION.NEXT)}
							/>
						</div>
						<div
							key={`storage-type-selection-${topLeftPaneGrid.x}`}
							className='storage-type-selection'
							data-grid={{ ...topLeftPaneGrid }}
						>
							<TopSection
								phase={phase}
								screen={WIZARD_DEFAULT_TITLES[currentScreenIndex].screen}
								params={this.state.data}
								toggleAvatarModal={this.toggleAvatarModal}
							/>
						</div>
						<div
							key={`storage-add-right-side-${topRightPaneGrid.x}`}
							className={`storage-add-right-side${!showTopRightSection ? '-disabled' : ''}`}
							data-grid={{ ...topRightPaneGrid }}
						>
							<TopRightSection
								phase={phase}
								screen={WIZARD_SCREEN[phase][currentScreenIndex].screen}
								params={this.state.data}
							/>
						</div>
						<div
							key={`wizard-label${phase === PHASES.POPULATE ? currentScreenIndex : '-review'}`}
							className='wizard-label'
							data-grid={{ ...labelGrid }}
						>
							<div className='title grid-item form-character-count-text'>{wizardTitle}</div>
						</div>
						<div
							key={`wizard-section-${currentScreenIndex}${
								phase === PHASES.POPULATE ? '' : '-review'
							}`}
							className={`wizard-section ${currentScreenIndex}`}
							data-grid={{ ...contentGrid }}
						>
							{this.getScreen()}
						</div>
					</BloxGrid>
				)}
				{phase !== PHASES.CONFIRMATION && <div className='lower-half-background' />}
			</div>
		);
	}
}

export default connect(null, { updateModule, updatePage, addPageToBreadCrumbs })(StorageAddWizard);
