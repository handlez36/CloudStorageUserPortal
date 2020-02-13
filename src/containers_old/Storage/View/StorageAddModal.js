import React from 'react';
import { Container, Button, Modal, ModalBody, ModalFooter } from 'mdbreact';

class ModalPage extends React.Component {
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
		this.props.updateState();
	};

	render() {
		return (
			<Container>
				<Modal isOpen={this.state.modal} toggle={this.toggle}>
					<ModalBody>
						<span className='modal-message'>{this.props.body}</span>
					</ModalBody>
					<ModalFooter>
						<Button color='secondary' onClick={this.toggle}>
							Thanks
						</Button>
					</ModalFooter>
				</Modal>
			</Container>
		);
	}
}

export default ModalPage;
