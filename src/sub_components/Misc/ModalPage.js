import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import 'clientjs';

// import FeedBackModal from '../../components/Common/ErrorModal';    DELETED
// import InputField from '../../components/Forms/BloxTextInput';   DELETED
// import BloxButton from '../../components/Common/BloxButton';   DELETED

import { TicketApi } from './../../services/ticket';
import { Utils } from './../../services/utils';
import FeedBackModal from './../Common/ErrorModal';
import InputField from './../Common/BloxTextInput';
import BloxButton from './../Common/BloxButton';

const CDN_URL = process.env.REACT_APP_CDN_URL;
const LargeHappyImage = `${CDN_URL}common/feedback/image-happy-selected.svg`;
const LargeSadImage = `${CDN_URL}common/feedback/image-sad-selected.svg`;
const LargeIdeaImage = `${CDN_URL}common/feedback/image-idea-selected.svg`;
const happyImage = `${CDN_URL}common/feedback/image-happy.svg`;
const SadImage = `${CDN_URL}common/feedback/image-sad.svg`;
const happyIdea = `${CDN_URL}common/feedback/image-idea.svg`;
const feedbackImage = `${CDN_URL}common/feedback/modal-feedback-image.svg`;
const FeedbackImage = `${CDN_URL}common/global-feedback-bubble.png`;

class ModalPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			modal: false,
			error: null,
			feedbackType: '',
			userFeedbackInput: '',
			clicked: false,
			valid: false,
			screen: '',
			selected: true,
			image: '',
			message: '',
			label: false,
		};
	}

	ScreenOne = () => {
		return (
			<div className='feedback-modal'>
				<div className='feedback-image-modal'>
					{' '}
					<img src={feedbackImage} />
				</div>
				<div className='message'>What do you want to share ? </div>
				<div className='options'>
					<div className='happy' onClick={() => this.onClick('happy')}>
						<img src={happyImage} />
						<span className='text'> I like something</span>
					</div>
					<div className='sad' onClick={() => this.onClick('sad')}>
						<img src={SadImage} /> <span className='text'>I don't like something</span>
					</div>
					<div className='idea' onClick={() => this.onClick('suggestion')}>
						<img src={happyIdea} />
						<span className='text'> I have an idea</span>
					</div>
				</div>
			</div>
		);
	};
	SuccessScreen = () => {
		return (
			<div className='feedback-modal'>
				<div className='feedback-image-modal'>
					<img src={feedbackImage} />
					<div className='message'>Thank you!</div>
					<div className='success-message'>
						Your feedback is highly valued and is used to improve our website and services.
					</div>
				</div>
			</div>
		);
	};

	getCurrentScreen = screen => {
		let image;
		let message;
		let feedbackType = '';
		switch (screen) {
			case 'happy':
				image = LargeHappyImage;
				message = 'What do you like about it?';
				feedbackType = 'Good';
				break;
			case 'sad':
				image = LargeSadImage;
				message = "What's not working?";
				feedbackType = 'Bad';
				break;
			case 'suggestion':
				image = LargeIdeaImage;
				message = "What's your suggestion?";
				feedbackType = 'Suggestion';
				break;
			default:
				image = LargeIdeaImage;
				message = "What's your suggestion?";
				feedbackType = '';
				return;
		}

		this.setState({ image, message, selected: true, feedbackType });
	};
	onClick = screen => {
		this.getCurrentScreen(screen);
	};
	onChange = event => {
		let isValid;
		if (event.target.value.length >= 10) {
			isValid = true;
		} else if (event.target.value.length < 10) {
			isValid = false;
		}

		this.setState({ [event.target.name]: event.target.value, valid: isValid });
	};

	onFocus = () => {
		this.setState({ label: true });
	};

	HappyFeedBack = (image, message) => {
		const { userFeedbackInput, valid, label } = this.state;
		return (
			<div className='feedback-selection'>
				<div className='image'>
					{' '}
					<img src={image} />
				</div>
				<div className='title'>{message} </div>

				{/* <div className='feedback'> */}
				<InputField
					type={'TEXTAREA'}
					label={label ? 'TYPE YOUR FEEDBACK HERE' : ''}
					placeholder='TYPE YOUR FEEDBACK HERE'
					name='userFeedbackInput'
					value={userFeedbackInput}
					characterMinLength={10}
					validations={[]}
					onChange={this.onChange}
					active={true}
					onFocus={this.onFocus}
					maxTextAreaHeight={Utils.scalePxUsingVh(90)}
					hideCheckmark
				/>
				{/* </div> */}

				<div className='feedback-submit-button'>
					<BloxButton
						title='SUBMIT'
						enabled={valid}
						customClass='support-button '
						onClick={this.handleSubmit}
					/>
				</div>
			</div>
		);
	};

	handleSubmit = async () => {
		try {
			const response = await Utils.retrieveIPParams();
			if (response && response.data) {
				this.formTicketAndSubmit(response.data);
			} else {
				this.formTicketAndSubmit('Error finding Ip');
			}
		} catch (e) {
			this.formTicketAndSubmit('Network error finding Ip');
		}
	};
	setSuccessClass = () => {
		const modal = document.getElementById('modal-body');
		modal.classList.add('success');
		setTimeout(function() {
			modal.classList.remove('success');
		}, 5000);
	};
	componentDidMount() {
		this.setState({ screen: this.ScreenOne() });
	}

	FormatDescription = desc => {
		desc = `Feedback: \n` + desc;
		return desc;
	};

	formTicketAndSubmit = ip => {
		this.setState({ error: null, clicked: true });
		const { feedbackType, userFeedbackInput } = this.state;
		const { site, auth_status, company_info } = this.props;
		const browserInfo = Utils.getClientParams(ip, site);
		const user_id = auth_status.user.id;
		const customer_id = company_info.fuseBillId;

		const ticket = {
			title: 'Feedback',
			priority: 'LOW',
			type: 'Feedback',
			description: this.FormatDescription(userFeedbackInput),
			feedback_type: feedbackType,
			dateSubmitted: Date.now(),
			feedback_browser_data: browserInfo,
			user_id,
			customer_id,
		};

		TicketApi.createTicket(ticket)
			.then(response => {
				if (response.status === 200 && response.data) {
					setTimeout(
						function() {
							if (this.state.modal) {
								this.toggle();
							}
						}.bind(this),
						3000,
					);
					this.setSuccessClass();
					this.setState({ screen: this.SuccessScreen(), selected: false });
				} else {
					this.setState({ error: response.data.error });
				}
			})
			.catch(error => this.setState({ error: error.message }));
	};

	toggle = () => {
		this.setState({
			modal: !this.state.modal,
			error: null,
			feedbackType: '',
			userFeedbackInput: '',
			selected: false,
			label: false,
			valid: false,
			screen: this.ScreenOne(),
		});
		setTimeout(this.setState({ clicked: false }), 7000);
	};

	render() {
		const { modal, image, message, screen, selected } = this.state;
		let selectionScreen;
		if (selected) {
			selectionScreen = this.HappyFeedBack(image, message);
		}
		return (
			<Fragment>
				<div className='feedback-modal-wrapper'>
					<FeedBackModal
						isOpen={modal}
						toggleOpen={this.toggle}
						customBody={selected ? selectionScreen : screen}
						useHeader={false}
					/>
				</div>
				<img id='feedback-image' src={FeedbackImage} onClick={this.toggle} />
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
	null,
)(ModalPage);
