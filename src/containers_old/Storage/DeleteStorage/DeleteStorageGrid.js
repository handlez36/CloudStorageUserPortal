import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import ResizeObserver from 'resize-observer-polyfill';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { LAYOUT_GRID_STORAGE } from '../StorageConstants';
import HorizontalGrid from '../../../components/Layout/HorizontalGrid';
import VerticalGrid from '../../../components/Layout/VerticalGrid';
import COMPANYButton from '../../../components/Common/COMPANYButton';
import InputField from '../../../components/Forms/COMPANYTextInput';
import { TYPES, SEVERITIES } from '../../Support/TicketConstants';
import ErrorModal from '../../../components/Common/ErrorModal';
import { TicketApi } from '../../../services/ticket';
import { Utils } from '../../../services/utils';
import { updatePage, updateModule } from '../../../actions/siteTracking';
const CDN_URL = process.env.REACT_APP_CDN_URL;

const ShredderOne = `${CDN_URL}storage/shredder-one.png`;
const ShredderTwo = `${CDN_URL}storage/shredder-two.png`;
const ShredderThree = `${CDN_URL}storage/shredder-three.png`;
const DeleteIconHover = `${CDN_URL}storage/icon-delete-storage-select.svg`;
const ResponsiveReactGridLayout = WidthProvider(Responsive);

class DeleteStorageGrid extends Component {
	constructor(props) {
		super(props);
		this.myObserver = null;
		this.state = {
			rowHeight: 0,
			margin: [],
			containerPadding: [],
			layout: [],
			storageDetails: null,
			storageErr: null,
			includeDebugGridLines: false,
			step: 'SUCCESS',
			image: null,
			largeText: null,
			smallText: null,
			userInput: null,
			valid: true,
			showErrorModal: false,
		};
	}

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

