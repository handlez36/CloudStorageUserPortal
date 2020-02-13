import React, { Component } from 'react';

import DataTable from './DataTable';
import WhiteListModal from './WhiteListModal';
import PasswordModal from './PasswordModal';
import { StorageApi } from '../../../services/storage';
import { PASSWORD_UPDATE_STATUS } from '../StorageConstants';
import { Utils } from '../../../services/utils';
const CDN_URL = process.env.REACT_APP_CDN_URL;
const MacFile = `${CDN_URL}common/Storage_Walkthrough_MAC.pdf`;
const cloudBerryFile = `${CDN_URL}common/Storage_Walkthrough_CloudBerry.pdf`;
const WindowsFile = `${CDN_URL}common/Storage_Walkthrough_Windows.pdf`;

class ShareDetails extends Component {
	constructor(props) {
		super(props);

		this.state = {
			share: null,
			whiteList: null,
			modalOpen: false,
			hideApiKey: true,
			storagePassword: null,
			passwordUpdateStatus: PASSWORD_UPDATE_STATUS.NOT_STARTED,
		};
	}

	componentDidMount() {
		const { id } = this.props.supportParams;

		this.loadShareDetails(id);
	}

	UNSAFE_componentWillReceiveProps(newProps) {
		if (newProps.supportParams.id !== this.props.supportParams.id) {
			this.loadShareDetails(newProps.supportParams.id);

			if (!this.props.hideApiKey) {
				this.setState({
					hideApiKey: true,
					storagePassword: null,
					passwordUpdateStatus: PASSWORD_UPDATE_STATUS.NOT_STARTED,
				});
			}
		}
	}

	changeStoragePassword = () => {
		const { share: { username, id } = {} } = this.state;

		if (username && id) {
			StorageApi.updateStoragePassword(username, id)
				.then(response => {
					if (response.status === 200 && !response.data.error) {
						const { password: storagePassword } = response.data;

						this.setState({
							storagePassword,
							passwordUpdateStatus: PASSWORD_UPDATE_STATUS.SUCCESS,
						});
					} else {
						this.setState({ passwordUpdateStatus: PASSWORD_UPDATE_STATUS.ERROR });
					}
				})
				.catch(error => this.setState({ passwordUpdateStatus: PASSWORD_UPDATE_STATUS.ERROR }));
		}
	};

	downloadPdf = platform => {
		let name;
		let data;

		if (platform === 'WINDOWS') {
			name = 'Storage_Walkthrough_Windows';
			data = WindowsFile;
		} else if (platform === 'MAC') {
			name = 'Storage_Walkthrough_MAC';
			data = MacFile;
		} else {
			name = 'Storage_Walkthrough_CloudBerry';
			data = cloudBerryFile;
		}

		Utils.downloadInstructionPdf(name, data);
	};

	loadShareDetails(id) {
		StorageApi.get(id)
			.then(response => {
				if (response.status === 200 && !response.data.error) {
					this.setState({
						share: response.data.storage,
						whiteList: response.data.storageWhiteList,
					});
				} else {
					this.setState({ error: response.data.error });
				}
			})
			.catch(error => this.setState({ error: error.message }));
	}

	toggleWhiteListOpen = () => {
		this.setState(state => (state.modalOpen = !state.modalOpen));
	};

	toggleApiKey = () => {
		this.setState(state => (state.hideApiKey = !state.hideApiKey));
	};

	togglePasswordModal = () => {
		this.setState({
			passwordUpdateStatus: PASSWORD_UPDATE_STATUS.NOT_STARTED,
			storagePassword: null,
		});
	};

	isLoading() {
		const { share, error } = this.state;

		return !error && !share;
	}

	render() {
		const {
			share,
			error,
			whiteList,
			modalOpen,
			hideApiKey,
			storagePassword,
			passwordUpdateStatus,
		} = this.state;

		return (
			<div className='outer-wrapper share-details'>
				{error && <div className='error'>Error loading share details</div>}
				{this.isLoading() && <div className='loading'>Loading...</div>}
				{share && [
					<WhiteListModal
						key='whitelist-modal'
						isOpen={modalOpen}
						whiteList={whiteList}
						toggleOpen={this.toggleWhiteListOpen}
						storageId={share.id}
					/>,
					<PasswordModal
						key='pwd-modal'
						status={passwordUpdateStatus}
						share={share}
						storagePassword={storagePassword}
						toggleOpen={this.togglePasswordModal}
					/>,
					<DataTable
						key='share-datatable'
						share={share}
						hideApiKey={hideApiKey}
						toggleApiKey={this.toggleApiKey}
						toggleWhiteListOpen={this.toggleWhiteListOpen}
						changeStoragePassword={this.changeStoragePassword}
					/>,
					// <HelpSection downloadPdfCallback={this.downloadPdf} share={share} />
				]}
			</div>
		);
	}
}

export default ShareDetails;
