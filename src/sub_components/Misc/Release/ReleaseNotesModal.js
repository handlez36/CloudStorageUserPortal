import React, { Component } from 'react';

import Modal from './../../Common/ErrorModal';
import DetailView from './ModalViews/DetailView';
import ListView from './ModalViews/ReleaseList';
import { SCREENS } from './../../../utils/Misc/ReleaseConstants';

class ReleaseNotesModal extends Component {
	state = {
		open: false,
		screen: SCREENS.LIST,
		params: null,
	};

	closeModal = () => {
		const { close } = this.props;
		close();
		this.setState({ open: false, screen: SCREENS.LIST, params: null });
	};

	updateScreen = (screen, params) => {
		this.setState({ screen, params });
	};

	componentDidUpdate() {
		const { open: existingOpen } = this.state;
		const { isOpen: incomingOpen } = this.props;

		if (existingOpen !== incomingOpen) {
			this.setState({ open: incomingOpen });
		}
	}

	render() {
		const { screen, params, open } = this.state;
		const view =
			screen && screen === SCREENS.DETAIL ? (
				<DetailView updateScreen={this.updateScreen} params={params} />
			) : (
				<ListView updateScreen={this.updateScreen} />
			);

		const modalTitle = (
			<div className='release-modal-title'>
				<div className='heading-section-head title-section'>RELEASE Notes</div>
				{screen && screen === SCREENS.DETAIL && (
					<div className='body-copy title-options-section'>
						Want to read more?{' '}
						<span
							className='all-releases-link'
							style={{ textDecoration: 'underline', cursor: 'pointer' }}
							onClick={() => this.updateScreen(SCREENS.LIST)}
						>
							View All Releases
						</span>
					</div>
				)}
			</div>
		);

		return (
			<div className='release-notes-modal'>
				<Modal
					isOpen={open}
					toggleOpen={this.closeModal}
					customBody={view}
					customTitle={modalTitle}
					additionalClasses='release-notes-modal'
					useHeader
				/>
			</div>
		);
	}
}

export default ReleaseNotesModal;
