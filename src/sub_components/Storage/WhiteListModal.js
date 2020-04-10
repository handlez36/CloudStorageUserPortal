import React, { Component, Fragment } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';

import Modal from 'sub_components/Common/PortalModal';
import { TYPES, SEVERITIES } from 'utils/TicketConstants';
import { TicketApi } from 'services/ticket';
import { UserProfileApi } from 'services/userProfile';
import { Utils } from 'services/utils';
import WhiteListContainer from './WhiteListContainer';

const CDN_URL = process.env.REACT_APP_CDN_URL;
const CloseIcon = `${CDN_URL}profile/icons-close.svg`;

export class WhiteList extends Component {
	constructor(props) {
		super(props);

		library.add([faTrash]);

		this.state = {
			entries: [],
			isOpen: false,
			storageId: null,
			lastElUpdated: null,
			allIpsValid: true,
			latestIps: { ips: [], dirty: [] },
		};
	}
	handleSubmit = data => {
		let ticket;
		try {
			const response = Utils.retrieveIPParams();
			if (response && response.data) {
				console.log(this.formTicketObject(data, response.data));
				ticket = this.formTicketObject(data, response.data);
			} else {
				ticket = this.formTicketObject(data, 'Error finding Ip');
			}
		} catch (e) {
			ticket = this.formTicketObject(data, 'Network error finding Ip');
		}

		return ticket;
	};

	formTicketObject(ips, ip) {
		const { storageId } = this.state;
		const { site, company_info, auth_status } = this.props;
		const title = `Storage ID ${storageId}: `;
		let description = ips.reduce((finalStr, ip) => {
			const formattedIp = /\/$/.test(ip) ? `${ip}32` : ip;
			finalStr += `\n${formattedIp}`;
			return finalStr;
		}, '');
		description += this.findIpDifferences();
		const browser_info = Utils.getClientParams(ip, site);
		const user_id = auth_status.user.id;
		const customer_id = company_info.fuseBillId;

		return {
			title: 'MODIFY WHITELIST',
			status: 'NEW',
			requestor: new UserProfileApi().getFirstName,
			priority: SEVERITIES.MEDIUM,
			type: TYPES.STORAGE,
			description: `${title}${description}`,
			dateSubmitted: Date.now(),
			feedback_browser_data: browser_info,
			user_id,
			customer_id,
			feedback_type: '',
		};
	}

	findIpDifferences = () => {
		const {
			entries: { ips: originalEntries },
			latestIps: { ips: latestEntries },
		} = this.state;
		const originalParsedEntries = Utils.attachSubnetToIps(originalEntries);
		const newParsedEntries = Utils.attachSubnetToIps(latestEntries);
		const addedEntries = newParsedEntries.filter(latest => !originalParsedEntries.includes(latest));
		const removedEntries = originalParsedEntries.filter(
			original => !newParsedEntries.includes(original),
		);
		let diffStr = `\nAdded Ips: ${addedEntries.join(',')}\n`;
		diffStr += `Removed Ips: ${removedEntries.join(',')}`;

		return diffStr;
	};

	onSubmit = () => {
		const {
			latestIps: { ips },
		} = this.state;
		const ticket = this.handleSubmit(ips);
		console.log('TICKET', ticket.title);
		this.toggleModal();
		TicketApi.createTicket(ticket)
			.then(response => {
				if (response.status === 200 && !response.data.error) {
					this.setState({ error: null });
				} else {
					this.setState({ error: 'Error updating whitelist' });
				}
			})
			.catch(error => this.setState({ error }));
	};

	initializeIps = () => {
		const { whiteList, isOpen, storageId } = this.props;
		let originalEntries = { ips: [], dirty: [] };
		let stateEntries = { ips: [], dirty: [] };
		if (whiteList && whiteList.length > 0) {
			const ips = whiteList.map(entry => entry.ip_address);
			stateEntries = { ips, dirty: [true, true, true, true] };
			originalEntries = { ips: [...ips], dirty: [true, true, true, true] };
		}

		this.setState({
			entries: originalEntries,
			isOpen,
			storageId,
			latestIps: stateEntries,
		});
	};

	componentDidMount() {
		this.initializeIps();
	}

	componentDidUpdate() {
		const { isOpen: existingOpenState } = this.state;
		const { isOpen: incomingOpenState } = this.props;
		if (incomingOpenState !== existingOpenState) {
			this.setState({ isOpen: incomingOpenState });
		}
	}

	toggleModal = () => {
		console.log('WhiteListModal -- toggleModal');
		const { isOpen } = this.state;
		const { toggleOpen } = this.props;

		// Modal is about to close...
		if (isOpen) {
			this.initializeIps();
		}
		toggleOpen();
	};

	updateIpList = (name, ips) => {
		this.setState({ latestIps: ips });
	};

	shouldEnableSubmit = () => {
		const { latestIps: { ips } = {} } = this.state;
		const formattedIps = ips.map(ip => (/\/$/.test(ip) ? `${ip}32` : ip));

		return ips && ips.length > 0 && Utils.checkListOfIps(formattedIps);
	};

	render() {
		const { entries, isOpen, error, latestIps } = this.state;

		return (
			<Modal
				additionalClass='white-list-modal'
				header={
					<div className='whitelist-modal-header'>
						<div className='whitelist-modal-title heading-ticket-modal'>Edit Your Whitelist</div>
						<div className='close-icon-img' onClick={this.toggleModal}>
							<img src={CloseIcon} alt='Close' />
						</div>
					</div>
				}
				isOpen={isOpen}
				toggleOpen={this.toggleModal}
				onSubmit={this.onSubmit}
				submitEnabled={this.shouldEnableSubmit()}
				buttonClass='COMPANY-button emerald-gradient whitelist-submit-button'
				buttonText='UPDATE'
				useButton
			>
				{error && (
					<div className='error-message'>
						Sorry, there was an error updating your whitelist. Please try again.
					</div>
				)}
				{entries && (
					<Fragment>
						{/* <div className='whitelist-modal-title heading-ticket-modal'>Edit Your Whitelist</div> */}
						{/* <ScrollView
							name={'whitelist'}
							wrapper={'whitelist-section'}
							content={'white-list-container'}
							expanded
							setOverflow
						> */}
						<div className='white-list-scroll-container'>
							<WhiteListContainer
								ips={latestIps}
								update={this.updateIpList}
								phase='REVIEW'
								onSelect={this.onSubmit}
								buttonText={'UPDATE'}
								useButton={false}
							/>
						</div>
						{/* </ScrollView> */}
					</Fragment>
				)}
			</Modal>
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
)(WhiteList);