		this.setState({ margin, containerPadding });
	};

	componentDidMount() {
		this.onBreakpointChange();
		this.getStep('ONE');
		this.myObserver = new ResizeObserver(entries => {
			entries.forEach(() => {
				this.onChange();
			});
		});

		const wrapperElement = document.querySelector('.layout');
		this.myObserver.observe(wrapperElement);
	}

	componentWillUnmount() {
		//this.myObserver.disconnect();
	}
	onInputChange = event => {
		let isValid;
		const storageName = this.props.storage.name;
		if (event.target.value === storageName) {
			isValid = true;
		} else {
			isValid = false;
		}

		this.setState({ userInput: event.target.value, valid: isValid });
	};
	getErrorBody = () => {
		return (
			<Fragment>
				<div className='top-message'>
					Looks like we are having a bit of trouble processing your request at this time.
				</div>
				<div className='bottom-message'>
					<br />
					If the problem persists please call
					<br />
					877-590-1684.
				</div>
			</Fragment>
		);
	};
	toggleErrorModalOpen = () => {
		this.setState({ showErrorModal: !this.state.showErrorModal });
	};
	handleSubmit = async () => {
		try {
			const response = await Utils.retrieveIPParams();
			console.log('RESPONSE', response);
			if (response && response.data) {
				this.deleteStorage(response.data);
			} else {
				this.deleteStorage('Error finding Ip');
			}
		} catch (e) {
			this.deleteStorage('Network error finding Ip');
		}
	};

	deleteStorage = ip => {
		const { site, company_info, auth_status } = this.props;
		const type = TYPES.STORAGE;
		const priority = SEVERITIES.LOW;
		const description = JSON.stringify(this.props.storage);
		const title = 'Delete Storage';
		const storageDeleteId = this.props.storageID;
		const browserInfo = Utils.getClientParams(ip, site);
		const user_id = auth_status.user.id;
		const customer_id = company_info.fuseBillId;
		const newTicket = {
			type,
			priority,
			description,
			title,
			storageDeleteId,
			feedback_browser_data: browserInfo,
			user_id,
			customer_id,
			feedback_type: '',
		};
		this.setState({ valid: false });

		TicketApi.createTicket(newTicket)
			.then(response => {
				if (response.status === 200 && !response.data.error) {
					this.getStep('SUCCESS');
					this.props.refreshStorageInfo();
				} else {
					this.setState({ showErrorModal: true, valid: true });
				}
			})
			.catch(error => console.log(error));
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
	};
	getStep = step => {
		let valid = '';
		let image = '';
		let largeText = '';

		const storageName = this.props.storage.name;
		switch (step) {
			case 'TWO':
				image = ShredderTwo;
				largeText = `We know this is a pain, but this is your last chance to turn back. Do you still want to
                delete ${storageName} ?`;
				valid = false;
				break;
			case 'SUCCESS':
				image = ShredderThree;
				largeText = `You've successfully deleted ${storageName}`;
				break;
			case 'ERROR':
				break;
			case 'ONE':
				largeText = `Are you sure you want to delete ${storageName} ?`;
				image = ShredderOne;
				valid = true;
				break;
			default:
				return;
		}
		this.setState({ step, image, largeText, valid });
	};

	getSmallText = step => {
		if (step === 'ONE') {
			return (
				<div className='small-message'>
					You are requesting to <span className='bold'>permanently delete this storage.</span>
					This cannot be undone. Are you sure you want to proceed?
				</div>
			);
		} else if (step === 'TWO') {
			return (
				<div className='small-message TWO'>
					If you are absolutely sure and understand{' '}
					<span className='bold'>this cannot be undone</span>, then enter the name of the storage
					we're deleting and select "Make it so!".
				</div>
			);
		}
	};

	render() {
		const {
			containerPadding,
			margin,
			rowHeight,
			includeDebugGridLines,
			image,
			largeText,
			step,
			userInput,
			valid,
			showErrorModal,
		} = this.state;
		return (
			<Fragment>
				<div className='delete-storage-error-modal'>
					<ErrorModal
						header='HEADER TEXT'
						isOpen={showErrorModal}
						//customTitle='Error deleting storage'
						customBody={this.getErrorBody()}
						toggleOpen={this.toggleErrorModalOpen}
						submitViaEmail={() => {}}
					/>
				</div>
				<div className='support-overview-page delete-storage-wrapper'>
					{includeDebugGridLines && (
						<Fragment>
							<HorizontalGrid />
							<VerticalGrid />
						</Fragment>
					)}
					<ResponsiveReactGridLayout
						layouts={{
							lg: LAYOUT_GRID_STORAGE.lg,
							md: LAYOUT_GRID_STORAGE.md,
							sm: LAYOUT_GRID_STORAGE.sm,
							xs: LAYOUT_GRID_STORAGE.xs,
						}}
						measureBeforeMount={false}
						className='layout'
						rowHeight={rowHeight}
						isDraggable={false}
						isResizable={false}
						breakpoints={{ lg: 1450, md: 930, sm: 640, xs: 400 }}
						// breakpoints={{ lg: 1450, md: 1000, sm: 640, xs: 400 }}
						cols={{ lg: 12, md: 12, sm: 12, xs: 12 }}
						containerPadding={containerPadding}
						onBreakpointChange={this.onBreakpointChange}
						margin={margin}
						onLayoutChange={this.onLayoutChange}
						onWidthChange={this.onWidthChange}
					>
						<span key='delete-storage-image' className='delete-storage-image'>
							{step !== 'SUCCESS' && (
								<div className='image-box'>
									<img src={image} />
								</div>
							)}
							{step === 'SUCCESS' && (
								<div className='image-box'>
									<div className='shredder-three'>
										<div className='shredder-text'>GONE FOR GOOD</div>
										<img src={ShredderThree} />
									</div>
								</div>
							)}
						</span>

						<div key='large-text' className='large-text'>
							<div className={`large-message ${step}`}>{largeText}</div>
							{step === 'SUCCESS' && (
								<div className='buttons'>
									<div className='cancel-button'>
										<COMPANYButton
											title='BACK TO MY SHARES'
											enabled={true}
											customClass='COMPANY-button emerald-gradient'
											onClick={() => this.props.selectMenuItem('MANAGE STORAGE')}
										/>
									</div>
								</div>
							)}
						</div>
						<span key='small-text' className='small-text no-pointer-events'>
							{this.getSmallText(step)}
						</span>
						<span key='back-button' className='back-button flex-end'>
							{step !== 'SUCCESS' && (
								<div className='buttons'>
									<COMPANYButton
										title='NOPE. CHANGED MY MIND.'
										enabled={true}
										customClass='COMPANY-button emerald-gradient'
										onClick={() => this.props.selectMenuItem('SHARE DETAILS')}
									/>
								</div>
							)}
						</span>
						<span key='next-button' className='next-button flex-start'>
							{step !== 'SUCCESS' && (
								<div className='buttons'>
									<div className='proceed-button'>
										<COMPANYButton
											title={step === 'ONE' ? 'YEP. DELETE IT NOW!' : 'MAKE IT SO!'}
											imageId={step === 'ONE' ? 'delete-button' : 'make-it-so'}
											icon={DeleteIconHover}
											enabled={valid}
											customClass='COMPANY-button orange-gradient icon'
											onClick={step === 'ONE' ? () => this.getStep('TWO') : this.handleSubmit}
										/>
									</div>
								</div>
							)}
						</span>
						<span key='delete-input' className='delete-input'>
							{step === 'TWO' && (
								<div className='input'>
									<InputField
										type={'INPUT'}
										label='Storage Name'
										name={'storage-name'}
										value={userInput}
										validations={[]}
										disabled={true}
										onChange={this.onInputChange}
										active={true}
										hideCheckmark
									/>
								</div>
							)}
						</span>
					</ResponsiveReactGridLayout>
				</div>
			</Fragment>
		);
	}
}

function mapStateToProps(state) {
	return {
		site: state.site_tracking,
		auth_status: state.auth_status,
		company_info: state.company_info,
	};
}

export default connect(
	mapStateToProps,
	{ updatePage, updateModule },
)(DeleteStorageGrid);
