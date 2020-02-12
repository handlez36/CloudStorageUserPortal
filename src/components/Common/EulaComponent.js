import React, { Component } from 'react';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';
import { Eula } from '../Common/Eula';

/**
 * We are not quite sure where the EULA will end up, but for now, we're serving it through a modal */

export class EulaComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			eula: false,
		};
	}

	toggle = () => {
		this.setState({
			eula: !this.state.eula,
		});
	};

	render() {
		return (
			<span>
				<a href='#' onClick={() => this.toggle()}>
					EULA
				</a>
				<Modal isOpen={this.state.eula} size='lg' toggle={this.toggle}>
					<ModalHeader className='eula-header' toggle={this.toggle}>
						End User License Agreement ("Agreement")
					</ModalHeader>
					<ModalBody>
						<Eula />
					</ModalBody>
					<ModalFooter>
						{/* <div className='eula-keepscrolling'>Scroll To Bottom</div>
            <Button color="primary">I Accept</Button> */}
					</ModalFooter>
				</Modal>
			</span>
		);
	}
}
