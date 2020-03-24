import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import BloxButton from 'sub_components/Common/BloxButton';
import InputField from 'sub_components/Common/BloxTextInput';
import { TYPES, SEVERITIES } from 'utils/TicketConstants';
import ErrorModal from 'sub_components/Common/ErrorModal';
import { TicketApi } from 'services/ticket';
import { Utils } from 'services/utils';
import { sampleStorage } from 'utils/StorageUtils';
import { updateModule, updatePage, addPageToBreadCrumbs } from 'actions/siteTracking';
import { MENU as STORAGE_MENU } from 'utils/StorageConstants';
import { SITE_PAGES, SITE_MODULES } from 'utils/CommonConstants';

const CDN_URL = process.env.REACT_APP_CDN_URL;
const ShredderOne = `${CDN_URL}storage/shredder-one.png`;
const ShredderTwo = `${CDN_URL}storage/shredder-two.png`;
const ShredderThree = `${CDN_URL}storage/shredder-three.png`;
const DeleteIconHover = `${CDN_URL}storage/icon-delete-storage-select.svg`;

class DeleteStorage extends Component {
	state = {
		step: 'ONE',
		image: null,
		userInput: '',
		showErrorModal: false,
	};

	toggleErrorModalOpen = () => {
		const { showErrorModal: isErrorModalShowingNow } = this.state;
		this.setState({ showErrorModal: !this.state.showErrorModal });

		// Error modal will be toggled off. Go back to step TWO
		if (isErrorModalShowingNow) {
			this.getStep('TWO');
		}
	};

	goToManageStorage = () => {
		const { history } = this.props;
		history.push('/portal/storage/manage');
	};

	onInputChange = event => {
		let isValid;
		const {
			state: { storage: { name: storageName } = {} },
		} = this.props.location;

		if (event.target.value === storageName) {
			isValid = true;
		} else {
			isValid = false;
		}

		this.setState({ userInput: event.target.value, valid: isValid });
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

	getStep = step => {
		let valid = '';
		let image = '';
		let largeText = '';
		let showErrorModal = false;
		const { userInput } = this.state;
		const {
			state: { storage: { name: storageName } = {} },
		} = this.props.location;

		switch (step) {
			case 'TWO':
				image = ShredderTwo;
				largeText = `We know this is a pain, but this is your last chance to turn back. Do you still want to
                delete ${storageName} ?`;
				valid = userInput === storageName;
				break;
			case 'SUCCESS':
				image = ShredderThree;
				largeText = `You've successfully deleted ${storageName}`;
				break;
			case 'ERROR':
				showErrorModal = true;
				break;
			case 'ONE':
				largeText = `Are you sure you want to delete ${storageName} ?`;
				image = ShredderOne;
				valid = true;
				break;
			default:
				return;
		}
		this.setState({ step, showErrorModal, image, largeText, valid });
	};

	componentDidMount() {
		this.getStep('ONE');
		const { updateModule, updatePage, addPageToBreadCrumbs } = this.props;
		updatePage(SITE_PAGES.STORAGE[STORAGE_MENU.REMOVE_STORAGE]);
		addPageToBreadCrumbs(SITE_PAGES.STORAGE[STORAGE_MENU.REMOVE_STORAGE], SITE_MODULES.STORAGE);
		updateModule(SITE_MODULES.STORAGE);
	}

	render() {
		const { image, largeText, step, userInput, valid, showErrorModal } = this.state;
		const { history } = this.props;

		return (
			<div className='delete-storage'>
				<div className='delete-storage-error-modal'>
					<ErrorModal
						header='HEADER TEXT'
						isOpen={showErrorModal}
						customBody={this.getErrorBody()}
						toggleOpen={this.toggleErrorModalOpen}
						submitViaEmail={() => {}}
					/>
				</div>
				<div className='support-overview-page delete-storage-wrapper'>
					<div key='delete-storage-image' className='delete-storage-image'>
						{step !== 'SUCCESS' && (
							<div className='image-box'>
								<img src={image} />
							</div>
						)}
						{step === 'SUCCESS' && (
							<div className='image-box success'>
								<div className='shredder-text'>GONE FOR GOOD</div>
								<img src={ShredderThree} />
							</div>
						)}
					</div>
					<div key='large-text' className='large-text'>
						<div className={`large-message ${step}`}>{largeText}</div>
					</div>
					<div key='small-text' className='small-text no-pointer-events'>
						{this.getSmallText(step)}
					</div>
					{step === 'TWO' && (
						<div className='input delete-input'>
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
					<div className={`options-section ${step === 'SUCCESS' ? 'success' : ''}`}>
						{step !== 'SUCCESS' && (
							<Fragment>
								<BloxButton
									title='NOPE. CHANGED MY MIND.'
									enabled={true}
									customClass='blox-button back-button emerald-gradient'
									onClick={step === 'ONE' ? this.goToManageStorage : () => this.getStep('ONE')}
								/>
								<BloxButton
									title={step === 'ONE' ? 'YEP. DELETE IT NOW!' : 'MAKE IT SO!'}
									imageId={step === 'ONE' ? 'delete-button' : 'make-it-so'}
									icon={DeleteIconHover}
									enabled={valid}
									customClass='blox-button proceed-button orange-gradient icon'
									onClick={step === 'ONE' ? () => this.getStep('TWO') : this.handleSubmit}
								/>
							</Fragment>
						)}
						{step === 'SUCCESS' && (
							<BloxButton
								title='BACK TO MY SHARES'
								enabled={true}
								customClass='blox-button cancel-button emerald-gradient'
								onClick={this.goToManageStorage}
							/>
						)}
					</div>
				</div>
			</div>
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

export default withRouter(
	connect(mapStateToProps, { updatePage, updateModule, addPageToBreadCrumbs })(DeleteStorage),
);
