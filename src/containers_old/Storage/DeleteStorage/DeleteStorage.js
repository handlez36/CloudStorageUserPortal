import React, { Component, Fragment } from 'react';
import COMPANYButton from '../../../components/Common/COMPANYButton';
import { UserProfileApi } from '../../../services/userProfile';
import { TicketApi } from '../../../services/ticket';
import InputField from '../../../components/Forms/COMPANYTextInput';
import { TYPES, SEVERITIES } from '../../Support/TicketConstants';
const CDN_URL = process.env.REACT_APP_CDN_URL;

const ShredderOne = `${CDN_URL}storage/shredder-one.png`;
const ShredderTwo = `${CDN_URL}storage/shredder-two.png`;
const ShredderThree = `${CDN_URL}storage/shredder-three.png`;
const DeleteIconHover = `${CDN_URL}storage/icon-delete-storage-select.svg`;

class DeleteStorage extends Component {
	constructor(props) {
		super(props);

		this.userProfileApi = new UserProfileApi();
		this.state = {
			msg: null,
			selected: null,
			step: '',
			userInput: null,
			valid: false,
		};
	}

	getStep = step => {
		let screen = '';

		switch (step) {
			case 'TWO':
				screen = 'TWO';
				break;
			case 'SUCCESS':
				screen = this.stepThree();
				break;
			case 'ERROR':
				//screen = this.stepThree();
				break;
			case 'ONE':
				screen = this.stepOne();
				break;
			default:
				screen = this.stepOne();
				return;
		}

		this.setState({ step: screen });
	};
	stepOne = () => {
		let storageName = this.props.storage.name;
		return (
			<div className='delete-storage-wrapper'>
				{/* <Header
					onClick={() => this.props.selectMenuItem('SHARE DETAILS')}
					button={true}
					buttonText='CANCEL'
					customButtonClass='gray-gradient'
					onClickArrow={() => this.props.selectMenuItem('SHARE DETAILS')}
				/> */}
				<div className='image-box'>
					<img src={ShredderOne} />
				</div>
				<div className='large-message'>Are you sure you want to delete {storageName} ? </div>
				<div className='small-message'>
					You are requesting to <span className='bold'>permanently delete this storage.</span>This
					cannot be undone. Are you sure you want to proceed?
				</div>
				<div className='buttons'>
					<div className='cancel-button'>
						<COMPANYButton
							title='NOPE. CHANGED MY MIND.'
							enabled={true}
							customClass='COMPANY-button emerald-gradient'
							onClick={() => this.props.selectMenuItem('SHARE DETAILS')}
						/>
					</div>
					<div className='proceed-button'>
						<COMPANYButton
							title='YEP. DELETE IT NOW!'
							imageId={'delete-button'}
							icon={DeleteIconHover}
							enabled={true}
							customClass='COMPANY-button orange-gradient icon'
							onClick={() => this.getStep('TWO')}
						/>
					</div>
				</div>
			</div>
		);
	};

	onChange = event => {
		let isValid;
		let storageName = this.props.storage.name;
		if (event.target.value === storageName) {
			isValid = true;
		} else {
			isValid = false;
		}

		this.setState({ userInput: event.target.value, valid: isValid });
	};

	stepThree = () => {
		let storageName = this.props.storage.name;

		return (
			<div className='delete-storage-wrapper'>
				{/* <Header
					onClick={() => this.props.selectMenuItem('MANAGE STORAGE')}
					button={true}
					buttonText='CANCEL'
					customButtonClass='gray-gradient'
					onClickArrow={() => this.getStep('MANAGE STORAGE')}
				/> */}
				<div className='image-box'>
					<div className='shredder-three'>
						<div className='shredder-text'>GONE FOR GOOD</div>
						<img src={ShredderThree} />
					</div>
				</div>
				<div className='large-message'>You've successfully deleted {storageName}</div>

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
			</div>
		);
	};

	deleteStorage = () => {
		const type = TYPES.STORAGE;
		const priority = SEVERITIES.LOW;
		const description = JSON.stringify(this.props.storage);
		const title = 'Delete Storage';
		const storageDeleteId = this.props.storageID;
		const newTicket = { type, priority, description, title, storageDeleteId };
		TicketApi.createTicket(newTicket)
			.then(response => {
				if (response.status === 200 && response.data.caseId !== null) {
					this.getStep('SUCCESS');
					this.props.refreshStorageInfo();
				} else {
					this.getStep('ERROR');
				}
			})
			.catch(error => console.log(error));
	};

	componentDidMount() {
		this.setState({ step: this.stepOne() });
	}

	render() {
		const { step, valid, userInput } = this.state;
		let storageName = this.props.storage.name;
		if (step !== 'TWO') {
			return <Fragment>{step}</Fragment>;
		} else {
			return (
				<div className='delete-storage-wrapper'>
					{/* <Header
						onClick={() => this.props.selectMenuItem('SHARE DETAILS')}
						button={true}
						buttonText='CANCEL'
						customButtonClass='gray-gradient'
						onClickArrow={() => this.getStep('ONE')}
					/> */}
					<div className='image-box'>
						<img src={ShredderTwo} />
					</div>
					<div className='large-message'>
						We know this is a pain, but this is your last chance to turn back. Do you still want to
						delete {storageName} ?{' '}
					</div>
					<div className='small-message'>
						If you are absolutely sure and understand{' '}
						<span className='bold'>this cannot be undone</span>, then enter the name of the storage
						we're deleting and select "Make it so!".
					</div>
					<div className='input'>
						<InputField
							type={'INPUT'}
							label='Storage Name'
							name={'storage-name'}
							value={userInput}
							validations={[]}
							disabled={true}
							onChange={this.onChange}
							//onClick={this.onClick}
							active={true}
							hideCheckmark
						/>
					</div>
					<div className='buttons'>
						<div className='cancel-button'>
							<COMPANYButton
								title='NOPE. CHANGED MY MIND.'
								enabled={true}
								customClass='COMPANY-button emerald-gradient'
								onClick={() => this.props.selectMenuItem('SHARE DETAILS')}
							/>
						</div>
						<div className='proceed-button'>
							<COMPANYButton
								title='MAKE IT SO!'
								imageId={'make-it-so'}
								icon={DeleteIconHover}
								enabled={valid}
								customClass='COMPANY-button orange-gradient icon'
								onClick={this.deleteStorage}
							/>
						</div>
					</div>
				</div>
			);
		}
	}
}

export default DeleteStorage;
