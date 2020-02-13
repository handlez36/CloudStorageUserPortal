import React, { Component } from 'react';
import { connect } from 'react-redux';

import { UserProfileApi } from '../../services/userProfile';
import { MENU } from './StorageConstants';
import { MESSAGE_TEXT } from '../../containers/Support/TicketConstants';
import StorageInfo from '../../containers/Storage/StorageInfo';
import { updatePage } from '../../actions/siteTracking';
import { SITE_PAGES } from '../../components/Common/CommonConstants';
import Radio from '../../components/Common/Radio';

class StorageRemove extends Component {
	constructor(props) {
		super(props);

		this.userProfileApi = new UserProfileApi();
		this.state = {
			msg: null,
			selected: null,
		};
	}

	renderMesage() {
		return (
			<div className='message-text'>
				<span className='start'>{MESSAGE_TEXT.STORAGE.START}</span>
				<span className='content'>{MESSAGE_TEXT.STORAGE.CONTENT}</span>
			</div>
		);
	}

	renderBanner(bannerText) {
		return <div className={`banner`}>{bannerText}</div>;
	}

	clickHandler(storage) {
		this.setState({ selected: storage.id });
		this.props.loadSupportColumn(StorageInfo, { storage });
	}

	grabStorageItems() {
		const { selected } = this.state;
		const storageOptions = this.props.storages.map(data => ({
			value: data.id,
			name: data.name,
			clickCallback: () => this.clickHandler(data),
		}));
		return (
			<Radio
				callback={() => {}}
				name='storage'
				value={selected}
				hidden={false}
				toggle={true}
				options={storageOptions}
			/>
		);
	}

	componentDidMount() {
		const { updatePage } = this.props;
		updatePage(SITE_PAGES.STORAGE[MENU.REMOVE_STORAGE]);
	}

	render() {
		return (
			<div className='outer-wrapper storage-remove'>
				{this.renderMesage()}
				{this.renderBanner(MENU.REMOVE_STORAGE)}
				<div className='storage-list'>{this.grabStorageItems()}</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		auth_status: state.auth_status,
	};
}

export default connect(
	mapStateToProps,
	{ updatePage },
)(StorageRemove);
