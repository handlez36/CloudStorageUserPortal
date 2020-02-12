import React, { Fragment } from 'react';

import Modal from '../../components/Common/ErrorModal';
import Button from '../../components/Common/BloxButton';
const CDN_URL = process.env.REACT_APP_CDN_URL;
const checkMark = `${CDN_URL}billing/check-mark-circle.svg`;
class PasswordResetSuccess extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: this.props.modal,
		};
	}

	toggle = () => {
		this.setState({
			modal: !this.state.modal,
		});
	};
	getBody = (status, toggle) => {
		console.log(status);
		return status === 'CONFIRM_PASSWORD_SUCCESS' ? (
			<Fragment>
				<div className='top-message'>Success!</div>
				<div className='bottom-message'>Your password has been changed successfully.</div>
				<Button
					title='OKAY'
					enabled={true}
					customClass='support-button gradient'
					onClick={toggle}
				/>
			</Fragment>
		) : (
			<Fragment>
				<div className='top-message'>
					Looks like something went wrong on our end. Please try again.
				</div>
				<div className='bottom-message'>
					If the problem persists please call
					<br />
					877-590-1684.
				</div>
			</Fragment>
		);
	};

	render() {
		const { modal } = this.state;
		const { status } = this.props;
		const headerText =
			status === 'CONFIRM_PASSWORD_SUCCESS' ? 'Password Reset' : 'ERROR UPDATING PASSWORD!';
		return (
			<Modal
				isOpen={modal}
				toggleOpen={this.toggle}
				customBody={this.getBody(status, this.toggleOpen)}
				customTitle={headerText}
				customImage={status === 'CONFIRM_PASSWORD_SUCCESS' ? checkMark : ''}
			/>
			// <Container >
			//     <Modal isOpen={this.state.modal} toggle={this.toggle}>
			//     <ModalBody>
			//         Congrats!  Your Password Has Been Reset.
			//     </ModalBody>
			//     <ModalFooter>
			//         <Button color="secondary" onClick={this.toggle}>Thanks</Button>
			//     </ModalFooter>
			//     </Modal>
			// </Container>
		);
	}
}

export default PasswordResetSuccess;
