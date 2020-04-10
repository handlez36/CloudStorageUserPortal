import React, { Component } from 'react';

import { Button, Modal, ModalBody, ModalFooter } from 'mdbreact';
import SubmitButton from '../../components/Common/COMPANYButton';

import { TicketApi } from '../../services/ticket';
import { TYPES, SEVERITIES } from '../Support/TicketConstants';

export default class StorageModal extends Component {
	constructor(props) {
		super(props);
		this.startMsg = `You are requesting the permanent deletion of ${
			this.props.storage.name
		}.  This request is irreversible.  Are you sure you want to proceed?`;
		this.state = {
			modal: false,
			msg: null,
			confirmed: null,
			button: null,
			phase: 1,
			input: null,
		};
	}

	confirmMsg = () => {
		this.setState(
			{
				msg:
					'We know this is a pain, but this is your last chance to turn back. This deletion is irreversible.  If you\'re absolutely sure, enter the name of the storage we\'re deleting and click "Make It So!"',
				phase: 2,
			},
			() => this.buttonSwitch(),
		);
		if (this.state.phase === 2) {
			const input = document.querySelector("input[name='storage-name']").value;
			if (input === this.props.storage.name) {
				this.requestDeleteStorage();
			}
		}
	};

	makeItSo() {
		return (
			<div>
				<input name='storage-name' type='text' />
			</div>
		);
	}

	toggle = () => {
		this.setState(
			{
				modal: !this.state.modal,
				phase: 1,
			},
			() => this.buttonSwitch(),
		);
	};

	componentDidMount() {
		if (this.state.phase === 1) {
			this.setState({ msg: this.startMsg });
		}
		this.buttonSwitch();
	}

	/**
	 * Create ticket to request deletion of ticket
	 */
	requestDeleteStorage = () => {
		const type = TYPES.STORAGE;
		const priority = SEVERITIES.LOW;
		const description = JSON.stringify(this.props.storage);
		const title = 'Delete Storage';
		const storageDeleteId = this.props.id;
		const newTicket = { type, priority, description, title, storageDeleteId };
		TicketApi.createTicket(newTicket)
			.then(response => {
				if (response.status === 200 && response.data.caseId !== null) {
					this.storageGone(response);
				} else {
					this.setState({ msg: response.data.error });
				}
			})
			.catch(error => console.log(error));
	};

	buttonSwitch = () => {
		if (this.state.phase === 1) {
			this.setState({
				button: "Yes, I don't need that data",
				msg: this.startMsg,
			});
		} else {
			this.setState({
				button: 'Make It So!',
			});
		}
	};

	buttonSwitch = () => {
		if (this.state.phase === 1) {
			this.setState({
				button: "Yes, I don't need that data",
				msg: this.startMsg,
			});
		} else {
			this.setState({
				button: 'Make It So!',
			});
		}
	};

	storageGone(response) {
		if (response.status === 200) {
			const refresh = true;
			this.props.unloadSupportColumn(refresh);
		} else {
			console.log('The axios response came back with ' + response.status);
		}
	}

	render() {
		return (
			<div className='storage-modal'>
				<SubmitButton onClick={() => this.toggle()} enabled={true} title={'Delete Storage'} />
				<Modal isOpen={this.state.modal} size='lg' side position='top-right' toggle={this.toggle}>
					<ModalBody className='modal-content'>{this.state.msg}</ModalBody>
					<ModalFooter>
						{this.state.phase === 2 && this.makeItSo()}
						<Button color='primary' onClick={this.confirmMsg}>
							{this.state.button}
						</Button>
						<Button color='primary' onClick={this.toggle}>
							No, I've reconsidered
						</Button>
					</ModalFooter>
				</Modal>
			</div>
		);
	}
}
